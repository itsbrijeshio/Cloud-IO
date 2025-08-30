import { create } from "zustand";

interface Store {
  action: Record<string, unknown> | null;
  setAction: (action: Record<string, unknown>) => void;
}
const useStore = create<Store>((set) => ({
  action: null,
  setAction: (action) => set({ action }),
}));

export default useStore;
