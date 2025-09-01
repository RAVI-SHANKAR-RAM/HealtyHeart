const React = require('react');
const { useState, useEffect, useContext } = require('react');
const { useAuth } = require('../context/AuthContext');
const { toast } = require('react-toastify');
const api = require('../services/api');
require('./Profile.css');

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : '',
        gender: currentUser.gender || 'Male'
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would call your backend update endpoint
      // For now, we'll just show a success message
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return React.createElement('div', { className: 'container' }, 'Please log in to view your profile.');
  }

  return React.createElement('div', { className: 'profile-page' },
    React.createElement('div', { className: 'container' },
      React.createElement('h1', null, 'Your Profile'),
      
      React.createElement('div', { className: 'profile-card' },
        React.createElement('h2', null, 'Personal Information'),
        React.createElement('form', { onSubmit: handleSubmit },
          React.createElement('div', { className: 'form-row' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Full Name *'),
              React.createElement('input', {
                type: 'text',
                name: 'name',
                value: formData.name,
                onChange: handleInputChange,
                required: true
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Email Address *'),
              React.createElement('input', {
                type: 'email',
                name: 'email',
                value: formData.email,
                onChange: handleInputChange,
                required: true
              })
            )
          ),
          
          React.createElement('div', { className: 'form-row' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Date of Birth *'),
              React.createElement('input', {
                type: 'date',
                name: 'dateOfBirth',
                value: formData.dateOfBirth,
                onChange: handleInputChange,
                required: true
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', null, 'Gender *'),
              React.createElement('select', {
                name: 'gender',
                value: formData.gender,
                onChange: handleInputChange,
                required: true
              },
                React.createElement('option', { value: 'Male' }, 'Male'),
                React.createElement('option', { value: 'Female' }, 'Female'),
                React.createElement('option', { value: 'Other' }, 'Other')
              )
            )
          ),
          
          React.createElement('div', { className: 'form-actions' },
            React.createElement('button', {
              type: 'submit',
              className: 'btn btn-primary',
              disabled: loading
            }, loading ? 'Updating...' : 'Update Profile')
          )
        )
      ),
      
      React.createElement('div', { className: 'profile-stats' },
        React.createElement('h2', null, 'Account Statistics'),
        React.createElement('div', { className: 'stats-grid' },
          React.createElement('div', { className: 'stat-card' },
            React.createElement('h3', null, 'Member Since'),
            React.createElement('p', null, 
              new Date(currentUser.date).toLocaleDateString()
            )
          ),
          React.createElement('div', { className: 'stat-card' },
            React.createElement('h3', null, 'Account Status'),
            React.createElement('p', null, 'Active')
          )
        )
      )
    )
  );
};

module.exports = Profile;