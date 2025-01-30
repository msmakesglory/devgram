import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../configs/firebase"
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/ProfileContext";


const Profile = () => {
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const Auth = auth;
  const { userDetails, setUserDetails } = useProfileContext();
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
    
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   } else {
  //     // Check if user is logged in using Firebase
  //     onAuthStateChanged(auth, (currentUser) => {
  //       if (currentUser) {
  //         setUser(currentUser);
  //       }
  //     });
  //   }
  // }, [Auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails({})
    navigate("/login");
  }


  return (
    <div>
      <h1>Profile Page</h1>
      {userDetails.name ? (
        <div>
          <h1><b>{userDetails.name}</b></h1>
          <p><strong>Email:</strong> {auth.currentUser.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
      <Button onClick={handleLogout}>logout</Button>
    </div>
  )
}

export default Profile;
