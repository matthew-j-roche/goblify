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
          window.alert("Account created successfully. Please log in.");
          navigate("/login");
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
    <div className="signupDiv1">
      <div className="signupDiv2">
        <div className="signupDiv3">
          <button
            className="flex items-center text-teal-500 hover:text-teal-700"
            onClick={handleGoBack}>Back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center">SignUp Here!</h1>
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
          <button className="signupButton" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;