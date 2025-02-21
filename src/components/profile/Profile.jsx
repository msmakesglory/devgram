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

const Profile = () => {
  const { userDetails } = useProfileContext();
  const navigate = useNavigate();
  const {uid: userID} = useParams();
  const { ideas } = useIdeaContext();
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
          <CardHeader>
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>👨‍💻</AvatarFallback>
            </Avatar>
            <EditProfile />
            <CardTitle className="tracking-wide">
              {      
                profileLoading
                  ? (userDetails.fullName || "Not Available")
                  : <Skeleton className="w-40 h-5" />
              }
            </CardTitle>
            <CardDescription>
              {profileLoading ? (userDetails.uid || "Not Available")
              : <Skeleton className="w-60 h-5" />
              }
            </CardDescription>
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
            <ul className="space-y-3">
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
            <ul className="space-y-1">
              <li>
                <p className="mb-1">Work</p>
                <CardDescription>
                  {profileLoading ?
                    userDetails.work || "Not Available"
                    :<Skeleton className="w-40 h-5"/>
                  }
                </CardDescription>
              </li>
              <li>
                <p className="mb-1">Education</p>
                <CardDescription>
                  {profileLoading ?
                      userDetails.education || "Not Available"
                      :<Skeleton className="w-40 h-5"/>
                  }
                </CardDescription>
              </li>
              <li>
                <p className="mb-1">Skills</p>
                <CardDescription>
                  {profileLoading ?
                      userDetails.skills || "Not Avail  able"
                      :<Skeleton className="w-40 h-5"/>
                  }
                </CardDescription>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <IdeasTab ideas={ideas} isLoading={ideasLoading}/>
    </div>
  );
};

export default Profile;
