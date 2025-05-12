// src/components/PrimaryButton/PrimaryButton.tsx
import React from 'react';
import styles from './PrimaryButton.module.css';

export interface PrimaryButtonProps {
  /** Texto del botón */
  children: React.ReactNode;
  /** Callback onClick */
  onClick?: () => void;
  /** Deshabilitado */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Tipo de botón (submit, button, reset) */
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  fullWidth = true,
  type = 'button',
}) => (
  <button
    type={type}
    className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default PrimaryButton;
