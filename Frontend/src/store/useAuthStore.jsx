import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // holds logged-in user data
  isAuthenticated: false,

  // Actions
  setUser: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
