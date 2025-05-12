// src/components/TextInput/TextInput.tsx
import React from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  disabled = false,
}) => (
  <div className={styles.wrapper}>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${styles.input} ${error ? styles.inputError : ''}`}
      autoComplete="off"
    />
    {error && <p className={styles.errorText}>{error}</p>}
  </div>
);

export default TextInput;
