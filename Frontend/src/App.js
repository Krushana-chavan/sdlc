// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Loading } from "./components/Loading";
import { Weather } from "./components/weather";
import SignIn from "./components/SignIn";
import PrivateRoutes from "./components/PrivateRouter/Privateroute";
import SignupComponent from "./components/Signup";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Weather />
          </PrivateRoutes>
        }
      />
      <Route path="/signUp" element={<SignupComponent />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}

export default App;
