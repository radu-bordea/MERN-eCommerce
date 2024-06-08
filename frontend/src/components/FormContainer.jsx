// Importing necessary components from react-bootstrap library
import { Container, Row, Col } from "react-bootstrap";

// Defining a functional component called FormContainer that takes children as a prop
const FormContainer = ({ children }) => {
  return (
    // Wrapping the content in a Bootstrap Container for consistent padding and responsive behavior
    <Container>
      {/* Using a Row component to create a flexbox container and centering its content */}
      <Row className="justify-content-md-center">
        {/* Using a Col component to define the column size. It spans 12 columns on extra small screens and 6 columns on medium screens and above */}
        <Col xs={12} md={6}>
          {/* Rendering the children passed to the FormContainer */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

// Exporting the FormContainer component for use in other parts of the application
export default FormContainer;
