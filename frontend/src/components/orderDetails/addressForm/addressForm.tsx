type Address = {
  street: string;
  house: string;
  apartment: string;
  delivery_comment: string;
};

type AddressFormProps = {
  address: Address;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddressForm = ({ address, onChange }: AddressFormProps) => {
  return (
    <>
      <h3 className="text-base font-semibold">Адрес доставки</h3>
      <label className="flex flex-col gap-1">
        <input
          type="text"
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black
           placeholder:text-gray-500 placeholder:text-base placeholder:font-normal"
          placeholder="Улица*"
          name="street"
          value={address.street}
          onChange={onChange}
          required
        />
      </label>
      <div className="flex gap-4">
        <label className="flex flex-col gap-1 w-full">
          <input
            type="text"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black
             placeholder:text-gray-500 placeholder:text-base placeholder:font-normal w-full"
            placeholder="Дом*"
            name="house"
            value={address.house}
            onChange={onChange}
            required
          />
        </label>
        <label className="flex flex-col gap-1 w-full">
          <input
            type="text"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black
             placeholder:text-gray-500 placeholder:text-base placeholder:font-normal w-full"
            placeholder="Квартира"
            name="apartment"
            value={address.apartment}
            onChange={onChange}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <input
          type="text"
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black
           placeholder:text-gray-500 placeholder:text-base placeholder:font-normal"
          placeholder="Комментарий для курьера"
          name="delivery_comment"
          value={address.delivery_comment}
          onChange={onChange}
        />
      </label>
    </>
  );
};
