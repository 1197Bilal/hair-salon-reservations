import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
