import { useProfileContext } from "../../context/ProfileContext";
import {Linkedin, Github, MapPin, Mail} from "lucide-react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import EditProfile from "@/components/profile/EditProfile.jsx";
import EditPersonalInfo from "@/components/profile/EditPersonalInfo.jsx";
import EditPro from "@/components/profile/EditPro.jsx";
import extractUsername from "@/components/utils/util.js";
import { useIdeaContext } from "../../context/IdeaContext";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import { useEffect, useState } from "react";
import IdeasTab from "@/components/profile/IdeasTab.jsx";
import InspectProfile from "./InspectProfile";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.jsx";
import { useMediaQuery } from "react-responsive";
import { MobileProfile } from "./mobile/profile";



const Profile = () => {
  const { userDetails } = useProfileContext();
  const {uid: userID} = useParams();
  const { ideas, setIdeas } = useIdeaContext();
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const isMobile = useMediaQuery({maxWidth: 1024})

    if (!userDetails?.uid) {
      <div><p>Profile not found</p></div>
    }
  

  useEffect(() => {
    setTimeout(() => {
      setProfileLoading(true);
      setIdeasLoading(false);
    }, 3000);
  }, []);
  

 if(userDetails?.uid !== userID){
    return (
      <InspectProfile userId={userID}/>
    )
  }

  


  return (
     isMobile ? <MobileProfile />
      :
      <div className="profile-div pt-20">
      <div className="profile-div-inner">
        <Card className="relative">
            <EditProfile />
            <CardHeader>
              <div className="flex gap-2">
                <Avatar className="size-12">
                  <AvatarImage
                      src={userDetails.github ?`https://github.com/${extractUsername(userDetails.github)}.png` : `https://github.com/shadcn.png`}
                  />
                  <AvatarFallback>👨‍💻</AvatarFallback>
                </Avatar>
                <span className="col-span-2 space-y-2 mt-2">
                  <CardTitle className="tracking-wide break-words">
                    {profileLoading ? (userDetails.fullName || "Not Available") : <Skeleton className="w-40 h-5" />}
                  </CardTitle>
                  <CardDescription className="text-xs break-words">
                    {profileLoading ? (userDetails.uid || "Not Available") : <Skeleton className="w-60 h-5" />}
                  </CardDescription>

                </span>
              </div>
            </CardHeader>
          <CardContent>
            {profileLoading ?
            userDetails.summary || "Not Available"
            : <Skeleton className="w-60 h-10" />
            }
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader>
            <EditPersonalInfo />
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm tracking-wider">
              <li>
                {profileLoading ?
                    <span className="flex items-center gap-2">
                      <Mail className="size-4 shrink-0"/>
                      <a href={`mailto:${userDetails.mail}`}>{userDetails.mail || "Not Available"}</a>
                    </span>
                    :
                    <Skeleton className="w-60 h-5"/>

                }
              </li>
              <li>
                {profileLoading ?
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 shrink-0"/>
                      <p>{userDetails.location || "Not Available"}</p>
                    </span>
                    :
                    <Skeleton className="w-60 h-5"/>
                }
              </li>
              <li>
                {profileLoading ?
                    <span className="flex items-center gap-2">
                      <Linkedin className="size-4 shrink-0"/>
                      <a href={userDetails.linkedin}>{extractUsername(userDetails.linkedin) || "Not Available"}</a>
                    </span>
                    :
                    <Skeleton className="w-60 h-5"/>
                }
              </li>
              <li>
                {profileLoading ?
                    <span className="flex items-center gap-2">
                      <Github className="size-4 shrink-0"/>
                      <a href={userDetails.github}>{extractUsername(userDetails.github) || "Not Available"}</a>
                    </span>
                    :
                    <Skeleton className="w-60 h-5"/>
                }
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="relative">
          <EditPro/>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Work</AccordionTrigger>
                <AccordionContent>
                  {userDetails.work || "Not Available"}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Education</AccordionTrigger>
                <AccordionContent>
                  {userDetails.education || "Not Available"}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Skills</AccordionTrigger>
                <AccordionContent>
                  {userDetails.skills || "Not Available"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </CardContent>
        </Card>
      </div>

      <IdeasTab ideas={ideas} isLoading={ideasLoading} isEdit={true} setFunction={setIdeas} />
    </div>
  );
};

export default Profile;
