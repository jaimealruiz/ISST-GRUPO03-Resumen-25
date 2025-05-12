import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from './../../components/SearchBar/SearchBar';
import FilterBar from './../../components/FilterBar/FilterBar';
import DocumentCard from './../../components/DocumentCard/DocumentCard';
import EmptyState from './../../components/EmptyState/EmptyState';
import { useDocuments } from './../../context/DocumentContext';
import styles from './../../styles/SearchPage.module.css';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { useAuth } from '../../context/AuthContext';

const SearchPage: React.FC = () => {
    const { state, fetchAllDocuments } = useDocuments();
    const { documents, loading } = state;
    const navigate = useNavigate();
    const { user } = useAuth(); // o const { token } = useAuth() si usas token directamente


    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | 'pdf' | 'audio'>('all');
    const [selectedOrder, setSelectedOrder] = useState<'recientes' | 'antiguos'>('recientes');
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    useEffect(() => {
        fetchAllDocuments();
    }, [fetchAllDocuments]);

    const handleDocClick = (id: string) => {
        navigate(`/documents/${id}`);
    };

    const filteredDocuments = useMemo(() => {
        return documents
            .filter((doc) => {
                const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
                const matchesType = selectedType === 'all' || doc.type.toLowerCase() === selectedType;

                const docDate = new Date(doc.createdAt);
                const matchesYear = !selectedYear || docDate.getFullYear().toString() === selectedYear;
                const matchesMonth = !selectedMonth || (docDate.getMonth() + 1).toString().padStart(2, '0') === selectedMonth;

                return matchesSearch && matchesType && matchesYear && matchesMonth;
            })
            .sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return selectedOrder === 'recientes' ? dateB - dateA : dateA - dateB;
            });
    }, [documents, search, selectedType, selectedOrder, selectedMonth, selectedYear]);

    return (
        <div className={styles.container}>
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar resúmenes..." />
            <FilterBar
                selectedType={selectedType}
                selectedOrder={selectedOrder}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onTypeChange={setSelectedType}
                onOrderChange={setSelectedOrder}
                onMonthChange={setSelectedMonth}
                onYearChange={setSelectedYear}
            />
            <div className={styles.grid}>
                {
                    filteredDocuments.length > 0 ? filteredDocuments.map(doc => {
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
                    }) : (
                        !loading && <EmptyState message="No se encontraron documentos." />
                    )}
            </div>
            <BottomNav
                activeTab="search"
                onTabChange={tab => {
                    if (tab === 'home') navigate('/');
                    if (tab === 'profile') {
                        if (user) {
                            navigate('/profile');
                        } else {
                            navigate('/auth');
                        }
                    }
                }}
            />

        </div>
    );
};

export default SearchPage;
