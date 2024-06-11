import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart); // Selects the cart state from the Redux store
  const { shippingAddress } = cart; // Destructures the shippingAddress from the cart state

  // Initializes state variables with the existing shipping address or empty strings
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate(); // Hook to programmatically navigate
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Handler function for form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    dispatch(saveShippingAddress({ address, city, postalCode, country })); // Dispatches the saveShippingAddress action with the form data
    navigate("/payment"); // Navigates to the payment page
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />{" "}
      {/* Renders the checkout steps component with steps 1 and 2 active */}
      <h1>Shipping</h1> {/* Header for the shipping form */}
      {/* Form for entering shipping details */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Updates the address state on change
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Updates the city state on change
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)} // Updates the postalCode state on change
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)} // Updates the country state on change
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          {" "}
          {/* Submit button for the form */}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen; // Exports the ShippingScreen component as the default export
