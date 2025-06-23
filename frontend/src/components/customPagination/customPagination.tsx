import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: "8px 0 0 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
});

const PageButton = styled("button")<{ selected?: boolean }>(({ selected }) => ({
  padding: "9px 11px",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  backgroundColor: selected ? "#000000" : "white",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  color: selected ? "white" : "#374151",
  "&:hover": {
    backgroundColor: "#000000",
    color: "white",
  },
  minWidth: "40px",
}));

const NavButton = styled("button")(({ theme }) => ({
  padding: "9px 11px",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  backgroundColor: "white",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  color: "#374151",
  "&:hover": {
    backgroundColor: "#000000",
    color: "white",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (totalPages <= 1) return null;

  if (isSmallScreen) {
    const mobileItems = [];

    if (currentPage > 1) {
      mobileItems.push(
        <li key={`prev-${currentPage - 1}`}>
          <PageButton
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </PageButton>
        </li>
      );
    }

    mobileItems.push(
      <li key={`current-${currentPage}`}>
        <PageButton
          type="button"
          selected
          aria-current="true"
          onClick={() => onPageChange(currentPage)}
        >
          {currentPage}
        </PageButton>
      </li>
    );

    if (currentPage < totalPages) {
      mobileItems.push(
        <li key={`next-${currentPage + 1}`}>
          <PageButton
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </PageButton>
        </li>
      );
    }

    return (
      <nav>
        <List>{mobileItems}</List>
      </nav>
    );
  }

  const paginationItems = [];

  if (currentPage > 1) {
    paginationItems.push(
      <li key="previous">
        <NavButton
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Предыдущая страница"
        >
          Назад
        </NavButton>
      </li>
    );
  }

  if (currentPage > 1) {
    paginationItems.push(
      <li key={`page-${currentPage - 1}`}>
        <PageButton type="button" onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </PageButton>
      </li>
    );
  }

  paginationItems.push(
    <li key={`page-${currentPage}`}>
      <PageButton
        type="button"
        selected
        aria-current="true"
        onClick={() => onPageChange(currentPage)}
      >
        {currentPage}
      </PageButton>
    </li>
  );

  if (currentPage < totalPages) {
    paginationItems.push(
      <li key={`page-${currentPage + 1}`}>
        <PageButton type="button" onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </PageButton>
      </li>
    );
  }

  if (currentPage < totalPages) {
    paginationItems.push(
      <li key="next">
        <NavButton
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Следующая страница"
        >
          Вперед
        </NavButton>
      </li>
    );
  }

  return (
    <nav>
      <List>{paginationItems}</List>
    </nav>
  );
}
