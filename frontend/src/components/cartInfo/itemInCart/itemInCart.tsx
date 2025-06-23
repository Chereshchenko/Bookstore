import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem } from "../../../types/types";
import { formatPrice } from "../../../utils/formatPrice";

export const ItemInCart = ({
  item,
  onQuantityChange,
  onDelete,
}: {
  item: CartItem;
  onQuantityChange: (newQuantity: number) => void;
  onDelete: () => void;
}) => (
  <div className="flex gap-4 p-4 bg-white shadow-sm rounded-lg items-center">
    <div className="max-w-24 w-full">
      <img
        className="rounded min-h-32 object-cover"
        src={item.cover_image}
        alt="Book Image"
      />
    </div>
    <div className="flex gap-2 flex-col max-w-[722px] w-full">
      <div>
        <p className="text-xs sm:text-base font-semibold text-black">
          {item.title}
        </p>
        <p className="text-xs sm:text-base font-normal text-gray-600">
          {item.author.name}
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex border border-gray-200 rounded">
          <button
            className="py-1 px-3 text-base font-normal text-black hover:bg-gray-100"
            onClick={() => onQuantityChange(item.quantity - 1)}
          >
            -
          </button>
          <div className="py-2 px-[18px] border-x border-gray-200 text-black text-base font-normal">
            {item.quantity}
          </div>
          <button
            className="py-1 px-3 text-base font-normal text-black hover:bg-gray-100"
            onClick={() => onQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="flex items-center text-base font-semibold text-black">
          {formatPrice(item.item_total)}
        </div>
      </div>
    </div>
    <DeleteIcon
      onClick={onDelete}
      sx={{
        color: "rgba(239, 68, 68, 1)",
        cursor: "pointer",
        "&:hover": {
          color: "rgba(220, 38, 38, 1)",
          transform: "scale(1.1)",
        },
      }}
    />
  </div>
);
