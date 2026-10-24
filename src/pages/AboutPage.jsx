import React from 'react';
import {
  CheckCircle2,
  Code2,
  FolderTree,
  ExternalLink,
  Mail,
  Layers,
  Sparkles,
  Server,
} from 'lucide-react';

export default function AboutPage() {
  const criteria = [
    {
      title: 'Modern Javascript Kütüphanesi',
      desc: 'React 19 + Vite altyapısı ile modern bileşen tabanlı SPA mimarisi kullanıldı.',
      done: true,
    },
    {
      title: 'Kalıcı Veri Yönetimi (LocalStorage)',
      desc: 'Tüm ekleme, silme, güncelleme verileri tarayıcının LocalStorage alanında saklanır, sayfa yenilendiğinde kaybolmaz.',
      done: true,
    },
    {
      title: 'Klasör Mimarisi (Components, Pages, Interfaces)',
      desc: 'Proje dosya ağacında Components, Pages ve Interfaces (veri modelleri ve tip kontratları) dizinleri açıldı.',
      done: true,
    },
    {
      title: 'Modern CSS Çerçevesi (Tailwind CSS)',
      desc: 'Tailwind CSS v4 kullanılarak mobil uyumlu (responsive), estetik ve modern arayüz tasarlandı.',
      done: true,
    },
    {
      title: 'CRUD İşlemleri Eksiksiz Gerçekleştirildi',
      desc: 'Ekle (Create), Listeleme (Read), Güncelleme (Update) ve Silme (Delete) operasyonları doğrulama kontrolleriyle tamamlandı.',
      done: true,
    },
    {
      title: 'Netlify & Vercel Yayına Alma Desteği',
      desc: 'Tek komutla statik üretim ("dist" derlemesi) ve SPA yönlendirme yapılandırması (netlify.toml) hazırlandı.',
      done: true,
    },
    {
      title: 'GitHub & Ekran Görüntüsü Dokümantasyonu',
      desc: 'Proje deposuna eklenecek README.md, adım adım kurulum yönergeleri ve ekran görüntüsü klasörü eklendi.',
      done: true,
    },
  ];

  return (
    <div className="py-8 space-y-6 max-w-4xl mx-auto">
      {/* Proje Başlık Kartı */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Web Geliştirme; Javascript Proje Yönergesi
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          RehberLite CRM - Müşteri & İletişim Yönetim Uygulaması
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Bu proje, eğitim programı çerçevesinde öğrenilen HTML, CSS, Modern JavaScript
          ve React temellerini hayata geçirmek; LocalStorage tabanlı gerçek bir CRUD
          uygulaması geliştirip GitHub ve Netlify ortamlarına canlıya almak amacıyla
          hazırlanmıştır.
        </p>
      </div>

      {/* Yönerge Gereksinimleri Kontrol Listesi */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Proje Yönergesi Uyumluluk Raporu
        </h3>
        <div className="space-y-3">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Klasör Mimarisi */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-indigo-600" />
          Proje Dosya Ağaç Yapısı
        </h3>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`crm-app/
├── public/                 # Statik varlıklar & ekran görüntüleri
├── src/
│   ├── components/         # Tekrar kullanılabilir UI bileşenleri
│   │   ├── Navbar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── ContactTable.jsx
│   │   ├── ContactCard.jsx
│   │   ├── ContactModal.jsx       (Ekleme & Güncelleme Formu)
│   │   ├── ContactDetailModal.jsx (Detay Görüntüleme)
│   │   ├── DeleteConfirmModal.jsx (Silme Onayı)
│   │   └── Toast.jsx              (Bildirimler)
│   ├── pages/              # Sayfa görünümleri
│   │   ├── ContactsPage.jsx       (Rehber & Ana CRUD Ekranı)
│   │   ├── StatsPage.jsx          (Dağılım & Analitik Ekranı)
│   │   └── AboutPage.jsx          (Proje Hakkında & Yönerge)
│   ├── interfaces/         # Veri modeli ve tip kontratları
│   │   └── contactModel.js
│   ├── services/           # LocalStorage CRUD operasyonları
│   │   └── storageService.js
│   ├── App.jsx             # Ana Uygulama Durum Yönetimi
│   ├── index.css           # Tailwind CSS yapılandırması
│   └── main.jsx
├── netlify.toml            # Netlify yayına alma yapılandırması
├── package.json
└── README.md               # Detaylı proje dokümantasyonu`}
        </pre>
      </div>

      {/* Eğitmen ve Kaynak Bağlantıları */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-600" />
          Eğitmen & İletişim Bilgileri
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Herhangi bir sorunuz olması durumunda eğitmen e-posta adresi üzerinden
          iletişime geçebilirsiniz:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:softwareonuryalcin@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-indigo-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" />
            softwareonuryalcin@gmail.com
          </a>
          <a
            href="https://github.com/ylcnsonur/web-gelistirme-js-sample"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Örnek Proje 1 (GitHub)
          </a>
          <a
            href="https://dnm11remix.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Örnek Proje 2 (Netlify Canlı)
          </a>
        </div>
      </div>
    </div>
  );
}
