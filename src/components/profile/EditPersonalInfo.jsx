import { Button } from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, 
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Edit } from "lucide-react";
import { useProfileContext } from "@/context/ProfileContext.jsx";
import { useState } from "react";

export default function EditPersonalInfo() {
    const { userDetails, updateSingleField } = useProfileContext();
    const [isOpen, setIsOpen] = useState(false);

    const [editedDetails, setEditedDetails] = useState({
        location: userDetails?.location || "",
        linkedin: userDetails?.linkedin || "",
        github: userDetails?.github || ""
    });

    const handleChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.id]: e.target.value });
    };

    const handleSave = async () => {
        for (const field in editedDetails) {
            if (editedDetails[field].trim() !== "" && editedDetails[field] !== userDetails[field]) {
                await updateSingleField(field, editedDetails[field].trim());
            }
        }
        setIsOpen(false); // Close modal after saving
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>  
            <DialogTrigger asChild>
                <Button variant="ghost" className="absolute right-6 top-6" onClick={() => setIsOpen(true)}>
                    <Edit className="size-10"/>
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
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="location"
                            value={editedDetails.location}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder={userDetails?.location?userDetails.location:'Enter your location'}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="linkedin" className="text-right">
                            LinkedIn
                        </Label>
                        <Input
                            id="linkedin"
                            value={editedDetails.linkedin}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder={userDetails?.linkedin?userDetails.linkedin:'Enter your linkedin link'}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="github" className="text-right">
                            GitHub
                        </Label>
                        <Input
                            id="github"
                            value={editedDetails.github}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder={userDetails?.github?userDetails.github:'Enter your github link'}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
