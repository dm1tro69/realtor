import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
      <>
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/profile'} element={<PrivateRoute/>}>
                <Route path={'/profile'} element={<Profile/>}/>
            </Route>
            <Route path={'/sign-in'} element={<SignIn/>}/>
            <Route path={'/sign-up'} element={<SignUp/>}/>
            <Route path={'/create-listing'} element={<CreateListing/>}/>
            <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
            <Route path={'/offers'} element={<Offers/>}/>
        </Routes>

    </BrowserRouter>
          <ToastContainer theme={'dark'}/>
      </>
  );
}

export default App;
