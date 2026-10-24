import React from 'react';
import { Users, UserCheck, Clock, Building2, CheckCircle2 } from 'lucide-react';

export default function StatsCard({ contacts }) {
  const total = contacts.length;
  const activeCount = contacts.filter((c) => c.status === 'Aktif').length;
  const inProgressCount = contacts.filter((c) => c.status === 'Görüşülüyor').length;
  const completedCount = contacts.filter((c) => c.status === 'Tamamlandı').length;
  const clientCount = contacts.filter((c) => c.category === 'Müşteri').length;

  const stats = [
    {
      title: 'Toplam Bağlantı',
      value: total,
      subtitle: `${clientCount} doğrudan müşteri`,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Aktif Durumda',
      value: activeCount,
      subtitle: 'Etkin iş ilişkisi',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Görüşme Aşamasında',
      value: inProgressCount,
      subtitle: 'Teklif ve süreç devam ediyor',
      icon: Clock,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Tamamlanan Süreçler',
      value: completedCount,
      subtitle: 'Sözleşme / Hizmet tamamlandı',
      icon: CheckCircle2,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {item.value}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
