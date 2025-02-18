import { create } from 'zustand';
import { useMediaStore } from './media';

export type UseUIStore = {
  activeFolderId: string;
  setActiveFolder: (folderId: string) => void;
};

export const useUIStore = create<UseUIStore>((set) => ({
  activeFolderId: Object.values(useMediaStore.getState().folders)[0].id,
  setActiveFolder: (folderId) => {
    set({ activeFolderId: folderId });
  },
}));
