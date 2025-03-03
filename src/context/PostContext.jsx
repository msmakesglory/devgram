import { useState, useContext, createContext} from "react";
import { db } from "../configs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useProfileContext } from "./ProfileContext";

const PostContext = createContext();

export const PostProvider =  ({ children }) => {

    const { userDetails }  = useProfileContext();

    const addPost = async ( ideaData ) => {
        const date = new Date().toISOString().substring(0, 10);
        const postRef = doc(db, "posts", date, "userPosts" ,userDetails?.uid);

        await setDoc(postRef, ideaData)

    }

    return (
        <PostContext.Provider value={{ addPost }}>
            { children }
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    return useContext(PostContext)
}