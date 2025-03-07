import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Button} from "@/components/ui/button.jsx";
import {User,Users} from "lucide-react";

export default function Test(){
    const ideas = [
        {
            title: "CodeCollab",
            tools: ["python", "django", "nextjs"],
            desc: "Real-time code collaboration tool",
            username: "devwizard",
            usersTotal: 8,
            usersNow: 5
        },
        {
            title: "TaskForge",
            tools: ["nodejs", "express", "react"],
            desc: "AI-powered task management system",
            username: "techguru",
            usersTotal: 10,
            usersNow: 7
        },
        {
            title: "BugHunt",
            tools: ["java", "springboot", "angular"],
            desc: "Crowdsourced bug bounty platform",
            username: "cyberdetective",
            usersTotal: 6,
            usersNow: 3
        },
        {
            title: "AI Resume Builder",
            tools: ["python", "flask", "vue"],
            desc: "Generate resumes using AI",
            username: "ai_wizard",
            usersTotal: 5,
            usersNow: 2
        },
        {
            title: "OpenDevHub",
            tools: ["golang", "react", "graphql"],
            desc: "A decentralized GitHub alternative",
            username: "opensource_dev",
            usersTotal: 7,
            usersNow: 4
        },
        {
            title: "FitTrack",
            tools: ["kotlin", "firebase", "flutter"],
            desc: "AI-powered fitness tracking app",
            username: "fitnessgeek",
            usersTotal: 9,
            usersNow: 6
        },
        {
            title: "EduSync",
            tools: ["ruby", "rails", "tailwindcss"],
            desc: "Real-time education collaboration tool",
            username: "edutrain",
            usersTotal: 10,
            usersNow: 8
        },
        {
            title: "CryptoWatch",
            tools: ["rust", "solidity", "nextjs"],
            desc: "Blockchain-based crypto tracker",
            username: "blockmaster",
            usersTotal: 4,
            usersNow: 2
        },
        {
            title: "HireMe",
            tools: ["typescript", "nestjs", "react"],
            desc: "Job portal for developers",
            username: "careerboost",
            usersTotal: 8,
            usersNow: 5
        },
        {
            title: "GreenTech",
            tools: ["python", "tensorflow", "react"],
            desc: "AI-powered environmental monitoring",
            username: "eco_hacker",
            usersTotal: 6,
            usersNow: 4
        }
    ];
    return <>
        <div  className="pt-20 lg:px-20 md:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto space-x-2 space-y-2">
        {
            ideas.map((idea,index)=> (
                    <Card key={index} className="hover:bg-muted transition duration-200">
                        <Card >
                            <CardHeader>
                                <CardTitle>
                                    {idea.title}
                                </CardTitle>
                                <span className="space-x-2">
                            {
                                idea.tools.map((tool, index) => (
                                    <Badge key={index} variant="secondary">{tool}</Badge>
                                ))
                            }
                        </span>
                                <CardDescription>
                                    {idea.desc}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <CardFooter className="pt-4 flex gap-4 justify-between">
                    <span className="flex items-center gap-2">
                        <User className="size-4"/> {idea.username}
                    </span>

                            <span className="flex items-center gap-2">
                        <Users className="size-4"/> {idea.usersNow}/{idea.usersTotal}
                    </span>
                        </CardFooter>
                    </Card>
            ))

        }
        </div>
    </>
}