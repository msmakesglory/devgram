import {ThemeProvider, useTheme} from "@/context/ThemeContext.js";
import {Button} from "@/components/ui/button.jsx";
import {Moon, Sun} from "@icon-park/react";
import React, {useEffect} from "react";

export default function ThemeChanger(){
    const [theme,setTheme] = React.useState("light");

    const toggleTheme = ()=>{
        if(theme === "light"){
            setTheme("dark");
        }else {
            setTheme("light");
        }
    }
    useEffect(() => {
        document.querySelector("html").classList.remove("light","dark");
        document.querySelector("html").classList.add(theme);
    },[theme, toggleTheme])
    return <ThemeProvider value={{theme,toggleTheme}}>
        <Button onClick={toggleTheme} variant='ghost'>
            {theme === "dark" ? <Moon /> :<Sun />}
        </Button>
    </ThemeProvider>
}