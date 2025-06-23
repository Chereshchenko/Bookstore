import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { BookSliderProps } from "../../../types/types";
import { BOOK_IMAGES } from "../../../utils/constant";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { ConfirmDialog } from "../../../components/ui/confirmDialog/confirmDialog";

export const BookSlider = ({ books }: BookSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { handleAddToCart, openDialog, handleCloseDialog, handleConfirmLogin } =
    useAddToCart();

  useEffect(() => {
    if (books.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [books]);

  const currentBook = books[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-lg">
      <img
        className="w-full h-[240px] sm:h-[300px] md:h-[330px] lg:h-[400px] object-cover"
        src={BOOK_IMAGES[currentIndex % BOOK_IMAGES.length]}
        alt={`Обложка: ${currentBook.title}`}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/70 to-transparent text-white">
        <div className="text-2xl font-bold flex-grow">{currentBook.title}</div>
        <div className="text-gray-300 mt-1">{currentBook.author}</div>
        <div className="text-sm text-gray-300 line-clamp-2">
          {currentBook.description}
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold">{currentBook.price} ₽</span>
          <div className="flex gap-1">
            {books.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`w-2 h-2 rounded-full ${dotIndex === currentIndex ? "bg-white" : "bg-gray-400"}`}
              />
            ))}
          </div>
          <Button
            variant="contained"
            onClick={() => handleAddToCart(currentBook.isbn)}
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "#eee" },
              textTransform: "none",
              padding: { xs: "8px", sm: "10px 16px" },
            }}
          >
            <ShoppingBasketIcon sx={{ display: { xs: "block", sm: "none" } }} />
            <span className="xs:hidden sm:block">В корзину</span>
          </Button>
        </div>
      </div>
      <ConfirmDialog
        open={openDialog}
        title="Необходима авторизация"
        content="Чтобы добавить товар в корзину, вам необходимо войти в систему."
        confirmText="Перейти к входу"
        cancelText="Отмена"
        onConfirm={handleConfirmLogin}
        onCancel={handleCloseDialog}
      />
    </div>
  );
};
