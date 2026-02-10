import React, { useState } from 'react';
import { useData } from '../lib/store';
import { Search, Calendar, User, Scissors, Trash2, Ban } from 'lucide-react';
import { format } from 'date-fns';

export function AppointmentsList() {
    const { appointments, deleteAppointment, updateAppointment } = useData();
    const [search, setSearch] = useState('');

    const filtered = appointments.filter(a =>
        a.client.toLowerCase().includes(search.toLowerCase()) ||
        a.serviceName.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => b.id - a.id);

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Citas</h1>
                    <p className="text-slate-500 mt-1">Administra y organiza todas las reservas del salón.</p>
                </div>
            </header>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                    <Search className="text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente o servicio..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                            <tr>
                                <th className="px-8 py-4">Fecha/Hora</th>
                                <th className="px-8 py-4">Cliente</th>
                                <th className="px-8 py-4">Servicio</th>
                                <th className="px-8 py-4">Profesional</th>
                                <th className="px-8 py-4">Estado</th>
                                <th className="px-8 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <Calendar size={16} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{app.time}</p>
                                                <p className="text-xs text-slate-400">{app.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                                                {app.client.charAt(0)}
                                            </div>
                                            <span className="font-medium text-slate-700">{app.client}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Scissors size={14} className="text-slate-400" />
                                            <span className="text-sm font-medium text-slate-600">{app.serviceName}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-500">
                                        {app.stylistName || 'Cualquiera'}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            {app.status !== 'cancelled' && (
                                                <button
                                                    onClick={() => updateAppointment(app.id, { status: 'cancelled' })}
                                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Cancelar"
                                                >
                                                    <Ban size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteAppointment(app.id)}
                                                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-slate-400 italic">
                                        No se han encontrado citas con esos criterios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
