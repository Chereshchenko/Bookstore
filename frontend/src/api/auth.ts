import { UserData } from "../types/auth";

export const registerUser = async (userData: UserData) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Ошибка при регистрации");
  }

  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Ошибка авторизации");
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch("/api/logout", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка при выходе из системы");
  }
};
