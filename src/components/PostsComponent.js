import { useContext } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { toggleLike } from "../services";
const PostsComponent = ({ posts, updatePosts }) => {
  const { userId } = useContext(UserContext);

  const onToggleLike = async (idPost, index, likeStatus) => {
    await toggleLike(idPost);
    updatePosts(index, likeStatus);
  };

  return (
    <Row style={{ justifyContent: "center" }}>
      {posts.map((post, index) => (
        <Card style={{ margin: "15px" }} key={index} className="col-3">
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_URI_IMAGES}/${post.img}`}
          />
          <Card.Body>
            <Card.Title>{post.user?.username}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <h5>Likes: {post.likes.length}</h5>
            <Button
              onClick={() => {
                onToggleLike(post._id, index, !post.likes.includes(userId));
              }}
              variant={post.likes.includes(userId) ? "danger" : "success"}
            >
              {!post.likes.includes(userId) ? "Like" : "Unlike"}
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Row>
  );
};

export default PostsComponent;
