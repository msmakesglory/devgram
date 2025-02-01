import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useState, useEffect } from "react";
import { useProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../configs/firebase";
import { doc, setDoc } from "firebase/firestore";

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

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedDetails = {...userDetails, ...formData};

        setUserDetails(updatedDetails);
        
        try{
            await setDoc(doc(db, "users", userDetails.uid), updatedDetails);
            console.log("user details saved successfully");
            setTimeout(() => {
                navigate(`/p/${userDetails.uid}`);
            }, 500);
        } catch(err) {
            console.error(err);
        }
        
    };
    
    


    return (
        <Card className="lg:w-[600px] lg:mx-auto mx-2 p-4">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Update Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <Label>Full Name</Label>
                            <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                        </div>
                        <div>
                            <Label>Age</Label>
                            <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age" />
                        </div>
                        <div>
                            <Label>Gender</Label>
                            <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Enter your location" />
                        </div>
                    </div>
                </CardContent>
                
                <Separator />

                <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <Label>Summary</Label>
                            <Textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Write a short summary about yourself" />
                        </div>
                        <div>
                            <Label>Personal Website</Label>
                            <Input name="website" value={formData.website} onChange={handleChange} placeholder="Enter website URL" />
                        </div>
                        <div>
                            <Label>LinkedIn</Label>
                            <Input name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="Enter LinkedIn profile URL" />
                        </div>
                        <div>
                            <Label>GitHub</Label>
                            <Input name="github" value={formData.github} onChange={handleChange} placeholder="Enter GitHub profile URL" />
                        </div>
                    </div>
                </CardContent>

                <Separator />

                <CardHeader>
                    <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <Label>Work</Label>
                            <Input name="work" value={formData.work} onChange={handleChange} placeholder="Eg. Software Engineer at Google" />
                        </div>
                        <div>
                            <Label>Education</Label>
                            <Input name="education" value={formData.education} onChange={handleChange} placeholder="Eg. B.Tech in CSE" />
                        </div>
                        <div>
                            <Label>Skills</Label>
                            <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="Eg. JavaScript, React, Node.js" />
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="w-full">Update Profile</Button>
                </CardFooter>
            </form>
        </Card>
    );
}