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
import {Textarea} from "@/components/ui/textarea.jsx";

export default function EditProfile(){
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
                        <Label htmlFor="name" className="text-right">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            value={userDetails.fullName?userDetails.fullName:""}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={userDetails.uid?userDetails.uid:""}
                            placeholder={userDetails.uid?"":"Not Provided"}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Summary
                        </Label>
                        <Textarea
                            id="username"
                            value={userDetails.summary?userDetails.summary:""}
                            placeholder={userDetails.summary?"":"Not Provided"}
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