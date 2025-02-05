import { useContext, createContext, useState } from "react";
import {db} from "../configs/firebase"
import { doc, updateDoc } from "firebase/firestore";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});

    const updateSingleField = async (field, value) => {
        if(!userDetails?.uid) {
            return;
        }
        const userRef = doc(db, "users", userDetails.uid);
        try {
            await updateDoc(userRef, { [field] : value});
            setUserDetails((prevData) => ({...prevData, [field] : value}));
        } catch (err) {
            console.log("Error updating the field:",err);
        }
    }
    

    return (
        <ProfileContext.Provider value={{userDetails, setUserDetails, updateSingleField}}>
            { children }
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    return useContext(ProfileContext);
}