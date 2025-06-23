import Dropdown from "../../components/ui/dropdown/dropdown";

type HeaderWithPaginationProps = {
  booksPerPage: number;
  onBooksPerPageChange: (perPage: number) => void;
};

export const HeaderWithPagination = ({
  booksPerPage,
  onBooksPerPageChange,
}: HeaderWithPaginationProps) => {
  const options = ["6", "8", "12", "16", "20"];

  const handleItemsPerPageSelect = (index: number) => {
    const selectedValue = parseInt(options[index]);
    onBooksPerPageChange(selectedValue);
  };

  const defaultIndex = options.indexOf(booksPerPage.toString());

  return (
    <div className="flex items-center justify-between flex-col gap-4 sm:flex-row">
      <div className="text-[22px] md:text-[24px] font-bold leading-[32px] text-[#111827]">
        Все книги
      </div>
      <div className="flex items-center gap-[8px]">
        <span className="text-base font-normal text-[#4B5563]">Показать: </span>
        <Dropdown
          options={options}
          defaultSelectedIndex={defaultIndex >= 0 ? defaultIndex : 0}
          onSelect={handleItemsPerPageSelect}
        />
      </div>
    </div>
  );
};
