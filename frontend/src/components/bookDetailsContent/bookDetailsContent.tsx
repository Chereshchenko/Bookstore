import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookImage } from "./bookImage/bookImage";
import { BookInfo } from "./bookInfo/bookInfo";
import { BookReviews } from "./bookReviews/bookReviews";
import { Loader } from "../ui/loader/loader";
import { fetchBookById } from "../../api/api";
import { Book } from "../../types/types";

export const BookDetailsContent = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        if (!id) throw new Error("ID книги не указан");
        const bookData = await fetchBookById(id);
        setBook(bookData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };
  
    loadBook();
  }, [id]);
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center p-8">{error}</div>;
  }

  if (!book) {
    return <div className="text-center p-8">Книга не найдена</div>;
  }

  return (
    <main className="bg-[#F9FAFB]">
      <div className="pt-4 pr-4 pl-4 pb-[40px] md:pt-10 md:pr-10 md:pl-10 md:pb-[80px] flex flex-col gap-6 md:gap-9">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
          <BookImage cover={book.cover_image} title={book.title} />
          <BookInfo
            title={book.title}
            author={book.author.name}
            year={book.year}
            price={book.price}
            description={book.description}
            bookId={book.isbn}
            rating={book.rating}
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-black">
            Отзывы читателей
          </h2>
          <BookReviews bookId={book.isbn} />
        </div>
      </div>
    </main>
  );
};
