
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as types from "./actionTypes";
import {
  SIGNIN_FAILURE_REQUEST,
  SIGNIN_LOODING_REQUEST,
  SIGNIN_SUCCESS_REQUEST,
  SIGNUP_FAILURE_REQUEST,
  SIGNUP_LOODING_REQUEST,
  SIGNUP_SUCCESS_REQUEST,
} from "./actionTypes";

// export const loginAdmin=(payload)=>dispatch=>{

export const getWeatherOncurrentLocation = (lat1, lon1) => (dispatch) => {
 dispatch({type:types.REQUEST_OF_DATA})
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=aeb2e8e67a323e70bae652830b434d64`
    )
    .then((r) => {
      
      //   console.log(r)
      const data = r.data;
      console.log(data)
      const city = r.data.name;
// console.log("amaooal",data.coord)
const lat=data.coord.lat
const lon=data.coord.lon
dispatch(get7daysWeather(lat,lon));
dispatch({type:types.REQUEST_OF_DATA})
      const url = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    
      dispatch({ type: types.GET_MAP, payload: url });

      return dispatch({
        type: types.GET_WEATHER_BY_LOCATION,
        payload: { data, city },
      });
      
    })
    .catch((e) => {
      return dispatch({ type: types.GET_ERROR, payload: e });
    });
};

export const getWeather = (city) => (dispatch) => {
  dispatch({type:types.REQUEST_OF_DATA})
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aeb2e8e67a323e70bae652830b434d64`
    )
    .then((r) => {
      const data = r.data;
      const city = r.data.name;
      const lat=data.coord.lat
const lon=data.coord.lon
dispatch(get7daysWeather(lat,lon));
dispatch({type:types.REQUEST_OF_DATA})
      const url = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
      // dispatch(get7daysWeather(city))
      dispatch({ type: types.GET_MAP, payload: url });
      return dispatch({
        type: types.GET_WEATHER_BY_LOCATION,
        payload: { data, city },
      });
    })
    .catch((e) => {
      return dispatch({ type: types.GET_ERROR, payload: e });
    });
};

export const getMap = (city) => (dispatch) => {
  dispatch({type:types.REQUEST_OF_DATA})
  const url = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return dispatch({ type: types.GET_MAP, payload: url });
};

export const refreshPage = () => {
  window.location.reload();
};

export const getLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(success);
  dispatch({type:types.REQUEST_OF_DATA})
  function success(pos) {
    const crd = pos.coords;
    const latitude = crd.latitude;
    const langitude = crd.longitude;
    dispatch(getWeatherOncurrentLocation(latitude, langitude));

dispatch(get7daysWeather(latitude, langitude));
    return dispatch({
      type: types.GET_LANGITUDE_OR_LATITUDE,
      payload: { langitude, latitude },
    });
    
  }

  // dispatch(getMap(currentLocation));    
};


export const get7daysWeather=(latitude,longitude)=>dispatch=>{
  dispatch({type:types.REQUEST_OF_DATA})
  let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=aeb2e8e67a323e70bae652830b434d64`
axios.get(url)
.then((r)=>{

  // console.log("7",r.data.daily)
 return dispatch({type:types.GET_WEATHER_FORECAST,payload:r.data.daily})
}).catch(e=>{
  return dispatch({ type: types.GET_ERROR, payload: e });
})
}

// import { storeData_LC } from "../../components/LocalStorage";

export const SignupReq = (e) => (dispatch) => {
  dispatch({ type: SIGNUP_LOODING_REQUEST });
  return axios
    .post(`https://magnificent-tan-jellyfish.cyclic.app/auth/signup`, e)
    .then((response) => {
      
      return dispatch({
        type: SIGNUP_SUCCESS_REQUEST,
        payload: response.data.msg,
      });
    })
    .catch(function (error) {
      const { response } = error;
   
      return dispatch({
        type: SIGNUP_FAILURE_REQUEST,
        payload: response.data.error,
      });
    });
};

export const SigninReq = (e) => (dispatch) => {
  dispatch({ type: SIGNIN_LOODING_REQUEST });
  return axios
    .post(`https://magnificent-tan-jellyfish.cyclic.app/auth/login`, e)
    .then(function (response) {
      // storeData_LC("userdata", response.data);
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("refreshtoken",response.data.refreshtoken)
     localStorage.setItem("user",JSON.stringify(response.data.user))
      return dispatch({
        type: SIGNIN_SUCCESS_REQUEST,
        payload: { token: response.data.token, data: response.data.user },
      });
    })
    .catch(function (error) {

      return dispatch({
        type: SIGNIN_FAILURE_REQUEST,
        payload: error.response.data.error,
      });
    });
};