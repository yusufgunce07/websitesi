import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  contact,
}) {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          Kişiyi Silmek İstiyor musunuz?
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          <strong className="text-slate-900">{contact.fullName}</strong>{' '}
          {contact.company && `(${contact.company})`} isimli kayıt rehberden ve yerel hafızadan (LocalStorage) kalıcı olarak silinecektir.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Vazgeç
          </button>
          <button
            onClick={() => {
              onConfirm(contact.id);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs shadow-rose-200 transition-all active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  );
}
