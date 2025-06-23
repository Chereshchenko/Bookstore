export const formatPrice = (price: number): string => {
    const formatted = price.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatted.replace(",", ".") + " ₽";
  };