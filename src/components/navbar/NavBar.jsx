
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
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import extractUsername from "@/components/utils/util.js";

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
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Link to="/">
                                <img src={logo} className="w-28 dark:invert" alt="logo" />
                            </Link>
                        </div>
                        <div className="flex items-center">
                            {/* Additional items can be added here */}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!userlogged ? (
                            <>
                                <Button variant="outline">
                                    <Link to='/login'>Sign in</Link>
                                </Button>
                                <Button>
                                    <Link to='/signup'>Sign Up</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate(`/p/${userlogged}`)}>
                                    Profile
                                </Button>
                                <Button onClick={handleSignout}>
                                    Sign Out
                                </Button>
                            </>
                        )}
                        <ThemeProvider>
                            <ModeToggle />
                        </ThemeProvider>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <img src={logo} className="w-20 dark:invert" alt="logo" />
                        </Link>
                            <div className="space-x-2 flex items-center">
                                <ThemeProvider>
                                    <ModeToggle />
                                </ThemeProvider>
                                {userlogged
                                    ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src={userDetails.github ?`https://github.com/${extractUsername(userDetails.github)}.png` : `https://github.com/shadcn.png`}/>
                                            <AvatarFallback>UN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{userDetails.fullName}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Groups</DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to={`/p/${userDetails.uid}`}>
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onSelect={handleSignout}
                                        >
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                    :
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar>
                                                <AvatarImage src={userDetails.github ?`https://github.com/${extractUsername(userDetails.github)}.png` : `https://github.com/shadcn.png`}/>
                                                <AvatarFallback>UN</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to='/login'>Sign in</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link to='/signup'>Sign Up</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }

                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
