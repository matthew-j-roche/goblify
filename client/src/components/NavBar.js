import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


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
    <nav>
      <ul className="navUl">
        <li className="navLi">
          <NavLink exact to="/home">HOME</NavLink>
        </li>
        <li className="navLi">
          <NavLink to="/profile">PROFILE</NavLink>
          <NavLink to="/account">ACCOUNT</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          {loggedIn && (
            <div className="logout" onClick={handleLogout}>LOGOUT</div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;