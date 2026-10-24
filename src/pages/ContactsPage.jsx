import React from 'react';
import StatsCard from '../components/StatsCard';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';
import ContactCard from '../components/ContactCard';

export default function ContactsPage({
  contacts,
  filteredContacts,
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
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="py-8">
      {/* İstatistik Özet Kartları */}
      <StatsCard contacts={contacts} />

      {/* Arama, Filtreleme ve Kontrol Çubuğu */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onExport={onExport}
        filteredCount={filteredContacts.length}
        totalCount={contacts.length}
      />

      {/* Liste Görünümü (Tablo veya Kart) */}
      {viewMode === 'table' ? (
        <ContactTable
          contacts={filteredContacts}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
