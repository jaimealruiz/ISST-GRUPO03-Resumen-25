import React from 'react';
import styles from './DocumentCard.module.css';

export interface DocumentCardProps {
  /** URL de la portada del documento */
  coverUrl: string;
  /** Título del documento */
  title: string;
  /** Nombre del autor */
  author: string;
  /** Callback al hacer click en la tarjeta */
  onClick?: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ coverUrl, title, author, onClick }) => {
  const displayAuthor = author.includes('@') ? author.split('@')[0] : author;

  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={coverUrl}
        alt={title}
        className={styles.cover}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{displayAuthor}</p>
      </div>
    </div>
  );
};


export default DocumentCard;
