import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../configs/firebase"
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const Auth = auth;
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Check if user is logged in using Firebase
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        }
      });
    }
  }, [Auth]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
      <Button onClick={handleLogout}>logout</Button>
    </div>
  )
}

export default Profile;
