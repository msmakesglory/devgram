import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/components/LangingPage.jsx";
import SignUp from "@/components/auth/SignUp.jsx";
import Login from "@/components/auth/Login.jsx";
import Profile from "@/components/profile/Profile.jsx";
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/authContext.jsx';
import NotFound from './components/404.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import { IdeaProvider } from './context/IdeaContext.jsx';
import {Home} from "@/components/Home/Home.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ProfileProvider> 
                <AuthProvider>
                    <IdeaProvider>  
                        <Routes>
                            <Route path="/" element={<App />}>
                                <Route path="" element={<LandingPage />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/forgotpassword" element={<ForgotPassword />} />
                                <Route path="/p/:uid" element={<Profile />} />
                                <Route path="/404" element={<NotFound />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </IdeaProvider>
                </AuthProvider>
            </ProfileProvider>
        </BrowserRouter>
    </StrictMode>
);
