import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import SplashScreen from './SplashScreen';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile  from './Profile';
import Account from './Account';
import About from './About';
import Error from './Error';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch('/check-login-status');
        const data = await response.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        console.error(error);
      }
    };

    checkLoggedInStatus();
  }, []);

  // Function to handle user login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <SplashScreen />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={ loggedIn ? ( <Home username={loggedIn.username} /> ) : ( <Navigate to="/login" /> ) } />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<Error />} /> {/* Render 404 page for all other routes */}
      </Routes>
    </Router>
  );
}

export default App;