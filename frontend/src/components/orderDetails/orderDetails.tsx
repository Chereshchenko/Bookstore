import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { Loader } from "../ui/loader/loader";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { createOrder } from "../../api/api";
import { OrderSummary } from "./orderSummary/orderSummary";
import { DeliveryMethod } from "./deliveryMethod/deliveryMethod";
import { AddressForm } from "./addressForm/addressForm";
import { formatPrice } from "../../utils/formatPrice";
import { ConfirmDialog } from "../ui/confirmDialog/confirmDialog";
import { toast } from "react-toastify";

const initialAddress = {
  street: "",
  house: "",
  apartment: "",
  delivery_comment: "",
};

export const OrderDetails = () => {
  const { total, isLoading, items } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState<
    "самовывоз" | "до двери"
  >("самовывоз");
  const [address, setAddress] = useState(initialAddress);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const deliveryCost = deliveryMethod === "до двери" ? 300 : 0;
  const totalWithDelivery = total + deliveryCost;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    const addressText =
      deliveryMethod === "до двери"
        ? `${address.street}, д. ${address.house}${address.apartment ? `, кв. ${address.apartment}` : ""}`
        : "Самовывоз";

    try {
      const { order_number } = await createOrder({
        delivery_type: deliveryMethod,
        address: addressText,
        delivery_comment: address.delivery_comment,
      });
      navigate(`/order/${order_number}`);
    } catch {
      setDialogOpen(false);
      toast.error("Произошла ошибка при оформлении заказа.");
    }
  };

  if (isLoading) return <Loader />;

  const orderContent = (
    <div>
      <p>Итоговая сумма: {formatPrice(totalWithDelivery)}</p>
      <p>Способ доставки: {deliveryMethod}</p>
      {deliveryMethod === "до двери" && address.street && (
        <p>
          Адрес: {address.street}, д. {address.house}
          {address.apartment && `, кв. ${address.apartment}`}
        </p>
      )}
      <div className="mt-4">
        <h4 className="font-medium">Состав заказа:</h4>
        <ul className="list-disc pl-5">
          {items.map((item) => (
            <li key={item.book_id}>
              {item.title} - {item.quantity} шт. × {formatPrice(item.price)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <main className="bg-[#F9FAFB] flex items-center justify-center pb-20 pr-4 pl-4 pt-8">
      <div className="flex flex-col gap-8 max-w-4xl w-full">
        <h1 className="text-2xl font-bold">Оформление заказа</h1>

        <div className="p-6 bg-white shadow-sm rounded-lg flex flex-col gap-6">
          <OrderSummary total={totalWithDelivery} />
          <DeliveryMethod
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {deliveryMethod === "до двери" && (
              <AddressForm address={address} onChange={handleAddressChange} />
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                maxWidth: "848px",
                width: "100%",
                fontSize: "16px",
                fontWeight: "500",
                paddingBottom: "10px",
                paddingTop: "10px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Подтвердить заказ
            </Button>
          </form>
        </div>
      </div>
      <ConfirmDialog
        open={dialogOpen}
        title="Подтверждение заказа"
        content={orderContent}
        confirmText="Подтвердить"
        cancelText="Отменить"
        onConfirm={handleConfirm}
        onCancel={() => setDialogOpen(false)}
      />
    </main>
  );
};
