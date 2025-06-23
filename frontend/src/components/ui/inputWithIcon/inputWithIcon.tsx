import { IconButton } from "@mui/material";
import { InputWithIconProps } from "../../../types/types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const InputWithIcon = ({
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  showPasswordToggle = false,
  onTogglePassword,
}: InputWithIconProps) => {
  return (
    <div className="flex items-center px-3 py-2 gap-3 border border-gray-300 shadow-sm rounded-md">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="text-sm text-gray-500 outline-none font-normal input-autofill flex-1"
      />
      {showPasswordToggle && (
        <IconButton
          aria-label="toggle password visibility"
          onClick={onTogglePassword}
          edge="end"
          size="small"
          sx={{ padding: 0 }}
        >
          {type === "password" ? (
            <Visibility fontSize="small" />
          ) : (
            <VisibilityOff fontSize="small" />
          )}
        </IconButton>
      )}
    </div>
  );
};
