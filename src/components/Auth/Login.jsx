import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {FaDev} from "react-icons/fa";
import {Label} from "@/components/ui/label.jsx";
import {Card} from "@/components/ui/card.jsx";
import { signInWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../../configs/firebase";
import { useNavigate } from "react-router-dom"; 

const Login = () => {

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
                    <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
                        <div className="mb-6 flex flex-col items-center">
                            <FaDev className='size-12'/>
                            <p className="mb-2 text-2xl font-bold">devgram.com</p>
                        </div>
                        <div>
                            <div className="grid gap-4">
                                <Label>Email</Label>
                                <Input type="email" placeholder="Enter your email" required
                                 onChange={(e) => setEmail(e.target.value)} />
                                <Label>Password</Label>
                                <Input
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
                                    Sign up with Google
                                </Button>
                            </div>
                            <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                                <p>Don&apos;t have an account?</p>
                                <a href="#" className="text-primary hover:underline">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Login;
