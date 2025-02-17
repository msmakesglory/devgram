import { useProfileContext } from "../../context/ProfileContext";
import {Linkedin, Github, MapPin, Mail, Copy} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import EditProfile from "@/components/profile/EditProfile.jsx";
import EditPersonalInfo from "@/components/profile/EditPersonalInfo.jsx";
import EditPro from "@/components/profile/EditPro.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import Idea from "@/components/profile/Idea.jsx";
import extractUsername from "@/components/utils/util.js";
import { useIdeaContext } from "../../context/IdeaContext";
import { Button } from "../ui/button";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import IdeaCardSkeleton from "@/components/ideas/IdeaSkeleton.jsx";
import { useEffect, useState } from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.jsx";
import {copyToClipboard} from "@/utils/copy.js";

const Profile = () => {
  const { userDetails } = useProfileContext();
  console.log(userDetails)
  const navigate = useNavigate();
  const { ideas } = useIdeaContext();
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  if (!userDetails.uid) {
    navigate("/login");
  }

  useEffect(() => {
    setTimeout(() => {
      setProfileLoading(true);
      setIdeasLoading(false);
    }, 3000);
  }, []);


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
                    <>
                      <MapPin className="inline-block h-5"/> { userDetails.location || "Not Available"}
                    </>
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
                      userDetails.skills || "Not Available"
                      :<Skeleton className="w-40 h-5"/>
                  }
                </CardDescription>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      

      {/* Ideas Section */}
      <div className="col-span-5">
        <div className="flex justify-between items-center px-4 mb-2">
          <h1 className="text-2xl font-bold">Your Ideas</h1>
          <Button className="text-sm px-2 py-1" onClick={() => navigate('/idea/new')}>Add Idea</Button>
        </div>
        <ScrollArea className="h-[500px] lg:h-[600px] relative z-0 overflow-auto">
            {ideasLoading ? (
              <>
                <IdeaCardSkeleton />
                <IdeaCardSkeleton />
                <IdeaCardSkeleton />
              </>
            ) : (ideas.length > 0 ? (
              ideas.map((idea, index) => (
                  <Idea
                    key={index}
                    data={{
                        title: idea.title,
                        description: idea.description,
                        tags: idea.tags,
                        createdBy: idea.creator,
                        createdAt: idea.createdAt
                    }}
                  />
              ))
          ):(
            <div>
              <p className="text-gray-500 text-center">Nothing here</p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Profile;
