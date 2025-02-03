import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useState, useEffect } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { db } from "@/configs/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import {Edit} from "lucide-react";

export default function ProfileUpdate() {
    const [formData, setFormData] = useState({
        fullName: null,
        age: null,
        gender: null,   
        location: null,
        summary: null,
        website: null,
        linkedIn: null,
        github: null,
        work: null,
        education: null,
        skills: null,
    })
    const {userDetails, setUserDetails} = useProfileContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    // const handleSelectChange = (name, value) => {
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const updatedDetails = {...userDetails, ...formData};

    //     setUserDetails(updatedDetails);
        
    //     try{
    //         await setDoc(doc(db, "users", userDetails.uid), updatedDetails);
    //         console.log("user details saved successfully");
    //         setTimeout(() => {
    //             navigate(`/p/${userDetails.uid}`);
    //         }, 500);
    //     } catch(err) {
    //         console.error(err);
    //     }
        
    // };
    
    const [editField, setEditField] = useState(false);
    return (
        <Card className="lg:w-[600px] lg:mx-auto mx-2 p-4">
                <CardHeader>
                    <CardTitle>Update Your Profile</CardTitle>
                </CardHeader>
                <CardContent>

                    <div className="space-y-6">
                        {/* Dynamic Fields with Edit, Save, and Cancel Buttons */}
                        {["fullName","age", "location"].map((field) => (
                        <div key={field}>
                            <div className="flex gap-2 items-center">
                                <Label className="w-2/12 capitalize">{field}</Label>
                                {editField === field ? (
                                    <div className="w-9/12">
                                        <Input name={field} value={formData[field]} onChange={handleChange} placeholder={`Enter your ${field}`}/>
                                        <div className="mt-1 space-x-2">
                                            <Button variant="secondary">Save</Button>
                                            <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="w-9/12 text-muted-foreground text-center">{formData[field] || `No ${field} provided`}</p>
                                )}
                                <Button className="w-1/12" onClick={() => setEditField(editField === field ? null : field)} variant="ghost">
                                    <Edit className="size-4"/>
                                </Button>
                            </div>
                            <Separator className={"mt-1"}/>
                        </div>
                        ))}
                    </div>
                </CardContent>

                {/*<Separator />*/}

                {/* Professional Details */}
                <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {"summary" === editField ? (
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="capitalize">Summary</Label>
                                <Textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Enter a short summary about yourself" className="w-full"/>
                                <div className="mt-1 space-x-2">
                                    <Button variant="secondary">Save</Button>
                                    <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <Label className="w-2/12">Summary</Label>
                                <p className="w-9/12 pl-4">{formData.summary || "No summary provided"}</p>
                                <Button className="w-1/12" onClick={() => setEditField("summary")} variant="ghost">
                                    <Edit className="size-4"/>
                                </Button>
                            </div>
                        )}
                        <Separator/>
                        {["website", "linkedIn", "github"].map((field) => (
                            <div key={field}>
                                <div className="flex gap-2 items-center">
                                    <Label className="w-2/12 capitalize">{field}</Label>
                                    {editField === field ? (
                                        <div className="w-9/12">
                                            <Input name={field} value={formData[field]} onChange={handleChange} placeholder={`Enter ${field} URL`}/>
                                            <div className="mt-1 space-x-2">
                                                <Button variant="secondary">Save</Button>
                                                <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="w-9/12 text-center">{formData[field] || `No ${field} provided`}</p>
                                    )}
                                    <Button className="w-1/12" onClick={() => setEditField(editField === field ? null : field)} variant="ghost">
                                        <Edit className="size-4"/>
                                    </Button>
                                </div>
                                <Separator/>
                            </div>
                        ))}
                    </div>
                </CardContent>


                {/* Experience */}
                <CardHeader>
                    <CardTitle>Experience</CardTitle>
                </CardHeader>
                    <div className="space-y-6">
                        {["work", "education", "skills"].map((field) => (
                            <div key={field}>
                                <div className="flex gap-2 items-center">
                                    <Label className="w-2/12 capitalize">{field}</Label>
                                    {editField === field ? (
                                        <div className="w-9/12">
                                            <Input name={field} value={formData[field]} onChange={handleChange} placeholder={`Enter your ${field}`}/>
                                            <div className="mt-1 space-x-2">
                                                <Button variant="secondary">Save</Button>
                                                <Button variant="ghost" onClick={() => setEditField(null)}>Cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="w-9/12 text-center">{formData[field] || `No ${field} provided`}</p>
                                    )}
                                    <Button className="w-1/12" onClick={() => setEditField(editField === field ? null : field)} variant="ghost">
                                        <Edit className="size-4"/>
                                    </Button>
                                </div>
                                <Separator/>
                            </div>
                        ))}
                    </div>
                <CardContent />
        </Card>
    );
}