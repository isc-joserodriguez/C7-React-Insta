import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { newPost } from "../services";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmited = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    const formData = new FormData(event.target);
    const { error } = await newPost(formData);

    if (error) {
      setErrorMessage(error);
    } else {
      event.target.reset();
      navigate("/profile");
    }
    setIsLoading(false);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <Form onSubmit={onSubmited}>
      <Form.Group className="mb-3" controlId="picture">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="picture" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Description"
          name="description"
          style={{ height: "100%" }}
        />
      </Form.Group>

      <label style={{ color: "red" }}>{errorMessage}</label>
      <br />
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default NewPostPage;
