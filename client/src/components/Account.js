import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"


function Account() {
  const [showNewUsernameInput, setShowNewUsernameInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth()
  console.log(authUser);
  console.log(isLoggedIn);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/users/${authUser.id}`);
      if (response.ok) {
        const data = await response.json();
        setAuthUser(data); // Update the authenticated user state
        setIsLoggedIn(true); // Update the login status
      } else {
        console.log('Error fetching user:', response.status);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  

  const updateUsername = async () => {
    try {
      const response = await fetch(`/users/${authUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
        }),
      });
      if (response.ok) {
        // Update user information
        fetchUser();
        setNewUsername('');
        setShowNewUsernameInput(false);
      } else {
        console.log('Error updating username:', response.status);
      }
    } catch (error) {
      console.log('Error updating username:', error);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch(`/users/${authUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      if (response.ok) {
        // Update user information
        fetchUser();
        setNewPassword('');
        setShowNewPasswordInput(false);
      } else {
        console.log('Error updating password:', response.status);
      }
    } catch (error) {
      console.log('Error updating password:', error);
    }
  };

  return (
    <div className='bodyDiv'>
      <div className="grid1">
        <div className="box1">
          <div className="box1box">
            <div className="box1a"><h1>box1a</h1></div>
            <div className="box1b">Account</div>  
            <div className="box1c"><h1>box1c</h1></div>
          </div>
        </div>
        <div className='box2'>Goblify</div>
      </div>  
      <div className="accountGrid">
        <div className="agDiv1"><div className='agDiv1Sub'>
          <div className="accountDiv1">
            <div className="accountDiv2">
              {authUser ? (
                <div>
                  <p><strong>Username:</strong> {authUser.username}</p>
                  <div className="text-center">
                    {showNewUsernameInput ? (
                      <div>
                        <label htmlFor="newUsername" className="font-medium">New Username:</label>
                        <input
                        type="text"
                        id="newUsername"
                        value={newUsername}
                        onChange={handleUsernameChange}
                        className={`${showNewUsernameInput ? 'ring-green-500 ring-2' : ''}`}
                        />
                        <button className="accountUpdateUsernameButton" onClick={updateUsername}>Update Username</button>
                      </div>
                    ) : (
                      <button className="accountNewUsernameButton" onClick={() => setShowNewUsernameInput(true)}>Change Username</button>
                    )}
                    {showNewPasswordInput ? (
                      <div>
                        <label htmlFor="newPassword" className="font-medium">New Password:</label>
                        <input
                          type="password" 
                          id="newPassword" 
                          value={newPassword} 
                          onChange={handlePasswordChange} 
                          className={`${showNewPasswordInput ? 'ring-green-500 ring-2' : ''}`}
                        />
                        <button className="accountUpdatePasswordButton" onClick={updatePassword}>Update Password</button>
                      </div>
                    ) : (
                      <button className="accountNewPasswordButton" onClick={() => setShowNewPasswordInput(true)}>Change Password</button>
                    )}
                  </div>
                  <p><strong>Name:</strong> {authUser.first_name} {authUser.last_name}</p>
                  <p><strong>Created At:</strong> {authUser.created_at}</p>
                </div>
              ) : (
                <p className="accountLoading">Loading user information...</p>
              )}
            </div>
          </div>
        </div></div>
        <div className="agDiv2"><div className="agDiv2Sub">
        <img src={pazuzuTransparentImage} className='accPaz1'/>  
        <img src={pazuzuTransparentImage} className='accPaz2'/>  
        </div></div>
      </div>
    </div>
  )
}

export default Account;