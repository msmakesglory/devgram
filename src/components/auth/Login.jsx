import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {FaDev} from "react-icons/fa";
import {Label} from "@/components/ui/label.jsx";
import {Card} from "@/components/ui/card.jsx";
import { signInWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "@/configs/firebase.js";
import {Link, useNavigate} from "react-router-dom";
import logo from "@/components/images/logo.png";

export default function Login(){

    const navigate = useNavigate()  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin  = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            alert("login successfully");
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/profile")
        } catch (error) {
            alert("error on login")
            console.error(error)
        }
    }
    
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card className="w-[400px] mx-auto mt-4">
            <div className="container">
                <div className="flex flex-col gap-4">
                    <div className="mx-auto w-full max-w-sm rounded-md p-6">
                        <div className="mb-6 flex flex-col items-center">
                            <img src={logo} alt="ok" className={'h-8 dark:invert'}/>
                            <p className="mb-2 text-2xl font-bold">devgram.com</p>
                        </div>
                        <div>
                        <div className="grid gap-4">
                                <Label htmlFor='email'>Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" required
                                 onChange={(e) => setEmail(e.target.value)} />
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="flex justify-between">
                                    <a href="#" className="text-sm text-primary hover:underline">
                                        Forgot password
                                    </a>
                                </div>
                                <Button type="submit" className="mt-2 w-full" onClick={handleLogin}>
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                                    <FcGoogle className="mr-2 size-5" />
                                    Sign In with Google
                                </Button>
                            </div>
                            <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                                <p>Don&apos;t have an account?</p>
                                <Link to="/signup" className="text-primary hover:underline">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

