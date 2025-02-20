import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useIdeaContext } from "../../context/IdeaContext";
import { ScrollArea } from "../ui/scroll-area";
import ConfirmDelete from "@/components/ideas/CofirmIdeaDelete.jsx";

 const IdeaDeleteDialog = ({open,onClose}) => {
     const {ideas, deleteIdea} = useIdeaContext();
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger>
                {/*Delete Idea*/}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Your Ideas</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[250px] lg:h-[350px] relative z-0 overflow-auto">
                    <div className="space-y-3">
                    {ideas.length > 0 ? (
    ideas.map((idea, index) => (
        <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
            <div>
                <h1 className="text-lg font-semibold">{index + 1}. {idea.title}</h1>
                <h2 className="text-gray-500">{idea.description}</h2>

            </div>
            <ConfirmDelete idea={idea}/>

        </div>
    ))
) : (
    <p className="text-gray-500 text-center">No ideas available.</p>
)}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default IdeaDeleteDialog;