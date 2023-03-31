import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { CgCopyright } from "react-icons/cg";
import "./signUp.css";
import { useDispatch } from "react-redux";
import { SignupReq } from "../Redux/action";
import { Box, Image } from "@chakra-ui/react";
const initialState = {
  email: "",
  username: "",
  password: "",
};

const SignupComponent = () => {
  const [data, setData] = useState(initialState);
  // const [signUpData, setSignUpData] = useState({});
  const Dispatch = useDispatch();
  const navigate=useNavigate()
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSignUp = (e) => {
    e.preventDefault();
    // setSignUpData({...signUpData, data});
   
    Dispatch(SignupReq(data)).then((res)=>{
      if(res.payload==='Signup Sucessfully'){
        alert(res.payload);
        navigate("/login")
      }else{
        alert(res.payload)
      }
    })
    setData(initialState);
  };

  return (
    <>
      <div className="signUp-container">
      <Box bg={"blue"} width={"90%"} alignContent={"center"} alignItems={"center"} textAlig={"center"} marginLeft="18px">
          <Image
            className="logo"
            margin="auto"
            padding="20px"
            width={"100%"}
            
            src="https://sdlccorp.com/wp-content/uploads/2022/11/Sdlc-corp-white-logo.png"
            alt="pococare_logo"
          />
        </Box>

        <form className="signUp-form" onSubmit={handelSignUp}>
          <input
            type="email"
            placeholder=" Email"
            name="email"
            value={data.email}
            onChange={handelInputChange}
            required
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={data.username}
            onChange={handelInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={DataTransfer.password}
            onChange={handelInputChange}
            required
          />

          <div>
            <p className="info mt-1">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <span className="learn-more">Learn More</span>
            </p>

            <p className="info mt-1">
              By signing up, you agree to our{" "}
              <span className="learn-more">
                {" "}
                Terms , Privacy Policy and Cookies Policy .
              </span>
            </p>
          </div>

          <div className="SignUpBtn">
            <button>Sign up</button>
          </div>
        </form>
      </div>

      <div className="log-account">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      

    </>
  );
};

export default SignupComponent;
