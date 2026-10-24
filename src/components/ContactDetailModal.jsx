import React from 'react';
import {
  X,
  Building,
  Mail,
  Phone,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  FileText,
  User,
} from 'lucide-react';

export default function ContactDetailModal({
  contact,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!isOpen || !contact) return null;

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '-';
    const d = new Date(isoString);
    return d.toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Üst Banner & Avatar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl border-2 border-white/20 shadow-md ${
                contact.avatarColor || 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {getInitials(contact.fullName)}
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                {contact.fullName}
              </h3>
              <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <span>{contact.company || 'Bireysel Bağlantı'}</span>
                {contact.role && <span>• {contact.role}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Gövde Detayları */}
        <div className="p-6 space-y-5">
          {/* Rozetler */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {contact.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {contact.status}
            </span>
          </div>

          {/* İletişim Kutuları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                E-posta Adresi
              </span>
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-slate-800 hover:text-indigo-600 flex items-center gap-2 font-medium break-all"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{contact.email}</span>
                </a>
              ) : (
                <span className="text-slate-400 italic">Belirtilmedi</span>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Telefon Numarası
              </span>
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone}`}
                  className="text-slate-800 hover:text-indigo-600 flex items-center gap-2 font-medium"
                >
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              ) : (
                <span className="text-slate-400 italic">Belirtilmedi</span>
              )}
            </div>
          </div>

          {/* Notlar */}
          {contact.notes && (
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                Özel Notlar & Görüşme Geçmişi
              </div>
              <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                {contact.notes}
              </p>
            </div>
          )}

          {/* Meta Veriler: Oluşturulma ve Güncellenme Tarihleri */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Kayıt: {formatDateTime(contact.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Son Güncelleme: {formatDateTime(contact.updatedAt)}</span>
            </div>
          </div>

          {/* Alt Eylemler */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                onDelete(contact);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Kişiyi Sil
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEdit(contact);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Düzenle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
