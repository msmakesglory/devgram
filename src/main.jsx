import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/components/LangingPage.jsx";
import SignUp from "@/components/auth/SignUp.jsx";
import Login from "@/components/auth/Login.jsx";
import Profile from "@/components/profile/profile.jsx"
import ProfileSetup from "@/components/profile/ProfileSetUp.jsx";
import { ProfileProvider } from './context/profileContext.jsx';
import ProfileUpdate from "@/components/profile/ProfileUpdate.jsx";
import { AuthProvider } from './context/authContext.jsx';
// import { DemoProvider } from './context/demoContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ProfileProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="" element={<LandingPage />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<SignUp />} />
                            <Route path="/p/:uid" element={<Profile />} />
                            {/* <Route path="/p/setup" element={<ProfileSetup />}/> */}
                            <Route path="/p/update" element={<ProfileUpdate />}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </ProfileProvider>
        </BrowserRouter>
    </StrictMode>,
)
