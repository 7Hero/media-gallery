import { create } from "zustand";
import { MediaType } from "@/types";
import { filterDefinitions } from "@/lib/constants";

export interface Filters {
  filters: {
    mediaTypes: {
      video: boolean;
      image: boolean;
      gif: boolean;
    };
    search: string;
  }
  toggleMediaType: (type: MediaType) => void;
  setSearch: (search: string) => void;
}

export const useFiltersStore = create<Filters>()((set) => ({
  filters: {
    mediaTypes: filterDefinitions.mediaTypes.defaultState,
    search: filterDefinitions.search.defaultState,
  },
  toggleMediaType: (type: MediaType) =>
    set((state) => ({
      filters: {
        ...state.filters,
        mediaTypes: {
          ...state.filters.mediaTypes,
          [type]: !state.filters.mediaTypes[type],
        }
      }
    })),
  setSearch: (search: string) => set((state) => ({
    filters: { ...state.filters, search }
  })
  )
}));