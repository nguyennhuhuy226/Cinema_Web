import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../../api/apiUser";
import "./user.css";
import AddUser from "../modal-user/AddUser";
import EditUser from "../modal-user/EditUser";
import DeleteUser from "../modal-user/DeleteUser";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.result);
      console.log(data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await addUser(newUser);
      fetchAllUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await updateUser(id, updatedUser);
      fetchAllUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-container">
      <div className="row">
        <div className="flex items-center justify-between mb-4 row">
          <div className="flex items-center space-x-2 col-xl-6">
            <button
              className="add-user-button"
              onClick={() => setIsAddModalOpen(true)}
            >
              + Add New user
            </button>
          </div>
        </div>

        <div className="w-full">
          <PerfectScrollbar
            style={{ maxHeight: "650px", width: "100%" }}
            options={{ suppressScrollX: false }}
          >
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Birthday</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>********</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.dob}</td>
                    <td className="user-table-actions">
                      <button
                        className="action-button edit"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <MdEdit className="h-4 w-4" />
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <MdDelete className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddUser
          title="Add New User"
          onClose={() => setIsAddModalOpen(false)}
          onSave={(newUser) => {
            handleAddUser(newUser);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <EditUser
          title="Edit User"
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedUser) => {
            handleUpdateUser(selectedUser.id, updatedUser);
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedUser && (
        <DeleteUser
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDeleteUser(selectedUser.id);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default User;
