import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { decryptData } from './utils/crypto';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (email, password) => {
    if (email && password) {
      setIsLoggedIn(true);
      fetchStudents();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudents([]);
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/student/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      
      const encryptedData = await response.json();
      
      const decryptedData = encryptedData.map((student) => ({
        ...student,
        fullName: decryptData(student.fullName),
        email: decryptData(student.email),
        phoneNumber: decryptData(student.phoneNumber),
        dateOfBirth: decryptData(student.dateOfBirth),
        gender: decryptData(student.gender),
        address: decryptData(student.address),
        courseEnrolled: decryptData(student.courseEnrolled),
      }));
      
      setStudents(decryptedData);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
    }
  };

  const handleCreateStudent = async (studentData) => {
    try {
      const response = await fetch('http://localhost:5000/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error('Failed to create student');

      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
      setError('Failed to create student');
    }
  };

  const handleUpdateStudent = async (studentData) => {
    if (!editStudent) return;

    try {
      const response = await fetch(`http://localhost:5000/student/student/${editStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) throw new Error('Failed to update student');

      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Failed to update student');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`http://localhost:5000/student/student/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete student');

      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student');
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Student Management System</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <StudentForm
            onSubmit={editStudent ? handleUpdateStudent : handleCreateStudent}
            editStudent={editStudent}
            onCancel={() => setEditStudent(null)}
          />
        </div>

        <StudentList
          students={students}
          onEdit={setEditStudent}
          onDelete={handleDeleteStudent}
        />
      </main>
    </div>
  );
}

export default App;