import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/components/images/logo.png";
import { useAuthContext } from "../../context/authContext";
import { useState } from "react";

// Zod Schema for Validation
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
    // const navigate = useNavigate();
    const { handleGoogleLogin, handleEmailPassWordLogin, handleGitHubLogin} = useAuthContext();
    const [showPassword, setShowPassword] = useState(false); 

    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        handleEmailPassWordLogin(data);
    };


    return (
        <div className="pt-20">
            <Card className="w-[400px] mx-auto p-6">
                {/* Logo & Heading */}
                <div className="flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-8 dark:invert" />
                    <p className="mb-4 text-2xl font-bold">devgram.com</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}

                    <div className="relative">
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </Label>
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

                    {/* Forgot Password & Login Button */}
                    <div className="flex justify-between">
                        <a href="/forgotpassword" className="text-blue-400 hover:underline text-sm">
                            Forgot Password?
                        </a>
                    </div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>

                </form>
                {/* Google Sign-In and GitHub Sign-In */}
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

                {/* Signup Link */}
                <div className="mt-6 text-center text-sm">
                    Don&apos;t have an account?
                    <Link to="/signup" className="text-primary underline ml-1">
                        Sign up
                    </Link>
                </div>
            </Card>
        </div>
    );
}
