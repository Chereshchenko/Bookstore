import { useState } from "react";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { InputWithIcon } from "../../components/ui/inputWithIcon/inputWithIcon";
import { AuthFormProps } from "../../types/auth";
import { ConfirmDialog } from "../ui/confirmDialog/confirmDialog";

export const AuthForm = ({ formData, showPassword, handleChange, handleSubmit, toggleShowPassword }: AuthFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <form
        className="flex flex-col gap-5 w-full max-w-[368px]"
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className="mb-1 text-sm font-medium text-gray-700">Email</h3>
          <InputWithIcon
            icon={<MailOutlineIcon fontSize="small" color="action" />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            autoComplete="email"
          />
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-gray-700">Пароль</h3>
          <InputWithIcon
            icon={<LockIcon fontSize="small" color="action" />}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            autoComplete="new-password"
            showPasswordToggle
            onTogglePassword={toggleShowPassword}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 border-gray-300 rounded focus:ring-gray-500"
            />
            <span className="text-gray-900 text-sm font-normal">Запомнить меня</span>
          </label>
          <button
            type="button"
            className="text-black text-sm font-medium hover:underline"
            onClick={() => setIsDialogOpen(true)}
          >
            Забыли пароль?
          </button>
        </div>
        <Button
          variant="contained"
          sx={{
            maxWidth: "368px",
            width: "100%",
            padding: "9px",
            backgroundColor: "black",
            color: "white",
            borderRadius: 1,
            fontFamily: "'Roboto', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          type="submit"
        >
          Войти
        </Button>
      </form>
      <ConfirmDialog
        open={isDialogOpen}
        title="Восстановление пароля"
        content={
          <>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 mb-4">Для сброса пароля введите email</p>
            </div>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </>
        }
        confirmText="Отправить ссылку"
        onConfirm={() => {
          setIsDialogOpen(false);
        }}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
};
