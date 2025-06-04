import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authService.getProfile();
          setUser(response.data);
        } catch (err) {
          localStorage.removeItem("token");
          setError(err.message);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      setUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user: newUser } = response.data;
      localStorage.setItem("token", token);
      setUser(newUser);
      setError(null);
      return newUser;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setError(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
