import { useEffect, useState } from 'react'
import styles from './PanelIA.module.css'
import { ChipKeyword } from './ChipKeyword'
import { obtenerResumenIA } from '../../features/documento/iaService'

// Tipado simple
interface ResultadoIA {
    keywords: string[]
    resumen: string[]
}

export const PanelIA = ({ documentId }: { documentId: number }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState<ResultadoIA | null>(null)

    useEffect(() => {
        const fetchIA = async () => {
            setLoading(true)
            setError('')
            try {
                const jwt = localStorage.getItem('jwt') || ''
                const resultado = await obtenerResumenIA(documentId)
                setData(resultado)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchIA()
    }, [documentId])

    return (
        <div className={styles.panel}>
            {loading && (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <span>Cargando análisis con IA...</span>
                </div>
            )}

            {error && <p className={styles.error}>⚠️ {error}</p>}

            {data && (
                <>
                    <div className={styles.keywords}>
                        {data.keywords.map((word, i) => (
                            <ChipKeyword key={i} word={word} />
                        ))}
                    </div>
                    <div className={styles.resumen}>
                        {data.resumen.map((frase, i) => (
                            <p key={i}>📝 {frase}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
