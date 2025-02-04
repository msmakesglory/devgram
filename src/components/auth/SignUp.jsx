import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label";
import logo from "./../images/logo.png";
import { useAuthContext } from "../../context/authContext";
import {Link} from "react-router-dom";

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
    const { handleGoogleLogin, handleCreateUser } = useAuthContext(); 
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
        console.log("Submitting form data:", data); // Debug log
        const errorMessage = await handleCreateUser(data);

        if (errorMessage) {
            alert(errorMessage); // Display Firebase error
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
                <div>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter your password" {...register("password")} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="Confirm your password" {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-2 w-full">
                    Create an account
                </Button>

                {/* Google Sign-in */}
            </form>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                <FcGoogle className="mr-2 size-5" />
                Sign in with Google
            </Button>

            <div className="mt-6 text-center text-sm">
                Already have an account?
                <Link to="/login" className="text-primary underline ml-1">Log In</Link>
            </div>
        </Card>
    );
}
