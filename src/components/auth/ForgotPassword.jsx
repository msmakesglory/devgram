import { useState } from "react";
import { auth } from "../../configs/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("A password reset link has been sent to your email.");
            setError("")
        } catch(err) {
            console.log(err);
            setMessage("")
        }
        
    }

    return (
        <Card className="lg:w-[400px] mx-auto p-4">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Label htmlFor="email">Enter your registered email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                    />
                    <Button onClick={handleResetPassword} className="w-full">
                        Send Reset Link
                    </Button>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <Button variant="ghost" className="w-full mt-2" onClick={() => navigate("/login")}>
                        Back to Login
                    </Button>
                </div>
            </CardContent>
        </Card>
    ); 

}