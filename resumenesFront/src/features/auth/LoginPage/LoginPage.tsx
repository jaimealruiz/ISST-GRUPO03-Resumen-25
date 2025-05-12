import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../../components/AuthHeader/AuthHeader';
import LoginForm from '../../../components/LoginForm/LoginForm';
import styles from './../LoginPage/LoginPage.module.css';
import { useAuth } from '../../../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth(); // usamos el hook
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      await login(email, password); // llama al login real
      navigate('/'); // redirige al home si todo va bien
    } catch (error) {
      // puedes mostrar feedback si hace falta, pero el contexto ya maneja error
      console.error('Login failed', error);
    }
  };

  return (
    <div className={styles.overlay}>
      <AuthHeader
        title="Iniciar sesión"
        onBack={() => navigate(-1)}
        logoSrc="../../store/logo.png"
      />
      <div className={styles.formContainer}>
        <LoginForm
          email={email}
          password={password}
          loading={loading}
          onEmailChange={e => setEmail(e.target.value)}
          onPasswordChange={e => setPassword(e.target.value)}
          onSubmit={handleLogin}
          onSwitchToRegister={() => navigate('/register')}
        />
      </div>
    </div>
  );
};

export default LoginPage;
