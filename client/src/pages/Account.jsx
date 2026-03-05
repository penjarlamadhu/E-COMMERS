import React, { useState } from 'react';
import '../styles/Account.css';
import { useAuth } from '../context/AuthContext';
import Error from '../components/Error';
import Success from '../components/Success';

const Account = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {
      street: '',
      city: '',
      postal: '',
      country: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address_')) {
      const field = name.replace('address_', '');
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="account-page">
        <Error message="Please login to view account" />
      </div>
    );
  }

  return (
    <div className="account-page">
      {error && <Error message={error} onDismiss={() => setError(null)} />}
      {success && (
        <Success message={success} onDismiss={() => setSuccess(null)} />
      )}

      <h1>My Account</h1>

      <div className="account-container">
        <div className="account-card">
          <h2>Profile Information</h2>

          {!isEditing ? (
            <div className="profile-view">
              <div className="profile-field">
                <label>Name:</label>
                <p>{user?.name}</p>
              </div>

              <div className="profile-field">
                <label>Email:</label>
                <p>{user?.email}</p>
              </div>

              <div className="profile-field">
                <label>Phone:</label>
                <p>{user?.phone || 'Not provided'}</p>
              </div>

              <div className="profile-field">
                <label>Address:</label>
                {user?.address?.street ? (
                  <p>
                    {user.address.street}, {user.address.city}
                    <br />
                    {user.address.postal}, {user.address.country}
                  </p>
                ) : (
                  <p>Not provided</p>
                )}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="edit-btn"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="profile-edit">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                />
              </div>

              <div className="form-section">
                <h3>Address</h3>

                <div className="form-group">
                  <label>Street:</label>
                  <input
                    type="text"
                    name="address_street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      type="text"
                      name="address_city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                    />
                  </div>

                  <div className="form-group">
                    <label>Postal Code:</label>
                    <input
                      type="text"
                      name="address_postal"
                      value={formData.address.postal}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Country:</label>
                  <input
                    type="text"
                    name="address_country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={isLoading} className="save-btn">
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
