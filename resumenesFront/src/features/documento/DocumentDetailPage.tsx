import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './../../context/AuthContext'
import { useDocuments } from './../../context/DocumentContext'
import { useHistorial } from './../../context/HistorialContext'
import { useRating } from './../../context/RatingContext'
import { PDFViewer } from './../../components/PDFViewer/PDFViewer'
import { AudioPlayer } from './../../components/AudioPlayer/AudioPlayer'
import { ProgressTracker } from './../../components/ProgressTracker/ProgressTracker'
import { RatingDisplay } from './../../components/RatingDisplay/RatingDisplay'
import { CommentsList } from './../../components/CommentsList/CommentsList'
import { CommentForm } from './../../components/CommentForm/CommentForm'
import styles from './DocumentDetailPage.module.css'
import BottomNav from '../../components/BottomNav/BottomNav'
import { BotonIA } from '../../components/BotonIA/BotonIA'



type Params = {
  id: string
}

export const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<Params>()
  const docId = Number(id)
  const { isAuthenticated } = useAuth()
  const { state: docState, fetchDocumentById } = useDocuments()
  const { state: historialState, fetchHistorial, updateProgreso } = useHistorial()
  const { state: ratingState, fetchValoraciones } = useRating()

  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [numPages, setNumPages] = useState<number>(0)
  const [audioTime, setAudioTime] = useState<number>(0)
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [forceRender, setForceRender] = useState(0);

  // Carga inicial de datos
  useEffect(() => {
    fetchDocumentById(docId)
    fetchValoraciones(docId)
    if (isAuthenticated) {
      fetchHistorial()
    }
  }, [docId])


  useEffect(() => {
    setForceRender(r => r + 1);
  }, [ratingState.total]);

  // Restaurar progreso desde historial
  useEffect(() => {
    const item = historialState.historial.find(h => h.documentId === docId)
    if (item && docState.selectedDocument) {
      if (docState.selectedDocument.type === 'PDF') {
        setCurrentPage(item.progreso)
      } else {
        setAudioTime(item.progreso)
      }
    }
  }, [historialState.historial, docState.selectedDocument])

  const handlePageChange = (page: number, total: number) => {
    setCurrentPage(page)
    setNumPages(total)
    if (isAuthenticated) {
      updateProgreso(docId, page)
    }
  }

  const handleDocumentLoad = (total: number) => {
    setNumPages(total)
  }

  const handleAudioProgress = (time: number, duration?: number) => {
    setAudioTime(time)
    if (duration) setAudioDuration(duration)
    if (isAuthenticated) {
      updateProgreso(docId, time)
    }
  }

  const doc = docState.selectedDocument
  if (docState.loading || !doc) {
    return <div className={styles.loading}>Cargando...</div>
  }
  if (docState.error) {
    return <div className={styles.error}>{docState.error}</div>
  }

  return (

    <div className={styles.container}>

      {/* Visor y progreso */}
      {doc.type === 'PDF' ? (
        <>
          <PDFViewer
            fileUrl={doc.url}
            initialPage={currentPage}
            onPageChange={handlePageChange}
            onDocumentLoadSuccess={handleDocumentLoad}
          />
          {isAuthenticated && (
            <ProgressTracker
              documentId={docId}
              current={currentPage}
              total={numPages}
            />
          )}
          <BotonIA documentId={docId} />
        </>
      ) : (
        <>
          <AudioPlayer
            fileUrl={doc.url}
            initialTime={audioTime}
            onProgress={t => handleAudioProgress(t, audioDuration)}
          />
          {isAuthenticated && (
            <ProgressTracker
              documentId={docId}
              current={Math.floor(audioTime)}
              total={Math.floor(audioDuration)}
            />
          )}
        </>
      )}

      {/* Valoraciones */}
      <div className={styles.ratingSection}>
        <RatingDisplay
          average={ratingState.media}
          total={ratingState.total}
        />
      </div>

      {/* Comentarios */}
      <div className={styles.commentsSection}>
        <CommentsList valoraciones={ratingState.valoraciones} key={forceRender} />
        {isAuthenticated ? (
          <CommentForm documentId={docId} />
        ) : (
          <p className={styles.loginPrompt}>
            <a href="/login">Inicia sesión</a> o{' '}
            <a href="/register">regístrate</a> para comentar.
          </p>
        )}
      </div>
      <BottomNav
        activeTab="search"
        onTabChange={tab => {
          if (tab === 'home') navigate('/');
          if (tab === 'profile') {
            if (user) {
              navigate('/profile');
            } else {
              navigate('/auth');
            }
          }
          if (tab === 'search') navigate('/search');
        }}
      />
    </div>
  )
}
