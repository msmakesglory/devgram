import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { useProfileContext } from "./ProfileContext";
import { doc, setDoc, collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";

const PostContext = createContext();

const pageSize = 10;
const postFetchLimit = 15;

const getFormattedDate = (daysAgo = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().substring(0, 10);
}

export const PostProvider = ({ children }) => {

    const { userDetails } = useProfileContext();
    const [postsByDate, setPostByDate] = useState({});
    const [lastDocByDate, setLastDocByDate] = useState({});
    const [loadedDays, setLoadedDays] = useState(0); 
    
    // function to add post 
    const addPost = async (ideaData) => {
        const date = getFormattedDate(0);
        const postRef = doc(db, "posts", date, "userPosts", userDetails?.uid + ideaData?.id);
        await setDoc(postRef, ideaData);
    }

    const fetchPostsForDate = async (date, lastDoc = null) => {

        let q = query(
            collection(db, "posts", date, "userPosts"),
            orderBy("createdAt", "desc"),
            limit(pageSize)
        );

        if(lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const snapshot = await getDocs(q);

        if(!snapshot.empty){
            return {
                posts: snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })),
                lastDoc: snapshot.docs[snapshot.docs.length - 1]
            }
        }
        return { posts: [], lastDoc: null};
    }

    useEffect(() => {
        const loadTodayPosts = async () => {
            const today = getFormattedDate(0);
            const { posts, lastDoc} = await fetchPostsForDate(today);
            setPostByDate({[today]: posts});
            setLastDocByDate({ [today]: lastDoc});
        };
        loadTodayPosts();
    }, []);


    const loadMorePostsForDay = async (date) => {
        const lastDoc = lastDocByDate[date];
        if(!lastDoc) return false;

        const { posts, lastDoc: newLastDoc } = await fetchPostsForDate(date, lastDoc);
        setPostByDate(prev => ({...prev, [date]: [...prev[date], ...posts]}));
        setLastDocByDate(prev => ({ ...prev, [date]: newLastDoc }));

        return posts.length > 0;
    };

    const loadPreviousDay = async () => {
        let nextDay = loadedDays + 1;
        if(nextDay > postFetchLimit) return;

        let date = getFormattedDate(nextDay);

        const currentDate = getFormattedDate(loadedDays);
        const morePostsAvailable = await loadMorePostsForDay(currentDate);
        if (morePostsAvailable) return;

        const { posts, lastDoc} = await fetchPostsForDate(date);
        setPostByDate(prev => ({ ...prev, [date]: posts }));
        setLastDocByDate(prev => ({ ...prev, [date]: lastDoc }));
        setLoadedDays(nextDay);
    }

    return (
        <PostContext.Provider value={{addPost, postsByDate, loadPreviousDay, loadedDays}}>
            { children }
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    return useContext(PostContext);
};