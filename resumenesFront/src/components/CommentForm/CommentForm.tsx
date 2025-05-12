import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './CommentForm.module.css';
import { useRating } from './../../context/RatingContext';
import { useAuth } from './../../context/AuthContext';

type Props = {
  documentId: number;
};

export const CommentForm: React.FC<Props> = ({ documentId }) => {
  const { submitValoracion } = useRating();
  const { user } = useAuth();
  const [stars, setStars] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleStarClick = (value: number) => {
    setStars(value);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stars < 1 || commentText.trim() === '') {
      setError('Selecciona estrellas y escribe un comentario');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await submitValoracion(documentId, stars, commentText);
      setStars(0);
      setCommentText('');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error al enviar valoración');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(value => (
          <FaStar
            key={value}
            className={
              value <= stars ? styles.starFilled : styles.starEmpty
            }
            onClick={() => handleStarClick(value)}
          />
        ))}
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Escribe tu comentario..."
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        rows={4}
        disabled={submitting}
      />

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>¡Gracias por tu valoración!</p>}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting}
      >
        {submitting ? 'Enviando...' : 'Enviar valoración'}
      </button>
    </form>
  );
};
