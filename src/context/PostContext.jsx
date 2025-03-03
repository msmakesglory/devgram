import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { useProfileContext } from "./ProfileContext";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const PostContext = createContext();

const getFormattedDate = (daysAgo = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().substring(0, 10); // Format: YYYY-MM-DD
};

export const PostProvider = ({ children }) => {
    const [postsByDate, setPostsByDate] = useState({});
    const [loadedDays, setLoadedDays] = useState(0); // Tracks how many days are loaded
    const { userDetails }  = useProfileContext();

    const addPost = async ( ideaData ) => {
        const date = new Date().toISOString().substring(0, 10);
        const postRef = doc(db, "posts", date, "userPosts" , userDetails?.uid + ideaData?.id);

        await setDoc(postRef, ideaData)

    }

    // Fetch posts for a specific date
    const fetchPostsForDate = async (date) => {
        const postsRef = collection(db, "posts", date, "userPosts");
        const querySnapshot = await getDocs(postsRef);

        if (!querySnapshot.empty) {
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        }
        return [];
    };

    // Fetch today's posts on mount
    useEffect(() => {
        const loadTodayPosts = async () => {
            const today = getFormattedDate(0);
            const todayPosts = await fetchPostsForDate(today);
            setPostsByDate({ [today]: todayPosts });
        };

        loadTodayPosts();
    }, []);

    // Function to load previous day's posts
    const loadPreviousDay = async () => {
        const nextDay = loadedDays + 1;
        if (nextDay > 6) return; // Stop after 7 days

        const date = getFormattedDate(nextDay);
        const olderPosts = await fetchPostsForDate(date);

        setPostsByDate(prev => ({ ...prev, [date]: olderPosts }));
        setLoadedDays(nextDay);
    };

    return (
        <PostContext.Provider value={{ addPost, postsByDate, loadPreviousDay, loadedDays }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    return useContext(PostContext);
};
