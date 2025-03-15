import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../configs/firebase";
import { doc, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useProfileContext } from "./ProfileContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, userID }) => {
    const [notifications, setNotifications] = useState([]);
    const {userDetails} = useProfileContext();

    // Function to send notification
    const sendNotification = async (userID, message) => {
        try {
            const userDoc = doc(db, "notifications", userID);
            const notificationRef = collection(userDoc, "userNotifications");
            const notificationDoc = await addDoc(notificationRef, {
                message,
                createdAt: new Date().toISOString(),
                seen: false, 
            });
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    // Function to fetch notifications
    const fetchNotifications = async () => {
        try {
            const userDoc = doc(db, "notifications", userDetails?.uid);
            const notificationRef = collection(userDoc, "userNotifications");
            const querySnapshot = await getDocs(notificationRef);
            
            const fetchedNotifications = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setNotifications(fetchedNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Real-time listener for notifications
    useEffect(() => {
        if (!userDetails?.uid) return;

        const userDoc = doc(db, "notifications", userDetails?.uid);
        const notificationRef = collection(userDoc, "userNotifications");

        const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
            const liveNotifications = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(liveNotifications);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [userDetails?.uid]);

    return (
        <NotificationContext.Provider value={{ sendNotification, fetchNotifications, notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    return useContext(NotificationContext);
};
