import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";

const LogoutPage = () => {
  const { clearContext } = useContext(UserContext);
  const { clearPosts } = useContext(PostContext);
  useEffect(() => {
    clearContext();
    clearPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <h1>Cerrando sesión</h1>;
};

export default LogoutPage;
