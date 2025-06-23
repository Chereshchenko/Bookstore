import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterState = {
  genre: string | undefined;
  search: string;
  min_price: number | undefined;
  max_price: number | undefined;
  sort_by: string;
};

type FilterActions = {
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
};

const initialState: FilterState = {
  genre: undefined,
  search: "",
  min_price: undefined,
  max_price: undefined,
  sort_by: "default",
};

export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set) => ({
      ...initialState,
      setFilters: (filters) => set((state) => ({ ...state, ...filters })),
      setSearchQuery: (query) => set({ search: query }),
      setSortBy: (sort_by) => set({ sort_by }),
      resetFilters: () => set(initialState),
    }),
    {
      name: "book-filters",
    }
  )
);
