import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HealthyHeart</h3>
            <p>Your trusted partner in heart health assessment and care.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/prediction">Risk Assessment</a></li>
              <li><a href="/appointment">Book Appointment</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@healthyheart.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HealthyHeart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;