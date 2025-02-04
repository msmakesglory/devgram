import {ThemeProvider, useTheme} from "@/context/ThemeContext.js";
import {Button} from "@/components/ui/button.jsx";
import {Moon, Sun} from "@icon-park/react";
import React, {useCallback, useEffect} from "react";

export default function ThemeChanger(){
    const [theme,setTheme] = React.useState("dark");

     
    const toggleTheme = useCallback(()=>{
        if(theme === "light"){
            setTheme("dark");
        }else {
            setTheme("light");
        }
    })
    useEffect(() => {
        console.log("theme changed to ",theme)
        document.querySelector("html").classList.remove("light","dark");
        document.querySelector("html").classList.add(theme);
    },[theme, toggleTheme])
    return <ThemeProvider value={{theme,toggleTheme}}>
        <Button onClick={toggleTheme} variant='ghost'>
            {theme === "dark" ? <Moon /> :<Sun />}
        </Button>
    </ThemeProvider>
}