// Import necessary components from react-bootstrap
import { Row, Col } from "react-bootstrap";
// Import custom components
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
// Import the useGetProductsQuery hook from the productsApiSlice
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  // Fetch product data using the useGetProductsQuery hook
  // Destructure the returned data, loading state, and error state
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        // Display Loader component if data is still loading
        <Loader />
      ) : error ? (
        // Display error message if an error occurred
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1> {/* Header for the product list */}
          <Row>
            {products.map((product) => (
              // Map through the products and render a Product component for each one
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
