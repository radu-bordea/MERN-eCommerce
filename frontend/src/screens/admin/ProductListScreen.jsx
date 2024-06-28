// Import necessary components, icons, and hooks
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";

const ProductListScreen = () => {
  // Fetch products data using the useGetProductsQuery hook
  // Destructure the returned data, loading state, error state, and refetch function
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  // Set up the createProduct mutation hook with a loading state
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  // Set up the deleteProduct mutation hook with a loading state
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  // Handler function for deleting a product
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id); // Attempt to delete the product
        refetch(); // Refetch the products to update the list
        toast.success('Product deleted'); // Show success message
      } catch (err) {
        toast.error(err?.data?.message || err.message); // Show error message if deletion fails
      }
    }
  };

  // Handler function for creating a new product
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct(); // Attempt to create a new product
        refetch(); // Refetch the products to update the list
      } catch (err) {
        toast.error(err?.data?.message || err.error); // Show error message if creation fails
      }
    }
  };

  return (
    <>
      {/* Header and create product button */}
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create a Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />} {/* Show loader if creating a product */}
      {loadingDelete && <Loader />} {/* Show loader if deleting a product */}

      {/* Conditional rendering based on loading and error states */}
      {isLoading ? (
        <Loader /> // Show loader while fetching data
      ) : error ? (
        <Message variant="danger">{error}</Message> // Show error message if data fetch fails
      ) : (
        <>
          {/* Table displaying the list of products */}
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>PRICE</td>
                <td>CATEGORY</td>
                <td>BRAND</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* Edit and delete buttons for each product */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
