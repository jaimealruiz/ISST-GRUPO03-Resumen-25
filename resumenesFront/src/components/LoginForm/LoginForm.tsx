// src/components/LoginForm/LoginForm.tsx
import React from 'react';
import styles from './LoginForm.module.css';
import TextInput from '../TextInput/TextInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

export interface LoginFormProps {
  email: string;
  password: string;
  loading?: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  loading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitchToRegister,
}) => {
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) newErrors.email = 'Email inválido';
    if (password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextInput
        name="email"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        error={errors.email}
      />
      <TextInput
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Contraseña"
        error={errors.password}
      />
      <PrimaryButton type="submit" fullWidth disabled={loading}>
        Iniciar sesión
      </PrimaryButton>
      <div className={styles.switchContainer}>
        <span className={styles.switchText}>¿No tienes cuenta?</span>
        <button
          type="button"
          className={styles.switchLink}
          onClick={onSwitchToRegister}
        >
          Regístrate
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

