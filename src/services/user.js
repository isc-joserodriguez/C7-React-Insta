import axios from "axios";

const path = `${process.env.REACT_APP_URI_API}/user`;

export const getMyData = async () => {
  try {
    const { data } = await axios.get(`${path}/getUserData`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const getUserData = async (username) => {
  try {
    const { data } = await axios.get(`${path}/getUserData?username=${username}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const toggleFollow = async (userId) => {
  try {
    const { data } = await axios.put(
      `${path}/toggleFollow`,
      { userId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};

export const searchByUsername = async (username) => {
  try {
    const { data } = await axios.get(
      `${path}/getAllUsers${username ? `?username=${username}` : ""}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (e) {
    return { error: e.response.data.detalles };
  }
};
