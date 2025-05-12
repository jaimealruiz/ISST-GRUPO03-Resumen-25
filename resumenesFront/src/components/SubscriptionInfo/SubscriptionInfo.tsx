// src/components/SubscriptionInfo/SubscriptionInfo.tsx
import React from 'react';
import styles from './SubscriptionInfo.module.css';

export interface SubscriptionInfoProps {
  amount: number;
  period: string;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({ amount, period }) => (
  <div className={styles.container}>
    Suscripción: <span className={styles.amount}>{amount} €</span> {period}
  </div>
);

export default SubscriptionInfo;
