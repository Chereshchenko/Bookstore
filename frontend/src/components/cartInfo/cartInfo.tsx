import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { Loader } from "../ui/loader/loader";
import { toast } from "react-toastify";
import { ItemInCart } from "./itemInCart/itemInCart";
import { CartSummary } from "./cartSummary/cartSummary";

export const CartInfo = () => {
  const {
    items,
    total_books,
    isLoading,
    fetchCart,
    updateItemQuantity,
    removeItem,
  } = useCartStore();
  const [localLoading, setLocalLoading] = useState(false);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1 || localLoading) return;

    if (isLoading) {
      <Loader />;
    }

    setLocalLoading(true);
    try {
      const updatedItems = items.map((item) =>
        item.book_id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              item_total: item.price * newQuantity,
            }
          : item
      );
      useCartStore.setState({ items: updatedItems });
      await updateItemQuantity(itemId, newQuantity);
    } catch {
      fetchCart();
      toast.error("Ошибка при обновлении количества товара");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (localLoading) return;
    setLocalLoading(true);

    try {
      const updatedItems = items.filter((item) => item.book_id !== itemId);
      useCartStore.setState({
        items: updatedItems,
        total_books: updatedItems.length,
      });
      await removeItem(itemId);
      toast.success("Товар удален из корзины");
    } catch {
      fetchCart();
      toast.error("Не удалось удалить товар");
    } finally {
      setLocalLoading(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (isLoading) return <Loader />;
  if (total_books === 0)
    return <div className="text-center py-8">Корзина пуста</div>;

  return (
    <main className="bg-[#F9FAFB] flex items-center justify-center pb-20 pr-4 pl-4 pt-8">
      <div className="flex flex-col gap-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-black">Корзина</h2>
        {items.map((item) => (
          <ItemInCart
            key={item.book_id}
            item={item}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item.book_id, newQuantity)
            }
            onDelete={() => handleDeleteItem(item.book_id)}
          />
        ))}
        <CartSummary total={calculateTotal()} />
      </div>
    </main>
  );
};
