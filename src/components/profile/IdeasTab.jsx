import {Input} from "@/components/ui/input.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import IdeaCardSkeleton from "@/components/ideas/IdeaSkeleton.jsx";
import Idea from "@/components/profile/Idea.jsx";
import {useEffect, useState} from "react";
import AddIdea from "@/components/ideas/IdeaForm.jsx";
import { useFilteredData } from "../../hooks/useFilteredData";

export default function IdeasTab({ideas , isLoading}) {
    const [query, setQuery] = useState('');
    const filteredData = useFilteredData(ideas, query);

   return <div className="col-span-5">
        <div className="flex px-4 mb-2">
            <h1 className="text-xl font-semibold w-1/2">Your Ideas</h1>
            <div className="w-1/2 flex gap-2">
                <Input
                    type="text"
                    placeholder="Search Your Idea..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <AddIdea/>
            </div>
        </div>
        <ScrollArea className="h-[500px] lg:h-[600px] relative z-0 overflow-auto">
            {isLoading ? (
                <>
                    <IdeaCardSkeleton />
                    <IdeaCardSkeleton />
                    <IdeaCardSkeleton />
                </>
            ) : (filteredData.length > 0 ? (
                filteredData.map((idea, index) => (
                    <Idea
                        key={index}
                        data={{
                            title: idea.title,
                            description: idea.description,
                            tags: idea.tags,
                            createdBy: idea.creator,
                            createdAt: idea.createdAt
                        }}
                    />
                ))
            ):(
                <div>
                    <p className="text-gray-500 text-center">Nothing here</p>
                </div>
            ))}
        </ScrollArea>
    </div>
}


