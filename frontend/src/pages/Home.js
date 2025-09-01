import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Take Control of Your Heart Health</h1>
              <p>HealthyHeart uses advanced machine learning to assess your heart disease risk and connect you with healthcare professionals when needed.</p>
              <div className="hero-actions">
                <Link to="/prediction" className="btn btn-primary">Check Your Risk</Link>
                <Link to="/register" className="btn btn-secondary">Create Account</Link>
              </div>
            </div>
            <div className="hero-image">
              <span style={{fontSize: '300px'}}>❤️</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="text-center">Why Choose HealthyHeart?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span style={{fontSize: '50px'}}>📊</span>
              </div>
              <h3>Accurate Predictions</h3>
              <p>Our advanced ML model analyzes multiple health parameters to provide accurate heart disease risk assessment.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span style={{fontSize: '50px'}}>👤</span>
              </div>
              <h3>Personalized Insights</h3>
              <p>Get tailored recommendations based on your specific health profile and risk factors.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <span style={{fontSize: '50px'}}>📅</span>
              </div>
              <h3>Easy Appointments</h3>
              <p>Seamlessly book appointments with cardiologists if our system detects potential risks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="text-center">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create an Account</h3>
              <p>Sign up for free and complete your health profile.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Complete Health Assessment</h3>
              <p>Provide information about your health metrics and lifestyle.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Your Results</h3>
              <p>Receive immediate risk assessment with detailed explanations.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Take Action</h3>
              <p>Book appointments with specialists if recommended.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;