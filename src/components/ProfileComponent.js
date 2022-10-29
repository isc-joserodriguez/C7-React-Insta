import { useContext, useEffect } from "react";
import { useState } from "react";
import { getPostsByUsername, getUserData, toggleFollow } from "../services";
import Loader from "../components/Loader";
import { Button, Card } from "react-bootstrap";
import PostsComponent from "../components/PostsComponent";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProfileComponent = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const { userId } = useContext(UserContext);

  const getUserInfo = async () => {
    setIsLoading(true);
    const { detalles, error } = await getUserData(username);
    if (!error) {
      setUserInfo(detalles);
    }
    setIsLoading(false);
  };
  const getUserPosts = async () => {
    setIsLoading(true);
    const { detalles, error } = await getPostsByUsername(username);
    if (!error) {
      setUserPosts(detalles);
    }
    setIsLoading(false);
  };
  const updatePosts = (index, likeStatus) => {
    const updatedPosts = [...userPosts];
    const updatedPost = updatedPosts[index];

    if (likeStatus) {
      updatedPost.likes.push(userId);
    } else {
      updatedPost.likes = updatedPost.likes.filter((like) => like !== userId);
    }
    updatedPosts[index] = updatedPost;

    setUserPosts(updatedPosts);
  };
  const onToggleFollow = async (followId, followStatus) => {
    await toggleFollow(followId);
    const updatedUserInfo = { ...userInfo };

    if (followStatus) {
      updatedUserInfo.followers.push(userId);
    } else {
      updatedUserInfo.followers = updatedUserInfo.followers.filter(
        (follower) => follower !== userId
      );
    }

    setUserInfo(updatedUserInfo);
  };

  useEffect(() => {
    getUserInfo();
    getUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_URI_IMAGES}/${userInfo.avatar}`}
        />
        <Card.Body>
          <Card.Title>{userInfo.username}</Card.Title>
          <Card.Text>{userInfo.biography}</Card.Text>
          <Card.Footer className="text-muted">
            Follow: {userInfo.follows.length} | Followers:{" "}
            {userInfo.followers.length}
            <br />
            <Button
              onClick={() => {
                onToggleFollow(
                  userInfo._id,
                  !userInfo.followers.includes(userId)
                );
              }}
              variant={
                userInfo.followers.includes(userId) ? "danger" : "success"
              }
            >
              {!userInfo.followers.includes(userId) ? "Follow" : "Unfollow"}
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      {!userPosts.length ? (
        <h1>
          Sin publicaciones. <Link to="/new-post">Crea una!</Link>
        </h1>
      ) : (
        <PostsComponent posts={userPosts} updatePosts={updatePosts} />
      )}
    </>
  );
};

export default ProfileComponent;
