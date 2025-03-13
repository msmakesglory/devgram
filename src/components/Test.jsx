import { useEffect, useState, useRef, useCallback } from "react";
import { faker } from "@faker-js/faker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";

// Function to generate fake ideas
const generateIdea = () => ({
    ideatitle: faker.word.words(3),
    desc: faker.lorem.sentence(),
    people: faker.number.int({ min: 1, max: 10 }),
    time: faker.number.int({ min: 1, max: 10 }),
    postDate: faker.date.past().toDateString(),
});

export default function PostsList() {
    const [ideas, setIdeas] = useState([]); // Stores idea posts
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null); // Ref for intersection observer

    useEffect(() => {

        loadMoreIdeas(); // Load first set of ideas
    }, []);

    const lastPostRef = useCallback(
        (node) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect(); // Disconnect previous observer

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreIdeas(); // Load more posts when last post is visible
                }
            });

            if (node) observerRef.current.observe(node); // Observe last post
        },
        [loading]
    );

    const loadMoreIdeas = () => {
        if(ideas.length > 30)
            return
        setLoading(true);
        setTimeout(() => {
            const newIdeas = Array.from({ length: 12 }, generateIdea);
            setIdeas((prev) => [...prev, ...newIdeas]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div>
            <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ideas.map((idea, index) => (
                    <Card key={index} ref={index === ideas.length - 1 ? lastPostRef : null}>
                        <CardHeader>
                            <CardTitle>{idea.ideatitle}</CardTitle>
                            <span className="space-x-2">
                                <Badge>Java</Badge>
                                <Badge>JS</Badge>
                                <Badge>Python</Badge>
                            </span>
                            <CardDescription>{idea.desc}</CardDescription>
                            <p className="text-muted-foreground text-sm">{idea.postDate}</p>
                        </CardHeader>
                        <Separator />
                        <CardContent>
                            <div className="pt-4 flex items-center justify-between">
                                <span className="flex">
                                    <Avatar>
                                        <AvatarImage src={"https://www.github.com/spotify.png"} />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <Button variant="link">@johndoe</Button>
                                </span>
                                <Button variant="link">
                                    <Users /> {idea.people}/10
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {loading ? <div className="text-center p-4">Loading more ideas...</div> :
                <div className="text-center p-4">May Be You Reached The End...</div>}
        </div>
    );
}
