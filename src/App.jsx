import './App.css';
import { useState } from "react";
import {auth, googleProvider} from "./configs/firebase.js";

import {createUserWithEmailAndPassword , signInWithPopup} from "firebase/auth"


function App() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            console.log("User signed in:", userCredential.user);
        } catch (error) {
            console.error("Error signing in:", error.message);
        }
    };

    const handleGoogle = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithPopup(
                auth,googleProvider

            );
            console.log("User signed in:", userCredential.user);
            console.log(auth.user)
        } catch (error) {
            console.error("Error signing in:", error.message);
        }

    };

    

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md"
            >
                <h1 className="text-2xl font-bold text-gray-800">Login</h1>
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md border-gray-300 bg-gray-50 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md border-gray-300 bg-gray-50 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

                >
                    Login
                </button>
            </form>
                <button
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleGoogle}
                >
                    google
                </button>
        </div>
    );
}

export default App;
