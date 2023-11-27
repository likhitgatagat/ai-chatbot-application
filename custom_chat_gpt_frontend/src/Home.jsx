import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Prompt from './Prompt';
import LoginPage from './LoginPage';
import KnowledgeBase from './KnowledgeBase';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            {isLoggedIn ? null : <h1>Welcome to AI Powered Chat Agent</h1>}
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                {/* Navigation Links */}
                <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
                    { 
                        isLoggedIn ? null : (<Link to="/prompt" style={linkStyle}>Chat with AI Agent</Link>)
                    }
                    
                    {
                    isLoggedIn ? (
                        null
                        ) : (<Link to="/login" style={linkStyle}>Create Knowledge Base</Link>)
                    }
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/prompt" element={<Prompt/>} />
                    {isLoggedIn ? (
                        <Route path="/knowledge-base" element={<KnowledgeBase handleLogout={handleLogout} />} />
                        ) : null
                    }
                    <Route path="/login" element={<LoginPage handleLogin={handleLogin}/>} />
                </Routes>
            </div>
        </div>
        <br/>
        <br/>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
            {isLoggedIn ? null : <h2>This AI powered chat agent is developed as a part of AI Assignment by Likhit Gatagat, Student Id - 2022MT13057</h2>}
        </div>
    </Router>
  );
};

// Style for links to appear as buttons
const linkStyle = {
    padding: '12px 20px',
    fontSize: '24px',
    textDecoration: 'none',
    color: 'white',
    background: 'green',
    borderRadius: '8px',
    margin: '0 10px',
  };

export default Home;
