import { createContext, useContext} from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
                setUserDetails({...userDetails, uid: user.uid, mail: auth.currentUser.email});
                navigate(`/p/${user.uid}`);
            }
        } catch(err) {
            console.error(err);
        }
    }
    
    const handleEmailPassWordLogin = async ( formData ) => {
        try {
        const loggedUser = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = loggedUser.user;
            if(user){
                setUserDetails({...userDetails, uid: user.uid, mail: auth.currentUser.email});
                navigate(`/p/${user.uid}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleCreateUser = async (data) => {
        console.log("Creating user..."); // Debug log
        try {
            const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = newUser.user;
            setUserDetails({...userDetails, uid: user.uid, mail: auth.currentUser.email});
            navigate(`/p/${user.uid}`);
            return null; // Return null if no errors
        } catch (err) {
            console.error("Signup error:", err.message);
            return err.message; // Return error message
        }
    };


    const handleSignout = async () => {

        await signOut(auth);
        setUserDetails({});
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{handleSignout, handleGoogleLogin, handleEmailPassWordLogin, handleCreateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}
