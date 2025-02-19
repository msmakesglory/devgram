import { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { auth, googleProvider, db, gitHubProvider } from "../configs/firebase";
import { useProfileContext } from "./ProfileContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { setUserDetails } = useProfileContext();
    const { toast } = useToast();

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
            if(user){
                await handleUserAuthentication(user);
            } else {
                setUserDetails({});
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            const loggedUser = await signInWithPopup(auth, googleProvider);
            const user = loggedUser.user;
            if (user) {
                await handleUserAuthentication(user);
                toast({
                    title: "Logged in successfully",
                    description: "redirecting to home"
                })
                navigate(`/p/${user.uid}`);
            }
        } catch (err) {
            toast({
                variant: "destructive",
                description: <b>Error while Login</b>,
                action: <ToastAction altText="Try again" onClick={()=>{navigate('/login')}}>Try again</ToastAction>
            })
            console.error(err);
        }
    };

    const handleGitHubLogin = async () => {
        try {
            const loggedUser = await signInWithPopup(auth, gitHubProvider);
            const user = loggedUser.user;
            if (user) {
                await handleUserAuthentication(user);
                toast({
                    title: "Logged in successfully",
                    description: "redirecting to home"
                })
                navigate(`/p/${user.uid}`);
            }
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                description: <b>Error while Login</b>,
                action: <ToastAction altText="Try again" onClick={()=>{navigate('/login')}}>Try again</ToastAction>
            })
        }
    }

    const handleEmailPassWordLogin = async (formData) => {
        try {
            const loggedUser = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = loggedUser.user;
            if (user) {
                await handleUserAuthentication(user);
                toast({
                    title: "Logged in successfully",
                    description: "redirecting to home"
                })
                navigate(`/p/${user.uid}`);
            }
        } catch (err) {
            console.error(err);
            toast({
                variant: "destructive",
                description: <b>Error while Login</b>,
                action: <ToastAction altText="Try again" onClick={()=>{navigate('/login')}}>Try again</ToastAction>
            })
        }
    };

    const handleCreateUser = async (data) => {
        console.log("Creating user...");
        try {
            const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = newUser.user;
            await handleUserAuthentication(user);
            toast({
                title: "Account Created successfully",
                description: "redirecting to home"
            })
            navigate(`/p/${user.uid}`);
            return null;
        } catch (err) {
            console.error("Signup error:", err.message);
            toast({
                variant: "destructive",
                description:<b>Error while signup</b>,
                action: <ToastAction altText="Try again" onClick={()=>{navigate('/signup')}}>Try again</ToastAction>
            })
            return err.message;
        }
    };

    const handleSignout = async () => {
        await signOut(auth);
        setUserDetails({});
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ handleSignout, handleGoogleLogin, handleEmailPassWordLogin, handleCreateUser, handleGitHubLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
