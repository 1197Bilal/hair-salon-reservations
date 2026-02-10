import React from 'react';
import { useData } from '../lib/store';
import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export function Dashboard() {
    const { appointments, stylists } = useData();

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todayAppointments = appointments.filter(a => a.date === todayStr && a.status !== 'cancelled');

    const totalRevenueToday = todayAppointments.reduce((sum, a) => sum + (a.price || 0), 0);

    const recentActivity = [...appointments]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Panel de Gestión</h1>
                <p className="text-slate-500 mt-1">Vistazo rápido a la actividad del salón hoy.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Citas Hoy" value={todayAppointments.length} icon={Calendar} color="bg-indigo-600" />
                <StatCard title="Ganancias Hoy" value={`${totalRevenueToday}€`} icon={TrendingUp} color="bg-emerald-600" />
                <StatCard title="Clientes" value={new Set(appointments.map(a => a.client)).size} icon={Users} color="bg-amber-600" />
                <StatCard title="Servicio Promedio" value="45min" icon={Clock} color="bg-pink-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    <h2 className="text-xl font-bold mb-6 text-slate-900">Actividad Reciente</h2>
                    <div className="space-y-6">
                        {recentActivity.length > 0 ? recentActivity.map((app) => (
                            <div key={app.id} className="flex items-center justify-between group p-4 hover:bg-slate-50 rounded-2xl transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                        {app.client.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{app.client}</h3>
                                        <p className="text-sm text-slate-500">{app.serviceName} • {app.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {app.status}
                                    </span>
                                    <p className="text-xs text-slate-400 mt-1">{app.date}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center py-12 text-slate-400 italic">No hay actividad registrada todavía.</p>
                        )}
                    </div>
                </section>

                <section className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200">
                    <h2 className="text-xl font-bold mb-6">Estado del Equipo</h2>
                    <div className="space-y-6">
                        {stylists.map(s => {
                            const count = todayAppointments.filter(a => a.stylistId === s.id).length;
                            return (
                                <div key={s.id} className="flex items-center gap-4">
                                    <img src={s.image} className="w-12 h-12 rounded-full border-2 border-slate-700" alt={s.name} />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{s.name}</h3>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(count * 20, 100)}%` }}></div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-indigo-400">{count} citas</span>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${color} text-white group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
        </div>
    );
}
