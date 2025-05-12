import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { cancelSubscription, createCheckoutSession, getSubscriptionStatus } from '../../features/subscription/subscriptionService';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './../../styles/ProfilePage.module.css';
import { useWriter } from '../../context/WriterContext';
import WriterDashboardView from '../../components/WriterDashboard/WriterDashboardView';
import ModalRetirarSaldo from '../../components/WriterDashboard/ModalRetirarSaldo';
import ModalSubirDocumento from '../../components/WriterDashboard/ModalSubirDocumento';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { active, endDate, setIsActive, setRenewDate } = useSubscription();
  const { fetchDashboard } = useWriter();

  const [loading, setLoading] = useState(true);
  const [showRetiro, setShowRetiro] = useState(false);
  const [showSubida, setShowSubida] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      try {
        const { active, endDate } = await getSubscriptionStatus();
        setIsActive(active);
        setRenewDate(endDate || null);

        if (user.writer) {
          await fetchDashboard();
        }
      } catch (error) {
        console.error('Error al obtener estado de suscripción:', error);
        logout();
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);


  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`;

  const handleRenovar = async () => {
    try {
      const { url } = await createCheckoutSession();
      window.location.href = url;
    } catch (error: any) {
      alert(error.message || 'Error al renovar la suscripción');
    }
  };

  const handleCancelar = async () => {
    try {
      await cancelSubscription();
    } catch (err) {
      console.error(err);
      alert('No se pudo cancelar la suscripción');
    }
  };

  if (loading) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mi perfil</h1>

      <img src={avatarUrl} alt="Avatar" className={styles.avatar} />

      <div className={styles.info}>
        <label>Email</label>
        <input type="text" value={user?.email || ''} readOnly />
      </div>

      <div className={styles.subscription}>
        <h2>Suscripción</h2>
        {active ? (
          <div className={styles.activeBox}>
            <p>
              ✅ Activa — se renueva el{' '}
              <strong>{endDate ? new Date(endDate).toLocaleDateString() : 'pronto'}</strong>
            </p>
            <button onClick={handleCancelar} className={styles.cancelButton}>Cancelar suscripción</button>
          </div>
        ) : (
          <SubscriptionCard onSubscribe={handleRenovar} />
        )}
      </div>

      {user?.writer && (
        <>
          <WriterDashboardView />

          <div className={styles.writerButtons}>
            <button onClick={() => setShowSubida(true)} className={styles.writerButton}>Subir resumen</button>
            <button onClick={() => setShowRetiro(true)} className={styles.writerButtonSecondary}>Retirar saldo</button>
          </div>
        </>
      )}

      <button className={styles.logoutButton} onClick={logout}>
        Cerrar sesión
      </button>

      <BottomNav
        activeTab="profile"
        onTabChange={tab => {
          if (tab === 'home') navigate('/');
          if (tab === 'search') navigate('/search');
        }}
      />

      {showSubida && <ModalSubirDocumento onClose={() => setShowSubida(false)} />}
      {showRetiro && <ModalRetirarSaldo onClose={() => setShowRetiro(false)} />}
    </div>
  );
};

export default ProfilePage;
