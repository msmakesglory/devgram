import {Button} from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Edit} from "lucide-react";
import {useProfileContext} from "@/context/ProfileContext.jsx";

export default function EditPersonalInfo(){
    const { userDetails, setUserDetails } = useProfileContext();
    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="absolute right-6 top-6">
                    <Edit className="size-10"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            Mail
                        </Label>
                        <Input
                            id="mail"
                            value={userDetails.mail?userDetails.mail:""}
                            placeholder={userDetails.mail?"":"Not Provided"}
                            className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="location"
                            value="Hyderabad"
                            className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="linkedin" className="text-right">
                            LinkedIn
                        </Label>
                        <Input
                            id="linkedin"
                            value={userDetails.linkedin?userDetails.linkedin:""}
                            placeholder={userDetails.linkedin?"":"Not Provided"}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="github" className="text-right">
                            GitHub
                        </Label>
                        <Input
                            id="github"
                            value={userDetails.github?userDetails.github:""}
                            placeholder={userDetails.github?"":"Not Provided"}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}