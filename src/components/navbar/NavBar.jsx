
import logo from "@/components/images/logo.png";
import { Button } from "@/components/ui/button.jsx";

import { Link, useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";
import {ModeToggle} from "@/components/ModeToggle.jsx";
import {ThemeProvider} from "@/context/ThemeProvider.jsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import extractUsername from "@/components/utils/util.js";
import {User} from "@icon-park/react";
import {BellDot, LogIn, LogOut, Users, UserX} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import Component from "@/components/navbar/Notifications.jsx";

const Navbar = () => {
    const { userDetails } = useProfileContext();
    const userlogged = userDetails.uid;
    const navigate = useNavigate();
    const { handleSignout } = useAuthContext();

    return (
        <section
            className="py-4 px-4 lg:px-16 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-black/10 shadow-md"
        >
            <div className="container">
                {/* Desktop Navigation */}
                <nav className="justify-between flex">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Link to="/">
                                <img src={logo} className="w-28 dark:invert" alt="logo" />
                            </Link>
                        </div>
                        <div className="hidden">
                            <ThemeProvider>
                                <ModeToggle />
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Component/>
                        <div>
                            {!userlogged ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src={''}/>
                                            <AvatarFallback><User/></AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <LogIn/>
                                            <Link to={`/login`}>
                                                Sign in
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <ThemeProvider>
                                            <ModeToggle/>
                                        </ThemeProvider>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={userDetails.github ? `https://github.com/${extractUsername(userDetails.github)}.png` : `https://github.com/shadcn.png`}/>
                                            <AvatarFallback><User/></AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{userDetails.fullName}</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <Users/>
                                            <Link to={`/home`}>
                                                Groups
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <User/>
                                            <Link to={`/p/${userDetails.uid}`}>
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem
                                            onSelect={handleSignout}
                                        >
                                            <LogOut/>Sign Out
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                        >
                                            <UserX/>Delete Account
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <ThemeProvider>
                                            <ModeToggle/>
                                        </ThemeProvider>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>

                    </div>
                </nav>
            </div>
        </section>
    );
};

export default Navbar;
