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

  const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const addFavorite = async (product) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, product],
      };

      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }
    }
  };

  const removeFavorite = async (productId) => {
    if (user) {
      const updatedFavorites = user.favorites.filter(
        (fav) => fav.id !== productId
      );

      const updatedUser = {
        ...user,
        favorites: updatedFavorites,
      };

      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithUserData,
        getLoggedInUser,
        logout,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
