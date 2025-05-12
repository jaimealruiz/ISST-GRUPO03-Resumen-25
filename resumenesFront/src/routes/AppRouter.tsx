
// AppRouter.tsx 

import React from 'react'; 

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

import { useAuth } from '../context/AuthContext'; 

import HomePage from '../features/home/Home'; 

//import SearchPage from '../features/search/SearchPage'; 

//import DetailPage from '../features/detail/DetailPage'; 

//import ProfilePage from '../features/profile/ProfilePage'; 

import LoginPage from '../features/auth/LoginPage/LoginPage'; 
import RegisterPage from '../features/auth/RegisterPage/RegisterPage'; 
import SearchPage from '../features/buscador/SearchPage';
import ProfilePage from '../features/perfil/ProfilePage';

import { DocumentDetailPage } from '../features/documento/DocumentDetailPage';


//import WriterDashboard from '../features/writer/WriterDashboard'; 

 

export default function AppRoutes() { 

  const { user, isAuthenticated } = useAuth(); 

 

  return ( 

   

      <Routes> 

        {/* Rutas públicas */} 

        <Route path="/" element={<HomePage />} /> 
        <Route path="/auth" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/search" element={<SearchPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />

        <Route 

          path="/profile" 

          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />} 

        /> 
 

{/* 
        <Route path="/buscar" element={<SearchPage />} /> 

        <Route path="/detalle/:id" element={<DetailPage />} /> 

        

 

        Rutas privadas 

        
        <Route 

          path="/dashboard" 

          element={isAuthenticated && user?.writer ? <WriterDashboard /> : <Navigate to="/" replace />} 

        /> 

 

        {/* Fallback 

        <Route path="*" element={<Navigate to="/" replace />} /> 
*/} 
      </Routes> 

 

  ); 

} 

 