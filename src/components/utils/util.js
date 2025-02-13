const extractUsername = (url) => {
    try {
        const parsedUrl = new URL(url);
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

        if (parsedUrl.hostname.includes("linkedin.com") && pathSegments[0] === "in") {
            return pathSegments[1] || null; // LinkedIn username
        }

        if (parsedUrl.hostname.includes("github.com")) {
            return pathSegments[0] || null; // GitHub username
        }

        return null; // Not a valid LinkedIn or GitHub profile URL
    } catch (error) {
        console.error(error)
        return null; // Invalid URL format
    }
};
export default extractUsername;