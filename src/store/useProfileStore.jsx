// useProfileStore.js
import { create } from "zustand";

export const useProfileStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("profile")) || null,

  setUser: (userData) => {
    localStorage.setItem("profile", JSON.stringify(userData));
    set({ user: userData });
  },

  removeUser: () => {
    localStorage.removeItem("profile");
    set({ user: null });
  }
}));
