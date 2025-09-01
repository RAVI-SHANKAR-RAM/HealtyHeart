import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import './Auth.css';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;