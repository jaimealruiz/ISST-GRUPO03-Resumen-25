// src/pages/HomeGuest/HomeGuest.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../../context/DocumentContext';
import DocumentCard from '../../components/DocumentCard/DocumentCard';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './../../styles/HomeGuest.module.css';
import BannerBienvenida from '../../components/BannerBienvenida/BannerBienvenida';

const HomeGuest: React.FC = () => {
  const { state: docState, fetchAllDocuments } = useDocuments();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDocuments();
  }, [fetchAllDocuments]);

  const handleDocClick = (id: string) => {
    navigate(`/documents/${id}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
         <BannerBienvenida />
      </header>

      <section className={styles.section}>
        <h2  id="main-content" className={styles.sectionTitle}>Documentos recomendados</h2>
        <div className={styles.carousel}>
          {docState.documents.map(doc => {
            // Generamos una URL de imagen aleatoria con seed=doc.id
            const randomImage = `https://picsum.photos/seed/${doc.id}/120/160`;

            return (
              <DocumentCard
                key={doc.id.toString()}
                coverUrl={randomImage}
                title={doc.title}
                author={doc.uploadedByEmail}
                onClick={() => handleDocClick(doc.id.toString())}
              />
            );
          })}
        </div>
      </section>


      <SubscriptionCard onSubscribe={() => navigate('/register')} />

      <img src="../../store/fondo_guest.png" alt="Fondo" className={styles.fondo} />

      <BottomNav
        activeTab="home"
        onTabChange={tab => {
          if (tab === 'search') navigate('/search');
          if (tab === 'profile') navigate('/auth');
        }}
      />
    </div>
  );
};

export default HomeGuest;
