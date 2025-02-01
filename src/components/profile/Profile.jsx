import { Button } from "@/components/ui/button";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import image from "./img.png"
import {Linkedin,Github} from "lucide-react";
import { FaSchool as School } from "react-icons/fa";
import {Calendar} from "@icon-park/react/es";
import {Badge} from "@/components/ui/badge.jsx";

const Profile = () => {
  // const { userDetails } = useProfileContext();
  // const { handleSignout } = useAuthContext()
  // if (!userDetails.uid) {
  //   return <p>user not signed in</p>
  // }

  return (
      <div className="flex gap-3 w-4/5 mx-auto flex-col lg:flex-row">
          <div className="container border rounded-lg lg:w-[300px] h-fit pb-5">
              <div className="p-4 flex">
                  <img src={image} className={"rounded-full size-16"}/>
                  <div className="ml-2 mt-2">
                      <b>Manoj Rayi</b>
                      <p>@rayimanoj8</p>
                  </div>
              </div>

              <ul className="mx-4 space-y-3">
                  <li className={"flex gap-2"}>
                      <Linkedin/>
                      @rayimanoj8
                  </li>
                  <li className={"flex gap-2"}>
                      <Github/>
                      @rayimanoj8
                  </li>
                  <li className={" flex gap-2"}>
                      <School className={"size-[24px]"}/>
                      Student at PEC
                  </li>
                  <li className={"flex gap-2"}>
                      <Calendar className={"size-[24px]"}/>
                      22-08-2004
                  </li>
              </ul>
          </div>
          <div className={"border flex-grow rounded-lg"}>
                <Card className={"h-[200px] lg:mx-5 mx-2 my-2"}>
                    <CardHeader>
                        <CardTitle>Basic Details</CardTitle>
                        <CardDescription>Description</CardDescription>
                        <div className="space-x-2">
                            <Badge variant="secondary">Java</Badge>
                            <Badge variant="secondary">Python</Badge>
                            <Badge variant="secondary">html</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempo
                    </CardContent>
                </Card>
              <Card className={"h-[200px] lg:mx-5 mx-2 my-2"}>
                  <CardHeader>
                      <CardTitle>Basic Details</CardTitle>
                      <CardDescription>Description</CardDescription>
                      <div className="space-x-2">
                          <Badge variant="secondary">RRR</Badge>
                          <Badge variant="secondary">Bahubali</Badge>
                          <Badge variant="secondary">Debba Debba</Badge>
                      </div>
                  </CardHeader>
                  <CardContent className={"line-clamp-3"}>
                      et ea rebum. Stet clita kasd gubergren, no sea takimata
                  </CardContent>
              </Card>
              <Card className={"h-[200px] lg:mx-5 mx-2 my-2"}>
                  <CardHeader>
                      <CardTitle>Basic Details</CardTitle>
                      <CardDescription>Description</CardDescription>
                      <div className="space-x-2">
                          <Badge variant="secondary">Spring</Badge>
                          <Badge variant="secondary">Redux</Badge>
                          <Badge variant="secondary">React</Badge>
                      </div>
                  </CardHeader>
                  <CardContent>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempo
                  </CardContent>
              </Card>
          </div>
      </div>
  );
};

export default Profile;
