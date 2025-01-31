import { createContext, useContext} from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import { useProfileContext  } from "./profileContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { userDetails ,setUserDetails} = useProfileContext();

    const handleGoogleLogin = async () => {
        try{
            const loggedUser = await signInWithPopup(auth, googleProvider);
            const user = loggedUser.user;
            if(user){
                setUserDetails({...userDetails, uid: user.uid});
                navigate("/p");
            }
        } catch(error) {
            console.error(error);
        }
    }

    const handleSignout = () => {

        signOut(auth);
        setUserDetails({});
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{handleSignout, handleGoogleLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}
