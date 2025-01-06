import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('email');
    const savedPassword = sessionStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setValue('email', savedEmail);
      setValue('password', savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data;

      login(user, token);
      toast.success('Login successful!');
      if (rememberMe) {
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);

      } else {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');

      }

      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email address',
                }
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <div className="remember-me">
            <label>
              <input
                className='checkbox-input'
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" disabled={loading}>Login</button>

          <div className="form-footer">
            <p><Link to="/reset-password" className="link-button">Forgot Password?</Link></p>
          </div>

        </form>

        <div className="form-footer">
          <p>Not a user? <Link to="/register" className="link-button">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
