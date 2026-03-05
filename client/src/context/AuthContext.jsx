import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem('token');
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const register = async (name, email, password, confirmPassword, role = 'user') => {
    try {
      setError(null);
      const response = await authService.register({
        name,
        email,
        password,
        confirmPassword,
        role,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await authService.updateProfile(profileData);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Update failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
