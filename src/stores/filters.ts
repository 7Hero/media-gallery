import { create } from "zustand";
import { Filter, MediaType, MediaTypeFilterState } from "@/types";

export const filterDefinitions = {
  mediaTypes: {
    defaultState: {
      video: true,
      image: true,
      gif: true,
    },
    label: 'Media type',
    options: [
      {
        value: 'video',
        label: 'Videos',
      },
      {
        value: 'image',
        label: 'Images',
      },
      {
        value: 'gif',
        label: 'GIFs',
      },
    ],
    filterFn: (item, filterState) => filterState[item.type]
  } as Filter<MediaTypeFilterState>,
  search: {
    defaultState: '',
    label: 'Search',
    filterFn: (item, searchTerm) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return item.filename.toLowerCase().includes(term);
    }
  } as Filter<string>,
}

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