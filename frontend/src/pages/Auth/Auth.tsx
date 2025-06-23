import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { loginUser } from "../../api/auth";
import { AuthForm } from "../../components/authForm/authForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser(formData.email, formData.password);
      login(formData.rememberMe);
      toast.success("Вы успешно вошли! Перенаправляем на главную страницу");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Произошла ошибка");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#F9FAFB]">
      <div className="rounded-lg max-w-md w-full shadow-sm bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col p-10 items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <img src="./icons/logo-48.svg" alt="Логотип" />
            <div className="flex gap-4">
              <NavLink
                to="/login"
                className="text-sm font-medium border-b-2 pb-2 border-solid border-black"
              >
                Вход
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm font-medium text-gray-500 hover:text-black hover:border-b-2 hover:pb-2 hover:border-solid hover:border-black"
              >
                Регистрация
              </NavLink>
            </div>
          </div>
          <AuthForm
            formData={formData}
            showPassword={showPassword}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};
