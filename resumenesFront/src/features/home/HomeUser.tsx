import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { useDocuments } from '../../context/DocumentContext';
import { useHistorial } from '../../context/HistorialContext';
import DocumentCard from '../../components/DocumentCard/DocumentCard';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './../../styles/HomeUser.module.css';
import BannerBienvenida from '../../components/BannerBienvenida/BannerBienvenida';

const HomeUser: React.FC = () => {
    const navigate = useNavigate();
    const { state: docState, fetchAllDocuments } = useDocuments();
    const { state: histState, fetchHistorial } = useHistorial();
    const { active } = useSubscription();
    React.useEffect(() => {
        fetchAllDocuments();
        fetchHistorial();
    }, [fetchAllDocuments, fetchHistorial]);

    const handleDocClick = (id: string) => {
        navigate(`/documents/${id}`);
    };
    console.log("Esta activo: ", active)
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <BannerBienvenida />
            </header>
            <section className={styles.section}>
                <h2 id="main-content"  className={styles.sectionTitle}>Documentos recomendados</h2>
                <div className={styles.carousel}>
                    {docState.documents.map(doc => {
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

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Historial reciente</h2>
                <div className={styles.historyList}>
                    {histState.historial.map(item => {
                        const historyImage = `https://picsum.photos/seed/${item.documentId}/64/64`;
                        return (
                            <HistoryItem
                                key={item.documentId.toString()}
                                coverUrl={historyImage}
                                title={item.title}
                                author={item.type}
                                lastAccess={item.lastAccess}
                                progressPercent={item.progreso}
                                onClick={() => handleDocClick(item.documentId.toString())}
                            />
                        );
                    })}
                </div>
            </section>

            {active === false && (
                <SubscriptionCard onSubscribe={() => navigate('/profile')} />
            )}

            <BottomNav
                activeTab="home"
                onTabChange={tab => {
                    if (tab === 'search') navigate('/search');
                    if (tab === 'profile') navigate('/profile');
                }}
            />
        </div>
    );
};

export default HomeUser;
