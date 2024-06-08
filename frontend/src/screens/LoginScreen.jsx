// Importing necessary hooks and components from React, react-router-dom, and react-bootstrap libraries
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

// Defining a functional component called LoginScreen
const LoginScreen = () => {
  // Using useState hook to manage email and password state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Defining a handler function for form submission
  const submitHandler = (e) => {
    // Preventing the default form submission behavior
    e.preventDefault();
    // Logging "submit" to the console (replace this with actual submit logic)
    console.log("submit");
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
        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>

        {/* Row for additional information or links */}
        <Row className="py-3">
          <Col>
            {/* Link to the registration page for new customers */}
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

// Exporting the LoginScreen component for use in other parts of the application
export default LoginScreen;
