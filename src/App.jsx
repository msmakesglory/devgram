// import {Google} from "@icon-park/react";
// import {Button} from "@/components/ui/button.jsx";
import LandingPage from "@/components/LangingPage";
import Login from "@/components/Auth/Login.jsx";
import SignUp from "@/components/Auth/SignUp.jsx";
import Profile from "@/components/Profile/profile.jsx"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App(){
    return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
    )
}