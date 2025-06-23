import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { addToCart } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useAddToCart = () => {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (bookId: string) => {
    if (!isAuthenticated) {
      setOpenDialog(true);
      return;
    }

    try {
      await addToCart(bookId);
      await fetchCart();
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при добавлении в корзину"
      );
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogin = () => {
    handleCloseDialog();
    navigate("/login");
  };

  return {
    handleAddToCart,
    openDialog,
    handleCloseDialog,
    handleConfirmLogin,
  };
};
