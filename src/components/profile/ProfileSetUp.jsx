import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaUser as User
    ,FaBriefcase as Briefcase
    , FaMapPin as MapPin
    , FaCalendar as Calendar
    ,FaGlobe as Globe
    ,FaGithub as Github
    ,FaLinkedin as Linkedin
    ,FaBook as Book
    ,FaCode as Code
} from "react-icons/fa";
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string().min(1, "Location is required"),
    birthday: z.string().min(1, "Birthday is required"),
    summary: z.string().optional(),
    website: z.string().url("Invalid URL").optional(),
    github: z.string().url("Invalid URL").optional(),
    linkedin: z.string().url("Invalid URL").optional(),
    work: z.string().min(1, "Work experience is required"),
    education: z.string().min(1, "Education is required"),
    skills: z.string().min(1, "At least one skill is required")
});

export default function ProfileSetup() {
    const [step, setStep] = useState(1);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
                                <div className="space-y-3">
                                    <label className="block">Name</label>
                                    <div className="flex items-center gap-2">
                                        <User className="text-gray-500" />
                                        <Input {...register("name")} placeholder="Full Name" />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                                    <label className="block">Location</label>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="text-gray-500" />
                                        <Input {...register("location")} placeholder="Location" />
                                    </div>
                                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

                                    <label className="block">Birthday</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="text-gray-500" />
                                        <Input {...register("birthday")} type="date" />
                                    </div>
                                    {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}

                                    <Button type="button" onClick={nextStep} className="w-full">Next</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Professional Details</h2>
                                <div className="space-y-3">
                                    <label className="block">Summary</label>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="text-gray-500" />
                                        <Input {...register("summary")} placeholder="Professional Summary" />
                                    </div>

                                    <label className="block">Personal Website</label>
                                    <div className="flex items-center gap-2">
                                        <Globe className="text-gray-500" />
                                        <Input {...register("website")} placeholder="Personal Website" />
                                    </div>
                                    {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}

                                    <label className="block">GitHub</label>
                                    <div className="flex items-center gap-2">
                                        <Github className="text-gray-500" />
                                        <Input {...register("github")} placeholder="GitHub URL" />
                                    </div>
                                    {errors.github && <p className="text-red-500 text-sm">{errors.github.message}</p>}

                                    <label className="block">LinkedIn</label>
                                    <div className="flex items-center gap-2">
                                        <Linkedin className="text-gray-500" />
                                        <Input {...register("linkedin")} placeholder="LinkedIn URL" />
                                    </div>
                                    {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}

                                    <div className="flex justify-between">
                                        <Button type="button" onClick={prevStep}>Back</Button>
                                        <Button type="button" onClick={nextStep}>Next</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                                <div className="space-y-3">
                                    <label className="block">Work Experience</label>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="text-gray-500" />
                                        <Input {...register("work")} placeholder="Work Experience" />
                                    </div>
                                    {errors.work && <p className="text-red-500 text-sm">{errors.work.message}</p>}

                                    <label className="block">Education</label>
                                    <div className="flex items-center gap-2">
                                        <Book className="text-gray-500" />
                                        <Input {...register("education")} placeholder="Education" />
                                    </div>
                                    {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}

                                    <label className="block">Tech Skills</label>
                                    <div className="flex items-center gap-2">
                                        <Code className="text-gray-500" />
                                        <Input {...register("skills")} placeholder="Tech Skills" />
                                    </div>
                                    {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}

                                    <div className="flex justify-between">
                                        <Button type="button" onClick={prevStep}>Back</Button>
                                        <Button type="submit" className="bg-green-500">Complete Profile</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
