import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const STORAGE_KEY = 'PELU_RESERVATIONS_DATA';
const SYNC_CHANNEL = 'PELU_SYNC';

const DEFAULT_SERVICES = [
    { id: 's1', name: 'Corte de Pelo', duration: 30, price: 20, icon: 'Scissors' },
    { id: 's2', name: 'Corte + Barba', duration: 45, price: 30, icon: 'User' },
    { id: 's3', name: 'Color / Tintes', duration: 90, price: 50, icon: 'Palette' },
    { id: 's4', name: 'Peinado Evento', duration: 60, price: 40, icon: 'Sparkles' },
];

const DEFAULT_STYLISTS = [
    { id: 'p1', name: 'Alex', specialty: 'Cortes modernos', image: 'https://i.pravatar.cc/150?u=p1' },
    { id: 'p2', name: 'María', specialty: 'Color y Mechas', image: 'https://i.pravatar.cc/150?u=p2' },
    { id: 'p3', name: 'Javier', specialty: 'Barbería Tradicional', image: 'https://i.pravatar.cc/150?u=p3' },
];

export function DataProvider({ children }) {
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [services] = useState(DEFAULT_SERVICES);
    const [stylists] = useState(DEFAULT_STYLISTS);

    // Persistence
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }, [appointments]);

    // Dual-Layer Sync
    useEffect(() => {
        const channel = new BroadcastChannel(SYNC_CHANNEL);

        const handleSync = (data) => {
            if (data && Array.isArray(data)) setAppointments(data);
        };

        channel.onmessage = (event) => {
            if (event.data.type === 'UPDATE_APPOINTMENTS') {
                handleSync(event.data.payload);
            }
        };

        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                handleSync(JSON.parse(e.newValue));
            }
        });

        window.addEventListener('focus', () => {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) handleSync(JSON.parse(saved));
        });

        return () => channel.close();
    }, []);

    const broadcast = (newData) => {
        const channel = new BroadcastChannel(SYNC_CHANNEL);
        channel.postMessage({ type: 'UPDATE_APPOINTMENTS', payload: newData });
        channel.close();
    };

    const addAppointment = (appointment) => {
        setAppointments(prev => {
            const newId = Date.now();
            const newData = [...prev, { ...appointment, id: newId, status: 'confirmed' }];
            broadcast(newData);
            return newData;
        });
    };

    const updateAppointment = (id, updates) => {
        setAppointments(prev => {
            const newData = prev.map(a => a.id === id ? { ...a, ...updates } : a);
            broadcast(newData);
            return newData;
        });
    };

    const deleteAppointment = (id) => {
        setAppointments(prev => {
            const newData = prev.filter(a => a.id !== id);
            broadcast(newData);
            return newData;
        });
    };

    return (
        <DataContext.Provider value={{
            appointments,
            services,
            stylists,
            addAppointment,
            updateAppointment,
            deleteAppointment
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
