import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
      />
    </Routes>
  );
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('session');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default App;
