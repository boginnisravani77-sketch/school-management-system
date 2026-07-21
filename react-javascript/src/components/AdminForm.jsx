import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminForm.css';

function AdminForm() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('school_students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "", rollNo: "", studentClass: " ", contact: "", address: "" },
      { id: 2, name: "", rollNo: "", studentClass: "", contact: "", address: "" }
    ];
  });

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    studentClass: '',
    contact: '',
    address: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo || !formData.contact) {
      setStatusMessage('❌ Please fill all required fields!');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...formData
    };

    setStudents([...students, newStudent]);
    setFormData({
      name: '',
      rollNo: '',
      studentClass: '',
      contact: '',
      address: '',
    });
    setStatusMessage('✅ Student added successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
      setStatusMessage('✅ Student deleted successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const filteredStudents = filterClass === 'All' 
    ? students 
    : students.filter(student => student.studentClass === filterClass);

  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
      </div>

      <div className="admin-content">
        <div className="add-student-section">
          <h2>Add New Student</h2>
          {statusMessage && <div className="status-message">{statusMessage}</div>}
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Student Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student name"
              />
            </div>

            <div className="form-group">
              <label>Roll Number *</label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleInputChange}
                placeholder="Enter roll number"
              />
            </div>

            <div className="form-group">
              <label>Class</label>
              <select name="studentClass" value={formData.studentClass} onChange={handleInputChange}>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
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

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </div>

            <button type="submit" className="submit-btn">Add Student</button>
          </form>
        </div>

        <div className="student-list-section">
          <h2>Student List</h2>
          <div className="filter-section">
            <label>Filter by Class:</label>
            <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
              <option value="All">All Classes</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="students-table-wrapper">
            {filteredStudents.length > 0 ? (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.studentClass}</td>
                      <td>{student.contact}</td>
                      <td>{student.address}</td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No students found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminForm;
