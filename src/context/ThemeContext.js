import React, {useContext} from "react";

const ThemeContext = React.createContext({
    theme: "light",
    toggleTheme: () => {},
});

const ThemeProvider = ThemeContext.Provider;
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };