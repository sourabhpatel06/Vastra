// src/admin/ManageUsers.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css'; // optional: for custom styles

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [output, setOutput] = useState("");

  const token = localStorage.getItem("token");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setOutput("Failed to fetch users");
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOutput("User deleted successfully");
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
      setOutput("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Manage Users</h2>
      {output && <p style={{ color: "red" }}>{output}</p>}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile || "N/A"}</td>
              <td>{user.city || "N/A"}</td>
              <td>{user.role || "user"}</td>
              <td>{user.status || "active"}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
