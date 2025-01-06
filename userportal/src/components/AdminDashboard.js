import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../utils/api';
import { useForm } from 'react-hook-form';
import { StyledComponent } from '../styles/style';

const AdminDashboard = () => {
  const { auth, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  // For delete confirmation
  const [userToDelete, setUserToDelete] = useState(null);  // Store user to delete

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/auth/users', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setValue('username', user.username);
    setValue('email', user.email);
    setValue('role', user.role);
    setShowModal(true);
  };

  const handleUpdate = async (data) => {
    try {
      const response = await api.put(`/auth/edit-user/${currentUser.id}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`,
        },
      });
      const updatedUser = response.data.user;

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/auth/delete-user/${userToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userToDelete.id));  // Remove user from state
      setShowDeleteConfirm(false);  // Close the delete confirmation modal
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleDeleteClose = () => setShowDeleteConfirm(false);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome Admin, {auth?.email}!</p>
      <button className="button" onClick={logout}>Logout</button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => { setUserToDelete(user); setShowDeleteConfirm(true); }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledComponent>
            <Form onSubmit={handleSubmit(handleUpdate)}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Username must be at least 3 characters long' }
                  })}
                />
                {errors.username && <p className="error-message">{errors.username.message}</p>}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address' }
                  })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  {...register('role', { required: 'Role is required' })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
                {errors.role && <p className="error-message">{errors.role.message}</p>}
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Update User
              </Button>
            </Form>
          </StyledComponent>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledComponent>
            <p>Are you sure you want to delete this user?</p>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
          </StyledComponent>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
