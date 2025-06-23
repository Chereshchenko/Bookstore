import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledContainer = styled(Box)({
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  width: "100%",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

const StyledButton = styled(Button)({
  color: "black",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 400,
  padding: "8px 12px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "#ebebeb",
  },
});

type DropdownProps = {
  options: string[];
  defaultSelectedIndex?: number;
  onSelect?: (index: number) => void;
  width?: string | number;
  menuWidth?: string | number;
};

export default function Dropdown({
  options,
  defaultSelectedIndex = 0,
  onSelect,
  width = "100%",
  menuWidth = "200px",
}: DropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] =
    React.useState(defaultSelectedIndex);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (onSelect) {
      onSelect(index);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledContainer sx={{ width }}>
      <StyledButton
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {options[selectedIndex]}
      </StyledButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: menuWidth,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            },
          },
          list: {
            "aria-labelledby": "dropdown-button",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
            sx={{
              fontSize: "14px",
              padding: "8px 16px",
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ebebeb",
                },
              },
              "&:hover": {
                backgroundColor: "#ebebeb",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </StyledContainer>
  );
}
