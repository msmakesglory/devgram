import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/ProfileContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string().min(1, "Location is required"),
    birthday: z.string().min(1, "Birthday is required")
                        .refine((date) => new Date(date) <= new Date(), "Birthday cannot be in the future"),
    summary: z.string().optional(),
    website: z.string().url("Invalid URL").optional(),
    github: z.string().url("Invalid URL").optional(),
    linkedin: z.string().url("Invalid URL").optional(),
    work: z.string().min(1, "Work experience is required"),
    education: z.string().min(1, "Education is required"),
    skills: z.string().min(1, "At least one skill is required")
});

export default function ProfileSetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState("basic");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    const { setUserDetails } = useProfileContext();

    const onSubmit = (data) => {
        setUserDetails(data);
        navigate("/profile");
    };

    const handleValidation = () => {
        if (errors.name || errors.location || errors.birthday) setStep("basic");
        else if (errors.website || errors.github || errors.linkedin) setStep("pro");
        else if (errors.work || errors.education || errors.skills) setStep("exp");
    };

    return (
        <Card className="lg:w-[400px] lg:mx-auto mx-2 p-2">
            <Tabs value={step}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic" onClick={() => setStep("basic")}>Basic</TabsTrigger>
                    <TabsTrigger value="pro" onClick={() => setStep("pro")}>Professional</TabsTrigger>
                    <TabsTrigger value="exp" onClick={() => setStep("exp")}>Experience</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit(onSubmit, handleValidation)}>
                    <TabsContent value="basic">
                        <CardHeader>
                            <CardTitle>Basic Details</CardTitle>
                            <CardDescription>Enter your basic details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Name</Label>
                            <Input {...register("name")} placeholder="Full Name" />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                            <Label>Location</Label>
                            <Input {...register("location")} placeholder="Location" />
                            {errors.location && <p className="text-red-500">{errors.location.message}</p>}

                            <Label>Birthday</Label>
                            <Input {...register("birthday")} type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                            {errors.birthday && <p className="text-red-500">{errors.birthday.message}</p>}

                            <div className={"flex justify-end"}>
                                <Button type="button" onClick={() => setStep("pro")}>Next</Button>
                            </div>
                        </CardContent>
                    </TabsContent>

                    <TabsContent value="pro">
                        <CardHeader>
                            <CardTitle>Professional Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Summary</Label>
                            <Textarea {...register("summary")} placeholder="Summary" />

                            <Label>Personal Website</Label>
                            <Input {...register("website")} placeholder="Website" />
                            {errors.website && <p className="text-red-500">{errors.website.message}</p>}

                            <Label>LinkedIn</Label>
                            <Input {...register("linkedin")} placeholder="LinkedIn" />
                            {errors.linkedin && <p className="text-red-500">{errors.linkedin.message}</p>}

                            <Label>GitHub</Label>
                            <Input {...register("github")} placeholder="GitHub" />
                            {errors.github && <p className="text-red-500">{errors.github.message}</p>}

                            <div className="flex justify-between">
                                <Button type="button" onClick={() => setStep("basic")}>Back</Button>
                                <Button type="button" onClick={() => setStep("exp")}>Next</Button>
                            </div>
                        </CardContent>
                    </TabsContent>

                    <TabsContent value="exp">
                        <CardHeader>
                            <CardTitle>Experience</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Work</Label>
                            <Input {...register("work")} placeholder="Work" />
                            {errors.work && <p className="text-red-500">{errors.work.message}</p>}

                            <Label>Education</Label>
                            <Input {...register("education")} placeholder="Education" />
                            {errors.education && <p className="text-red-500">{errors.education.message}</p>}

                            <Label>Skills</Label>
                            <Input {...register("skills")} placeholder="Skills" />
                            {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}

                            <div className="flex justify-between">
                                <Button type="button" onClick={() => setStep("pro")}>Back</Button>
                                <Button type="submit">Complete Profile</Button>
                            </div>
                        </CardContent>
                    </TabsContent>
                </form>
            </Tabs>
        </Card>
    );
}
