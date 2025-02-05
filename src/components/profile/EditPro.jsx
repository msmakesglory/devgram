import {useProfileContext} from "@/context/ProfileContext.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Edit} from "lucide-react";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";

export default function EditPro() {
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
                            value={userDetails.work?userDetails.work:""}
                            placeholder={userDetails.work?"":"Not Provided"}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="education" className="text-right">
                            Education
                        </Label>
                        <Input
                            id="education"
                            value={userDetails.education?userDetails.education:""}
                            placeholder={userDetails.education?"":"Not Provided"}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">
                            Skills
                        </Label>
                        <Input
                            id="skills"
                            value={userDetails.skills?userDetails.skills:""}
                            placeholder={userDetails.skills?"":"Not Provided"}
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