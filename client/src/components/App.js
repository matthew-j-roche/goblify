import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Splasm from './Splasm';
import Bloodlogin from './Bloodlogin';
import Signup from './Signup';
import Tomb from './Tomb';
import Profile  from './Profile';
import Account from './Account';
import About from './About';
import Terror from './Terror';
import Worblin from './Worblin';


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
  const handleLogIn = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/splasm" element={<Splasm />} />
        <Route path="/" element={ <Tomb />} />
        {/* <Route path="/" element={loggedIn ? <Tomb /> : <SplashScreen />} /> */}
        <Route path="/bloodlogin" element={loggedIn ? <Navigate to="/tomb" /> : <Bloodlogin onLogin={ handleLogIn } />} />
        {/* <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/tomb" element={ loggedIn ? ( <Home username={loggedIn.username} /> ) : ( <Navigate to="/login" /> ) } /> */}
        <Route path="/tomb" element={<Tomb />} />
        <Route path="/about" element={<About />} />
        <Route path="/worblin" element={<Worblin />} />
        <Route path="/terror" element={<Terror />} /> {/* Render 404 page for all other routes */}
      </Routes>
    </Router>
  );
}

export default App;