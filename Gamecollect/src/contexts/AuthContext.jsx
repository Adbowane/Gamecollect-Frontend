import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, userService } from "../services/api";

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
          const response = await userService.getProfile();
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
      console.log("🔐 AuthContext - Tentative d'inscription:", userData);

      const response = await authService.register(userData);
      console.log("🔐 AuthContext - Réponse d'inscription:", response);

      // Le backend retourne { "message": "User registered successfully", "userId": 1 }
      // Pas de token, donc on fait un login automatique après inscription
      if (response.data.message === "User registered successfully") {
        console.log(
          "✅ Inscription réussie, tentative de connexion automatique..."
        );

        // Login automatique avec les credentials utilisés pour l'inscription
        const loginResponse = await authService.login({
          email: userData.email,
          password: userData.password,
        });

        console.log(
          "🔐 AuthContext - Réponse de connexion auto:",
          loginResponse
        );

        const { token, user: newUser } = loginResponse.data;

        if (!token) {
          throw new Error("Token manquant dans la réponse de connexion");
        }

        if (!newUser) {
          throw new Error(
            "Données utilisateur manquantes dans la réponse de connexion"
          );
        }

        localStorage.setItem("token", token);
        setUser(newUser);
        setError(null);

        console.log(
          "✅ AuthContext - Inscription + connexion réussies, utilisateur connecté:",
          newUser
        );
        return newUser;
      } else {
        throw new Error("Réponse d'inscription inattendue");
      }
    } catch (err) {
      console.error("❌ AuthContext - Erreur d'inscription:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Erreur d'inscription";

      console.error("❌ AuthContext - Message d'erreur:", errorMessage);
      setError(errorMessage);
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
