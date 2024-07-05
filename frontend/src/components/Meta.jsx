// Import the Helmet component from the react-helmet-async library
import { Helmet } from "react-helmet-async";

// Define a functional component named Meta
// This component takes three props: title, description, and keywords
const Meta = ({ title, description, keywords }) => {
  return (
    // The Helmet component allows us to manage changes to the document head
    <Helmet>
      {/* Set the title of the document */}
      <title>{title}</title>
      {/* Set the meta description tag */}
      <meta name="description" content={description} />
      {/* Set the meta keywords tag */}
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

// Define default prop values for the Meta component
// These defaults will be used if no corresponding props are provided
Meta.defaultProps = {
  title: "Welcome to OleskaLt Baby Shop",
  description: "We sell the best products for cheap",
  keywords: "baby, baby clothes, buy baby clothes, cheap baby clothes, buy clothes, cheap clothes",
};

// Export the Meta component as the default export
export default Meta;
