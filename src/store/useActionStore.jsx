import { create } from 'zustand';

export const useActionStore = create((set) => ({
  triggerAction: false,

  setTriggerAction: (value) => set({ triggerAction: value }),
}));
