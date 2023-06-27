import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../Contexts/AuthContext';
import NavBar from './NavBar';
import Bloodlogin from './Bloodlogin';
import About from './About';
import Terror from './Terror';
import Worblin from './Worblin';
import Signup from './Signup';
import Tomb from './Tomb';
import Account from './Account';


function App() {
  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuth()

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch('/check-login-status');
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error(error);
      }
    };

    checkLoggedInStatus();
  }, []);

  // Function to handle user login
  const onLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>  
      <NavBar IsloggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Tomb /> : <Bloodlogin />} />
        <Route path="/bloodlogin" element={isLoggedIn ? ( <Tomb username={isLoggedIn.username} /> ) : <Bloodlogin onLogin={ onLogin } />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={ isLoggedIn ? ( <Account username={isLoggedIn.username} /> ) : ( <Navigate to="/Bloodlogin" /> ) } />
        <Route path="/tomb" element={ isLoggedIn ? ( <Tomb username={isLoggedIn.username} /> ) : ( <Navigate to="/Bloodlogin" /> ) } />
        <Route path="/about" element={<About />} />
        <Route path="/worblin" element={<Worblin />} />
        <Route path="/terror" element={<Terror />} /> 
        {/* Render 404 page for all other routes */}
      </Routes>
      
    </>
  );
}

export default App;