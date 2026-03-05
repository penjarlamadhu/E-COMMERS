import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';
import { useAuth } from '../context/AuthContext';
import Error from '../components/Error';
import Success from '../components/Success';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default to user
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.role
      );
      setSuccess('Registration successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {error && <Error message={error} onDismiss={() => setError(null)} />}
      {success && (
        <Success message={success} onDismiss={() => setSuccess(null)} />
      )}

      <div className="auth-container">
        <div className="auth-card">
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="6"
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength="6"
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label>Account Type:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="role-select"
              >
                <option value="user">Customer (Regular User)</option>
                <option value="owner">Store Owner (Admin Access)</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
