import { useContext, useEffect } from "react";
import { useState } from "react";
import { getPostsFollows } from "../services";
import Loader from "../components/Loader";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import PostsComponent from "../components/PostsComponent";
import { Link } from "react-router-dom";

const PrivateHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { saveFollowsPosts, followsPosts } = useContext(PostContext);
  const { userId } = useContext(UserContext);

  const getPosts = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    const { detalles, error } = await getPostsFollows();

    if (error) {
      setErrorMessage(error);
    } else {
      saveFollowsPosts(detalles);
    }
    setIsLoading(false);
  };

  const updatePosts = (index, likeStatus) => {
    const updatedPosts = [...followsPosts];
    const updatedPost = updatedPosts[index];

    if (likeStatus) {
      updatedPost.likes.push(userId);
    } else {
      updatedPost.likes = updatedPost.likes.filter((like) => like !== userId);
    }
    updatedPosts[index] = updatedPost;

    saveFollowsPosts(updatedPosts);
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <Loader />
  ) : errorMessage ? (
    <h1>
      {errorMessage} Sigue a más personas <Link to="/search">Ir ahora</Link>
    </h1>
  ) : (
    <PostsComponent posts={followsPosts} updatePosts={updatePosts} />
  );
};

export default PrivateHomePage;
