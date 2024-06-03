import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/AuthContext";

function LoginModal({ isRegister, setIsRegister, closeModal }) {
  const [registerData, setRegisterData] = useState({
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
    favorites: [],
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { login } = useAuth();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    // Filter out non-numeric characters for phone and zip fields
    if (name === "phone" || name === "zip") {
      const numericValue = value.replace(/\D/g, "");
      setRegisterData({
        ...registerData,
        [name]: numericValue,
      });
    } else {
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.address ||
      !registerData.city ||
      !registerData.zip ||
      !registerData.password ||
      registerData.password !== registerData.confirmPassword
    ) {
      setShowWarning(true);
      setWarningMessage(
        "Please fill in all fields and ensure passwords match."
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${registerData.email}`
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

    delete registerData.confirmPassword;

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        login(registerData.email, registerData.password);
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);
      closeModal();
    } catch (error) {
      setShowWarning(true);
      setWarningMessage("Invalid email or password.");
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
                value={registerData.firstName}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="input"
                value={registerData.lastName}
                onChange={handleRegisterChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                className="input"
                value={registerData.phone}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input"
                value={registerData.address}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input"
                value={registerData.city}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip"
                className="input"
                value={registerData.zip}
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="input"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
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
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={loginData.password}
                onChange={handleLoginChange}
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
                <h2>Already have an account?</h2>
                <button className="btn" onClick={() => setIsRegister(false)}>
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Don't have an account yet?</h2>
                <button className="btn" onClick={() => setIsRegister(true)}>
                  Register
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
