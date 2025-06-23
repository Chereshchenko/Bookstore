import { useEffect, useState } from "react";
import { GenreItem } from "./genreItem/genreItem";
import { BookSlider } from "./bookSlider/bookSlider";
import { fetchTopBooks, fetchAllBooks } from "../../api/api";
import { getGenres } from "../../api/api";
import { BookTop } from "../../types/types";
import { Loader } from "../ui/loader/loader";

export const BookDisplay = () => {
  const [topBooks, setTopBooks] = useState<BookTop[]>([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ratedBooks = await fetchTopBooks(3);
        const allBooks = await fetchAllBooks();
        const genresData = await getGenres();

        let resultBooks = [...ratedBooks];

        if (resultBooks.length < 3) {
          const availableBooks = allBooks.filter(
            (book) => !ratedBooks.some((rb) => rb.isbn === book.isbn)
          );

          const randomBooks = availableBooks
            .sort(() => Math.random() - 0.5)
            .slice(0, 3 - resultBooks.length)
            .map((book) => ({ ...book, isRandom: true }));

          resultBooks = [...resultBooks, ...randomBooks];
        }

        setTopBooks(resultBooks.slice(0, 3));
        setGenres(genresData.genres);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-[#F9FAFB]">
      <div className="pt-[32px] px-[20px] pb-[80px] sm:pl-[32px] sm:pr-[32px]">
        <BookSlider books={topBooks} />
        <GenreItem books={genres} />
      </div>
    </div>
  );
};
