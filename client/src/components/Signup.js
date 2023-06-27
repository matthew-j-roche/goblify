import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Signup() {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

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
          window.alert("Account created successfully");
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
    <div className='bodyDiv'>
      <div className="grid1">
        <div className="box1">
          <div className="box1box">
            <div className="box1a"><h1>box1a</h1></div>
            <div className="box1b">Signup</div>  
            <div className="box1c"><h1>box1c</h1></div>
          </div>
        </div>
        <div className='box2'>Signup</div>
      </div>  
      <div className="accountGrid">
        <div className="agDiv1"></div>
        <div className="signupDiv1">
          <button className="signUpButton" onClick={handleGoBack}>Back</button>
        </div>
        <form className="signupForm" onSubmit={handleSubmitSignup}>
          <input
            className="signupInput"
            value={newUser.first_name}
            type="text"
            name="first_name"
            placeholder="FIRST NAME"
            onChange={handleNewUserChange}
          />
          <input
            className="signupInput"
            value={newUser.last_name}
            type="text"
            name="last_name"
            placeholder="LAST NAME"
            onChange={handleNewUserChange}
          />
          <input
            className="signupInput"
            value={newUser.username}
            type="text"
            name="username"
            placeholder="USERNAME"
            onChange={handleNewUserChange}
          />
          <input
            className="signupInput"
            value={newUser.password}
            type="password"
            name="password"
            placeholder="PASSWORD"
            onChange={handleNewUserChange}
          />
          <input
            className="signupInput"
            value={newUser.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="REENTER PASSWORD"
            onChange={handleNewUserChange}
          />
          <button className="signUpButton" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;