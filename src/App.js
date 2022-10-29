import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NavComponent from "./components/Nav";
import { UserContext } from "./context/UserContext";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

function App() {
  const { token } = useContext(UserContext);
  return (
    <>
      <NavComponent />
      <Container>
        <Routes>
          {(!token ? PUBLIC_ROUTES : PRIVATE_ROUTES).map((route, index) => (
            <Route key={index} {...route} />
          ))}
          {token !== undefined && (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;
