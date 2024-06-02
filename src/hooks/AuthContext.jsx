import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const users = await response.json();
      if (users.length > 0) {
        const userData = users[0];
        setUser(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const loginWithUserData = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
