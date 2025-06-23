import { create } from "zustand";
import { logoutUser } from "../api/auth"; 
import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: 
    !!localStorage.getItem("authToken") || 
    !!sessionStorage.getItem("authToken"),
  
  login: (remember) => {
    set({ isAuthenticated: true });
    if (remember) {
      localStorage.setItem("authToken", "true");
    } else {
      sessionStorage.setItem("authToken", "true");
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      set({ isAuthenticated: false });
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    }
  },
}));
