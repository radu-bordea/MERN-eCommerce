// Importing necessary hooks and components from React, React Router, React Bootstrap, and other custom components and hooks.
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  // Extracting the userId parameter from the URL.
  const { id: userId } = useParams();

  // Defining state variables for user details.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetching user details and handling loading and error states.
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  // Defining the mutation for updating a user.
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  // Defining the navigate function to programmatically navigate.
  const navigate = useNavigate();

  // useEffect hook to set the state with user details when the user data is fetched.
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  // Handler function to handle form submission.
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch(); // Refetch user details after update.
      navigate("/admin/userlist"); // Navigate back to the user list.
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Display error message.
    }
  };

  // Rendering the form for editing user details.
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />} {/* Show loader while updating */}
        {isLoading ? ( // Show loader while fetching user details.
          <Loader />
        ) : error ? ( // Show error message if there's an error.
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

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

export default UserEditScreen;
