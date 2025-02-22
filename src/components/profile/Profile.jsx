import { useProfileContext } from "../../context/ProfileContext";
import {Linkedin, Github, MapPin, Mail, Copy} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import EditProfile from "@/components/profile/EditProfile.jsx";
import EditPersonalInfo from "@/components/profile/EditPersonalInfo.jsx";
import EditPro from "@/components/profile/EditPro.jsx";
import extractUsername from "@/components/utils/util.js";
import { useIdeaContext } from "../../context/IdeaContext";
import { Button } from "../ui/button";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import { useEffect, useState } from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.jsx";
import {copyToClipboard} from "@/utils/copy.js";
import IdeasTab from "@/components/profile/IdeasTab.jsx";
import InspectProfile from "./InspectProfile";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.jsx";
import {AccordionHeader} from "@radix-ui/react-accordion";

const Profile = () => {
  const { userDetails } = useProfileContext();
  const navigate = useNavigate();
  const {uid: userID} = useParams();
  const { ideas, setIdeas } = useIdeaContext();
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);



    if (!userDetails?.uid) {
      navigate("/login");
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
    <div className="profile-div mx-2">
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
                  <CardTitle className="tracking-wide">
                    {
                      profileLoading
                          ? (userDetails.fullName || "Not Available")
                          : <Skeleton className="w-40 h-5" />
                    }
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {profileLoading ? (userDetails.uid || "Not Available")
                        : <Skeleton className="w-60 h-5" />
                    }
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
                    <HoverCard>
                      <HoverCardTrigger>
                        <p className={"truncate"}>
                          <Mail className={"inline-block h-5"}/>{userDetails.mail || "Not Available"}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent>
                          <Button onClick={()=>{copyToClipboard(userDetails.mail)}}>
                            <Copy/> {userDetails.mail}
                          </Button>
                      </HoverCardContent>
                    </HoverCard>
                    :
                    <Skeleton className="w-60 h-5"/>

                }
              </li>
              <li>
                {profileLoading ?
                    <li>
                      <MapPin className="inline-block h-5"/> { userDetails.location || "Not Available"}
                    </li>
                    :
                    <Skeleton className="w-60 h-5"/>
                }
              </li>
              <li>
                {profileLoading ?
                    <>
                      <Linkedin className="inline-block h-5"/>
                      <a href={userDetails.linkedin}>{ extractUsername(userDetails.linkedin) || "Not Available"}</a>
                    </>
                    :
                    <Skeleton className="w-60 h-5"/>
                }
              </li>
              <li>
                {profileLoading ?
                    <>
                      <Github className="inline-block h-5"/>
                      <a href={userDetails.github}>{ extractUsername(userDetails.github) || "Not Available"}</a>
                    </>
                    :
                    <Skeleton className="w-60 h-5"/>
                }
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="relative">
          <CardHeader>
            <EditPro/>
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
