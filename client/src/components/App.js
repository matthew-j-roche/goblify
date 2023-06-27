import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Bloodlogin from './Bloodlogin';
import Signup from './Signup';
import Tomb from './Tomb';
import Account from './Account';
import About from './About';
import Terror from './Terror';
import Worblin from './Worblin';
import GobMap from './GobMap';


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
  const onLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={loggedIn ? <Tomb /> : <Bloodlogin />} />
        <Route path="/bloodlogin" element={loggedIn ? ( <Tomb username={loggedIn.username} /> ) : <Bloodlogin onLogin={ onLogin } />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={ loggedIn ? ( <Account username={loggedIn.username} /> ) : ( <Navigate to="/Bloodlogin" /> ) } />
        <Route path="/tomb" element={ loggedIn ? ( <Tomb username={loggedIn.username} /> ) : ( <Navigate to="/Bloodlogin" /> ) } />
        <Route path="/about" element={<About />} />
        <Route path="/gobmap" element={<GobMap />} />
        <Route path="/worblin" element={<Worblin />} />
        <Route path="/terror" element={<Terror />} /> 
        {/* Render 404 page for all other routes */}
      </Routes>
    </Router>
  );
}

export default App;