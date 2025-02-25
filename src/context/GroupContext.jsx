import { createContext, useContext, useState } from "react";
import { useProfileContext } from "./ProfileContext";
import { db } from "../configs/firebase";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {

    const { userDetails } = useProfileContext();
    const [groupDetails, setGroupDetails] = useState(null);

    const createGroup = async (groupName)  => {
        if(!userDetails.uid) return;
        
        const formattedGroupName = groupName.trim().toLowerCase();
        const groupRef = doc(db, "groups", formattedGroupName);
        const docSnapshot = await getDoc(groupRef);

        if(docSnapshot.exists()){
            return "group already exists";
        } else {

            const newGroupData = {
                groupName: formattedGroupName,
                createdBy: userDetails.uid,
                createdAt: new Date(),
            };

            await setDoc(groupRef, newGroupData);
            setGroupDetails(newGroupData)
        }

        const userCollectionRef = collection(groupRef, "users");
        await setDoc(doc(userCollectionRef, userDetails?.uid), {
            uid: userDetails.uid,
            joinedAt: new Date(),
        });

        const ideasCollectionRef = collection(groupRef, "ideas");
        await setDoc(doc(ideasCollectionRef, "placeholder"), {
            content: "This is a placeholder idea. Delete this when adding new ideas.",
        });
        return "Group Created Successfully";

    }

    const joinGroup = async (groupName) => {
        if (!userDetails?.uid) return "User not logged in";
    
        const formattedGroupName = groupName.trim().toLowerCase();
        const groupRef = doc(db, "groups", formattedGroupName);
        const userRef = doc(db, "groups", formattedGroupName, "users", userDetails.uid);
    
        const groupSnapshot = await getDoc(groupRef);
        const userSnapshot = await getDoc(userRef);
    
        if (!groupSnapshot.exists()) {
            return "Group does not exist";
        }
    
        if (userSnapshot.exists()) {
            return "Already a member in the group";
        }
    
        await setDoc(userRef, {
            uid: userDetails.uid,
            joinedAt: new Date(),
        });
    
        return "Successfully joined the group";
    };
    
    
    

    return (
        <GroupContext.Provider value={{ groupDetails, setGroupDetails, createGroup, joinGroup }} >
            { children }
        </GroupContext.Provider>
    )
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}