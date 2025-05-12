import React from 'react';
import { useWriter } from '../../context/WriterContext';
import { fetchDashboard } from './../../features/writer/writerService'
import styles from './WriterDashboardView.module.css';

const WriterDashboardView: React.FC = () => {
  const { state } = useWriter();
  const { saldo, retiros, documentos } = state;

  const safeSaldo = typeof saldo === 'number' ? saldo : 0;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Writer Dashboard</h2>

      <div className={styles.totalBox}>
        <span>{documentos?.length ?? 0}</span>
        <span>Total documentos</span>
      </div>

      <div className={styles.docsList}>
        {documentos?.map((doc) => (
          <div key={doc.id} className={styles.docItem}>
            <p className={styles.docTitle}>{doc.titulo}</p>
            <div className={styles.stars}>
              {'★'.repeat(Math.floor(doc.mediaEstrellas ?? 0))}
              {(doc.mediaEstrellas ?? 0) % 1 >= 0.5 ? '½' : ''}
              <span className={styles.count}>
                {doc.totalValoraciones} ★ {(doc.mediaEstrellas ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.balanceBox}>
        <p>Saldo actual</p>
        <strong>€ {safeSaldo.toFixed(2)}</strong>
      </div>

      <div className={styles.retiros}>
        <h3>Retiros anteriores</h3>
        {retiros?.map((r, idx) => (
          <div key={idx} className={styles.retiroItem}>
            <span>{new Date(r.fecha).toLocaleDateString()}</span>
            <span className={styles.amount}>+ {(r.cantidad ?? 0).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WriterDashboardView;