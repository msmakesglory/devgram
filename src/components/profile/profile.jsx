import { Button } from "@/components/ui/button";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";


const Profile = () => {
  const { userDetails } = useProfileContext();
  const { handleSignout } = useAuthContext()
  if (!userDetails.uid) {
    return <p>user not signed in</p>
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{userDetails.uid}</h2>
      <Button><Link to={"/p/update"}>Update Profile</Link></Button>
      <Button onClick={handleSignout}>Signout</Button>
    </div>
  );
};

export default Profile;
