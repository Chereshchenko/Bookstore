export type RegistrationData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type UserData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type RegistrationFormProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickShowPassword: () => void;
  handleClickShowConfirmPassword: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}


export type AuthState = {
  isAuthenticated: boolean;
  login: (remember: boolean) => void;
  logout: () => Promise<void>;
}

export type AuthFormProps = {
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  showPassword: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  toggleShowPassword: () => void;
}