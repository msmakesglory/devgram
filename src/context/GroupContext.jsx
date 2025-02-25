import { createContext, useContext } from "react";
import { useProfileContext } from "./ProfileContext";
import { db } from "../configs/firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const { userDetails } = useProfileContext();

    const createGroup = async (groupName)  => {
        if(!userDetails.uid) return;
        
        const groupRef = doc(db, "groups", groupName);
        const docSnapshot = await getDoc(groupRef);

        if(docSnapshot.exists()){
            return "group already exists";
        } else {
            await setDoc(groupRef, {
                groupName,
                createdBy: userDetails.uid,
                createdAt: new Date(),
                users: [userDetails?.uid],
            });
        }



    }

    return (
        <GroupContext.Provider value={{ createGroup }} >
            { children }
        </GroupContext.Provider>
    )
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}