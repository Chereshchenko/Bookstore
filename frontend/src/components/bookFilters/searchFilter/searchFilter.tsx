import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import { useFilterStore } from "../../../store/filterStore";

export const SearchFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const search = useFilterStore((state) => state.search);
  const setSearch = useFilterStore((state) => state.setSearchQuery);

  const [localSearch, setLocalSearch] = useState(
    location.pathname === "/books" ? search : ""
  );

  const [debouncedLocalSearch] = useDebounce(localSearch, 500);

  useEffect(() => {
    if (location.pathname === "/books") {
      setLocalSearch(search);
    } else {
      setLocalSearch("");
    }
  }, [location.pathname, search]);

  useEffect(() => {
    if (location.pathname === "/books" && debouncedLocalSearch !== search) {
      setSearch(debouncedLocalSearch);
      return;
    }
    if (debouncedLocalSearch && location.pathname !== "/books") {
      useFilterStore.getState().resetFilters();
      setSearch(debouncedLocalSearch);
      navigate("/books");
      return;
    }
  }, [debouncedLocalSearch, search, setSearch, navigate, location.pathname]);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[512px] w-full pt-[10px] pb-[10px] px-[11px] flex gap-[12px] border border-gray-300 rounded-[6px]">
        <SearchIcon sx={{ color: "#B0B0B0" }} />
        <div className="w-full">
          <input
            className="w-full border-none outline-none"
            type="search"
            placeholder="Поиск книг, авторов..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            aria-label="Search books"
          />
        </div>
      </div>
    </div>
  );
};
