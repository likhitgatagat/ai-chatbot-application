// LoginPage.js
import React, { useState } from 'react';
import admins from './admins.json'; // Import the JSON file
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const validateLogin = (e) => {
    e.preventDefault();
    const adminCredentials = admins.admins;
    const isValidAdmin = adminCredentials.some(
      (admin) => admin.username === username && admin.password === password
    );

    if (isValidAdmin) {
      // Authentication successful, redirect to PDF Reader page
      handleLogin();
      navigate('/knowledge-base'); // Redirect to PDF Reader after successful login
      //history.push('/knowledge-base');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleCancel = () => {
    // Handle cancel action, if needed
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', fontSize: '18px', marginRight: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '18px', marginRight: '10px' }}
        />
      </div>
      <div>
        <button
          onClick={validateLogin}
          style={{ padding: '12px 20px', fontSize: '18px', marginRight: '10px' }}
        >
          Login
        </button>
        <button
          onClick={handleCancel}
          style={{ padding: '12px 20px', fontSize: '18px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
