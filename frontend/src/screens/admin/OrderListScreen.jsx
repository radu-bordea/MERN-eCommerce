// Import necessary components, hooks, and utilities
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { useParams } from "react-router-dom";

const OrderListScreen = () => {
  const { pageNumber } = useParams(); // Extract the page number from the URL parameters

  // Fetch orders data using useGetOrdersQuery hook
  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  // Log orders data to console for debugging purposes

  return (
    <>
      {/* Title for the screen */}
      <h1>Orders</h1>

      {/* Conditional rendering based on loading and error states */}
      {isLoading ? (
        <Loader /> // Show loader while fetching orders
      ) : error ? (
        <Message variant="danger">{error}</Message> // Show error message if fetch fails
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              {/* Table header with column titles */}
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over orders to display each order as a row in the table */}
              {data.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td> {/* Display order ID */}
                  <td>{order.user && order.user.name}</td>{" "}
                  {/* Display user name if available */}
                  <td>{order.createdAt.substring(0, 10)}</td>{" "}
                  {/* Display order creation date */}
                  <td>{order.totalPrice}</td>{" "}
                  {/* Display total price of the order */}
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10) // Display paid date if order is paid
                    ) : (
                      <FaTimes style={{ color: "red" }} /> // Display red cross if order is not paid
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10) // Display delivery date if order is delivered
                    ) : (
                      <FaTimes style={{ color: "red" }} /> // Display red cross if order is not delivered
                    )}
                  </td>
                  <td>
                    {/* Button to navigate to order details */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            keyword="orderlist"
          />
        </>
      )}
    </>
  );
};

export default OrderListScreen;