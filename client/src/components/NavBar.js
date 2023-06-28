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
          navigate('/bloodlogin');
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
          <NavLink to="/account"><button className='navAccount'>Account</button></NavLink>
          <NavLink to="/about"><button className='navAbout'>About</button></NavLink>
          <NavLink to="/worblin"><button className='navWorblin'>Worblin</button></NavLink>
          <NavLink to="/"><button className='navBloodLogout'onClick={handleLogout}>Bloodlogout</button></NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
{/* <NavLink to="/bloodlogout"><img className="navIcon" alt="bloodlogout" onClick={handleLogout} src={"../assets/bloodLogoutSmall.png"}/></NavLink> */}
{/* <NavLink t0="/worblin"></NavLink> */}
{/* <NavLink to="/about"><img className="navIcon" alt="about" src={aboutImage}/></NavLink> */}
{/* <NavLink to="/account"><img className="navIcon" alt="account" src={accountImage}/></NavLink> */}
{/* <NavLink to="/profile"><img className="navIcon" alt="settings" src={settingsImage}/></NavLink> */}
{/* <NavLink exact to="/home"><img className="navIcon" alt='home' src={tombImage}/></NavLink> */}
// }
// );
    // </nav>
    // </ul>
        // </li>
        // <NavLink to="/bloodlogout"><button className='navBloodLogut'>X/.-._X.X-.</button></NavLink>
        // <NavLink t0="/worblin"><button className='navWorblin'>.-._X-./ /-XX</button></NavLink>
        // <NavLink to="/about"><button className='navAbout'>///X.-X-._X-/-L</button></NavLink>
        // <NavLink to="/account"><button className='navAccount'>/X.-X-._L0/-XX-/</button></NavLink>
        // <NavLink to="/profile"><button className='navProfile'>.-X-._LL/0L_/</button></NavLink>
        // <NavLink exact to="/tomb"><button className='navTomb'>X-._LL// 0..L_/-</button></NavLink>
        // <li className="navLi">
      {/* <ul className="navUl"> */}
          {/* <nav className='nav'> */}
          {/* return ( */}
          {/* }; */}