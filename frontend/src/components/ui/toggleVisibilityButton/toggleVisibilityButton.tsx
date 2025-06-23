import { Button } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

type ToggleVisibilityButtonProps = {
  showAll: boolean;
  totalItems: number;
  onClick: () => void;
  itemType?: "reviews" | "orders";
  className?: string;
};

export const ToggleVisibilityButton = ({
  showAll,
  totalItems,
  onClick,
  itemType = "reviews",
  className = "",
}: ToggleVisibilityButtonProps) => {
  const getButtonText = () => {
    if (showAll) {
      return itemType === "reviews" 
        ? "Скрыть отзывы" 
        : "Скрыть заказы";
    }
    return itemType === "reviews"
      ? `Показать все отзывы (${totalItems})`
      : `Показать все заказы (${totalItems})`;
  };

  return (
    <div className={`flex justify-center mt-4 ${className}`}>
      <Button
        variant="outlined"
        endIcon={showAll ? <ExpandLess /> : <ExpandMore />}
        onClick={onClick}
        sx={{
          textTransform: "none",
          color: "rgba(75, 85, 99, 1)",
          borderColor: "rgba(75, 85, 99, 1)",
          "&:hover": { borderColor: "#070707" },
        }}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};