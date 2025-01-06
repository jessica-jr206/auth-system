import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
