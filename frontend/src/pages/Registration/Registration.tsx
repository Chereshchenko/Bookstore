import React, { useState } from "react";
import { RegistrationData, UserData } from "../../types/auth";
import { registerUser } from "../../api/auth";
import { CustomModal } from "../../components/ui/modal/modal";
import { RegistrationForm } from "../../components/registrationForm/registrationForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Registration = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showModalMessage = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const validateForm = () => {
    if (!formData.name || !/^[a-zA-Zа-яА-ЯёЁ]+$/.test(formData.name)) {
      return "Пожалуйста, введите имя, используя только буквы.";
    }
    if (
      !formData.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      return "Пожалуйста, введите корректный email.";
    }
    if (!formData.phone || !/^\d{11}$/.test(formData.phone)) {
      return "Введите 11 цифр номера телефона.";
    }
    if (!formData.password || formData.password.length < 6) {
      return "Пароль должен содержать минимум 6 символов.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Ошибка! Пароли не совпадают.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      showModalMessage(validationError);
      return;
    }

    const user: UserData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      await registerUser(user);
      toast.success("Вы успешно зарегистрированы! Перенаправляем на страницу входа");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при регистрации.",
      );
    } 
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#F9FAFB]">
      <div className="rounded-lg max-w-md w-full shadow-sm bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col p-10 items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <img src="./icons/logo-48.svg" alt="Логотип" />
            <h3 className="text-sm font-medium border-b-2 pb-2 border-solid border-black">
              Регистрация
            </h3>
          </div>
          <RegistrationForm
            formData={formData}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            handleChange={handleChange}
            handleClickShowPassword={handleClickShowPassword}
            handleClickShowConfirmPassword={handleClickShowConfirmPassword}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <CustomModal
        open={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
