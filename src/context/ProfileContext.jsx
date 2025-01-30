import { useContext, createContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});

    return (
        <ProfileContext.Provider value={{userDetails, setUserDetails}}>
            { children }
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    return useContext(ProfileContext);
}