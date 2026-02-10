import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Scissors, Users, LogOut } from 'lucide-react';

export function Sidebar() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Citas', path: '/appointments' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-6 hidden lg:flex flex-col border-r border-slate-800">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Scissors className="text-white" size={24} />
                </div>
                <span className="font-bold text-xl tracking-tight">SALON PRO</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-slate-800 pt-6 mt-6">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white transition-colors">
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
