import React from 'react';
import {
  Eye,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar,
} from 'lucide-react';

export default function ContactTable({
  contacts,
  onView,
  onEdit,
  onDelete,
}) {
  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Görüşülüyor':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Tamamlandı':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Pasif':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Müşteri':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Aday Müşteri':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Tedarikçi':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'İş Ortağı':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const d = new Date(isoString);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Building className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          Kayıt Bulunamadı
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          Arama kriterlerinize uyan kişi bulunamadı. Filtreleri temizleyebilir veya yeni bir kişi ekleyebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Kişi / Şirket</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Durum</th>
              <th className="py-3.5 px-4 hidden md:table-cell">İletişim</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Son Güncelleme</th>
              <th className="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Kişi Bilgisi */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${
                        contact.avatarColor || 'bg-indigo-100 text-indigo-700 border-indigo-200'
                      }`}
                    >
                      {getInitials(contact.fullName)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {contact.fullName}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{contact.company || 'Bireysel'}</span>
                        {contact.role && (
                          <span className="text-slate-400">• {contact.role}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Kategori */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getCategoryBadge(
                      contact.category
                    )}`}
                  >
                    {contact.category}
                  </span>
                </td>

                {/* Durum */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                      contact.status
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {contact.status}
                  </span>
                </td>

                {/* İletişim Bilgileri */}
                <td className="py-4 px-4 hidden md:table-cell whitespace-nowrap">
                  <div className="space-y-1 text-xs">
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.email}</span>
                      </a>
                    )}
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{contact.phone}</span>
                      </a>
                    )}
                  </div>
                </td>

                {/* Son Güncelleme */}
                <td className="py-4 px-4 hidden lg:table-cell text-xs text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(contact.updatedAt || contact.createdAt)}</span>
                  </div>
                </td>

                {/* İşlemler (CRUD: Görüntüle, Güncelle, Sil) */}
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onView(contact)}
                      title="Detay Görüntüle"
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(contact)}
                      title="Düzenle (Güncelle)"
                      className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(contact)}
                      title="Sil"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
