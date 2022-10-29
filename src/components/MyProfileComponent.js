import { useContext, useEffect } from "react";
import { useState } from "react";
import { getMyData, getMyPosts } from "../services";
import Loader from "../components/Loader";
import { Card } from "react-bootstrap";
import { PostContext } from "../context/PostContext";
import PostsComponent from "../components/PostsComponent";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MyProfileComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const { saveMyPosts, myPosts } = useContext(PostContext);
  const { userId } = useContext(UserContext);

  const getUserInfo = async () => {
    setIsLoading(true);
    const { detalles, error } = await getMyData();
    if (!error) {
      setUserInfo(detalles);
    }
    setIsLoading(false);
  };
  const getUserPosts = async () => {
    setIsLoading(true);
    const { detalles, error } = await getMyPosts();
    if (!error) {
      saveMyPosts(detalles);
    }
    setIsLoading(false);
  };
  const updatePosts = (index, likeStatus) => {
    const updatedPosts = [...myPosts];
    const updatedPost = updatedPosts[index];

    if (likeStatus) {
      updatedPost.likes.push(userId);
    } else {
      updatedPost.likes = updatedPost.likes.filter((like) => like !== userId);
    }
    updatedPosts[index] = updatedPost;

    saveMyPosts(updatedPosts);
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
          </Card.Footer>
        </Card.Body>
      </Card>
      {!myPosts.length ? (
        <h1>
          Sin publicaciones. <Link to="/new-post">Crea una!</Link>
        </h1>
      ) : (
        <PostsComponent posts={myPosts} updatePosts={updatePosts} />
      )}
    </>
  );
};

export default MyProfileComponent;
