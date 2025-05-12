// src/components/Checkbox/Checkbox.tsx
import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, disabled = false }) => (
  <label className={styles.wrapper}>
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      disabled={disabled}
    />
    <span className={styles.label}>{label}</span>
  </label>
);

export default Checkbox;
