import { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import { Form, Button, Col } from "react-bootstrap"; 
import FormContainer from "../components/FormContainer"; 
import CheckoutSteps from "../components/CheckoutSteps"; 
import { savePaymentMethod } from "../slices/cartSlice"; 

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal"); // Initializing paymentMethod state with "PayPal"

  const dispatch = useDispatch(); // Creating a dispatch function to dispatch actions to the Redux store
  const navigate = useNavigate(); // Creating a navigate function to programmatically navigate

  const cart = useSelector((state) => state.cart); // Selecting cart state from the Redux store
  const { shippingAddress } = cart; // Destructuring shippingAddress from cart

  // useEffect hook to redirect to the shipping page if shippingAddress is not present
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping"); // Navigate to shipping page if shippingAddress is undefined
    }
  }, [shippingAddress, navigate]); // Dependency array: this effect runs whenever shippingAddress or navigate changes

  // Handler function to submit the payment method
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(savePaymentMethod(paymentMethod)); // Dispatch the savePaymentMethod action with the selected payment method
    navigate("/placeorder"); // Navigate to the place order page
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 /> {/* Render the checkout steps component with steps 1, 2, and 3 active */}
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"} // Check this option if paymentMethod is "PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)} // Update paymentMethod state on change
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary"> {/* Submit button */}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen; // Exporting PaymentScreen component as default export
