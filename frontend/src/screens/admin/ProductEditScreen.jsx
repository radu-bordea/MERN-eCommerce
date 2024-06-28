// Import necessary components, hooks, and utilities
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  // Extract productId from the URL params using useParams hook
  const { id: productId } = useParams();

  // Initialize local state variables for form fields and hooks for fetching and mutations
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  // Fetch product details using useGetProductDetailsQuery hook
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // Mutation hooks for updating product and uploading product image
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  // Use navigate hook for navigation within the application
  const navigate = useNavigate();

  // Handler function for form submission to update product details
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // Unwrap the Promise returned by updateProduct to catch any errors
      toast.success("Product updated"); // Show success message upon successful update
      refetch(); // Refetch product details to update the UI
      navigate("/admin/productlist"); // Redirect to product list after update
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Show error message if update fails
    }
  };

  // Effect hook to set form fields with fetched product data on initial load
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]); // Dependency array ensures this effect runs when 'product' data changes

  // Handler function for uploading product image
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // Append selected file to FormData object
    try {
      const res = await uploadProductImage(formData).unwrap(); // Unwrap the Promise returned by uploadProductImage
      toast.success(res.message); // Show success message upon successful image upload
      setImage(res.image); // Update image state with uploaded image URL
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Show error message if image upload fails
    }
  };

  return (
    <>
      {/* Link to navigate back to product list */}
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      {/* Container for the form */}
      <FormContainer>
        <h1>Edit Product</h1>

        {/* Loader while updating product */}
        {loadingUpdate && <Loader />}

        {/* Conditional rendering based on loading and error states */}
        {isLoading ? (
          <Loader /> // Show loader while fetching product details
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message> // Show error message if fetch fails
        ) : (
          <Form onSubmit={submitHandler}>
            {/* Form fields for editing product details */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            {/* Form field for uploading product image */}
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <Loader />} {/* Show loader while uploading image */}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Submit button to update product */}
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
