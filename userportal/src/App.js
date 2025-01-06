import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './Pages/Home';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledComponent } from './styles/style';

function App() {
  return (
    <StyledComponent>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['user', 'admin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </StyledComponent>
  );
}

export default App;
