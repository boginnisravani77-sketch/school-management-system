import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">School Management System</h1>
        <p className="login-subtitle">Select Your Role</p>
        
        <div className="button-container">
          <button 
            className="login-btn admin-btn"
            onClick={() => navigate('/admin')}
          >
            <span className="btn-icon">👨‍💼</span>
            <span className="btn-text">Admin</span>
          </button>
          
          <button 
            className="login-btn student-btn"
            onClick={() => navigate('/student')}
          >
            <span className="btn-icon">👨‍🎓</span>
            <span className="btn-text">Student</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
