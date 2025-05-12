import React from 'react';
import styles from './EmptyState.module.css';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {icon || <FaceFrownIcon className={styles.icon} />}
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default EmptyState;