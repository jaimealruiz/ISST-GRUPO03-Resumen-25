import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../../components/AuthHeader/AuthHeader';
import RegisterForm from '../../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';
import { useAuth } from '../../../context/AuthContext';
import { api } from '../../../utils/api';
import { createCheckoutSession } from '../../subscription/subscriptionService';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isWriter, setIsWriter] = React.useState(false);
  const [skipPayment, setSkipPayment] = React.useState(false);

  const handleRegister = async () => {
    try {
      await register({
        email,
        password,
        writer: isWriter,
        estilo: 'default',
      });

      if (!skipPayment) {
        try {
          const { url } = await createCheckoutSession();
          window.location.href = url;

        } catch (error: any) {
          alert(error.message || 'Error al renovar la suscripción');
        }
      } else {
        navigate('/'); // Salta directamente al home
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className={styles.overlay}>
      <AuthHeader
        title="Registrarse"
        onBack={() => navigate(-1)}
        logoSrc="../../../store/logo.png"
      />
      <div className={styles.formContainer}>
        <RegisterForm
          email={email}
          password={password}
          isWriter={isWriter}
          skipPayment={skipPayment}
          loading={loading}
          onEmailChange={e => setEmail(e.target.value)}
          onPasswordChange={e => setPassword(e.target.value)}
          onToggleWriter={() => setIsWriter(w => !w)}
          onSkipPayment={setSkipPayment}
          onSubmit={handleRegister}
          onSwitchToLogin={() => navigate('/auth')}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
