import {useTheme} from "@/context/ThemeContext.js";
import {Button} from "@/components/ui/button.jsx";
import {Moon, Sun} from "@icon-park/react";

export default function ThemeChanger(){
    const {theme,toggleTheme} = useTheme();
    return <>
        <Button onClick={toggleTheme} variant='ghost'>
            {theme === "dark" ? <Moon /> :<Sun />}
        </Button>
    </>
}