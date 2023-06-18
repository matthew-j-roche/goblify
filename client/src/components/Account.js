import React, { useEffect, useState } from 'react';


function Account() {
  const [user, setUser] = useState(null);
  const [showNewUsernameInput, setShowNewUsernameInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/account');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
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
      const response = await fetch(`/account`, {  // Update the endpoint to '/users'
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
      const response = await fetch(`/account`, {  // Update the endpoint to '/users'
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
    <div className="accountDiv1">
      <div className="accountDiv2">
        {user ? (
          <div>
            <h1 className="accounth1">
              <div className="accountDiv3">{user.username}</div>User Information
            </h1>
            <p><strong>Username:</strong> {user.username}</p>
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
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Created At:</strong> {user.created_at}</p>
          </div>
        ) : (
          <p className="accountLoading">Loading user information...</p>
        )}
      </div>
    </div>
  );
}

export default Account;