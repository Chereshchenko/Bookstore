import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type Genre = {
  name: string;
  value: string | null;
};

type GenreListProps = {
  genres: Genre[];
  selectedGenre: string | null;
  onSelect: (genre: string | null) => void;
};

export const GenreFilter = ({
  genres,
  selectedGenre,
  onSelect,
}: GenreListProps) => {
  const [manuallyOpened, setManuallyOpened] = useState(false);

  const isHiddenGenre = selectedGenre
    ? !genres.slice(0, 4).some((g) => g.value === selectedGenre)
    : false;

  const showAllGenres = manuallyOpened || isHiddenGenre;

  const handleGenreSelect = (value: string | null) => {
    onSelect(value);
    if (isHiddenGenre) {
      setManuallyOpened(true);
    }
  };

  const toggleGenres = () => {
    setManuallyOpened(!showAllGenres);
  };

  const visibleGenres = showAllGenres ? genres : genres.slice(0, 4);

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2 text-base font-normal text-gray-700">
        {visibleGenres.map(({ name, value }) => (
          <li
            key={name}
            className={`pt-2 pb-2 pl-3 cursor-pointer rounded ${
              selectedGenre === value
                ? "bg-gray-200 font-bold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleGenreSelect(value)}
          >
            {name}
          </li>
        ))}
      </ul>

      {genres.length > 4 && (
        <button
          className="flex items-center gap-1 pt-2 pb-2 pl-3 text-gray-700 font-bold hover:bg-gray-100 rounded"
          onClick={toggleGenres}
        >
          {showAllGenres ? (
            <>
              <KeyboardArrowUpIcon fontSize="small" />
              Свернуть
            </>
          ) : (
            <>
              <KeyboardArrowDownIcon fontSize="small" />
              Другие жанры
            </>
          )}
        </button>
      )}
    </div>
  );
};
