import { createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    <AuthContext.Provider value={}>
        {children}
    </AuthContext.Provider>
}

expoert const useAuthContext = () => {
    return useContext(AuthContext);
}
