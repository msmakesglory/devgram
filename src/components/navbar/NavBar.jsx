import { Menu } from "lucide-react";
// import { CiLight } from "react-icons/ci";
import logo from "@/components/images/logo.png";
import ThemeChanger from "@/components/navbar/Theme.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";

const Navbar = () => {
    const { userDetails } = useProfileContext();
    const userlogged = userDetails.uid;
    const navigate = useNavigate();
    const { handleSignout } = useAuthContext();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleSheetClose = () => {
        setIsSheetOpen(false);
    };

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
                        <ThemeChanger />
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <img src={logo} className="w-20 dark:invert" alt="logo" />
                        </Link>
                        <div className="flex items-center gap-2">
                            {/* Additional items can be added here */}
                        </div>
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <div>
                                <ThemeChanger />
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => setIsSheetOpen(true)}>
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
                                    {(userlogged === undefined || userlogged === null) ? (
                                        <>
                                            <Link to='/login'>
                                                <Button variant="outline" className="w-full" onClick={handleSheetClose}>
                                                    Sign in
                                                </Button>
                                            </Link>
                                            <Link to='/signup'>
                                                <Button className="w-full" onClick={handleSheetClose}>
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => { navigate(`/p/${userlogged}`); handleSheetClose(); }}>
                                                Profile
                                            </Button>
                                            <Button onClick={() => { handleSignout(); handleSheetClose(); }}>
                                                Sign Out
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
