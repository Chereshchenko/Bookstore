import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import CustomPagination from "../../components/customPagination/customPagination";
import { BookFilters } from "../../components/bookFilters/bookFilters";
import { BooksList } from "../../components/booksList/booksList";
import { HeaderWithPagination } from "../../components/headerWithPagination/headerWithPagination";
import { BookResponse } from "../../types/types";
import { fetchBooks } from "../../api/api";
import { Loader } from "../../components/ui/loader/loader";
import { getGenres } from "../../api/api";
import { useFilterStore } from "../../store/filterStore";

export const BooksCatalog = () => {
  const [booksData, setBooksData] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ name: string; books_count: number }[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);

  const { genre, search, min_price, max_price, sort_by } = useFilterStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [genresResponse, booksResponse] = await Promise.all([
          getGenres(),
          fetchBooks({ genre, search, min_price, max_price, sort_by }),
        ]);

        setGenres(genresResponse.genres);
        setBooksData(booksResponse.books);
        setCurrentPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [genre, search, min_price, max_price, sort_by]);

  const handleBooksPerPageChange = (newPerPage: number) => {
    setBooksPerPage(newPerPage);
    setCurrentPage(1);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksData.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(booksData.length / booksPerPage);

  return (
    <>
      <Header />
      <div className="bg-[#F9FAFB] p-8">
        <div className="flex gap-6 xs:flex-col sm:flex-row">
          <BookFilters genres={genres} />
          <div className="w-full flex flex-col gap-6">
            <HeaderWithPagination
              booksPerPage={booksPerPage}
              onBooksPerPageChange={handleBooksPerPageChange}
            />
            <BooksList books={currentBooks} />
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
