import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useState } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { Edit } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.js";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdate() {
    const { userDetails, setUserDetails } = useProfileContext();
    const [editField, setEditField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTempValue(e.target.value);
    }

    const updateField = async (field) => {
        if (!userDetails?.uid) return;

        const userRef = doc(db, "users", userDetails.uid);
        try {
            await updateDoc(userRef, { [field]: tempValue });
            setUserDetails((prevData) => ({ ...prevData, [field]: tempValue }));
            setEditField(null);
        } catch (error) {
            console.log("Error updating the field:", error);
        }
    }
    if(!userDetails.uid){
        navigate("/login");
    }

    return (
        <Card className="lg:w-[600px] lg:mx-auto mx-2 p-4">
            <CardHeader>
                <CardTitle>Update Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Dynamic Fields for Personal Details */}
                    {["fullName", "age", "location"].map((field) => (
                        <div key={field}>
                            <div className="flex gap-2 items-center">
                                <Label className="w-2/12 capitalize">{field}</Label>
                                {editField === field ? (
                                    <div className="w-9/12">
                                        <Input
                                            name={field}
                                            value={tempValue}
                                            onChange={handleChange}
                                            placeholder={`Enter your ${field}`}
                                        />
                                        <div className="mt-1 space-x-2">
                                            <Button variant="secondary" onClick={() => updateField(field)}>Save</Button>
                                            <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="w-9/12 text-muted-foreground text-center">
                                        {userDetails?.[field] || `No ${field} provided`}
                                    </p>
                                )}
                                <Button className="w-1/12" onClick={() => { setEditField(field); setTempValue(userDetails?.[field] || ""); }} variant="ghost">
                                    <Edit className="size-4" />
                                </Button>
                            </div>
                            <Separator className="mt-1" />
                        </div>
                    ))}
                </div>
            </CardContent>

            <Separator />

            {/* Professional Details */}
            <CardHeader>
                <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Summary Field */}
                    {editField === "summary" ? (
                        <div className="flex flex-col gap-2 w-full">
                            <Label className="capitalize">Summary</Label>
                            <Textarea
                                name="summary"
                                value={tempValue}
                                onChange={handleChange}
                                placeholder="Enter a short summary about yourself"
                                className="w-full"
                            />
                            <div className="mt-1 space-x-2">
                                <Button variant="secondary" onClick={() => updateField("summary")}>Save</Button>
                                <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Label className="w-2/12">Summary</Label>
                            <p className="w-9/12 pl-4">{userDetails?.summary || "No summary provided"}</p>
                            <Button className="w-1/12" onClick={() => { setEditField("summary"); setTempValue(userDetails?.summary || ""); }} variant="ghost">
                                <Edit className="size-4" />
                            </Button>
                        </div>
                    )}
                    <Separator />

                    {/* Social Media Links */}
                    {["website", "linkedIn", "github"].map((field) => (
                        <div key={field}>
                            <div className="flex gap-2 items-center">
                                <Label className="w-2/12 capitalize">{field}</Label>
                                {editField === field ? (
                                    <div className="w-9/12">
                                        <Input
                                            name={field}
                                            value={tempValue}
                                            onChange={handleChange}
                                            placeholder={`Enter ${field} URL`}
                                        />
                                        <div className="mt-1 space-x-2">
                                            <Button variant="secondary" onClick={() => updateField(field)}>Save</Button>
                                            <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="w-9/12 text-center">{userDetails?.[field] || `No ${field} provided`}</p>
                                )}
                                <Button className="w-1/12" onClick={() => { setEditField(field); setTempValue(userDetails?.[field] || ""); }} variant="ghost">
                                    <Edit className="size-4" />
                                </Button>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Experience Section */}
            <CardHeader>
                <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {["work", "education", "skills"].map((field) => (
                        <div key={field}>
                            <div className="flex gap-2 items-center">
                                <Label className="w-2/12 capitalize">{field}</Label>
                                {editField === field ? (
                                    <div className="w-9/12">
                                        <Input
                                            name={field}
                                            value={tempValue}
                                            onChange={handleChange}
                                            placeholder={`Enter your ${field}`}
                                        />
                                        <div className="mt-1 space-x-2">
                                            <Button variant="secondary" onClick={() => updateField(field)}>Save</Button>
                                            <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="w-9/12 text-center">{userDetails?.[field] || `No ${field} provided`}</p>
                                )}
                                <Button className="w-1/12" onClick={() => { setEditField(field); setTempValue(userDetails?.[field] || ""); }} variant="ghost">
                                    <Edit className="size-4" />
                                </Button>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
