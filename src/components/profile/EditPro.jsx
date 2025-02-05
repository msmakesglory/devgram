import { useProfileContext } from "@/context/ProfileContext.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, 
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Edit } from "lucide-react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useState } from "react";

export default function EditPro() {
    const { userDetails, updateSingleField } = useProfileContext();
    const [isOpen, setIsOpen] = useState(false);

    const [editedDetails, setEditedDetails] = useState({
        work: userDetails?.work || "",
        education: userDetails?.education || "",
        skills: userDetails?.skills || ""
    });

    const handleChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.id]: e.target.value });
    };

    const handleSave = async () => {
        for (const field in editedDetails) {
            if (editedDetails[field].trim() !== "" && editedDetails[field].trim() !== userDetails[field]) {
                await updateSingleField(field, editedDetails[field].trim());
            }
        }
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="absolute right-6 top-6" onClick={() => setIsOpen(true)}>
                    <Edit className="size-10" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="work" className="text-right">
                            Work
                        </Label>
                        <Input
                            id="work"
                            defaultValue={userDetails.work || ""}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder="Enter your work"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="education" className="text-right">
                            Education
                        </Label>
                        <Input
                            id="education"
                            defaultValue={userDetails.education || ""}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder="Enter your education"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">
                            Skills
                        </Label>
                        <Input
                            id="skills"
                            defaultValue={userDetails.skills || ""}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder="Enter your skills"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
