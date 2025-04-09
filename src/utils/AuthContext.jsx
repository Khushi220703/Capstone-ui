// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("ecommerceToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("ecommerceToken");
    setToken(storedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("ecommerceToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("ecommerceToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
