import { useState } from "react";
import { NavLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { GENRE_IMAGES } from "../../../utils/constant";
import { useFilterStore } from "../../../store/filterStore";

type GenreItemProps = {
  books: { name: string; books_count: number }[];
};

export const GenreItem = ({ books }: GenreItemProps) => {
  const { setFilters, resetFilters } = useFilterStore();

  const handleGenreClick = (genreName: string) => {
    resetFilters();
    setFilters({ genre: genreName });
  };
  const [showAllGenres, setShowAllGenres] = useState(false);

  const displayedGenres = showAllGenres ? books : books.slice(0, 3);

  const toggleGenres = () => {
    setShowAllGenres(!showAllGenres);
  };

  return (
    <div className="mt-[48px]">
      <div className="mb-6 text-2xl font-bold text-gray-900">
        Категории книг
      </div>
      <div className="flex flex-wrap gap-6">
        {displayedGenres.map((genre, index) => (
          <NavLink
            key={index}
            to="/books"
            className="group relative w-[325px] h-[217px] rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleGenreClick(genre.name)}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={GENRE_IMAGES[index % GENRE_IMAGES.length]}
              alt={genre.name}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-gray-700/80 to-gray-500/20 
                                        transition-all duration-300
                                        group-hover:from-gray-800/90 group-hover:to-gray-600/30"
            ></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="text-lg font-medium text-white">{genre.name}</div>
              <div className="text-gray-300 text-sm mt-1">
                {genre.books_count} книг
              </div>
            </div>
          </NavLink>
        ))}
        {books.length > 3 && (
          <div
            className="group relative w-[325px] h-[217px] rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={toggleGenres}
          >
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center p-4">
                {showAllGenres ? (
                  <>
                    <ExpandLessIcon className="text-gray-600 text-4xl mb-2" />
                    <div className="text-gray-800 font-bold text-lg">
                      Скрыть жанры
                    </div>
                  </>
                ) : (
                  <>
                    <ExpandMoreIcon className="text-gray-600 text-4xl mb-2" />
                    <div className="text-gray-800 font-bold text-lg">
                      Другие жанры
                    </div>
                    <div className="text-gray-600 text-sm">
                      +{books.length - 3} жанров
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
