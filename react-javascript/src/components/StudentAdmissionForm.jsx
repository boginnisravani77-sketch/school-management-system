import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentAdmissionForm.css';

function StudentAdmissionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    admissionClass: 'Class 1',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.contact) {
      setStatusMessage('❌ Please fill all required fields!');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage('❌ Please enter a valid email address!');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    // Save admission data to localStorage
    const admissions = JSON.parse(localStorage.getItem('student_admissions') || '[]');
    const newAdmission = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toLocaleString()
    };
    admissions.push(newAdmission);
    localStorage.setItem('student_admissions', JSON.stringify(admissions));

    setStatusMessage('✅ Admission form submitted successfully! You will receive confirmation email.');
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        dateOfBirth: '',
        gender: '',
        fatherName: '',
        motherName: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        admissionClass: 'Class 1',
      });
      setSubmitted(false);
    }, 3000);
  };

  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  return (
    <div className="student-admission-container">
      <div className="student-header">
        <h1>Student Admission Form</h1>
        <button className="back-btn" onClick={() => navigate('/')}>Back to Login</button>
      </div>

      <div className="admission-form-wrapper">
        {statusMessage && <div className="status-message">{statusMessage}</div>}

        <form onSubmit={handleSubmit} className="admission-form">
          <fieldset>
            <legend>Personal Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Parent Information</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label>Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  placeholder="Enter father's name"
                />
              </div>

              <div className="form-group">
                <label>Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  placeholder="Enter mother's name"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Address Information</legend>
            
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="form-group">
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="Enter pin code"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Admission Details</legend>
            
            <div className="form-group">
              <label>Apply for Class</label>
              <select name="admissionClass" value={formData.admissionClass} onChange={handleInputChange}>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <button type="submit" className="submit-btn">Submit Admission Form</button>
        </form>
      </div>
    </div>
  );
}

export default StudentAdmissionForm;
