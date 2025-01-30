import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Calendar} from "@/components/ui/calendar.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";

export default function ProfileUpdate(){
    return <Card className="lg:w-[500px] lg:mx-auto mx-2">
        <CardHeader>
            <CardTitle>Basic Details</CardTitle>
            <CardDescription>
                Make Your Changes and
                Update
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {/* Full Name */}
                <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Full Name" />
                </div>

                {/* Email */}
                <div>
                    <Label>Email</Label>
                    <Input placeholder="Email" />
                </div>

                {/* Gender */}
                <div>
                    <Label>Gender</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Gender" defaultValue="Male" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="other">Rather Not Say</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Location */}
                <div>
                    <Label >Location</Label>
                    <Input placeholder="Location" />
                </div>

                {/* Birthday */}
                <div>
                    <Label>Birthday</Label>
                    <Input
                        placeholder="Birthday"
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                    />
                </div>
            </div>
        </CardContent>
        <Separator/>
        <CardHeader>
            <CardTitle>Professional Info</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {/* Full Name */}
                <div>
                    <Label >Summary</Label>
                    <Textarea placeholder="Summary" />
                </div>

                {/* personal website */}
                <div>
                    <Label >Personal Website</Label>
                    <Input placeholder="Eg. Portfolio" />
                </div>

                {/* LinkedIn */}
                <div>
                    <Label >LinkedIn</Label>
                    <Input placeholder="LinkedIn" />
                </div>
                {/* GitHub */}
                <div>
                    <Label >GitHub</Label>
                    <Input placeholder="GitHub" />
                </div>

            </div>
        </CardContent>
        <Separator/>
        <CardHeader>
            <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">

                {/* personal website */}
                <div>
                    <Label >Work</Label>
                    <Input placeholder="Eg. SDE at Amazon" />
                </div>

                {/* Education */}
                <div>
                    <Label >Education</Label>
                    <Input placeholder="Education" />
                </div>
                {/* Skills */}
                <div>
                    <Label>Skills</Label>
                    <Input placeholder="Skills" />
                </div>

            </div>
        </CardContent>
        <CardFooter>
            <Button>Update</Button>
        </CardFooter>
    </Card>
}