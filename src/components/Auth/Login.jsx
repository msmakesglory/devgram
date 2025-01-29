import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {FaDev} from "react-icons/fa";
import {Label} from "@/components/ui/label.jsx";
import {Card} from "@/components/ui/card.jsx";

const SignUp = () => {
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
                                <Input type="email" placeholder="Enter your email" required />
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <div className="flex justify-between">
                                    <a href="#" className="text-sm text-primary hover:underline">
                                        Forgot password
                                    </a>
                                </div>
                                <Button type="submit" className="mt-2 w-full">
                                    Create an account
                                </Button>
                                <Button variant="outline" className="w-full">
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

export default SignUp;
