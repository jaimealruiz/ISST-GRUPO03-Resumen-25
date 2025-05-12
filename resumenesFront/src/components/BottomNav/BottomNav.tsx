import React from 'react';
import styles from './BottomNav.module.css';

import { HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export type Tab = 'home' | 'search' | 'profile';

export interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => (
  <nav className={styles.nav}>
    <button
      className={`${styles.item} ${activeTab === 'home' ? styles.active : ''}`}
      onClick={() => onTabChange('home')}
    >
      <HomeIcon className={styles.icon} />
      <span className={styles.label}>Inicio</span>
    </button>

    <button
      className={`${styles.item} ${activeTab === 'search' ? styles.active : ''}`}
      onClick={() => onTabChange('search')}
    >
      <MagnifyingGlassIcon className={styles.icon} />
      <span className={styles.label}>Buscar</span>
    </button>

    <button
      className={`${styles.item} ${activeTab === 'profile' ? styles.active : ''}`}
      onClick={() => onTabChange('profile')}
    >
      <UserIcon className={styles.icon} />
      <span className={styles.label}>Perfil</span>
    </button>
  </nav>
);

export default BottomNav;
