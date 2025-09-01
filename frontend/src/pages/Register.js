import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import './Auth.css';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;