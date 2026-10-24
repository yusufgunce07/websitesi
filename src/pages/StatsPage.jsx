import React from 'react';
import {
  BarChart3,
  PieChart,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Calendar,
} from 'lucide-react';
import {
  CONTACT_CATEGORIES,
  CONTACT_STATUSES,
} from '../interfaces/contactModel';

export default function StatsPage({ contacts, onView }) {
  const total = contacts.length;
  const categories = CONTACT_CATEGORIES.filter((c) => c !== 'Tümü');
  const statuses = CONTACT_STATUSES.filter((s) => s !== 'Tümü');

  // Kategori dağılımı
  const categoryStats = categories.map((cat) => {
    const count = contacts.filter((c) => c.category === cat).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { name: cat, count, percentage };
  });

  // Durum dağılımı
  const statusStats = statuses.map((st) => {
    const count = contacts.filter((c) => c.status === st).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { name: st, count, percentage };
  });

  // Son güncellenen / eklenen 5 kayıt
  const recentContacts = [...contacts]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="py-8 space-y-6">
      {/* Başlık */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Veri & İletişim Analitiği
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Rehberinizdeki müşteri ve iş bağlantılarının kategori ve süreç durumlarına göre detaylı dağılımı.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kategori Dağılımı */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-600" />
            Kategori Dağılımı
          </h3>
          <div className="space-y-4">
            {categoryStats.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-500">
                    {item.count} Kişi ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Süreç / Durum Dağılımı */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Süreç & Durum Dağılımı
          </h3>
          <div className="space-y-4">
            {statusStats.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-500">
                    {item.count} Kişi ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Son Etkileşimler / Güncellemeler */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-600" />
          Son Güncellenen Kayıtlar
        </h3>
        <div className="divide-y divide-slate-100">
          {recentContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onView(contact)}
              className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-xl px-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs border ${
                    contact.avatarColor || 'bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                >
                  {contact.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {contact.fullName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {contact.company || 'Bireysel'} • {contact.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {contact.status}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {new Date(contact.updatedAt || contact.createdAt).toLocaleDateString(
                    'tr-TR'
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
