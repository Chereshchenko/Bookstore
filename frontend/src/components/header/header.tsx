import { NavLink, useLocation, useNavigate, matchPath } from "react-router-dom";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { CartWithBadge } from "../cartWithBadge/cartWithBadge";
import { useAuthStore } from "../../store/authStore";
import { ConfirmDialog } from "../ui/confirmDialog/confirmDialog";
import { CustomModal } from "../../components/ui/modal/modal";
import { SearchFilter } from "../bookFilters/searchFilter/searchFilter";
import { HIDDEN_SEARCH_PATHS } from "../../utils/constant";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [modal, setModal] = useState({ open: false, message: "" });

  const shouldHideSearch = HIDDEN_SEARCH_PATHS.some((path) =>
    matchPath({ path, end: false }, location.pathname)
  );

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setModal({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : "Произошла ошибка при выходе",
      });
    } finally {
      setOpenLogoutDialog(false);
    }
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <div className="flex gap-[5px] sm:gap-[10px] md:gap-[15px] pt-[10px] pb-[10px] px-[10px] sm:pt-[13px] sm:pb-[13px] sm:px-[15px] md:px[32px] border-b-2 border-gray-200">
      <NavLink
        to="/"
        className="flex items-center hover:opacity-80 transition-opacity w-[50px]"
      >
        <img className="h-[32px]" src="/icons/logo-32.svg" alt="Логотип" />
      </NavLink>
      {!shouldHideSearch && <SearchFilter />}
      <div
        className={`${shouldHideSearch ? "flex-1 justify-end" : ""} flex items-center gap-[10px] sm:gap-[10px] md:gap-[30px]`}
      >
        <NavLink
          to="/books"
          className="xs:hidden sm:flex items-center text-[16px] italic font-medium text-[#4f4d58] hover:underline hover:opacity-80 transition-opacity"
        >
          Каталог
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink
              to="/history"
              className="xs:hidden sm:flex items-center text-[16px] italic font-medium text-[#4f4d58] hover:underline hover:opacity-80 transition-opacity"
            >
              Заказы
            </NavLink>
            <CartWithBadge />
            <Button
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "black",
                padding: { xs: "10px 0", sm: "10px 16px" },
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              onClick={handleLogoutClick}
            >
              <PersonIcon sx={{ color: "#ffffff" }} />
              <span className="xs:hidden sm:block text-sm text-white">
                Выйти
              </span>
            </Button>
            <ConfirmDialog
              open={openLogoutDialog}
              title="Подтверждение выхода"
              content={<p>Вы уверены, что хотите выйти из аккаунта?</p>}
              confirmText="Выйти"
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
            />
          </>
        ) : (
          <NavLink to="/login">
            <Button
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "black",
                padding: { xs: "10px 0", sm: "10px 16px" },
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <PersonIcon sx={{ color: "#ffffff" }} />
              <span className="xs:hidden sm:block text-sm text-white">
                Войти
              </span>
            </Button>
          </NavLink>
        )}
      </div>
      <CustomModal
        open={modal.open}
        message={modal.message}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </div>
  );
};
