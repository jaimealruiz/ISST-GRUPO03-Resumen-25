// AudioPlayer.tsx
import React, { useRef, useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import styles from './AudioPlayer.module.css'

type Props = {
  fileUrl: string
  initialTime?: number
  onProgress?: (time: number) => void
}

export const AudioPlayer: React.FC<Props> = ({
  fileUrl,
  initialTime = 0,
  onProgress,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialTime)
  const [duration, setDuration] = useState(0)

  // Transformamos la URL .ogg a .m4a usando codec AAC + contenedor M4A
  const audioSrc = fileUrl
    .replace(
      '/upload/',
      '/upload/ac_aac,f_m4a/'  // fuerza AAC en contenedor M4A
    )
    .replace(/\.ogg$/, '.m4a')

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoaded = () => {
      setDuration(audio.duration)
      audio.currentTime = initialTime
    }
    const handleTimeUpdate = () => {
      const t = audio.currentTime
      setCurrentTime(t)
      onProgress?.(t)
    }

    audio.addEventListener('loadedmetadata', handleLoaded)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [initialTime, onProgress])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s < 10 ? '0' + s : s}`
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.badge}>Audio</div>
        <div className={styles.title}>Título</div>
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <input
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className={styles.slider}
        />
        <span className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        src={audioSrc}
      />
    </div>
  )
}
