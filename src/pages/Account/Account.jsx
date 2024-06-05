import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";
import "./Account.css";

function Account() {
  const { getLoggedInUser, loginWithUserData } = useAuth();
  const [userToUpdate, setUserToUpdate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    password: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUserToUpdate({
        id: loggedInUser.id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        phone: loggedInUser.phone,
        address: loggedInUser.address,
        city: loggedInUser.city,
        zip: loggedInUser.zip,
        password: loggedInUser.password,
        receipts: loggedInUser.receipts,
        favorites: loggedInUser.favorites,
      });
    }
  }, [getLoggedInUser]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserToUpdate({
      ...userToUpdate,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  delete userToUpdate.confirmPassword;

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${getLoggedInUser().id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Uppdatera all data för usern i local storage
      loginWithUserData(userToUpdate);

      alert("User profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setProfileError("Failed to update profile");
    }
  };

  const handleSavePassword = async () => {
    const loggedInUser = getLoggedInUser();
    if (passwordData.currentPassword !== loggedInUser.password) {
      setPasswordError("Wrong current password");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    try {
      const updatedUser = {
        ...loggedInUser,
        password: passwordData.newPassword,
      };

      delete updatedUser.confirmPassword;

      const response = await fetch(
        `http://localhost:3001/users/${loggedInUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      alert("Password updated successfully!");
      setPasswordError("");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Uppdatera all data för usern i local storage
      loginWithUserData(updatedUser);
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError("Failed to update password");
    }
  };

  return (
    <>
      <div>
        {getLoggedInUser() ? (
          <>
            <div>
              <h1>Account</h1>
            </div>
            <div>
              <div>
                <h2>My profile</h2>
                {profileError && <div className="error">{profileError}</div>}
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={userToUpdate.firstName}
                    placeholder="First name"
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={userToUpdate.lastName}
                    placeholder="Last name"
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="email"
                    value={userToUpdate.email}
                    placeholder="E-mail"
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={userToUpdate.phone}
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={userToUpdate.address}
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={userToUpdate.city}
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip"
                    value={userToUpdate.zip}
                    onChange={handleProfileChange}
                  />
                </div>
                <div>
                  <button onClick={handleSaveProfile}>Save</button>
                </div>
              </div>
              <div>
                <div>
                  <h2>Password</h2>
                  {passwordError && (
                    <div className="error">{passwordError}</div>
                  )}
                  <div className="password-inputs">
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="Current password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div>
                    <button onClick={handleSavePassword}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h1>PLEASE LOG IN TO UPDATE USER</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Account;
