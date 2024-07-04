// Importing necessary components from 'react-router-dom' and 'react-bootstrap'.
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
// Importing the custom Message component for displaying error messages.
import Message from './Message';
// Importing the custom hook for fetching top products from the products API slice.
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

// Defining the ProductCarousel component.
const ProductCarousel = () => {
  // Using the useGetTopProductsQuery hook to fetch top products.
  // Destructuring the returned data, loading state, and error state.
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // Rendering the carousel or error/loading messages based on the query state.
  return isLoading ? null : error ? (
    // If there's an error, display the error message using the Message component.
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    // If data is successfully fetched, display the carousel with product items.
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        // Rendering each product as a Carousel.Item.
        <Carousel.Item key={product._id}>
          {/* Wrapping the product image and caption in a Link to navigate to the product's detail page. */}
          <Link to={`/product/${product._id}`}>
            {/* Displaying the product image. */}
            <Image src={product.image} alt={product.name} style={{ width: '300px', height: '200px', margin: 'auto' }} className="d-block mx-auto" fluid />
            {/* Displaying the product name and price as a caption. */}
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// Exporting the ProductCarousel component as the default export.
export default ProductCarousel;
