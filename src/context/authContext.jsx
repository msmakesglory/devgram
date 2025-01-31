import { createContext, useContext, useState} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useProfileContext  } from "./profileContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { userDetails ,setUserDetails} = useProfileContext();
    const signout = () => {
        console.log(userDetails);
        signOut(auth);
        setUserDetails({});
        console.log(userDetails);
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}
