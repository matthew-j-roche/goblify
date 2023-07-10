import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Signup() {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const ww = "In the depths of darkness love took its form A werewolfs heart with passion does swarm. Under the pale moon a vampires gaze Their love forbidden, a mystical maze."
  const navigate = useNavigate();

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    if (newUser.password === event.target.confirmPassword.value) {
      console.log("good job on the matching passwords");
      handleCreateAccount();
    } else {
      window.alert(
        "Your passwords do not match. Please reenter your password and try again."
      );
    }
  };

  const handleCreateAccount = () => {
    const { confirmPassword, ...userData } = newUser;

    if (userData.password === confirmPassword) {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.alert("Account created successfully. Please log in.");
          navigate("/tomb");
        })
        .catch((error) => {
          console.log(error);
          window.alert("Error creating account. Please try again.");
        });
    } else {
      window.alert(
        "Your passwords do not match. Please reenter your password and try again."
      );
    }
  };
  const handleGoBack = () => {
    navigate("/login")
  };

  return (
    <div className='bodyDivxyz'>
      <div className="grid1">
        <div className="box1xyz">
          <div className="box1boxxyz">
            <div className="box1bxyz">Signup</div>  
          </div>
        </div>
        <div className='box2xyz'>
        <details className='details'>
      <summary>
        <em>of interest</em>
      </summary>
      <em>{ww}</em>
    </details>
        </div>
      </div>  
      <div className="accountGrid">
        <div className="agDiv1"></div>
        <div className="signupDiv1">
          {/* <button className="signUpButton" onClick={handleGoBack}>Back</button> */}
        </div>
        <form className="signupForm" style={{ width: '20em' }} onSubmit={handleSubmitSignup}>
          <input
            className="signupInput"
            style={{ width: "55%"}}
            value={newUser.first_name}
            type="text"
            name="first_name"
            placeholder="FIRST NAME"
            onChange={handleNewUserChange}
          />
          <br/>
          <input
            className="signupInput"
            style={{ width: "65%"}}
            value={newUser.last_name}
            type="text"
            name="last_name"
            placeholder="LAST NAME"
            onChange={handleNewUserChange}
          />
          <br/>
          <input
            className="signupInput"
            style={{ width: "75%"}}
            value={newUser.username}
            type="text"
            name="username"
            placeholder="USERNAME"
            onChange={handleNewUserChange}
          />
          <br/>
          <input
            className="signupInput"
            style={{ width: "85%"}}
            value={newUser.password}
            type="password"
            name="password"
            placeholder="PASSWORD"
            onChange={handleNewUserChange}
          />
          <br/>
          <input
            className="signupInput"
            style={{ width: "95%"}}
            value={newUser.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="REENTER PASSWORD"
            onChange={handleNewUserChange}
          />
          <button className="signUpButton" style={{ width: "100%"}} type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;