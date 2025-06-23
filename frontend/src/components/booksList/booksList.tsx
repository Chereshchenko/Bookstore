import { BookCard } from "./bookCard/bookCard";
import { BookResponse } from "../../types/types";

export const BooksList = ({ books }: { books: BookResponse[] }) => {
    if (!books.length) {
        return <div className="w-full text-center py-8">Книги не найдены</div>;
    }

    return (
        <div className="flex gap-[30px] flex-wrap justify-center md:justify-start">
            {books.map(book => (
                <BookCard key={book.isbn} book={book} />        
            ))}
        </div>
    );
};