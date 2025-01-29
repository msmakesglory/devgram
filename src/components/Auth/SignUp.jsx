import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaDev } from "react-icons/fa";
import {Card} from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label";
import { auth,  googleProvider } from "../../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
        const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const handlesignup = async () => {
            try{
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account Created successfully redirects to login");
                navigate("/login")

            } catch(err) {
                console.error(err);
            }
        }
        const handleGoogleLogin = async () => {
            try {
                await signInWithPopup(auth, googleProvider);
                navigate("/profile")
            } catch (err) {
                console.error(err);
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
                                <Input
                                       type="email" 
                                       placeholder="Enter your email"  
                                       onChange = {(e) =>  setEmail(e.target.value)} 
                                       required/>
                                <div>
                                <Label>Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        onChange = {(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    onClick={handlesignup}
                                >
                                    Create an account
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleGoogleLogin}
                                >
                                    <FcGoogle className="mr-2 size-5" />
                                    Sign up with Google
                                </Button>
                            </div>
                            <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                                <p>Already have an account?</p>
                                <a href="#" className="text-primary hover:underline">
                                    LogIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SignUp;
{/*<div className="flex justify-between">*/}
{/*    <div className="flex items-center space-x-2">*/}
{/*        <Checkbox*/}
{/*            id="remember"*/}
{/*            className="border-muted-foreground"*/}
{/*        />*/}
{/*        <label*/}
{/*            htmlFor="remember"*/}
{/*            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
{/*        >*/}
{/*            Remember me*/}
{/*        </label>*/}
{/*    </div>*/}
{/*    <a href="#" className="text-sm text-primary hover:underline">*/}
{/*        Forgot password*/}
{/*    </a>*/}
// </div>
