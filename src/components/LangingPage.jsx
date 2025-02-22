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
        }, 2000); // Switch after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="sync">
            {showIntro ?
                <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={"h-screen flex flex-col justify-center items-center pt-20"}>
                        <HyperText
                            className="text-4xl lg:text-6xl font-bold text-black dark:text-white"
                            text="Hello Developers"
                        />
                    </div>
                </motion.div>
                :
                <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className={"h-screen flex flex-col justify-center items-center pt-20"}>
                        <h1 className={"text-4xl lg:text-6xl font-bold mb-6 tracking-tighter"}>
                            Bridging The Gap Between
                        </h1>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter">
                            <AuroraText>Ideas</AuroraText> And <AuroraText>Execution</AuroraText>
                        </h1>
                        <p className="mt-4 mb-2
         line-clamp-3 text-lg text-center tracking-wide capitalize">
                            A dedicated platform where developers exchange ideas, troubleshoot challenges, and build the
                            future
                            together
                        </p>

                        <button
                            className="mt-4 border px-4 py-2 rounded-full hover:scale-105 transition duration-150 ease-linear font-semibold">
                            ✨ Get Started <ArrowRight className={"inline-block"}/>
                        </button>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
}