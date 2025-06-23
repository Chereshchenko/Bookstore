import { PriceSliderFilter } from "./priceSliderFilter/priceSliderFilter";
import { useFilterStore } from "../../store/filterStore";
import Dropdown from "../../components/ui/dropdown/dropdown";
import { GenreFilter } from "./genreFilter/genreFilter";
import { SORT_OPTIONS } from "../../utils/constant";

type Genre = {
  name: string;
};

type BookFiltersProps = {
  genres: Genre[];
};

export const BookFilters = ({ genres }: BookFiltersProps) => {
  const {
    genre: selectedGenre,
    min_price = 0,
    max_price = 5000,
    sort_by,
    setFilters,
    setSortBy,
  } = useFilterStore();

  const handleGenreSelect = (genre: string | null) => {
    setFilters({ genre: genre ?? undefined });
  };

  const handlePriceChange = ([min, max]: [number, number]) => {
    setFilters({ min_price: min, max_price: max });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const genreList = [
    { name: "Все", value: null },
    ...genres.map((g) => ({ name: g.name, value: g.name })),
  ];

  return (
    <div className="flex flex-col gap-6 m-auto sm:m-0 bg-white xs:p-6 sm:p-5 md:p-6 max-w-[326px] sm:max-w-[224px] msm:max-w-[326px] w-full h-full rounded shadow-sm">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">Жанры</h2>
        <GenreFilter
          genres={genreList}
          selectedGenre={selectedGenre === undefined ? null : selectedGenre}
          onSelect={handleGenreSelect}
        />
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
        <h2 className="text-lg font-semibold">Сортировка</h2>
        <Dropdown
          options={SORT_OPTIONS.map((option) => option.label)}
          defaultSelectedIndex={SORT_OPTIONS.findIndex(
            (option) => option.value === sort_by
          )}
          onSelect={(index) => handleSortChange(SORT_OPTIONS[index].value)}
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h2 className="text-lg font-semibold">Цена</h2>
        <PriceSliderFilter
          value={[min_price, max_price]}
          onChange={handlePriceChange}
          max={5000}
        />
      </div>
    </div>
  );
};