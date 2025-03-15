import { createContext, useContext } from "react";
import { db } from "../configs/firebase";
import { collection, addDoc } from "firebase/firestore";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const sendNotification = async (userID, message) => {
        try {
            const notificationRef = collection(db, "notifications", userID, "userNotifications"); 
            await addDoc(notificationRef, {
                message: message,
                createdAt: new Date().toISOString(),
                seen: false,  // Can be used to track unread notifications
            });
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    return (
        <NotificationContext.Provider value={{ sendNotification }}>
            { children }
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    return useContext(NotificationContext);
};
