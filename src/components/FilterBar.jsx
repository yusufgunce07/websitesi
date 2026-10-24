import React from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  Download,
  X,
} from 'lucide-react';
import {
  CONTACT_CATEGORIES,
  CONTACT_STATUSES,
} from '../interfaces/contactModel';

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExport,
  filteredCount,
  totalCount,
}) {
  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'Tümü' ||
    selectedStatus !== 'Tümü';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tümü');
    setSelectedStatus('Tümü');
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Arama Kutusu */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="İsim, şirket, e-posta veya nota göre ara..."
            className="w-full pl-10 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtre ve Sıralama Seçenekleri */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Kategori Seçici */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs sm:text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium"
          >
            {CONTACT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'Tümü' ? 'Tüm Kategoriler' : cat}
              </option>
            ))}
          </select>

          {/* Durum Seçici */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs sm:text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium"
          >
            {CONTACT_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st === 'Tümü' ? 'Tüm Durumlar' : st}
              </option>
            ))}
          </select>

          {/* Sıralama */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs sm:text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium"
          >
            <option value="newest">En Yeni Eklenen</option>
            <option value="name-asc">İsim (A - Z)</option>
            <option value="name-desc">İsim (Z - A)</option>
            <option value="company-asc">Şirket (A - Z)</option>
          </select>

          {/* Görünüm Değiştirici: Liste vs Kart */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              title="Tablo Görünümü"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Kart Görünümü"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Dışa Aktar */}
          <button
            onClick={onExport}
            title="Kişileri JSON olarak indir"
            className="flex items-center gap-1.5 text-xs sm:text-sm py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Dışa Aktar</span>
          </button>
        </div>
      </div>

      {/* Aktif Filtre Bilgi Satırı */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <div>
          <span>
            Toplam <strong>{totalCount}</strong> kişiden{' '}
            <strong>{filteredCount}</strong> kişi listeleniyor
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <X className="w-3.5 h-3.5" />
            Filtreleri Temizle
          </button>
        )}
      </div>
    </div>
  );
}
