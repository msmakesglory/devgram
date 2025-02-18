"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HyperText } from "@/components/ui/hyper-text";
import { AuroraText } from "@/components/ui/aurora-text"; // Assuming this component exists
import { ArrowRight } from "lucide-react"; // Import your arrow icon

export default function LandingPage() {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 3000); // Switch after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
            <AnimatePresence mode="wait">
                {showIntro ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <HyperText
                            className="text-4xl lg:text-6xl font-bold text-black dark:text-white"
                            text="Hello Developers"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter">
                            Bridging The Gap Between
                        </h1>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter">
                            <AuroraText>Ideas</AuroraText> And <AuroraText>Execution</AuroraText>
                        </h1>
                        <p className="mt-4 mb-2 text-lg text-center tracking-wide capitalize">
                            A dedicated platform where developers exchange ideas, troubleshoot challenges, and build the future together.
                        </p>
                        <button className="mt-4 border border-white px-4 py-2 rounded-full hover:bg-white/10 transition duration-150 ease-linear">
                            ✨ Get Started <ArrowRight className="inline-block" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}