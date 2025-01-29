import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label";
import { auth, googleProvider } from "../../configs/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "./../images/logo.png";

// Define Zod schema
const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
});

export default function SignUp() {
    const navigate = useNavigate();

    // useForm with Zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    // Handle sign-up
    const onSubmit = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            alert("Account Created Successfully! Redirecting to login...");
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/profile");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="w-[400px] mx-auto mt-4 p-6">
            <div className="flex flex-col items-center">
                <img src={logo} alt="logo" className="h-8 dark:invert" />
                <p className="mb-4 text-2xl font-bold">devgram.com</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter your password" {...register("password")} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-2 w-full">
                    Create an account
                </Button>

                {/* Google Sign-in */}
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                    <FcGoogle className="mr-2 size-5" />
                    Sign in with Google
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                Already have an account?
                <a href="/login" className="text-primary hover:underline ml-1">Log In</a>
            </div>
        </Card>
    );
}
