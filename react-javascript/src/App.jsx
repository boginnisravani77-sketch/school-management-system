import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminForm from './components/AdminForm';
import StudentAdmissionForm from './components/StudentAdmissionForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/student" element={<StudentAdmissionForm />} />
      </Routes>
    </Router>
  );
}

export default App;