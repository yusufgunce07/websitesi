import React from 'react';
import {
  Eye,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export default function ContactCard({
  contact,
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Üst Kısım: Avatar, İsim ve Etiketler */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border ${
                contact.avatarColor || 'bg-indigo-100 text-indigo-700 border-indigo-200'
              }`}
            >
              {getInitials(contact.fullName)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {contact.fullName}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3 text-slate-400" />
                <span>{contact.company || 'Bireysel'}</span>
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusBadge(
              contact.status
            )}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {contact.status}
          </span>
        </div>

        {/* Rol ve Kategori Rozeti */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getCategoryBadge(
              contact.category
            )}`}
          >
            {contact.category}
          </span>
          {contact.role && (
            <span className="text-xs text-slate-500 truncate">
              {contact.role}
            </span>
          )}
        </div>

        {/* İletişim Detayları */}
        <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 truncate"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{contact.phone}</span>
            </a>
          )}
        </div>

        {/* Kısa Not Önizleme */}
        {contact.notes && (
          <p className="text-xs text-slate-500 mt-3 line-clamp-2 italic">
            "{contact.notes}"
          </p>
        )}
      </div>

      {/* Alt Eylemler */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
        <button
          onClick={() => onView(contact)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          Detay Gör
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(contact)}
            title="Düzenle"
            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(contact)}
            title="Sil"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
