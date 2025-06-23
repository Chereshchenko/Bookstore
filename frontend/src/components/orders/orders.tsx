import { useEffect, useState } from "react";
import { Loader } from "../ui/loader/loader";
import { ToggleVisibilityButton } from "../ui/toggleVisibilityButton/toggleVisibilityButton";
import { fetchOrders } from "../../api/api";
import { OrdersData } from "../../types/types";
import { OrderCard } from "./orderCard/orderCard";


const INITIAL_ORDERS_COUNT = 2;

export const Orders = () => {
  const [ordersData, setOrdersData] = useState<OrdersData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrdersData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <main className="bg-[#F9FAFB] flex items-center justify-center pb-20 pr-4 pl-4 pt-8">
        <div className="text-center text-red-600">
          Ошибка при получении заказов: {error}
        </div>
      </main>
    );
  }

  if (!ordersData || ordersData.orders.length === 0) {
    return (
      <main className="bg-[#F9FAFB] flex items-center justify-center pb-20 pr-4 pl-4 pt-8">
        <div className="text-center text-gray-700">Заказы не найдены</div>
      </main>
    );
  }

  const ordersToShow = showAllOrders
    ? ordersData.orders
    : ordersData.orders.slice(0, INITIAL_ORDERS_COUNT);

  return (
    <main className="bg-[#F9FAFB] flex items-center justify-center pb-20 pr-4 pl-4 pt-8">
      <div className="flex flex-col max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-black mb-8">История заказов</h2>
        <div className="flex flex-col gap-6">
          {ordersToShow.map((order) => (
            <OrderCard key={order.order_number} order={order} />
          ))}

          {ordersData.orders.length > INITIAL_ORDERS_COUNT && (
            <ToggleVisibilityButton
              showAll={showAllOrders}
              totalItems={ordersData.orders.length}
              onClick={() => setShowAllOrders(!showAllOrders)}
              itemType="orders"
            />
          )}
        </div>
      </div>
    </main>
  );
};