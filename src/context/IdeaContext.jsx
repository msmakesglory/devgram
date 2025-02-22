import { useContext, createContext, useState, useEffect } from "react";
import { useProfileContext } from "./ProfileContext";
import { collection,  doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import {v4 as uuidv4} from "uuid";



const IdeaContext = createContext();

export const IdeaProvider = ({ children }) => {

    const [ ideas, setIdeas ] = useState([]);
    const { userDetails } = useProfileContext();

    useEffect(() => {
        if (!userDetails?.uid) return;
    
        const fetchIdeas = async () => {
            const ideasRef = collection(db, "ideas", userDetails.uid, "userIdeas");
            const querySnapShot = await getDocs(ideasRef);
            const fetchedIdeas = querySnapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setIdeas(fetchedIdeas);
        };
    
        fetchIdeas().then();
    }, [userDetails]); 
    

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

    const deleteIdea = async (ideaId) => {
        if (!userDetails?.uid) return;

        try {
            const ideaRef = doc(db, "ideas", userDetails.uid, "userIdeas", ideaId);
            await deleteDoc(ideaRef);
            setIdeas((prev) => prev.filter((idea) => idea.id !== ideaId));
        } catch(err){
            console.log("error on deleting idea",err)
        }
    }

    const sortByTitle = (isAsc) => {
        const sortedIdeas = [...ideas].sort((a, b) => 
            isAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        setIdeas(sortedIdeas);
    };
    
    const sortByDate = (isLatest) => {
        const sortedIdeas = [...ideas].sort((a, b) => 
            isLatest ? new Date(b.createdAt) - new Date(a.createdAt) 
                     : new Date(a.createdAt) - new Date(b.createdAt)
        );
        setIdeas(sortedIdeas);
    };
    

    return (
        <IdeaContext.Provider value={{ideas, addIdea, deleteIdea, sortByTitle, sortByDate}}>
            { children }
        </IdeaContext.Provider>
    )
    
}

export const useIdeaContext = () => {
    return useContext(IdeaContext);
}