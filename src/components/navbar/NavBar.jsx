import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { CiLight } from "react-icons/ci";
import logo from "@/components/images/logo.png"
import { Button } from "@/components/ui/button.jsx";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.jsx";
import {Link} from "react-router-dom";
import {ThemeProvider, useTheme} from "@/context/ThemeContext.js";
import ThemeChanger from "@/components/navbar/Theme.jsx";
import React, {useEffect} from "react";
import {Separator} from "@/components/ui/separator.jsx";
const Navbar = () => {
    const [theme,setTheme] = React.useState("dark");

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

    return (
        <ThemeProvider value={{theme,toggleTheme}}>
            
        <section className="py-4 px-4 lg:px-16 fixed top-0 left-0 right-0">
            <div className="container">
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Link to="/">
                                <img src={logo} className="w-28 dark:invert" alt="logo"/>
                            </Link>
                        </div>
                        <div className="flex items-center">

                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Link to='/login'>Login</Link>
                        </Button>
                        <Button>
                            <Link to='/signup'>Sign Up</Link>
                        </Button>
                        <ThemeChanger/>
                    </div>
                </nav>
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <img src={logo} className="w-20 dark:invert" alt="logo"/>
                        </Link>
                        <div className="flex items-center gap-2">
                        </div>
                        <Sheet>
                            <div>
                                <ThemeChanger/>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                            </div>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className="flex flex-col items-center gap-2">
                                            <img
                                                src={logo}
                                                className="w-20 dark:invert"
                                                alt="logo"
                                            />
                                            <span className="text-lg font-semibold mt-3">DevGram.com</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" >
                                        <Link to='/login'>Login</Link>
                                    </Button>
                                    <Button>
                                        <Link to='/signup'>Sign Up</Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
            <Separator />
        </ThemeProvider>
    );
};

export default Navbar;
