import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ContactsPage from './pages/ContactsPage';
import StatsPage from './pages/StatsPage';
import AboutPage from './pages/AboutPage';
import ContactModal from './components/ContactModal';
import ContactDetailModal from './components/ContactDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { storageService } from './services/storageService';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('contacts');

  // Filtreleme ve Sıralama Durumları
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedStatus, setSelectedStatus] = useState('Tümü');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('table');

  // Modal ve Form Durumları
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);
  const [deletingContact, setDeletingContact] = useState(null);
  const [toast, setToast] = useState(null);

  // İlk yüklemede LocalStorage'dan verileri çek
  useEffect(() => {
    const data = storageService.getContacts();
    setContacts(data);
  }, []);

  // Bildirim gösterme yardımcısı
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // CREATE (Ekleme) & UPDATE (Güncelleme)
  const handleSaveContact = (formData) => {
    try {
      if (editingContact) {
        // GÜNCELLEME İŞLEMİ
        const updated = storageService.updateContact(editingContact.id, formData);
        setContacts((prev) =>
          prev.map((c) => (c.id === editingContact.id ? updated : c))
        );
        showToast('Kişi bilgileri başarıyla güncellendi.', 'success');
      } else {
        // EKLEME İŞLEMİ
        const created = storageService.addContact(formData);
        setContacts((prev) => [created, ...prev]);
        showToast('Yeni kişi rehbere eklendi.', 'success');
      }
      setIsAddEditModalOpen(false);
      setEditingContact(null);
    } catch (error) {
      showToast('İşlem sırasında bir hata oluştu: ' + error.message, 'error');
    }
  };

  // DELETE (Silme)
  const handleDeleteConfirm = (id) => {
    try {
      storageService.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast('Kişi rehberden silindi.', 'success');
      setDeletingContact(null);
    } catch (error) {
      showToast('Silme işlemi başarısız: ' + error.message, 'error');
    }
  };

  // Demo verilerini sıfırlama
  const handleResetData = () => {
    const defaultData = storageService.resetToDefault();
    setContacts(defaultData);
    showToast('Örnek rehber verileri başarıyla yüklendi.', 'info');
  };

  // JSON Dışa Aktarma
  const handleExportData = () => {
    storageService.exportData();
    showToast('Rehber JSON formatında indirildi.', 'info');
  };

  // Filtrelenmiş ve Sıralanmış Liste (READ / LİSTELEME)
  const filteredContacts = useMemo(() => {
    return contacts
      .filter((contact) => {
        // Arama Terimi
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = contact.fullName?.toLowerCase().includes(query);
          const matchCompany = contact.company?.toLowerCase().includes(query);
          const matchRole = contact.role?.toLowerCase().includes(query);
          const matchEmail = contact.email?.toLowerCase().includes(query);
          const matchNotes = contact.notes?.toLowerCase().includes(query);
          if (!matchName && !matchCompany && !matchRole && !matchEmail && !matchNotes) {
            return false;
          }
        }

        // Kategori Filtresi
        if (selectedCategory !== 'Tümü' && contact.category !== selectedCategory) {
          return false;
        }

        // Durum Filtresi
        if (selectedStatus !== 'Tümü' && contact.status !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return (
            new Date(b.createdAt || b.updatedAt) -
            new Date(a.createdAt || a.updatedAt)
          );
        }
        if (sortBy === 'name-asc') {
          return a.fullName.localeCompare(b.fullName, 'tr');
        }
        if (sortBy === 'name-desc') {
          return b.fullName.localeCompare(a.fullName, 'tr');
        }
        if (sortBy === 'company-asc') {
          const compA = a.company || '';
          const compB = b.company || '';
          return compA.localeCompare(compB, 'tr');
        }
        return 0;
      });
  }, [contacts, searchTerm, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Üst Navigasyon Çubuğu */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCount={contacts.length}
        onOpenAddModal={() => {
          setEditingContact(null);
          setIsAddEditModalOpen(true);
        }}
        onResetData={handleResetData}
      />

      {/* Ana Sayfa İçeriği */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'contacts' && (
          <ContactsPage
            contacts={contacts}
            filteredContacts={filteredContacts}
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
            onExport={handleExportData}
            onView={(contact) => setViewingContact(contact)}
            onEdit={(contact) => {
              setEditingContact(contact);
              setIsAddEditModalOpen(true);
            }}
            onDelete={(contact) => setDeletingContact(contact)}
          />
        )}

        {activeTab === 'stats' && (
          <StatsPage
            contacts={contacts}
            onView={(contact) => setViewingContact(contact)}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Alt Bilgi (Footer) */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            RehberLite CRM • Web Geliştirme Javascript Projesi (React + Tailwind CSS + LocalStorage)
          </p>
          <p>
            Netlify & GitHub Yayına Hazır
          </p>
        </div>
      </footer>

      {/* Modallar */}
      <ContactModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingContact(null);
        }}
        onSubmit={handleSaveContact}
        initialData={editingContact}
      />

      <ContactDetailModal
        contact={viewingContact}
        isOpen={Boolean(viewingContact)}
        onClose={() => setViewingContact(null)}
        onEdit={(contact) => {
          setViewingContact(null);
          setEditingContact(contact);
          setIsAddEditModalOpen(true);
        }}
        onDelete={(contact) => {
          setViewingContact(null);
          setDeletingContact(contact);
        }}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingContact)}
        contact={deletingContact}
        onClose={() => setDeletingContact(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Bildirim Balonu (Toast) */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
