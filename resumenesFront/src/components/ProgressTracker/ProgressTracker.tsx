import React from 'react'
import styles from './ProgressTracker.module.css'

type Props = {
  /** ID del documento para mostrar progreso */
  documentId: number
  /** Progreso actual: página (PDF) o segundos (Audio) */
  current: number
  /** Total de páginas (PDF) o duración en segundos (Audio) */
  total: number
}

export const ProgressTracker: React.FC<Props> = ({ documentId, current, total }) => {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {/* Texto genérico: ajusta en el padre si quieres "Página" vs "Tiempo" */}
        <span className={styles.label}>
          Progreso: {current} / {total}
        </span>
        <span className={styles.percent}>{percent}%</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
