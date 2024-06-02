import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function LoginModal({ isRegister, setIsRegister, closeModal, onLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    password: "",
    confirmPassword: "",
    receipts: [],
  });
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zip ||
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      setShowWarning(true);
      setWarningMessage(
        "Please fill in all fields and ensure passwords match."
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${formData.email}`
      );
      const existingUsers = await response.json();
      if (existingUsers.length > 0) {
        setShowWarning(true);
        setWarningMessage("Email is already taken.");
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return;
    }

    setShowWarning(false);

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onLogin(data); // Log in the user after successful registration
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${formData.email}&password=${formData.password}`
      );
      const users = await response.json();
      if (users.length > 0) {
        onLogin(users[0]);
        closeModal();
      } else {
        setShowWarning(true);
        setWarningMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className={`container ${isRegister ? "right-panel-active" : ""}`}>
          <button className="close-btn" onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="form-container sign-up-container">
            <form className="form" onSubmit={handleRegister}>
              <h2 className="form__title">Register</h2>
              {showWarning && <div className="warning">{warningMessage}</div>}
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="input"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                className="input"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip"
                className="input"
                value={formData.zip}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button className="btn" type="submit">
                Register
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form className="form" onSubmit={handleLogin}>
              <h2 className="form__title">Sign In</h2>
              {showWarning && <div className="warning">{warningMessage}</div>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              <a href="#" className="link">
                Forgot your password?
              </a>
              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="btn" onClick={() => setIsRegister(false)}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="btn" onClick={() => setIsRegister(true)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
