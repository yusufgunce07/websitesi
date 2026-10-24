import React, { useState, useEffect } from 'react';
import { X, User, Building, Mail, Phone, Tag, Activity, Palette, FileText } from 'lucide-react';
import {
  CONTACT_CATEGORIES,
  CONTACT_STATUSES,
  AVATAR_COLORS,
} from '../interfaces/contactModel';

export default function ContactModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    category: 'Müşteri',
    status: 'Aktif',
    notes: '',
    avatarColor: AVATAR_COLORS[0].bg,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        company: initialData.company || '',
        role: initialData.role || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        category: initialData.category || 'Müşteri',
        status: initialData.status || 'Aktif',
        notes: initialData.notes || '',
        avatarColor: initialData.avatarColor || AVATAR_COLORS[0].bg,
      });
    } else {
      setFormData({
        fullName: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        category: 'Müşteri',
        status: 'Aktif',
        notes: '',
        avatarColor: AVATAR_COLORS[0].bg,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad Soyad alanı zorunludur.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  const categories = CONTACT_CATEGORIES.filter((c) => c !== 'Tümü');
  const statuses = CONTACT_STATUSES.filter((s) => s !== 'Tümü');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Başlığı */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Kişiyi Güncelle' : 'Yeni Kişi Ekle'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Mevcut iletişim ve şirket bilgilerini güncelleyin.'
                : 'Rehberinize yeni bir müşteri veya iş bağlantısı kaydedin.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Ad Soyad */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Ad Soyad <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Örn: Ahmet Yılmaz"
                className={`w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  errors.fullName
                    ? 'border-rose-400 focus:border-rose-500'
                    : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Şirket ve Unvan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Şirket / Kurum
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Örn: Teknoloji A.Ş."
                  className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Unvan / Görev
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="Örn: Pazarlama Müdürü"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* E-posta ve Telefon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="ahmet@sirket.com"
                  className={`w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Telefon Numarası
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+90 532 000 00 00"
                  className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Kategori ve Durum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                İlişki Kategorisi
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Süreç Durumu
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Avatar Renk Teması */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Avatar Renk Teması
            </label>
            <div className="flex items-center gap-2">
              {AVATAR_COLORS.map((col, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, avatarColor: col.bg })
                  }
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${
                    col.bg
                  } ${
                    formData.avatarColor === col.bg
                      ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={col.name}
                >
                  <span className="text-[10px] font-bold">●</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Özel Notlar & Hatırlatıcılar
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Görüşme detayları, teklif notları veya özel hatırlatmalar..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Butonlar */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-200 transition-all active:scale-95"
            >
              {isEditing ? 'Değişiklikleri Kaydet' : 'Kişiyi Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
