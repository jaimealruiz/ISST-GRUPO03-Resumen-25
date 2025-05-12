import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import styles from './PDFViewer.module.css';

import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export type PDFViewerProps = {
  fileUrl: string;
  initialPage?: number;
  onPageChange?: (page: number, total: number) => void;
  onDocumentLoadSuccess?: (total: number) => void;
};

export const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  initialPage = 1,
  onPageChange,
  onDocumentLoadSuccess,
}) => {
  const [blobUrl, setBlobUrl] = useState<string>();
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth > 640 ? 600 : window.innerWidth - 32);

  useEffect(() => {
    fetch(fileUrl)
      .then(res => res.blob())
      .then(blob => setBlobUrl(URL.createObjectURL(blob)))
      .catch(console.error);

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [fileUrl]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth > 640 ? 600 : window.innerWidth - 32;
      setPageWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setPage(prev => {
          const next = prev < numPages ? prev + 1 : prev;
          if (next !== prev && onPageChange) onPageChange(next, numPages);
          return next;
        });
      }, 3000);
    } else if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, numPages, onPageChange]);

  const handleDocumentLoad = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    onDocumentLoadSuccess?.(numPages);
    onPageChange?.(page, numPages);
  };

  const changePage = (offset: number) => {
    setPage(prev => {
      const next = prev + offset;
      if (next < 1 || next > numPages) return prev;
      onPageChange?.(next, numPages);
      return next;
    });
  };

  if (!blobUrl) return <div className={styles.loading}>Cargando PDF…</div>;

  return (
    <div className={styles.card} ref={containerRef}>
      <div className={styles.badge}>PDF</div>
      <div className={styles.document}>
        <Document
          file={blobUrl}
          onLoadSuccess={handleDocumentLoad}
          loading={<div>Cargando documento…</div>}
        >
          <Page pageNumber={page} width={pageWidth} height={window.innerHeight * 0.85} renderAnnotationLayer={false} renderTextLayer={false} />
        </Document>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.btn}
          onClick={() => changePage(-1)}
          disabled={page <= 1}
        >
          <FaChevronLeft />
        </button>
        <button
          className={styles.playBtn}
          onClick={() => setIsPlaying(prev => !prev)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className={styles.btn}
          onClick={() => changePage(+1)}
          disabled={page >= numPages}
        >
          <FaChevronRight />
        </button>
        <span className={styles.pageInfo}>
          {page} / {numPages}
        </span>
      </div>
    </div>
  );
};
