import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const IdeaCard = ({ idea }) => {
    // This would come from props in a real application
    const sampleIdea = {
        user: {
            name: "John Doe",
            avatar: "JD"
        },
        description: "Building a new e-commerce platform using React and Node.js. Looking for developers with experience in payment integration and UI design."
    };

    const handleAccept = () => {
        console.log('Idea accepted');
    };

    const handleDecline = () => {
        console.log('Idea declined');
    };

    return (
        <Card className="w-full max-w-2xl p-6">
            <CardContent className="flex gap-6">
                {/* Left Section - Avatar */}
                <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-lg">
                            {sampleIdea.user.avatar}
                        </AvatarFallback>
                    </Avatar>


                </div>

                {/* Right Section - Content */}
                <div className="flex-1 space-y-4">
                    <div className="text-lg font-medium">
                        {sampleIdea.user.name}
                    </div>
                    <div className="text-gray-700">
                        {sampleIdea.description}
                    </div>
                    <div className="flex gap-2 w-24">
                        <Button
                            onClick={handleAccept}
                            className="bg-pink-100 hover:bg-pink-200 text-pink-900"
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={handleDecline}
                            variant="outline"
                            className="bg-blue-100 hover:bg-blue-200 text-blue-900 border-none"
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default IdeaCard;