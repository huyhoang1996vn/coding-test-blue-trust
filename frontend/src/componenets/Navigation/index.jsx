import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname.includes('/profile');

  const handleBackToUsers = () => {
    navigate('/');
  };

  if (!isProfilePage) {
    return null; // Don't show navigation on user list page
  }

  return (
    <div className="navigation-container">
      <button
        type="button"
        onClick={handleBackToUsers}
        className="back-btn"
        title="Back to User List"
      >
        ← Back to Users
      </button>
    </div>
  );
}

export default Navigation;
