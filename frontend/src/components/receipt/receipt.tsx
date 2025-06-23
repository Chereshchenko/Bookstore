import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { formatDate } from "../../utils/formatDate";
import { Loader } from "../ui/loader/loader";
import { Order } from "../../types/types";

export const Receipt = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        setOrder(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center p-4 text-red-600">Ошибка: {error}</div>;
  if (!order) return <div className="text-center p-4">Заказ не найден</div>;

  const deliveryCost = order.delivery_type === "до двери" ? 300 : 0;
  const total = order.total + deliveryCost;

  return (
    <main className="bg-[#F9FAFB] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex flex-col gap-6 p-4 sm:p-6">
          <div className="flex flex-col gap-3 pb-4 border-b">
            <h1 className="text-xl sm:text-2xl font-bold">
              Заказ №{order.order_number}
            </h1>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Дата:</span>
              <span>{formatDate(order.date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Статус:</span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm">
                {order.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Доставка</h2>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Способ доставки:</span>
                <span>{order.delivery_type}</span>
              </div>
              {order.delivery_type === "до двери" && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Адрес:</span>
                  <span>{order.address}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold">Товары ({order.items_count})</h2>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div
                  key={item.isbn}
                  className="flex gap-4 p-3 border rounded-lg"
                >
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex flex-col gap-1 flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.quantity} шт. × {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Товары ({order.items_count}):
              </span>
              <span>{formatPrice(order.total)}</span>
            </div>
            {deliveryCost > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Доставка:</span>
                <span>{formatPrice(deliveryCost)}</span>
              </div>
            )}
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Итого:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
