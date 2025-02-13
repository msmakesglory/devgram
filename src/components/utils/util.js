const extractUsername = (url) => {
    try {
        if (!url || typeof url !== "string" || !url.startsWith("http")) {
            return "Not Available"; // Return a default value
        }

        const parsedUrl = new URL(url);
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

        if (parsedUrl.hostname.includes("linkedin.com") && pathSegments[0] === "in") {
            return pathSegments[1] || "Not Available"; // LinkedIn username
        }

        if (parsedUrl.hostname.includes("github.com")) {
            return pathSegments[0] || "Not Available"; // GitHub username
        }

        return "Not Available"; // Not a valid LinkedIn or GitHub profile URL
    } catch (error) {
        console.error("Invalid URL:", error);
        return "Not Available"; // Invalid URL format
    }
};

export default extractUsername;
