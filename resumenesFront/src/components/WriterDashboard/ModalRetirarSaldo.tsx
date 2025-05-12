import React, { useRef } from 'react';
import styles from './ModalRetirarSaldo.module.css';
import { useWriter } from '../../context/WriterContext';

interface Props {
  onClose: () => void;
}

const ModalRetirarSaldo: React.FC<Props> = ({ onClose }) => {
  const { state, retirarSaldo } = useWriter();
  const { saldo, retiros } = state;

  const safeSaldo = typeof saldo === 'number' ? saldo : 0;

  const ultimoRetiro = retiros.length > 0
    ? new Date(retiros[retiros.length - 1].fecha).toLocaleDateString()
    : 'Ninguno';

  const handleRetirar = async () => {
    await retirarSaldo();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = () => {
    // Intenta cerrar el teclado en móviles
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button className={styles.closeButton} onClick={onClose}>
          ❌
        </button>
        <h2>Retirar saldo</h2>
        <p>Saldo actual: € {safeSaldo.toFixed(2)}</p>
        <p>Fecha del último retiro: {ultimoRetiro}</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>Cancelar</button>
          <button className={styles.confirm} onClick={handleRetirar}>Retirar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalRetirarSaldo;
