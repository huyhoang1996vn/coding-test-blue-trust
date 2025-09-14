/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import './Profile.css';

function Profile({
  user, onSubmit, loading = false, isNewUser = false,
}) {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: (user && user.firstName) || '',
      lastName: (user && user.lastName) || '',
      country: (user && user.country) || '',
      city: (user && user.city) || '',
      email: (user && user.email) || '',
      phoneNumber: (user && user.phoneNumber) || '',
      avatar: (user && user.avatar) || null,
    },
  });

  // Load existing avatar when user data changes
  useEffect(() => {
    if (user && user.avatar && user.avatar !== null) {
      console.log(user.avatar);
      // Check if avatar is already a full URL or a relative path
      if (user.avatar.startsWith('http://') || user.avatar.startsWith('https://')) {
        setAvatarPreview(user.avatar);
      } else {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3002';
        setAvatarPreview(`${apiUrl}${user.avatar}`);
      }
    } else {
      setAvatarPreview(null);
    }
  }, [user]);

  const handleAvatarChange = (event) => {
    console.log('=== handleAvatarChange ===', event);
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      setValue('avatar', file);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setAvatarPreview(loadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log('Form data:', data);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form-wrapper">
        <h1 className="profile-title">
          {isNewUser ? 'Create New User' : 'User Profile'}
        </h1>
        <form onSubmit={handleSubmit(onSubmitForm)} className="profile-form">

          {/* Avatar Upload Section */}
          <div className="form-group avatar-group">
            <label className="form-label" htmlFor="avatar">Avatar</label>
            <div className="avatar-upload">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    <span>📷</span>
                    <p>No image selected</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="avatar-input"
                id="avatar"
              />
              <label htmlFor="avatar" className="avatar-upload-btn">
                Choose Avatar
              </label>
            </div>
          </div>

          {/* First Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              {...register('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'First name can only contain letters and spaces',
                },
              })}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName.message}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="lastName">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              {...register('lastName', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Last name can only contain letters and spaces',
                },
              })}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="phoneNumber">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[1-9][\d]{0,15}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* Country */}
          <div className="form-group">
            <label className="form-label" htmlFor="country">
              Country *
            </label>
            <input
              type="text"
              id="country"
              className={`form-input ${errors.country ? 'error' : ''}`}
              {...register('country', {
                required: 'Country is required',
                minLength: {
                  value: 2,
                  message: 'Country must be at least 2 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Country can only contain letters and spaces',
                },
              })}
            />
            {errors.country && (
              <span className="error-message">{errors.country.message}</span>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label className="form-label" htmlFor="city">
              City *
            </label>
            <input
              type="text"
              id="city"
              className={`form-input ${errors.city ? 'error' : ''}`}
              {...register('city', {
                required: 'City is required',
                minLength: {
                  value: 2,
                  message: 'City must be at least 2 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'City can only contain letters and spaces',
                },
              })}
            />
            {errors.city && (
              <span className="error-message">{errors.city.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {(() => {
                if (loading) return 'Saving...';
                if (isNewUser) return 'Create User';
                return 'Save Profile';
              })()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  isNewUser: PropTypes.bool,
};

Profile.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    email: '',
    phoneNumber: '',
    avatar: null,
  },
  onSubmit: null,
  loading: false,
  isNewUser: false,
};

export default Profile;
