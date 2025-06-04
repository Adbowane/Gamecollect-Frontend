import axios from "axios";

const BASE_URL =
  "https://408b-2a02-8440-b504-7488-f818-db7c-b996-1c43.ngrok-free.app/api";

// Création de l'instance axios avec la configuration de base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
  },
  timeout: 10000, // 10 secondes de timeout
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Success: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `❌ API Error ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      console.error("❌ No response from server:", error.request);
    } else {
      console.error("❌ Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  register: (userData) => {
    console.log("📡 API - Envoi des données d'inscription:", userData);
    console.log("📡 API - URL complète:", `${BASE_URL}/auth/register`);
    return api.post("/auth/register", userData);
  },
  login: (credentials) => {
    console.log("📡 API - Envoi des données de connexion:", {
      email: credentials.email,
    });
    return api.post("/auth/login", credentials);
  },
  logout: () => api.post("/auth/logout"),
};

// Services des jeux
export const gameService = {
  getAllGames: (params) => api.get("/games", { params }),
  getGameById: (id) => api.get(`/games/${id}`),
  createGame: (gameData) => api.post("/games", gameData),
  updateGame: (id, gameData) => api.put(`/games/${id}`, gameData),
  deleteGame: (id) => api.delete(`/games/${id}`),
};

// Services des collections
export const collectionService = {
  getUserCollections: () => api.get("/collections"),
  getCollectionById: (id) => api.get(`/collections/${id}`),
  createCollection: (collectionData) =>
    api.post("/collections", collectionData),
  updateCollection: (id, collectionData) =>
    api.put(`/collections/${id}`, collectionData),
  deleteCollection: (id) => api.delete(`/collections/${id}`),
  addGameToCollection: (collectionId, gameId) =>
    api.post(`/collections/${collectionId}/games`, { gameId }),
};

// Services utilisateur
export const userService = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (profileData) => api.put("/users/profile", profileData),
  addFavorite: (gameId) => api.post("/users/favorites", { gameId }),
  removeFavorite: (gameId) => api.delete(`/users/favorites/${gameId}`),
};

// Services admin
export const adminService = {
  getAllUsers: () => api.get("/admin/users"),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getLogs: (params) => api.get("/admin/logs", { params }),
};

export default api;
