import { auth } from "../../configs/firebase";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "../../context/ProfileContext";
import { useAuthContext } from "../../context/authContext";

const Profile = () => {
  const { userDetails } = useProfileContext();
  const { signout } = useAuthContext();

  return (
    <div>
      <h1>Profile Page</h1>
      {userDetails?.name ? (
        <div>
          <h1><b>{userDetails.name}</b></h1>
          <p><strong>Email:</strong> {auth.currentUser?.email || "No email available"}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
      <Button onClick={() => signout()}>Logout</Button>
    </div>
  );
};

export default Profile;
