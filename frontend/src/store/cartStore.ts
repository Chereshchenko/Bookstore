import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { getCart, updateItemQuantity, removeItem } from "../api/api";
import { CartStore } from "../types/types";


export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  count: 0,
  total: 0,
  isLoading: false,
  total_books: 0,

  fetchCart: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated || get().isLoading) return;

    set({ isLoading: true });
    try {
      const data = await getCart();
      set({ items: data.items, count: data.count, total: data.total_price, total_books: data.total_books });
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateItemQuantity: async (itemId, quantity) => {
    try {
      await updateItemQuantity(itemId, quantity);
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
      throw error;
    }
  },
}));
