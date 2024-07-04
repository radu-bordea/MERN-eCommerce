// Import necessary components from react-bootstrap
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// Import custom components
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
// Import the useGetProductsQuery hook from the productsApiSlice
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams(); // Get the page number from the url
  // Fetch product data using the useGetProductsQuery hook
  // Destructure the returned data, loading state, and error state
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        // Display Loader component if data is still loading
        <Loader />
      ) : error ? (
        // Display error message if an error occurred
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1> {/* Header for the product list */}
          <Row>
            {data.products.map((product) => (
              // Map through the products and render a Product component for each one
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
