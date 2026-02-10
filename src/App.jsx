import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './lib/store';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AppointmentsList } from './pages/AppointmentsList';

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="appointments" element={<AppointmentsList />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
