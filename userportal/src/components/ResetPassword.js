import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const newPassword = watch('newPassword');
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      };
      await api.post('/auth/reset-password', payload);
      toast.success('Password has been updated successfully!');
      navigate('/login'); 
    } catch (error) {
      toast.error(error.response?.data.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };


  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <div className="form-container">
      <div className="card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="password"
              placeholder="Current Password"
              {...register('currentPassword', { required: 'Current password is required' })}
            />
            {errors.currentPassword && <span className="error-message">{errors.currentPassword.message}</span>}
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                pattern: { value: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
              })}
            />
            {errors.newPassword && <span className="error-message">{errors.newPassword.message}</span>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Recheck New Password"
              {...register('recheckPassword', {
                required: 'Please re-enter your new password',
                validate: (value) => value === newPassword || 'Passwords do not match',
              })}
            />
            {errors.recheckPassword && <span className="error-message">{errors.recheckPassword.message}</span>}
          </div>

          <button type="submit" disabled={loading}>Reset Password</button>
          <div className="form-footer">
          <button onClick={handleGoBack}>Back</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
