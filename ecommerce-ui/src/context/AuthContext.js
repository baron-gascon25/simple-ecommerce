import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const userLogin = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const userLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    user,
    isAuthenticated,
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
