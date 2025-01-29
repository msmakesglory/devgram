// import {Google} from "@icon-park/react";
// import {Button} from "@/components/ui/button.jsx";
import LandingPage from "@/components/LangingPage";
import Login from "@/components/auth/Login.jsx";
import SignUp from "@/components/auth/SignUp.jsx";
import Profile from "@/components/profile/profile.jsx"
import {Outlet} from "react-router-dom";
import Navbar from "@/components/navbar/NavBar.jsx";
import Footer from "@/components/footer/Footer.jsx";
import {ThemeProvider} from "@/context/ThemeContext.js";
import React, {useEffect} from "react";

export default function App(){

    return (
        <>
            <Navbar/>
            <Outlet />
            <Footer />
        </>
    )
}