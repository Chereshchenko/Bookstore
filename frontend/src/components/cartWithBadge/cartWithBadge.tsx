import { useEffect } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { NavLink, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartStore } from "../../store/cartStore";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const CartWithBadge = () => {
  const count = useCartStore((state) => state.total_books);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const location = useLocation();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const isCartPage = location.pathname === "/cart";

  return (
    <NavLink to="/cart">
      <IconButton aria-label="cart">
        {!isCartPage ? (
          <StyledBadge badgeContent={count} color="error">
            <ShoppingCartIcon />
          </StyledBadge>
        ) : (
          <ShoppingCartIcon />
        )}
      </IconButton>
    </NavLink>
  );
};
