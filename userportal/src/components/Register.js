import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/auth/register', data);
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>
          <div>
            <input
              // type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email address' 
                }
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                pattern: { value: /[A-Z]/, message: 'Password must contain at least one uppercase letter' }
              })}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          <button type="submit" disabled={loading}>Register</button>
        </form>

        <div className="form-footer">
          <p>Already a user? <Link to="/login" className="link-button">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
