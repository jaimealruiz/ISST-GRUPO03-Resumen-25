// src/components/FilterBar/FilterBar.tsx
import React, { useState } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
    selectedType: 'all' | 'pdf' | 'audio';
    selectedOrder: 'recientes' | 'antiguos';
    selectedMonth: string | null;
    selectedYear: string | null;
    onTypeChange: (type: 'all' | 'pdf' | 'audio') => void;
    onOrderChange: (order: 'recientes' | 'antiguos') => void;
    onMonthChange: (month: string | null) => void;
    onYearChange: (year: string | null) => void;
}

const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
];

const years = ['2022', '2023', '2024', '2025'];

const FilterBar: React.FC<FilterBarProps> = ({
    selectedType,
    selectedOrder,
    selectedMonth,
    selectedYear,
    onTypeChange,
    onOrderChange,
    onMonthChange,
    onYearChange
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button className={styles.toggle} onClick={() => setIsOpen(prev => !prev)}>
                Filtrar <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div className={styles.panel}>
                    <div className={styles.section}>
                        <h4>Tipo</h4>
                        <div className={styles.options}>
                            <label><input type="radio" checked={selectedType === 'pdf'} onChange={() => onTypeChange('pdf')} /> PDF</label>
                            <label><input type="radio" checked={selectedType === 'audio'} onChange={() => onTypeChange('audio')} /> Audio</label>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>Fecha</h4>
                        <div className={styles.selectRow}>
                            <select value={selectedMonth ?? ''} onChange={e => onMonthChange(e.target.value || null)}>
                                <option value="">Mes</option>
                                {months.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                            <select value={selectedYear ?? ''} onChange={e => onYearChange(e.target.value || null)}>
                                <option value="">Año</option>
                                {years.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>Ordenar por</h4>
                        <div className={styles.options}>
                            <label><input type="radio" checked={selectedOrder === 'recientes'} onChange={() => onOrderChange('recientes')} /> Más recientes</label>
                            <label><input type="radio" checked={selectedOrder === 'antiguos'} onChange={() => onOrderChange('antiguos')} /> Más antiguas</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;