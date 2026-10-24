/**
 * @file contactModel.js
 * Proje Yönergesi: Interfaces / Veri Modeli Tanımı
 * Kişi / Müşteri veri yapısı, varsayılan veriler ve doğrulamalar
 */

export const CONTACT_CATEGORIES = [
  'Tümü',
  'Müşteri',
  'Aday Müşteri',
  'Tedarikçi',
  'İş Ortağı',
  'Kişisel',
];

export const CONTACT_STATUSES = [
  'Tümü',
  'Aktif',
  'Görüşülüyor',
  'Tamamlandı',
  'Pasif',
];

export const AVATAR_COLORS = [
  { name: 'Mavi', bg: 'bg-blue-100 text-blue-700 border-blue-300' },
  { name: 'Yeşil', bg: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { name: 'Mor', bg: 'bg-purple-100 text-purple-700 border-purple-300' },
  { name: 'Turuncu', bg: 'bg-amber-100 text-amber-700 border-amber-300' },
  { name: 'Kırmızı', bg: 'bg-rose-100 text-rose-700 border-rose-300' },
  { name: 'Camgöbeği', bg: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
];

/**
 * İlk açılışta veya sıfırlama yapıldığında kullanılacak hazır örnek rehber verileri
 */
export const INITIAL_CONTACTS = [
  {
    id: 'cnt-101',
    fullName: 'Zeynep Kaya',
    company: 'Nova Bilişim Ltd.',
    role: 'Ürün Yöneticisi',
    email: 'zeynep.kaya@novabilisim.com',
    phone: '+90 532 456 78 90',
    category: 'Müşteri',
    status: 'Aktif',
    notes: 'Yeni e-ticaret entegrasyonu projesi için haftalık toplantı planlandı.',
    avatarColor: 'bg-blue-100 text-blue-700 border-blue-300',
    createdAt: '2026-10-15T10:30:00.000Z',
    updatedAt: '2026-10-20T14:15:00.000Z',
  },
  {
    id: 'cnt-102',
    fullName: 'Barış Demir',
    company: 'Demir Lojistik A.Ş.',
    role: 'Operasyon Direktörü',
    email: 'b.demir@demirlojistik.com',
    phone: '+90 544 321 00 11',
    category: 'Aday Müşteri',
    status: 'Görüşülüyor',
    notes: 'Teklif gönderildi, revize bütçe onayı bekleniyor.',
    avatarColor: 'bg-amber-100 text-amber-700 border-amber-300',
    createdAt: '2026-10-18T09:00:00.000Z',
    updatedAt: '2026-10-22T16:45:00.000Z',
  },
  {
    id: 'cnt-103',
    fullName: 'Elif Şahin',
    company: 'Piksel Medya Stüdyoları',
    role: 'Kreatif Direktör',
    email: 'elif@pikselmedya.com',
    phone: '+90 505 888 99 22',
    category: 'İş Ortağı',
    status: 'Aktif',
    notes: 'Sosyal medya video prodüksiyonları ve animasyonlar için ortak çalışma.',
    avatarColor: 'bg-purple-100 text-purple-700 border-purple-300',
    createdAt: '2026-10-12T11:20:00.000Z',
    updatedAt: '2026-10-19T13:10:00.000Z',
  },
  {
    id: 'cnt-104',
    fullName: 'Mustafa Çelik',
    company: 'Bulut Altyapı Çözümleri',
    role: 'DevOps & Sistem Mühendisi',
    email: 'mustafa.celik@bulutcözum.com',
    phone: '+90 551 222 33 44',
    category: 'Tedarikçi',
    status: 'Tamamlandı',
    notes: 'Sunucu barındırma ve SSL sertifikaları yıllık sözleşmesi yenilendi.',
    avatarColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    createdAt: '2026-10-05T08:15:00.000Z',
    updatedAt: '2026-10-14T17:00:00.000Z',
  },
  {
    id: 'cnt-105',
    fullName: 'Selin Karaca',
    company: 'Fintek Girişimleri A.Ş.',
    role: 'Yatırım Danışmanı',
    email: 'selin.karaca@fintekgirisim.com',
    phone: '+90 533 111 22 33',
    category: 'Aday Müşteri',
    status: 'Pasif',
    notes: 'Gelecek çeyrek yatırım planlarında görüşülecek, takip listesine alındı.',
    avatarColor: 'bg-rose-100 text-rose-700 border-rose-300',
    createdAt: '2026-10-01T15:00:00.000Z',
    updatedAt: '2026-10-10T11:30:00.000Z',
  },
];
