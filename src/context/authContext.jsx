import { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { auth, googleProvider, db } from "../configs/firebase";
import { useProfileContext } from "./profileContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { userDetails, setUserDetails } = useProfileContext();

    const handleUserAuthentication = async (user) => {
        if (!user) {
            setUserDetails({});
            return;
        }
    
        const userRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userRef);
    
        if (!docSnapshot.exists()) {
            const defaultData = {
                fullName: null,
                uid: user.uid,
                mail: user.email,
                age: null,
                gender: null,
                location: null,
                summary: null,
                website: null,
                linkedIn: null,
                github: null,
                work: null,
                education: null,
                skills: null
            };
    
            await setDoc(userRef, defaultData);
            setUserDetails(defaultData);
        } else {
            setUserDetails({ uid: user.uid, mail: user.email, ...docSnapshot.data() });
        }
    };
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            await handleUserAuthentication(user);
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            const loggedUser = await signInWithPopup(auth, googleProvider);
            const user = loggedUser.user;
            if (user) {
                await handleUserAuthentication(user);
                navigate(`/p/${user.uid}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEmailPassWordLogin = async (formData) => {
        try {
            const loggedUser = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = loggedUser.user;
            if (user) {
                await handleUserAuthentication(user);
                navigate(`/p/${user.uid}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateUser = async (data) => {
        console.log("Creating user...");
        try {
            const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = newUser.user;
            await handleUserAuthentication(user);
            navigate(`/p/${user.uid}`);
            return null;
        } catch (err) {
            console.error("Signup error:", err.message);
            return err.message;
        }
    };

    const handleSignout = async () => {
        await signOut(auth);
        setUserDetails({});
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ handleSignout, handleGoogleLogin, handleEmailPassWordLogin, handleCreateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
