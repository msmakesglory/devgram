import { Button } from "@/components/ui/button";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";
import { Link, Navigate } from "react-router-dom";
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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";

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

      <div className="flex gap-3 mx-2 lg:w-4/5 lg:mx-auto flex-col lg:flex-row">
          <div className="container border rounded-lg lg:w-[300px] h-fit pb-5">
              <div className="p-4 flex">
                  <img src={image} className={"rounded-full size-16"}/>
                  <div className="ml-2 mt-2">
                        <b>{userDetails.fullName || "User"}</b>
                        <p>{}</p>
                  </div>
                  <div className="mt-4 ml-2">
                      <Link to={`/p/${userDetails.uid}/update`}>
                          <Button variant="ghost">
                              <Edit/>
                          </Button>
                      </Link>
                  </div>
              </div>

              <ul className="mx-4 space-y-3">
                  <li className={"flex gap-2"}>
                      <Linkedin/>
                      <p><a href={userDetails.linkedIn} target="_blank">{userDetails.linkedIn}</a></p>
                  </li>
                  <li className={"flex gap-2"}>
                      <Github/>
                      <p><a href={userDetails.github} target="_blank">{userDetails.github}</a></p>
                  </li>
                  <li className={" flex gap-2"}>
                      <School className={"size-[24px]"}/>
                      {userDetails.education}
                  </li>
                  <li className={"flex gap-2"}>
                      <Calendar className={"size-[24px]"}/>
                      {userDetails.age}
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
