import { useState, createContext } from "react";

const PostContext = createContext();
const { Provider } = PostContext;

const PostProvider = ({ children }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [followsPosts, setFollowsPosts] = useState([]);

  const saveMyPosts = (posts) => setMyPosts(posts);
  const saveFollowsPosts = (posts) => setFollowsPosts(posts);
  const clearPosts = () => {
    setMyPosts([]);
    setFollowsPosts([]);
  };

  return (
    <Provider
      value={{
        myPosts,
        saveMyPosts,
        followsPosts,
        saveFollowsPosts,
        clearPosts,
      }}
    >
      {children}
    </Provider>
  );
};

export { PostProvider, PostContext };
