import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // holds logged-in user data
  isAuthenticated: false,
  prod:null,

  // Actions
  setUser: (userData) => set({ user: userData, isAuthenticated: true }),
  setProd: (prodData) => set({ prod: prodData}),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
