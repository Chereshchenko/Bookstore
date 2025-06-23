type DeliveryMethodProps = {
  deliveryMethod: "самовывоз" | "до двери";
  setDeliveryMethod: (method: "самовывоз" | "до двери") => void;
};

export const DeliveryMethod = ({
  deliveryMethod,
  setDeliveryMethod,
}: DeliveryMethodProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-semibold">Способ доставки</h3>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="cursor-pointer w-4 h-4"
            checked={deliveryMethod === "самовывоз"}
            onChange={() => setDeliveryMethod("самовывоз")}
          />
          <span className="font-normal text-base">Самовывоз (бесплатно)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="cursor-pointer w-4 h-4"
            checked={deliveryMethod === "до двери"}
            onChange={() => setDeliveryMethod("до двери")}
          />
          <span className="font-normal text-base">Курьером (300 ₽)</span>
        </label>
      </div>
    </div>
  );
};
