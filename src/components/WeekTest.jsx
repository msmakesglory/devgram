import { usePostContext } from "../context/PostContext";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

export default function PostsList() {
    const { postsByDate, loadPreviousDay, loadedDays } = usePostContext();

    return (
        <div className="pt-20 lg:px-20 md:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto space-x-2 space-y-2">
            {/* Loop through posts grouped by date */}
            {Object.keys(postsByDate).map((date) => (
                <div key={date} className="col-span-full text-center my-4">
                    <h2 className="text-xl font-bold">{date}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {postsByDate[date].map((post, index) => (
                            <Card key={post.id} className="hover:bg-muted transition duration-200">
                                <CardHeader>
                                    <CardTitle>{post.title}</CardTitle>
                                    <span className="space-x-2">
                                        {post.tools?.map((tool, idx) => (
                                            <Badge key={idx} variant="secondary">{tool}</Badge>
                                        ))}
                                    </span>
                                    <CardDescription>{post.content}</CardDescription>
                                </CardHeader>
                                <CardFooter className="pt-4 flex gap-4 justify-between">
                                    <span className="flex items-center gap-2">
                                        <img className="size-4 rounded-full"
                                            src={`https://randomuser.me/api/portraits/lego/${index}.jpg`} 
                                            alt="user"/>
                                        {post.username}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Users className="size-6" /> {post.usersNow}/{post.usersTotal}
                                    </span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}

            {/* Load More Button */}
            <div className="col-span-full text-center my-6">
                {loadedDays < 6 && (
                    <Button onClick={loadPreviousDay} className="bg-blue-600 text-white">
                        Load More
                    </Button>
                )}
            </div>
        </div>
    );
}
