import { Order } from "../../../types/types";
import { formatDate } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import { OrderItem } from "../orderItem/orderItem";
import { useNavigate } from "react-router-dom";

export const OrderCard = ({ order }: { order: Order }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <div
            className="text-base font-semibold cursor-pointer hover:text-gray-600"
            onClick={() => navigate(`/order/${order.order_number}`)}
          >
            Заказ #{order.order_number}
          </div>
          <div className="text-base font-normal text-gray-500">
            {formatDate(order.date)}
          </div>
        </div>
        <div className="px-[13px] py-1 bg-green-100 rounded-full text-base font-normal text-green-800">
          {order.status}
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        {order.items.map((item) => (
          <OrderItem key={item.isbn} item={item} />
        ))}
      </div>
      <div className="flex justify-end text-base font-semibold">
        Итого: {formatPrice(order.total)}
      </div>
    </div>
  );
};
