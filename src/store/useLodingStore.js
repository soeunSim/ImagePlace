import { create } from "zustand";

const useLodingStore = create((set) => ({
  isLoding: false,
  setIsLoding: (loding) => set({ isLoding: loding }),
}));

export default useLodingStore;
