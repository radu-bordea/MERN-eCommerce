// Import necessary components and hooks
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

const UserListScreen = () => {
  const { pageNumber } = useParams(); // Get the pageNumber from the url

  // Fetch user data using the useGetUsersQuery hook
  // Destructure the returned data, refetch function, loading state, and error state
  const { data, refetch, isLoading, error } = useGetUsersQuery({ pageNumber });

  // Set up the deleteUser mutation hook with a loading state
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  // Handler function for deleting a user
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id); // Attempt to delete the user
        toast.success("User deleted"); // Show success message
        refetch(); // Refetch the users to update the list
      } catch (err) {
        toast.error(err?.data?.message || err.message); // Show error message if deletion fails
      }
    }
  };

  return (
    <>
      <h1>Users</h1> {/* Header for the user list */}
      {loadingDelete && <Loader />}{" "}
      {/* Show loader if delete operation is in progress */}
      {isLoading ? (
        <Loader /> // Show loader if data is still loading
      ) : error ? (
        <Message variant="danger">{error}</Message> // Show error message if an error occurred
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} /> // Show check icon if user is admin
                    ) : (
                      <FaTimes style={{ color: "red" }} /> // Show times icon if user is not admin
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit /> {/* Edit button */}
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: "white" }} />{" "}
                      {/* Delete button */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            keyword="userlist"
          />
        </>
      )}
    </>
  );
};

export default UserListScreen;
