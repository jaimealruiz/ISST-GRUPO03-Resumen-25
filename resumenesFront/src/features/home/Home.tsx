// Home.tsx
// src/features/home/Home.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import HomeUser from './HomeUser';
import HomeGuest from './HomeGuest';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HomeUser /> : <HomeGuest />;
};

export default Home;
