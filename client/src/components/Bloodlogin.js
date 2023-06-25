import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"

function Bloodlogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Login was successful, trigger the onLogin callback
        onLogin();
        navigate("/home");
      } else {
        // Login failed, handle the error
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username input contains an email
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(username)) {
      setError("Please enter your username instead of an email.");
      return;
    }

    handleLogin();
  };

  return (
    <div className='bodyDiv'>
      <div className="grid1">
        <div className="box1">
          <div className="box1box">
            <div className="box1a"><h1>box1a</h1></div>
            <div className="box1b">Bloodlogin</div>  
            <div className="box1c"><h1>box1c</h1></div>
          </div>
        </div>
        <div className='box2'>Goblify</div>
      </div>  
      <div className="accountGrid">
        <div className="agDiv1"><div className='agDiv1Sub'>
          <div className="loginDiv1">
            <div className="loginDiv2">
              <div>
                {error && <p>{error}</p>}
              </div>
              <form className="loginForm" onSubmit={handleSubmit}>
                <div className="loginFormDiv1">
                  <div>
                    <label>Username: </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="loginFormInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Password: </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="loginFormInput"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                  <button type="submit" className="loginButton">Sign in</button>
              </form>
              <div className="signUpDiv">
                <p>Don't have an account?{" "}</p>
                <Link to="/signup" className="signUpButton">Sign up</Link>
              </div>
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

export default Bloodlogin;