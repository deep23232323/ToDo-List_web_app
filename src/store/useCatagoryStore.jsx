import { create } from "zustand";

const safeJSONParse = (value) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const useCatagoryStore = create((set) => ({
  catagories: safeJSONParse(localStorage.getItem("catagory")) || [],

  addCatagory: (catagory) =>
    set((state) => {
      const updatedTasks = [...state.catagories, catagory];
      localStorage.setItem("catagory", JSON.stringify(updatedTasks));
      return { catagories: updatedTasks };
    }),

  removeCatagory: (id) =>
    set((state) => {
      const updatedTasks = state.catagories.filter((t) => t.id !== id);
      localStorage.setItem("catagory", JSON.stringify(updatedTasks));
      return { catagories: updatedTasks };
    }),

  clearCatagory: () =>
    set(() => {
      localStorage.setItem("catagory", JSON.stringify([]));
      return { catagories: [] };
    })
}));

export default useCatagoryStore;
