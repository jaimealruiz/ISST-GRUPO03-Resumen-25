import { useEffect, useState, useRef } from 'react'
import styles from './BotonIA.module.css'
import { PanelIA } from './PanelIA'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const BotonIA = ({ documentId }: { documentId: number }) => {
  const [abierto, setAbierto] = useState(false)
  const [animar, setAnimar] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const botonRef = useRef<HTMLButtonElement>(null)

  // Repetir animación cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimar(true)
      setTimeout(() => setAnimar(false), 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (!user) {
      navigate('/auth')
      return
    }
    setAbierto(!abierto)
  }

  return (
    <div className={styles.contenedor}>
      <button
        ref={botonRef}
        className={`${styles.botonIA} ${animar ? styles.animar : ''}`}
        onClick={handleClick}
      >
        <span className={styles.texto}>🧠 Activar IA</span>
        <div className={styles.reflejo}></div>
      </button>

      {abierto && <PanelIA documentId={documentId} />}
    </div>
  )
}
