import React from 'react';
import styles from './BannerBienvenida.module.css';

const BannerBienvenida: React.FC = () => {
  const handleScroll = () => {
    const target = document.getElementById('main-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className={styles.banner}>
      <img src="../../store/logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.text}>
        <h1 className={styles.title}>¡Bienvenido!</h1>
        <p className={styles.subtitle}>
          Descubre los mejores resúmenes para aprender más en menos tiempo.
        </p>
      </div>
      <button className={styles.cta} onClick={handleScroll}>
        Empezar ahora
      </button>
    </div>
  );
};

export default BannerBienvenida;
