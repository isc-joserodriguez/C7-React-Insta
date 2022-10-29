import { useEffect, useState } from "react";
import { Card, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { searchByUsername } from "../services";
const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const getAllUsers = async (username) => {
    setIsLoading(true);
    const { detalles, error } = await searchByUsername(username);
    if (error) {
      setUserList([]);
    } else {
      setUserList(detalles);
    }
    setIsLoading(false);
  };
  const onChanged = (event) => getAllUsers(event.target.value);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" onChange={onChanged} />
      </Form.Group>
      {isLoading ? (
        <Loader />
      ) : !userList.length ? (
        <h1>No hay coincidencias</h1>
      ) : (
        <Row style={{ justifyContent: "center" }}>
          {userList.map((user, index) => (
            <Card style={{ margin: "15px" }} key={index} className="col-3">
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_URI_IMAGES}/${user.avatar}`}
              />
              <Card.Body>
                <Card.Title>
                  <Link to={`/profile/${user.username}`}>{user.username}</Link>
                </Card.Title>
                <Card.Text>{user.biography}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      )}
    </>
  );
};

export default SearchPage;
