import { useState, createContext, useEffect } from "react";

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);

  const saveToken = (token) => setToken(token);
  const saveUserId = (userId) => setUserId(userId);

  const clearContext = () => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      saveToken(token);
      saveUserId(userId);
    } else {
      saveToken(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider
      value={{
        token,
        saveToken,
        userId,
        saveUserId,
        clearContext,
      }}
    >
      {children}
    </Provider>
  );
};

export { UserProvider, UserContext };
