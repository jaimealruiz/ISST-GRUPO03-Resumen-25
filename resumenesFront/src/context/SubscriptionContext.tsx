import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getSubscriptionStatus } from '../features/subscription/subscriptionService';

type SubscriptionContextType = {
  active: boolean | null;
  endDate: string | null;
  setIsActive: (active: boolean) => void;
  setRenewDate: (date: string | null) => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [active, setIsActive] = useState<boolean | null>(null);
  const [endDate, setRenewDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { active, endDate } = await getSubscriptionStatus(); // OJO: asegúrate de que el servicio devuelve esas keys
        setIsActive(active); // ✅
        setRenewDate(endDate || null); // 
      } catch (error) {
        console.error('Error al obtener el estado de suscripción:', error);
        setIsActive(null);
        setRenewDate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // Solo renderiza hijos cuando se haya resuelto el estado
  if (loading) return null;

  return (
    <SubscriptionContext.Provider value={{ active, endDate, setIsActive, setRenewDate }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within a SubscriptionProvider');
  return context;
};
