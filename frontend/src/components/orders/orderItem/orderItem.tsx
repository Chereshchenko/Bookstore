import { OrderItemType } from "../../../types/types";
import { formatPrice } from "../../../utils/formatPrice";


export const OrderItem = ({ item }: { item: OrderItemType }) => (
  <div className="flex gap-4 mb-4 last:mb-0">
    <img
      src={item.cover_image}
      alt={item.title}
      className="max-w-16"
    />
    <div className="flex flex-col justify-center">
      <div className="text-base font-medium">{item.title}</div>
      <div className="text-gray-600 font-normal text-base">
        {item.quantity} шт. × {formatPrice(item.price)}
      </div>
    </div>
  </div>
);