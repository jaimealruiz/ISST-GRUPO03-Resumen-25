// src/components/ToggleButton/ToggleButton.tsx
import React from 'react';
import styles from './ToggleButton.module.css';

export interface ToggleButtonProps {
  active: boolean;
  onToggle: () => void;
  label: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ active, onToggle, label }) => (
  <button
    type="button"
    className={`${styles.toggle} ${active ? styles.active : ''}`}
    onClick={onToggle}
  >
    {label}
  </button>
);

export default ToggleButton;
