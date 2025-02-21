import { useState, useEffect } from "react";
import { db } from "../../configs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Spin from "../Spin"

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
  if (!otherProfileData) return <p>User does not exist</p>;

  return (
    <div>
      <h2>{otherProfileData.fullName || "No Name"}</h2>
      <p>Email: {otherProfileData.mail || "No Email"}</p>
      <p>Location: {otherProfileData.location || "No Location"}</p>
      {otherIdeaData.map((idea, index) => (
        <p key={idea.id}>
            {index + 1}. {idea.description} - <strong>{idea.status}</strong>  
            (by {idea.creator})
        </p>
        ))}

    </div>
  );
}
