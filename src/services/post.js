import axios from "axios";

const path = `${process.env.REACT_APP_URI_API}/post`;

export const getPostsFollows = async () => {
  try {
    const {
      data: { detalles },
    } = await axios.get(`${path}/getPostsFollows`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { detalles };
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const getPostsByUsername = async (username) => {
  try {
    const {
      data: { detalles },
    } = await axios.get(`${path}/getPosts?username=${username}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { detalles };
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const getMyPosts = async () => {
  try {
    const {
      data: { detalles },
    } = await axios.get(`${path}/getPosts`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { detalles };
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const newPost = async (postInfo) => {
  try {
    const {
      data: { detalles },
    } = await axios.post(`${path}/newPost`, postInfo, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { detalles };
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const toggleLike = async (postId) => {
  try {
    const {
      data: { detalles },
    } = await axios.put(
      `${path}/toggleLike`,
      { postId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return { detalles };
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};
