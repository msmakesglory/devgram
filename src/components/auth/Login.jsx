import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/components/images/logo.png";
import { useAuthContext } from "../../context/authContext";

// Zod Schema for Validation
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
    // const navigate = useNavigate();
    const { handleGoogleLogin, handleEmailPassWordLogin } = useAuthContext(); 

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
                <a href="/forgotpassword" className="text-blue-400 hover:underline text-sm">
                    Forgot Password?
                </a>
                </div>
                <Button type="submit" className="w-full">
                    Sign in
                </Button>

            </form>
                {/* Google Sign-In */}
                <Button variant="outline" className="w-full mt-2" onClick={handleGoogleLogin}>
                    <FcGoogle className="mr-2 size-5" />
                    Sign in with Google
                </Button>

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
