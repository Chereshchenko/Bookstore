import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ConfirmDialog } from "../../../ui/confirmDialog/confirmDialog";
import { useAddToCart } from "../../../../hooks/useAddToCart";

export const AddToCartBtn = ({ bookId }: { bookId: string }) => {
  const {
    handleAddToCart,
    openDialog,
    handleCloseDialog,
    handleConfirmLogin,
  } = useAddToCart();

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          maxWidth: "220px",
          border: "1px solid black",
          width: "100%",
          padding: "8px 12px",
          borderRadius: 1,
          textTransform: "none",
          display: "flex",
          gap: "7px",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
        onClick={() => handleAddToCart(bookId)}
      >
        <ShoppingCartIcon fontSize="small" />
        <span className="text-sm md:text-base">Добавить в корзину</span>
      </Button>
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