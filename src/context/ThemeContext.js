import React, {useContext} from "react";

const ThemeContext = React.createContext({
    theme: "dark",
    toggleTheme: () => {},
});

const ThemeProvider = ThemeContext.Provider;
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };