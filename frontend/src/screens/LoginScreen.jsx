// Importing necessary hooks and components from React, react-router-dom, and react-bootstrap libraries
import { useState, useEffect } from "react"; // React hooks for state and lifecycle management
import { Link, useLocation, useNavigate } from "react-router-dom"; // React Router hooks for navigation and URL handling
import { Form, Button, Row, Col } from "react-bootstrap"; // Bootstrap components for form and layout
import FormContainer from "../components/FormContainer"; // Custom component for form layout
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import Loader from "../components/Loader"; // Loader component for indicating loading state
import { useLoginMutation } from "../slices/usersApiSlice"; // API slice for login mutation
import { setCredentials } from "../slices/authSlice"; // Action to set user credentials in Redux store
import { toast } from "react-toastify"; // Toast notifications for error handling

// Defining a functional component called LoginScreen
const LoginScreen = () => {
  // Using useState hook to manage email and password state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initializing dispatch for Redux actions
  const dispatch = useDispatch();
  // Initializing navigate function for navigation
  const navigate = useNavigate();
  // Using custom hook for login mutation and destructuring isLoading state
  const [login, { isLoading }] = useLoginMutation();

  // Extracting userInfo from Redux state using useSelector hook
  const { userInfo } = useSelector((state) => state.auth);

  // Extracting query parameters from the current URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; // Default redirect path

  // useEffect hook to redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Redirecting to specified path
    }
  }, [userInfo, redirect, navigate]);

  // Defining a handler function for form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    try {
      // Attempting login with email and password
      const res = await login({ email, password }).unwrap();
      // Dispatching setCredentials action with response data
      dispatch(setCredentials({ ...res }));
      // Navigating to redirect path
      navigate(redirect);
    } catch (err) {
      // Displaying error message using toast notifications
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    // Wrapping the form in a custom FormContainer component
    <FormContainer>
      {/* Displaying the heading */}
      <h1>Sign In</h1>

      {/* Defining the form with an onSubmit event handler */}
      <Form onSubmit={submitHandler}>
        {/* Form group for email input */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          {/* Controlled input for email address */}
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Form group for password input */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          {/* Controlled input for password */}
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit button for the form */}
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading} // Disabling the button if loading
        >
          Sign In
        </Button>

        {/* Displaying Loader component if loading */}
        {isLoading && <Loader />}
      </Form>

      {/* Row for additional information or links */}
      <Row className="py-3">
        <Col>
          {/* Link to the registration page for new customers */}
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

// Exporting the LoginScreen component for use in other parts of the application
export default LoginScreen;
