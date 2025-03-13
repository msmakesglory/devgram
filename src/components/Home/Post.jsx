import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";

export default function PostCard({ idea, refProp }) {
    return (
        <Card ref={refProp}>
            <CardHeader>
                <CardTitle>{idea.ideatitle}</CardTitle>
                <span className="space-x-2">
                    <Badge>Java</Badge>
                    <Badge>JS</Badge>
                    <Badge>Python</Badge>
                </span>
                <CardDescription className="line-clamp-1">{idea.desc}</CardDescription>
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
    );
}
