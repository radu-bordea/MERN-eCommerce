import { useState } from "react"; // Importing useState hook from React for managing component state
import { Form, Button } from "react-bootstrap"; // Importing Form and Button components from react-bootstrap library
import { useParams, useNavigate } from "react-router-dom"; // Importing useParams and useNavigate hooks from react-router-dom for route handling

const SearchBox = () => {
  const navigate = useNavigate(); // Initializing navigate function to programmatically navigate to different routes
  const { keyword: urlKeyword } = useParams(); // Extracting 'keyword' parameter from the URL
  const [keyword, setKeyword] = useState(urlKeyword || ""); // Initializing 'keyword' state with the URL keyword or an empty string if no keyword is in the URL

  const submitHandler = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    if (keyword.trim()) { // Checking if the keyword is not just whitespace
      setKeyword(""); // Clearing the keyword state
      navigate(`/search/${keyword}`); // Navigating to the search results page with the keyword
    } else {
      navigate(`/`); // If keyword is empty, navigate to the home page
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)} // Updating the keyword state on input change
        value={keyword} // Setting the value of the input to the keyword state
        placeholder="Search Products..." // Placeholder text for the input field
        className="mr-sm-2 ml-sm-5" // Bootstrap classes for margin
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox; // Exporting the SearchBox component as default export
