// src/components/SubscriptionCard/SubscriptionCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SubscriptionCard.module.css';

export interface SubscriptionCardProps {
  /**
   * Función opcional que se ejecuta al hacer click en "Suscribirse".
   * Si no se provee, navegamos a "/register".
   */
  onSubscribe?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ onSubscribe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      navigate('/register');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {/* SVG de check azul */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" fill="rgba(41, 98, 255, 0.1)" />
          <path
            d="M9 12.5L11 14.5L15 10.5"
            stroke="#2962FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={styles.text}>
        <h3 className={styles.title}>¿Interesado en más contenidos?</h3>
      </div>

      <button className={styles.button} onClick={handleClick}>
        Suscribirse
      </button>
    </div>
  );
};

export default SubscriptionCard;
