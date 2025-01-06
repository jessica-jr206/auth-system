import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { StyledComponent } from '../styles/style';
import CardDisplay from './CardDisplay';

const Dashboard = () => {
  const { auth, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const [username, setUsername] = useState(auth?.username || '');
  const [email, setEmail] = useState(auth?.email || '');

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await api.put('/auth/update-profile', {
        username: data.username,
        email: data.email,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`,
        },
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
      setIsProfileModalOpen(false);
    }
  };

  const handlePasswordChange = async (data) => {
    setLoading(true);
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`,
        },
      });
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
      setIsPasswordModalOpen(false);
    }
  };

  const handleAddNews = async (data) => {
    console.log('calling')
    setLoading(true);
    try {
      const response = await api.post('/auth/add-news', {
        title: data.title,
        description: data.description,
        photo: data.photo,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`,
        },
      });
      toast.success('News added successfully!');
    } catch (error) {
      toast.error('Failed to add news');
    } finally {
      setLoading(false);
      setIsNewsModalOpen(false);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome {auth?.username}!</p>

      <div className="button-container">
        <button className="button" onClick={() => setIsProfileModalOpen(true)}>Update Profile</button>
        <button className="button" onClick={() => setIsPasswordModalOpen(true)}>Change Password</button>
        <button className="button" onClick={() => setIsNewsModalOpen(true)}>Add News</button> {/* New button to open News modal */}
        <button className="button" onClick={logout}>Logout</button>
      </div>

      <CardDisplay />

      {/* Profile Update Modal */}
      <Modal show={isProfileModalOpen} onHide={() => setIsProfileModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledComponent>
            <Form onSubmit={handleSubmit(handleProfileUpdate)}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && <p className="error-message">{errors.username.message}</p>}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </Form.Group>

              <Button type="submit" disabled={loading} >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </Form>
          </StyledComponent>
        </Modal.Body>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={isPasswordModalOpen} onHide={() => setIsPasswordModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledComponent>
            <Form onSubmit={handleSubmit(handlePasswordChange)}>
              <Form.Group controlId="currentPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("currentPassword", { required: "Current password is required" })}
                />
                {errors.currentPassword && <p className="error-message">{errors.currentPassword.message}</p>}
              </Form.Group>

              <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
                      message: "Password must contain at least one uppercase letter, one number, and one special character"
                    }
                  })}
                />
                {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) => value === getValues("newPassword") || "Passwords must match"
                  })}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
              </Form.Group>

              <Button type="submit" disabled={loading} >
                {loading ? 'Changing...' : 'Change Password'}
              </Button>
            </Form>
          </StyledComponent>
        </Modal.Body>
      </Modal>

      <Modal show={isNewsModalOpen} onHide={() => setIsNewsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledComponent>
            <Form onSubmit={handleSubmit((data) => handleAddNews(data))}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="error-message">{errors.title.message}</p>}
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && <p className="error-message">{errors.description.message}</p>}
              </Form.Group>

              <Form.Group controlId="photo">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="text"
                  {...register("photo", { required: "Photo URL is required" })}
                />
                {errors.photo && <p className="error-message">{errors.photo.message}</p>}
              </Form.Group>

              <Button type="submit" disabled={loading}>
                {loading ? 'Adding News...' : 'Add News'}
              </Button>
            </Form>
          </StyledComponent>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Dashboard;
