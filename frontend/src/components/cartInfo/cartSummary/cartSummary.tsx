import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";

export const CartSummary = ({ total }: { total: number }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/order");
  };

  return (
    <div className="max-w-4xl w-full bg-white p-6 shadow-sm rounded-lg flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-black text-base font-normal">Итого:</div>
        <div className="text-base font-bold text-black">
          {formatPrice(total)}
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handleCheckout}
        sx={{
          backgroundColor: "black",
          color: "white",
          maxWidth: "848px",
          width: "100%",
          fontSize: "16px",
          fontWeight: "500",
          paddingBottom: "10px",
          paddingTop: "10px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
