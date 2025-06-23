import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import { InputWithIcon } from "../../components/ui/inputWithIcon/inputWithIcon";
import { RegistrationFormProps } from "../../types/auth";

export const RegistrationForm = ({
  formData,
  showPassword,
  showConfirmPassword,
  handleChange,
  handleClickShowPassword,
  handleClickShowConfirmPassword,
  handleSubmit,
}: RegistrationFormProps) => {
  return (
    <form
      className="flex flex-col gap-4 w-full max-w-[368px]"
      onSubmit={handleSubmit}
    >
      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Имя</h3>
        <InputWithIcon
          icon={<PersonIcon fontSize="small" color="action" />}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введите Имя"
        />
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Email</h3>
        <InputWithIcon
          icon={<MailOutlineIcon fontSize="small" color="action" />}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите email"
          autoComplete="email"
        />
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Телефон</h3>
        <InputWithIcon
          icon={<PhoneIcon fontSize="small" color="action" />}
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Введите телефон"
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
          onTogglePassword={handleClickShowPassword}
        />
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium text-gray-700">
          Подтвердите пароль
        </h3>
        <InputWithIcon
          icon={<LockIcon fontSize="small" color="action" />}
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Подтвердите пароль"
          autoComplete="new-password"
          showPasswordToggle
          onTogglePassword={handleClickShowConfirmPassword}
        />
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
        Создать аккаунт
      </Button>
    </form>
  );
};
