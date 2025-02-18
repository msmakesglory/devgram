import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label";
import logo from "./../images/logo.png";
import { useAuthContext } from "../../context/authContext";
import {Link} from "react-router-dom";
import { useState } from "react";

// Define Zod schema
const signUpSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(20, { message: "Password must be at most 20 characters long" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export default function SignUp() {
    const { handleGoogleLogin, handleCreateUser, handleGitHubLogin } = useAuthContext(); 
    const [ showPassword, setShowPassword ] = useState(false);

    // useForm with Zod validation 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    // Handle sign-up
    const handleOnSubmit = async (data) => {
        console.log("Submitting form data:", data);
        const errorMessage = await handleCreateUser(data);

        if (errorMessage) {
            alert(errorMessage);
        } else {
            console.log("User created successfully!");
        }
    };





    return (
        <Card className="w-[400px] mx-auto mt-4 p-6">
            <div className="flex flex-col items-center">
                <img src={logo} alt="logo" className="h-8 dark:invert" />
                <p className="mb-4 text-2xl font-bold">devgram.com</p>
            </div>

            <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <Label>Password</Label>
                    <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="w-full pr-10 mt-1"
                        {...register("password")} 
                    />
                    <button 
                        type="button" 
                        className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                
                

                {/* Confirm Password */}
                <div className="relative">
                    <Label>Confirm Password</Label>
                    <Input 
                        type={showPassword?"text":"password"}
                        placeholder="Confirm your password"
                        {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    <button 
                        type="button" 
                        className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-2 w-full">
                    Create an account
                </Button>

                {/* Google Sign-in */}
            </form>
            <div className="w-full mt-2">
                    <Button variant="outline" className="w-full mt-2" onClick={handleGoogleLogin}>
                        <FcGoogle className="mr-2 size-5" />
                        Sign in with Google
                    </Button>

                    <Button variant="outline" className="w-full mt-2" onClick={handleGitHubLogin}>
                        <FaGithub className="mr-2 size-5" />
                        Sign in with GitHub
                    </Button>
            </div>

            <div className="mt-6 text-center text-sm">
                Already have an account?
                <Link to="/login" className="text-primary underline ml-1">Log In</Link>
            </div>
        </Card>
    );
}
