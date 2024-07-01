// Import necessary components from 'react-bootstrap' and 'react-router-bootstrap'
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Define the Paginate functional component with props: pages, page, isAdmin, and keyword
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    // Only render the Pagination component if there is more than one page
    pages > 1 && (
      <Pagination>
        {/* Create an array of page numbers and map over it to generate pagination items */}
        {[...Array(pages).keys()].map((x) => (
          // Use LinkContainer to make pagination items clickable links
          <LinkContainer
            key={x + 1}  // Use page number as the key (x is zero-indexed, so add 1)
            to={
              // Determine the link destination based on isAdmin and keyword props
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`  // Link for search results with keyword
                  : `/page/${x + 1}`  // Link for regular pagination
                : `/admin/productlist/${x + 1}`  // Link for admin product list pagination
            }
          >
            {/* Render Pagination.Item, highlighting the current page */}
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

// Export the Paginate component as the default export
export default Paginate;
