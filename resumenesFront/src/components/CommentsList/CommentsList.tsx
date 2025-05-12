import React from 'react'
import { FaStar } from 'react-icons/fa'
import styles from './CommentsList.module.css'
import type { Valoracion } from '../../features/rating/ratingService'

type Props = {
  valoraciones: Valoracion[]
}

export const CommentsList: React.FC<Props> = ({ valoraciones }) => {
  if (!valoraciones.length) {
    return <p className={styles.empty}>Sin comentarios aún.</p>
  }

  return (
    <ul className={styles.list}>
      {valoraciones.map((v, idx) => (
        <li key={idx} className={styles.item}>
          <div className={styles.avatarPlaceholder}>
            {v.usuario.charAt(0).toUpperCase()}
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.userName}>{v.usuario}</span>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < v.estrellas ? styles.starFilled : styles.starEmpty
                    }
                  />
                ))}
              </div>
            </div>
            <p className={styles.comment}>{v.comentario}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
