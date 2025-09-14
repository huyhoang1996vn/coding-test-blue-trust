/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../tools/api';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/users');
      setUsers(response.data.data || response.data);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = async (userId, userName) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(userId);
      await api.delete(`/api/users/${userId}`);
      // Remove user from local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success(`${userName} deleted successfully!`);
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleCreateUser = () => {
    navigate('/profile/new');
  };

  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button type="button" onClick={loadUsers} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1 className="user-list-title">User Management</h1>
        <button type="button" onClick={handleCreateUser} className="create-user-btn">
          <span>+</span>
          Create New User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h2>No Users Found</h2>
          <p>Get started by creating your first user.</p>
          <button type="button" onClick={handleCreateUser} className="create-first-user-btn">
            Create First User
          </button>
        </div>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => handleUserClick(user.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleUserClick(user.id);
                }
              }}
            >
              <div className="user-avatar">
                {user.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL || 'http://localhost:3002/'}${user.avatar}`}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <span>{(user.firstName && user.firstName.charAt(0)) || 'U'}</span>
                  </div>
                )}
              </div>

              <div className="user-info">
                <h3 className="user-name">
                  {user.firstName}
                  {' '}
                  {user.lastName}
                </h3>
                <p className="user-email">{user.email}</p>
                <p className="user-location">
                  {user.city}
                  ,
                  {user.country}
                </p>
                {user.phoneNumber && (
                  <p className="user-phone">{user.phoneNumber}</p>
                )}
              </div>

              <div className="user-actions">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserClick(user.id);
                  }}
                  className="view-btn"
                  title="Edit Profile"
                >
                  👁️ Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`);
                  }}
                  className="delete-btn"
                  disabled={deleteLoading === user.id}
                  title="Delete User"
                >
                  {deleteLoading === user.id ? '⏳' : '🗑️'}
                  {' '}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
