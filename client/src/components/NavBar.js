import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar({ loggedIn, setLoggedIn }) {
  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuth()

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to bloodlogout?')) {
      try {
        const response = await fetch('/bloodlogout', {
          method: 'POST',
          credentials: 'include', // Include credentials (e.g., cookies) in the request
        });

        if (response.ok) {
          window.confirm('BloodLogged out successfully');
          setIsLoggedIn(false);
          setAuthUser(null);
          navigate('/Badbye');
        } else {
          console.error('bloodloggedout inadequately.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <nav className='nav'>
      <ul className="navUl">
        <li className="navLi">
          <NavLink exact to="/tomb"><button className='navTomb'>Tomb</button></NavLink>
          <NavLink to="/worblin"><button className='navWorblin'>Worblin</button></NavLink>
          {/* <NavLink to="/gobxam"><button className='navWorblin'>Gobxam</button></NavLink> */}
          <NavLink to="/draculanalytics"><button className='navWorblin'>Drac</button></NavLink>
          <NavLink to="/about"><button className='navAbout'>Evil</button></NavLink>
          <NavLink to="/account"><button className='navAccount'>Crypt</button></NavLink>
          <NavLink to="/"><button className='navBloodLogout'onClick={handleLogout}>Bloodout</button></NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;