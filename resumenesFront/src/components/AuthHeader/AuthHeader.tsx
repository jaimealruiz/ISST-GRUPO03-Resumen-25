import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import styles from './AuthHeader.module.css';

export interface AuthHeaderProps {
  /** Texto del título (p.ej. "Iniciar sesión" o "Registrarse") */
  title: string;
  /** Callback al pulsar la flecha de volver atrás */
  onBack: () => void;
  /** Ruta del logo (opcional) */
  logoSrc?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, onBack, logoSrc }) => (
  <div className={styles.header}>
    <button
      className={styles.backButton}
      onClick={onBack}
      aria-label="Volver"
    >
      <ArrowLeftIcon className={styles.backIcon} />
    </button>
    {logoSrc && (
      <img
        src={logoSrc}
        alt="Logo"
        className={styles.logo}
      />
    )}
    <h1 className={styles.title}>{title}</h1>
  </div>
);

export default AuthHeader;
