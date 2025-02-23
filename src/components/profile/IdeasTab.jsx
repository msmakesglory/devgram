import {Input} from "@/components/ui/input.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import IdeaCardSkeleton from "@/components/ideas/IdeaSkeleton.jsx";
import Idea from "@/components/profile/Idea.jsx";
import {useState} from "react";
// import AddIdea from "@/components/ideas/IdeaAdd.jsx";
// import IdeaDeleteDialog from "@/components/ideas/IdeaDeleteDialog.jsx";
import { useFilteredData } from "@/hooks/useFilteredData.js";
import PropTypes from "prop-types";
import IdeaActions from "@/components/ideas/IdeaActions.jsx";
// import { useIdeaContext } from "../../context/IdeaContext"

export default function IdeasTab({ideas , isLoading, isEdit, setFunction}) {
    const [query, setQuery] = useState('');
    // const {sortByTitle} = useIdeaContext();
    let filteredData = useFilteredData(ideas, query);

   return <div id="ideas-tab" className="col-span-5 lg:w-[700px]">
        <div className="flex px-4 mb-2">
            <h1 className="text-xl font-semibold w-1/2 p-2">{isEdit ? 'Your Ideas' : "Ideas"}</h1>
            <div className="w-full flex gap-2 ">
                <Input
                    type="text"
                    placeholder="Search Your Idea..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-3/4"
                />
                <IdeaActions isEdit={isEdit} ideas={ideas} setFunction={setFunction}/>
                
            </div>
        </div>
        <ScrollArea className="h-[500px] lg:h-[550px] relative z-0 overflow-auto">
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
                <div className="h-[500px] flex items-center justify-center">
                    <p className="text-gray-500 text-center">Nothing here</p>
                </div>
            ))}
        </ScrollArea>
    </div>
}

IdeasTab.propTypes = {
    ideas: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
            creator: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
};