/**
 * @file storageService.js
 * LocalStorage veri yönetimi servisi (CRUD Operasyonları)
 * Ekle (Create), Listele (Read), Güncelle (Update), Sil (Delete)
 */

import { INITIAL_CONTACTS } from '../interfaces/contactModel';

const STORAGE_KEY = 'crm_contacts_data_v1';

export const storageService = {
  /**
   * Tüm kişileri getirir (READ / LİSTELEME)
   * LocalStorage boşsa varsayılan verileri yükler.
   */
  getContacts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
        return INITIAL_CONTACTS;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error);
      return INITIAL_CONTACTS;
    }
  },

  /**
   * Yeni bir kişi ekler (CREATE / EKLEME)
   */
  addContact: (contactData) => {
    const contacts = storageService.getContacts();
    const newContact = {
      ...contactData,
      id: 'cnt-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newContact, ...contacts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newContact;
  },

  /**
   * Mevcut bir kişiyi günceller (UPDATE / GÜNCELLEME)
   */
  updateContact: (id, contactData) => {
    const contacts = storageService.getContacts();
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error('Kişi bulunamadı.');
    }
    const updatedContact = {
      ...contacts[index],
      ...contactData,
      updatedAt: new Date().toISOString(),
    };
    contacts[index] = updatedContact;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    return updatedContact;
  },

  /**
   * Bir kişiyi siler (DELETE / SİLME)
   */
  deleteContact: (id) => {
    const contacts = storageService.getContacts();
    const filtered = contacts.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  /**
   * Verileri varsayılan örnek verilere sıfırlar
   */
  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
    return INITIAL_CONTACTS;
  },

  /**
   * Verileri JSON dosyası olarak dışa aktarır
   */
  exportData: () => {
    const data = storageService.getContacts();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crm-rehber-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },
};
