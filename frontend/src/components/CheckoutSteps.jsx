import { Nav } from "react-bootstrap"; // Importing the Nav component from react-bootstrap for navigation
import { LinkContainer } from "react-router-bootstrap"; // Importing LinkContainer to handle navigation with react-router

// Functional component that renders the checkout steps navigation bar
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    // Nav component from react-bootstrap to create a navigation bar with justified content and bottom margin
    <Nav className="justify-content-center mb-4">
      
      {/* Nav.Item represents each step in the checkout process */}
      <Nav.Item>
        {/* Conditional rendering: If step1 is true, render a clickable link to the login page. Otherwise, render a disabled link */}
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {/* Conditional rendering: If step2 is true, render a clickable link to the shipping page. Otherwise, render a disabled link */}
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {/* Conditional rendering: If step3 is true, render a clickable link to the payment page. Otherwise, render a disabled link */}
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {/* Conditional rendering: If step4 is true, render a clickable link to the place order page. Otherwise, render a disabled link */}
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps; // Exporting the CheckoutSteps component as the default export
