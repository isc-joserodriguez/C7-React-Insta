import { useParams } from "react-router-dom";
import MyProfileComponent from "../components/MyProfileComponent";
import ProfileComponent from "../components/ProfileComponent";

const ProfilePage = () => {
  const { username } = useParams();
  return username ? (
    <ProfileComponent username={username} />
  ) : (
    <MyProfileComponent />
  );
};

export default ProfilePage;
