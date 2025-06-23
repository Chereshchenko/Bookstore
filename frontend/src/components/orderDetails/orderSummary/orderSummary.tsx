import { formatPrice } from "../../../utils/formatPrice";

export const OrderSummary = ({ total }: { total: number }) => {
  return (
    <div className="flex justify-between items-center">
      <h4 className="text-base font-normal">Сумма заказа:</h4>
      <div className="text-base font-bold">{formatPrice(total)}</div>
    </div>
  );
};
