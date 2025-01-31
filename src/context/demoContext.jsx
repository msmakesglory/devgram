import { useContext, createContext, useState} from "react";

const DemoContext =  createContext();

export const DemoProvider = ({ children }) => {
    const [title, setTitle] = useState("varma");

    return (
        < DemoContext.Provider value={{ title, setTitle }} >
            { children }
        </DemoContext.Provider>
    )
}

export const useDemoContext = () => {
    return useContext(DemoContext);
}