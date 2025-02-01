import { Button } from "@/components/ui/button";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
// import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import image from "../../assets/img.png"
import {Linkedin, Github, Edit} from "lucide-react";
import { FaSchool as School } from "react-icons/fa";
import {Calendar} from "@icon-park/react/es";
// import {Badge} from "@/components/ui/badge.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import Idea from "@/components/profile/Idea.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { userDetails } = useProfileContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!userDetails.uid) {
        navigate("/404");
    }
  }, [userDetails.uid, navigate])

  return (

      <div className="flex gap-3 mx-2 lg:w-4/5 lg:mx-auto flex-col lg:flex-row">
          <div className="container border rounded-lg lg:w-[300px] h-fit pb-5">
              <div className="p-4 flex">
                  <img src={image} className={"rounded-full size-16"}/>
                  <div className="ml-2 mt-2">
                      <h1><b>Manoj Rayi</b></h1>
                      <p>@rayimanoj8</p>
                  </div>
                  <div className="mt-4 ml-2">
                      <Link to="/p/update">
                          <Button variant="ghost">
                              <Edit/>
                          </Button>
                      </Link>
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
