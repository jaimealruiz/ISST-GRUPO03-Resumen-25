import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import styles from './RatingDisplay.module.css'

type Props = {
  /** Valor medio de estrellas (por ejemplo 4.5) */
  average: number
  /** Total de valoraciones */
  total?: number
}

/**
 * Muestra la valoración media con estrellas y opcionalmente el total de valoraciones.
 */
export const RatingDisplay: React.FC<Props> = ({ average, total }) => {
  // Genera un array de 5 posiciones con iconos según la media
  const stars = [...Array(5)].map((_, i) => {
    const value = i + 1
    if (average >= value) {
      return <FaStar key={i} className={styles.star} />
    }
    if (average >= value - 0.5) {
      return <FaStarHalfAlt key={i} className={styles.star} />
    }
    return <FaRegStar key={i} className={styles.star} />
  })
  

  return (
    <div className={styles.container}>
      <span className={styles.average}>{average.toFixed(1)}</span>
      <div className={styles.stars}>{stars}</div>
      {typeof total === 'number' && (
        <span className={styles.total}>&nbsp;({total})</span>
      )}
    </div>
  )
}
