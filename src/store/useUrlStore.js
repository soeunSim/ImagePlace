import { create } from "zustand";

const useUrlStore = create((set) => ({
  urlList: [],
  addUrlList: (url) => {
    set((state) => ({ urlList: [...state.urlList, url] }));
  },
}));

export default useUrlStore;
