import { createContext, useContext, useState} from "react";


const NameContext = createContext();

export const MyNameProvider = ({children}) => {
    const [name, setName] = useState("Varma");

    return (
        <NameContext.Provider value={{ name, setName }}>
            { children }
        </NameContext.Provider>
    )
}

export const useMyNameContext = () => {
    return useContext(NameContext);
}