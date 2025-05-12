// src/components/RegisterForm/RegisterForm.tsx
import React from 'react';
import styles from './RegisterForm.module.css';
import TextInput from '../TextInput/TextInput';
import ToggleButton from '../ToggleButton/ToggleButton';
import SubscriptionInfo from '../SubscriptionInfo/SubscriptionInfo';
import Checkbox from '../Checkbox/Checkbox';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

export interface RegisterFormProps {
  email: string;
  password: string;
  isWriter: boolean;
  skipPayment: boolean;
  loading?: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleWriter: () => void;
  onSkipPayment: (checked: boolean) => void;
  onSubmit: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  password,
  isWriter,
  skipPayment,
  loading = false,
  onEmailChange,
  onPasswordChange,
  onToggleWriter,
  onSkipPayment,
  onSubmit,
  onSwitchToLogin,
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
      <ToggleButton
        active={isWriter}
        onToggle={onToggleWriter}
        label="¿Eres escritor?"
      />
      <SubscriptionInfo amount={20} period="al mes" />
      <Checkbox
        checked={skipPayment}
        onChange={checked => onSkipPayment(checked)}
        label="Saltar pago"
      />
      <PrimaryButton type="submit" fullWidth disabled={loading}>
        Ir al pago
      </PrimaryButton>
      <div className={styles.switchContainer}>
        <span className={styles.switchText}>¿Ya tienes cuenta?</span>
        <button
          type="button"
          className={styles.switchLink}
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
