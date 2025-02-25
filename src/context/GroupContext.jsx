import { createContext, useContext, useState, useEffect } from "react";
import { useProfileContext } from "./ProfileContext";
import { db } from "../configs/firebase";
import {collection, doc, getDoc, setDoc, deleteDoc} from "firebase/firestore";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {

    
    const { userDetails } = useProfileContext();
    const [groupDetails, setGroupDetails] = useState({});

    useEffect(() => {
        console.log(groupDetails);
    }, [groupDetails]);


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
            setGroupDetails((prev) => ({
                ...prev,
                groupNames: [...(prev.groupNames || []), newGroupData.groupName]
            }));
            console.log(groupDetails);
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

        setGroupDetails((prev) => ({
            ...prev,
            groupNames: [...(prev.groupNames || []), groupName]
        }));

            
        return "Successfully joined the group";
    };
    

    const removeUserFromGroup = async (groupName) => {
        if (!userDetails?.uid) return "User not authenticated";
    
        const formattedGroupName = groupName.trim().toLowerCase();
        const groupRef = doc(db, "groups", formattedGroupName);
        const userDocRef = doc(collection(groupRef, "users"), userDetails.uid);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (!userDocSnapshot.exists()) {
            return "User not found in group";
        }
    
    
     
        await deleteDoc(userDocRef);
    
     
        setGroupDetails((prev) => ({
            ...prev,
            groupNames: prev.groupNames.filter(name => name !== formattedGroupName) 
        }));
    
        return "User removed successfully";
    };
    
    
    

    return (
        <GroupContext.Provider value={{ groupDetails, setGroupDetails, createGroup, joinGroup, removeUserFromGroup }} >
            { children }
        </GroupContext.Provider>
    )
}

export const useGroupContext = () => {
    return useContext(GroupContext);
}