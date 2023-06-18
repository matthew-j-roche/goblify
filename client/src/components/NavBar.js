import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import accountImage from '../assets/accountSmall.png';
import homeImage from '../assets/homeSmall.png';
import logoutImage from '../assets/logoutSmall.png';
import settingsImage from '../assets/settingsSmall.png';
import aboutImage from '../assets/aboutSmall.png';



function NavBar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        const response = await fetch('/logout', {
          method: 'POST',
          credentials: 'include', // Include credentials (e.g., cookies) in the request
        });

        if (response.ok) {
          window.confirm('Logged out successfully');
          setLoggedIn(false);
          navigate('/login');
        } else {
          console.error('Logout failed');
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
          <NavLink exact to="/home"><img className="navIcon" alt='home' src={homeImage}/></NavLink>
          <NavLink to="/profile"><img className="navIcon" alt="settings" src={settingsImage}/></NavLink>
          <NavLink to="/account"><img className="navIcon" alt="account" src={accountImage}/></NavLink>
          <NavLink to="/about"><img className="navIcon" alt="about" src={aboutImage}/></NavLink>
          <NavLink to="/logout"><img className="navIcon" alt="logout" onClick={handleLogout} src={logoutImage}/></NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;