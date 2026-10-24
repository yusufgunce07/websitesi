import React from 'react';
import { Users, BarChart3, Info, Plus, Sparkles, RefreshCw } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  totalCount,
  onOpenAddModal,
  onResetData,
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo ve Başlık */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  Rehber<span className="text-indigo-600">Lite</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                  CRM v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                İletişim, Müşteri & Süreç Yönetimi
              </p>
            </div>
          </div>

          {/* Navigasyon Sekmeleri */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Rehber</span>
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">İstatistikler</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Hakkında</span>
            </button>
          </nav>

          {/* Eylemler: Yeni Kişi ve Demo Sıfırla */}
          <div className="flex items-center gap-2">
            <button
              onClick={onResetData}
              title="Varsayılan Demo Verilerini Geri Yükle"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-indigo-200 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Yeni Kişi Ekle</span>
              <span className="sm:hidden">Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
