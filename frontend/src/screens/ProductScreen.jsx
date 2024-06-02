// Import necessary functions and components from React, react-router-dom, react-bootstrap, and redux
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

// Component to display the product details
const ProductScreen = () => {
  // Extract the productId from the URL parameters
  const { id: productId } = useParams();

  // Initialize the dispatch function from redux
  const dispatch = useDispatch();
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  // State to manage the quantity of the product to be added to the cart
  const [qty, setQty] = useState(1);

  // Fetch product details using the custom hook from productsApiSlice
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Handler function to add the product to the cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); // Dispatch the addToCart action with the product and quantity
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <>
      {/* Link to go back to the previous page */}
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {/* Show loader while loading, error message if there's an error, otherwise show product details */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {/* Column for the product image */}
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          {/* Column for the product details */}
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          {/* Column for the purchase options */}
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                {/* Show quantity selection if the product is in stock */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                {/* Button to add the product to the cart */}
                <ListGroupItem>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
