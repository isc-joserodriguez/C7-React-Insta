import { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { signup } from "../services";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { saveToken, saveUserId } = useContext(UserContext);

  const onSubmited = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    const formData = new FormData(event.target);
    const { token, userId, error } = await signup(formData);

    if (error) {
      setErrorMessage(error);
    } else {
      saveToken(token);
      saveUserId(userId);
      event.target.reset();
    }
    setIsLoading(false);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <Form onSubmit={onSubmited}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" name="username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="biography">
        <Form.Label>Biography</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Biography"
          name="biography"
          style={{ height: "100%" }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="picture">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" name="picture" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>

      <label style={{ color: "red" }}>{errorMessage}</label>
      <br />
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
      <br />
      <p>
        Do you already have an account? <Link to="/login">Log in</Link>
      </p>
    </Form>
  );
};

export default LoginPage;
