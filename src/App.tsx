import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainLayout } from './components/main-layout';
import { HomePage } from './pages/home-page';
import { ContactPage } from './pages/contact-page';
import { TableOrderPage } from './pages/table-order-page';
import { KitchenPage } from './pages/kitchen-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route path="/table/:tableId" element={<TableOrderPage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
