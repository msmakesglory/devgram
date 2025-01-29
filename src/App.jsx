import { useState } from 'react'
import './App.css'
import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {LoginForm} from "@/components/login-form.jsx";
import {Switch} from "@/components/ui/switch.jsx";

function App() {
    const handleLogin = () => {

    }
    return (
        <>
            <Card className='w-[400px] mx-auto mt-3 shadow-lg shadow-white'>
                <CardHeader className="text-center">
                    Login
                </CardHeader>
                <CardContent className='flex gap-4 flex-col'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' placeholder='Enter your username' type='email'/>
                    <Label htmlFor>Password</Label>
                    <Input id='password' placeholder='Enter your password' type='password'/>
                    <div className='flex justify-between'>
                        <Button className='w-fit' onClick={handleLogin}>
                            Login
                        </Button>

                        <Button className='w-fit' onClick={handleLogin}>
                            Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default App
