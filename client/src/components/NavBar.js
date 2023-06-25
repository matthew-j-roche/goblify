import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import accountImage from '../assets/accountSmall.png';
import tombImage from '../assets/tombSmall.png';
import bloodLogoutImage from '../assets/bloodLogoutSmall.png';
import bloodLoginImage from '../assets/bloodLoginSmall.png';
import settingsImage from '../assets/settingsSmall.png';
import aboutImage from '../assets/aboutSmall.png';



function NavBar({ loggedIn, setLoggedIn }) {
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
          setLoggedIn(false);
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
          <NavLink to="/profile"><button className='navProfile'>Profile</button></NavLink>
          <NavLink to="/account"><button className='navAccount'>A c c t</button></NavLink>
          <NavLink to="/about"><button className='navAbout'>About</button></NavLink>
          <NavLink to="/worblin"><button className='navWorblin'>Worblin</button></NavLink>
          <NavLink to="/bloodlogout"><button className='navBloodLogout'>Bloodlogout</button></NavLink>
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