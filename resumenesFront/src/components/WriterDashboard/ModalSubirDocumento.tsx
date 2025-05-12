import React, { useState, useRef } from 'react';
import styles from './ModalSubirDocumento.module.css';
import { subirDocumento } from '../../features/documento/documentoService';

interface Props {
    onClose: () => void;
}

const ModalSubirDocumento: React.FC<Props> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState<'PDF' | 'AUDIO'>('PDF');
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file || !title || !description) {
            alert('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            await subirDocumento(file, title, description, type === 'PDF', type);
            onClose();
        } catch (err: any) {
            alert(err.message || 'Error al subir documento');
        } finally {
            setLoading(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const tag = target.tagName.toLowerCase();

        // Solo cerrar el teclado si se hace clic sobre el fondo blanco del modal
        // y NO sobre un input, select, textarea o botón
        if (!['input', 'select', 'textarea', 'button', 'label'].includes(tag)) {
            (document.activeElement as HTMLElement)?.blur();
        }
    };


    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div
                className={styles.modal}
                onClick={handleModalClick}
                ref={modalRef}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    ❌
                </button>

                <h2>Subir Documento</h2>

                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Tipo de documento</label>
                <select value={type} onChange={(e) => setType(e.target.value as 'PDF' | 'AUDIO')}>
                    <option value="PDF">PDF</option>
                    <option value="AUDIO">AUDIO</option>
                </select>

                <div className={styles.fileInput}>
                    <label className={styles.fileLabel}>
                        📤 Elegir archivo
                        <input
                            type="file"
                            accept={type === 'PDF' ? '.pdf' : 'audio/*'}
                            onChange={handleFileChange}
                        />
                    </label>
                    {file && <span className={styles.fileName}>{file.name}</span>}
                </div>

                <button className={styles.submit} onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Subiendo...' : 'Subir'}
                </button>
            </div>
        </div>
    );
};

export default ModalSubirDocumento;
