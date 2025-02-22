import { useState, useEffect } from "react";
import { db } from "../../configs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Spin from "../Spin";
import {Button} from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.jsx";
import {Linkedin, Github, MapPin, Mail, Copy} from "lucide-react";
import EditPro from "@/components/profile/EditPro.jsx";
import extractUsername from "@/components/utils/util.js";
import {copyToClipboard} from "@/utils/copy.js";
import PropTypes from "prop-types";
import IdeasTab from "@/components/profile/IdeasTab.jsx";
import EditProfile from "@/components/profile/EditProfile.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import EditPersonalInfo from "@/components/profile/EditPersonalInfo.jsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.jsx";

export default function InspectProfile({ userId }) {
  const [otherProfileData, setOtherProfileData] = useState(null);
  const [otherIdeaData, setOtherIdeaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("uid", "==", userId));
            const querySnapShot = await getDocs(q);

        if (querySnapShot.empty) {
            setOtherProfileData(null);
        } else {
            setOtherProfileData(querySnapShot.docs[0].data());
            const fetchIdeas = async () => {
                const ideasRef = collection(db, "ideas", userId, "userIdeas");
                const querySnapShot = await getDocs(ideasRef);
                const fetchedIdeas = querySnapShot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOtherIdeaData(fetchedIdeas);
                console.log(fetchedIdeas);
            };
            fetchIdeas();
        }
      } catch (error) {
            console.error("Error fetching user:", error);
      } finally {
            setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <Spin />;
  else if (!otherProfileData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-500">Developer Not Found!</h2>
        <p className="text-gray-600 mt-2">The user you are looking for does not exist.</p>
        <Button 
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition"
          onClick={() => window.history.back()}  
        >
          Go Back
        </Button>
      </div>
    );
  }
  ;

  return (
      <div className="profile-div">
          <div className="profile-div-inner">
              <Card>
                  <CardHeader>
                      <div className="flex gap-2">
                          <Avatar className="size-12">
                              <AvatarImage
                                  src={otherProfileData.github ? `https://github.com/${extractUsername(otherProfileData.github)}.png` : `https://github.com/shadcn.png`}
                              />
                              <AvatarFallback>👨‍💻</AvatarFallback>
                          </Avatar>
                          <span className="col-span-2 space-y-2 mt-2">
                  <CardTitle className="tracking-wide break-words">
                    {(otherProfileData.fullName || "Not Available")}
                  </CardTitle>
                  <CardDescription className="text-xs break-words">
                    {(otherProfileData.uid || "Not Available")}
                  </CardDescription>

                </span>
                      </div>
                  </CardHeader>
                  <CardContent>
                      {otherProfileData.summary || "Not Available"}
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-3 text-sm tracking-wider">
                          <li><HoverCard>
                                      <HoverCardTrigger>
                                          <p className={"truncate"}>
                                              <Mail
                                                  className={"inline-block h-5"}/>{otherProfileData.mail || "Not Available"}
                                          </p>
                                      </HoverCardTrigger>
                                      <HoverCardContent>
                                          <Button onClick={() => {
                                              copyToClipboard(otherProfileData.mail)
                                          }}>
                                              <Copy/> {otherProfileData.mail}
                                          </Button>
                                      </HoverCardContent>
                                  </HoverCard>
                          </li>
                          <li>
                              <li>
                                  <MapPin className="inline-block h-5"/> {otherProfileData.location || "Not Available"}
                              </li>
                          </li>
                          <li><>
                                      <Linkedin className="inline-block h-5"/>
                                      <a href={otherProfileData.linkedin}>{extractUsername(otherProfileData.linkedin) || "Not Available"}</a>
                                  </>
                          </li>
                          <li><>
                                      <Github className="inline-block h-5"/>
                                      <a href={otherProfileData.github}>{extractUsername(otherProfileData.github) || "Not Available"}</a>
                                  </>
                          </li>
                      </ul>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                              <AccordionTrigger>Work</AccordionTrigger>
                              <AccordionContent>
                                  {otherProfileData.work || "Not Available"}
                              </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                              <AccordionTrigger>Education</AccordionTrigger>
                              <AccordionContent>
                                  {otherProfileData.education || "Not Available"}
                              </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                              <AccordionTrigger>Skills</AccordionTrigger>
                              <AccordionContent>
                                  {otherProfileData.skills || "Not Available"}
                              </AccordionContent>
                          </AccordionItem>
                      </Accordion>

                  </CardContent>
              </Card>
          </div>

        <IdeasTab ideas={otherIdeaData} isLoading={false} isEdit={false} setFunction={setOtherIdeaData}/>
      </div>
  );
};


InspectProfile.propTypes = {
    userId: PropTypes.string.isRequired,
}
//           <IdeasTab ideas={ideas} isLoading={ideasLoading} isEdit={true} setFunction={setIdeas}/>
//