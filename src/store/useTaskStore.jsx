import { create } from "zustand";

const safeJSONParse = (value) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const useTaskStore = create((set) => ({
  tasks: safeJSONParse(localStorage.getItem("tasks")) || [],

  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),

  removeTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),

  clearTasks: () =>
    set(() => {
      localStorage.setItem("tasks", JSON.stringify([]));
      return { tasks: [] };
    })
}));

export default useTaskStore;
