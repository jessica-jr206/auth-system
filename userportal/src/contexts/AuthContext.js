import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('user');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth)); 
    }
    setLoading(false); 
  }, []);

  const login = (user, token) => {
    setAuth(user);
    sessionStorage.setItem('auth-token', token); 
    sessionStorage.setItem('user', JSON.stringify(user));  
    navigate('/dashboard');
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user');  
    navigate('/login');
  };

 
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
