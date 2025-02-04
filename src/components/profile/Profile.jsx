import { Button } from "@/components/ui/button";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";
import { Link, Navigate } from "react-router-dom";
// import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import image from "../../assets/img.png"
import {Linkedin, Github, Edit, MapPin,Mail} from "lucide-react";
import { FaSchool as School } from "react-icons/fa";
import {Calendar} from "@icon-park/react/es";
// import {Badge} from "@/components/ui/badge.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import Idea from "@/components/profile/Idea.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";

const Profile = () => {
  const { userDetails, setUserDetails } = useProfileContext();
  const navigate = useNavigate();
  
    useEffect( () => {
        const fetchUserDetails = async() => {
            if(!userDetails.uid) return;

            const docRef = doc(db, "users", userDetails.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            } else {
                console.log("No user data found in Firestore.");
            }
        };
        fetchUserDetails()
    }, []);

    if(!userDetails.uid){
        navigate("/login");
    }

  return (
      <div className="grid grid-cols-9">
        <div className="flex flex-col col-start-2 col-span-2 gap-2">
            <Card className="relative">
                <CardHeader>
                    <Avatar className="size-16">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" className="absolute right-4 top-4">
                        <Edit className="size-10"/>
                    </Button>
                    <CardTitle>{userDetails.fullName}</CardTitle>
                    <CardDescription>@{userDetails.uid}</CardDescription>
                </CardHeader>
                <CardContent>
                    {userDetails.summary || `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore`}
                </CardContent>
            </Card>

            <Card className="relative">
                <CardHeader>
                    <Button variant="ghost" className="absolute right-4 top-4">
                        <Edit className="size-10"/>
                    </Button>
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
                    <Button variant="ghost" className="absolute right-4 top-4">
                        <Edit className="size-10"/>
                    </Button>
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
      </div>
  );
};

export default Profile;
{/*<div className={"border flex-grow rounded-lg"}>*/}
{/*    <ScrollArea className="h-[500px] lg:h-[600px] relative z-0 overflow-auto">*/}
{/*          <Idea/>*/}
{/*          <Idea/>*/}
{/*          <Idea/>*/}
{/*          <Idea/>*/}
{/*    </ScrollArea>*/}
{/*</div>*/}
