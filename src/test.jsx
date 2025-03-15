import { useNotificationContext } from "./context/notificationContext";
import { useEffect } from "react";
import { useProfileContext } from "./context/ProfileContext";


const TestComponent = () => {
    const { sendNotification, fetchNotifications, notifications } = useNotificationContext();
    const {userDetails} = useProfileContext();

    useEffect(() => {
        fetchNotifications(userDetails?.uid);
    }, [userDetails?.uid]);

    const handleClick = async () => {
        try {
            await sendNotification(userDetails?.uid, "testing msg");
            alert("Notification sent successfully!");
        } catch (error) {
            console.error("Failed to send notification:", error);
            alert("Error sending notification. Check the console for details.");
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={handleClick} style={styles.button}>
                Click
            </button>
            <div>
                <h2>Notifications</h2>
                {notifications.length === 0 ? (
                    <p>No notifications</p>
                ) : (
                    <ul>
                        {notifications.map((notif) => (
                            <li key={notif.id}>{notif.message}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

// ✅ CSS styles for centering
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
        width: "100vw",  // Full screen width
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default TestComponent;
