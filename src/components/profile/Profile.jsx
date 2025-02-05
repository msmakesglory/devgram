
import { useProfileContext } from "../../context/ProfileContext";
import {Linkedin, Github, MapPin,Mail} from "lucide-react";
import "@/components/profile/Idea.jsx";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../configs/firebase";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import EditProfile from "@/components/profile/EditProfile.jsx";
import EditPersonalInfo from "@/components/profile/EditPersonalInfo.jsx";
import EditPro from "@/components/profile/EditPro.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import Idea from "@/components/profile/Idea.jsx";

const Profile = () => {
  const { userDetails } = useProfileContext();
  const navigate = useNavigate();


    if(!userDetails.uid){
        navigate("/login");
    }

  return (
      <div className="profile-div mx-2">
        <div className="profile-div-inner">
            <Card className="relative">
                <CardHeader>
                    <Avatar className="size-16">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>👨‍💻</AvatarFallback>
                    </Avatar>
                    <EditProfile/>
                    <CardTitle className="tracking-wide">{userDetails.fullName}</CardTitle>
                    <CardDescription>@{userDetails.uid}</CardDescription>
                </CardHeader>
                <CardContent>
                    {userDetails.summary || `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore`}
                </CardContent>
            </Card>

            <Card className="relative">
                <CardHeader>
                    <EditPersonalInfo/>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li>
                            <Mail className="inline-block h-5"/> rayimanoj8@gmail.com
                        </li>
                        <li>
                            <MapPin className="inline-block h-5"/> Hyderabad
                        </li>
                        <li>
                            <Linkedin className="inline-block h-5"/> {userDetails.linkedin || "Not Available"}
                        </li>
                        <li>
                            <Github className="inline-block h-5"/> {userDetails.github}
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card className={"relative"}>
                <CardHeader>
                    <EditPro/>
                    <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className={"space-y-1"}>
                        <li>
                            <p>Work</p>
                            <CardDescription>{userDetails.work || "Not Provided"}</CardDescription>
                        </li>
                        <li>
                            <p>Education</p>
                            <CardDescription>{userDetails.education || "Not Provided"}</CardDescription>
                        </li>
                        <li>
                            <p>Skills</p>
                            <CardDescription>{userDetails.skills || "Not Provided"}</CardDescription>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className={"col-span-5"}>
            <h1 className={"ml-4 text-3xl font-bold"}>Your Ideas</h1>
            <ScrollArea className="h-[500px] lg:h-[600px] relative z-0 overflow-auto">
                  <Idea/>
                  <Idea/>
                  <Idea/>
                  <Idea/>
            </ScrollArea>
        </div>
      </div>
  );
};

export default Profile;
