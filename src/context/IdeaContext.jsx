import { useContext, createContext, useState, useEffect } from "react";
import { useProfileContext } from "./ProfileContext";
import { collection, query, where, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import {v4 as uuidv4} from "uuid";


const IdeaContext = createContext();

export const IdeaProvider = ({ children }) => {

    const [ ideas, setIdeas ] = useState([]);
    const { userDetails } = useProfileContext();

    useEffect( () => {
        if(!userDetails?.uid) return ;
        const fetchIdeas = async () => {
            const ideasRef = collection(db, "ideas");
            const q = query(ideasRef, where("uid", "==", userDetails?.uid));
            const querySnapShot = await getDocs(q);
            const fetchedIdeas = querySnapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setIdeas(fetchedIdeas);
        };
        fetchIdeas();
    }, [userDetails?.uid]);

    const generateUniqueIdeaId = async () => {
        let ideaId, docSnap;

        do {
            ideaId = userDetails.uid + uuidv4();
            const ideaRef = doc(db, "ideas", userDetails.uid, "userIdeas", ideaId);
            docSnap = await getDoc(ideaRef);
        } while(docSnap.exists());

        return ideaId;
    }

    const addIdea = async ( ideaData ) => {
        if (!userDetails?.uid) return;

        const ideaId = await generateUniqueIdeaId();
        const ideaRef = doc(db, "ideas", userDetails.uid, "userIdeas", ideaId);

        const newIdea = {
            id: ideaId,
            creator: userDetails.fullName,
            title: ideaData.title,
            description: ideaData.description,
            tags: ideaData.tags || [],
            requiredPeople: ideaData.requiredPeople,
            status: ideaData.status,
            createdAt: new Date().toISOString()
        };

        await setDoc(ideaRef, newIdea);
        setIdeas((prev) => [...prev, newIdea]);

    }


    return (
        <IdeaContext.Provider value={{ideas, addIdea}}>
            { children }
        </IdeaContext.Provider>
    )
    
}

export const useIdeaContext = () => {
    return useContext(IdeaContext);
}