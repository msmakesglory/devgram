import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/configs/firebase";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/components/images/logo.png";

// Zod Schema for Validation
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
    const navigate = useNavigate();

    // useForm Hook with Zod Validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // Handle Login
    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            localStorage.setItem("user", JSON.stringify(userCredential.user));
            alert("Login successful! Redirecting...");
            navigate("/profile");
        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials.");
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/profile");
        } catch (error) {
            console.error(error);   
        }
    };

    return (
        <Card className="w-[400px] mx-auto mt-4 p-6">
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
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Forgot Password & Login Button */}
                <div className="flex justify-between">
                    <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>
                <Button type="submit" className="w-full">
                    Sign in
                </Button>

                {/* Google Sign-In */}
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                    <FcGoogle className="mr-2 size-5" />
                    Sign in with Google
                </Button>
            </form>

            {/* Signup Link */}
            <div className="mt-6 text-center text-sm">
                Don&apos;t have an account?
                <Link to="/signup" className="text-primary hover:underline ml-1">
                    Sign up
                </Link>
            </div>
        </Card>
    );
}
