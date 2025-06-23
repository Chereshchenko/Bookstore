import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { BookResponse } from "../../../types/types";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { ConfirmDialog } from "../../ui/confirmDialog/confirmDialog";

export const BookCard = ({ book }: { book: BookResponse }) => {
  const navigate = useNavigate();
  const { handleAddToCart, openDialog, handleCloseDialog, handleConfirmLogin } =
    useAddToCart();

  const handleCardClick = () => {
    navigate(`/books/${book.isbn}`);
  };

  return (
    <>
      <div
        className="max-w-[238px] flex flex-col gap-2 bg-[#ffffff] p-4 rounded-2 shadow-sm cursor-pointer
       hover:shadow-md transition-all duration-200 hover:-translate-y-1"
      >
        {book.cover_image && (
          <div onClick={handleCardClick}>
            <img
              src={book.cover_image}
              alt={`Обложка книги ${book.title}`}
              className="h-[260px] sm:h-[220px] msm:h-[260px] md:h-[300px] object-cover"
            />
          </div>
        )}
        <div
          onClick={handleCardClick}
          className="mt-2 text-sm msm:text-base font-semibold text-black"
        >
          {book.title}
        </div>
        <div className="text-xs msm:text-sm font-normal text-[#4B5563]">{book.author}</div>
        <div className="flex items-center justify-between">
          <span className="text-base sm:text-sm msm:text-lg font-bold text-black">{book.price} ₽</span>
          <Button
            variant="contained"
            onClick={() => handleAddToCart(book.isbn)}
            sx={{
              backgroundColor: "white",
              color: "black",
              padding: { xs: "8px", md: "10px 16px" },
              borderRadius: 2,
              textTransform: "none",
              border: "1px solid black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#ebebeb",
                boxShadow: "none",
              },
            }}
          >
            <ShoppingBasketIcon sx={{ display: { xs: "block", sm: "none" } }} />
            <span className="xs:hidden sm:block text-sm font-normal text-black">
              В корзину
            </span>
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
    </>
  );
};