import React from 'react';
import styles from './HistoryItem.module.css';

export interface HistoryItemProps {
  coverUrl: string;
  title: string;
  author: string;
  lastAccess: string;     // e.g. "22 feb"
  progressPercent: number; // 0–100
  onClick?: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  coverUrl,
  title,
  author,
  lastAccess,
  progressPercent,
  onClick,
}) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <img src={coverUrl} alt={title} className={styles.cover} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
        <p className={styles.lastAccess}>Último acceso: {lastAccess}</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
