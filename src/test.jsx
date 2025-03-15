import { useNotificationContext } from "./context/notificationContext";

const TestComponent = () => {
    const { sendNotification } = useNotificationContext();

    const handleClick = async () => {
        try {
            await sendNotification("weruwgflb3wlufbul3b", "message is message");
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
