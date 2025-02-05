import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea.jsx";

export default function EditProfile() {
    const { userDetails, updateSingleField } = useProfileContext();
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog visibility

    // Local state to handle changes before saving
    const [editedDetails, setEditedDetails] = useState({
        fullName: userDetails.fullName || "",
        summary: userDetails.summary || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.id]: e.target.value });
    };

    // Save changes to Firestore
    const handleSave = async () => {
        for (const field in editedDetails) {
            if (editedDetails[field].trim() !== "" && editedDetails[field] !== userDetails[field]) {
                await updateSingleField(field, editedDetails[field]);
            }
        }
        setIsOpen(false); // Close the dialog after saving
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
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullName" className="text-right">
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            value={editedDetails.fullName}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="summary" className="text-right">
                            Summary
                        </Label>
                        <Textarea
                            id="summary"
                            value={editedDetails.summary}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
