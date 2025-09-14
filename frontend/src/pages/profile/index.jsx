import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Profile from '../../componenets/Profile';
import api from '../../tools/api';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  console.log('=== userId ===', userId);
  const isNewUser = !userId;

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    email: '',
    phoneNumber: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserData = async () => {
    if (isNewUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/users/${userId}`);
      setUserData(response.data.data || response.data);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user data');
      // Set default data for demo purposes
      setUserData({
        firstName: 'John',
        lastName: 'Doe',
        country: 'United States',
        city: 'New York',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        avatar: null,
      });
    } finally {
      setLoading(false);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    console.log(userId);
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (isNewUser) {
        // Create new user
        response = await api.post('/api/users', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Navigate to the new user's profile
        // navigate(`/profile/${response.data.data.id || response.data.id}`);
        navigate('/');
      } else {
        // Update existing user
        response = await api.put(`/api/users/${userId}`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setUserData(response.data.data || response.data);
      toast.success(isNewUser ? 'User created successfully!' : 'Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      const errorMessage = `Failed to ${isNewUser ? 'create' : 'update'} profile. Please try again.`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isNewUser && !userData.email) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
        >
          {error}
        </div>
      )}
      <Profile
        user={userData}
        onSubmit={handleFormSubmit}
        loading={loading}
        isNewUser={isNewUser}
      />
    </div>
  );
}

export default ProfilePage;
