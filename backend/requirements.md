# 💰 Expense Tracker – Fonksiyonel Gereksinimler

## 🎯 Kapsam & Aktörler

- **Aktörler:**
  - Son Kullanıcı (bireysel)
  - Paylaşımlı Kasa Üyesi _(isteğe bağlı)_
  - Admin _(genelde bireysel app’te gerekmez)_
- **Platform:** Web (ve/veya mobil)
- **Varsayımlar:**
  - Para birimleri ISO-4217 standardına göre tutulur.
  - Zaman dilimi ve dil tercihi kullanıcı bazında saklanır.
  - KVKK/GDPR uyumlu veri gizliliği sağlanır.

---

## ⚙️ Fonksiyonel Gereksinimler

### 🔐 Kimlik & Hesap

| ID         | Gereksinim                                          | Öncelik    | Kabul Kriteri                                              |
| ---------- | --------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| FR-AUTH-01 | E-posta + şifre ile kayıt & giriş                   | **Must**   | Doğrulama linki gönderilir; doğrulanmadan giriş yapılamaz. |
| FR-AUTH-02 | JWT tabanlı oturum + yenileme                       | **Must**   | Token süresi bitince refresh token ile yenilenir.          |
| FR-AUTH-03 | 2FA (TOTP/SMS)                                      | **Should** | Etkin kullanıcılar ikinci faktör olmadan giriş yapamaz.    |
| FR-SET-01  | Profil ayarları (ad, dil, saat dilimi, para birimi) | **Must**   | Ayarlar kaydedilir ve yeni oturumda uygulanır.             |
| FR-SEC-01  | Şifre sıfırlama (e-posta akışı)                     | **Must**   | Tek kullanımlık token ile yeni şifre belirlenir.           |

---

### 💼 Cüzdan / Hesap Yönetimi

| ID        | Gereksinim                         | Öncelik    | Kabul Kriteri                                      |
| --------- | ---------------------------------- | ---------- | -------------------------------------------------- |
| FR-WAL-01 | Çoklu cüzdan oluşturma             | **Must**   | Ad, tür, bakiye, para birimi kaydedilir.           |
| FR-WAL-02 | Hesap bakiyesi otomatik güncelleme | **Must**   | İşlem eklendiğinde bakiye doğru yansır.            |
| FR-WAL-03 | Transfer işlemi (hesap → hesap)    | **Should** | Çift yönlü muhasebe ile tek transfer ID’si.        |
| FR-WAL-04 | Paylaşımlı cüzdan                  | **Could**  | Rol tabanlı yetkilendirme (owner, editor, viewer). |

---

### 🏷️ Kategori & Etiket

| ID        | Gereksinim               | Öncelik    | Kabul Kriteri                                     |
| --------- | ------------------------ | ---------- | ------------------------------------------------- |
| FR-CAT-01 | Gelir/Gider kategorileri | **Must**   | Varsayılan set + kullanıcı özel kategori desteği. |
| FR-TAG-01 | Etiketleme (#market vb.) | **Should** | Arama ve filtrelemede kullanılabilir.             |

---

### 💸 İşlem Yönetimi

| ID        | Gereksinim                | Öncelik    | Kabul Kriteri                                 |
| --------- | ------------------------- | ---------- | --------------------------------------------- |
| FR-TRN-01 | Gelir/Gider ekleme        | **Must**   | Zorunlu alanlar doğrulanır, işlem kaydedilir. |
| FR-TRN-02 | İşlem düzenleme/silme     | **Must**   | Güncelleme tarihi veya versiyon tutulur.      |
| FR-TRN-03 | Yinelenen işlemler        | **Should** | Otomatik oluşturma ve atlama yönetimi.        |
| FR-TRN-04 | Ekler (fiş, PDF vb.)      | **Should** | Boyut ve tür doğrulaması.                     |
| FR-TRN-05 | OCR ile fiş okuma         | **Could**  | Kullanıcı onayıyla öneriler kaydedilir.       |
| FR-TRN-06 | Çoklu para birimi desteği | **Must**   | Kur tarihiyle dönüşüm sağlanır.               |

---

### 💡 Bütçe & Hedefler

| ID        | Gereksinim                          | Öncelik    | Kabul Kriteri                               |
| --------- | ----------------------------------- | ---------- | ------------------------------------------- |
| FR-BDG-01 | Aylık kategori bazlı bütçe          | **Should** | %75 ve %100 uyarı eşiği.                    |
| FR-BDG-02 | Hedef oluşturma (tasarruf, birikim) | **Could**  | İlerleme barı ve tahmini tamamlanma süresi. |

---

### 📊 Raporlama & Analitik

| ID        | Gereksinim                               | Öncelik    | Kabul Kriteri                            |
| --------- | ---------------------------------------- | ---------- | ---------------------------------------- |
| FR-RPT-01 | Gelir/gider özeti (tarih aralığına göre) | **Must**   | Gün/hafta/ay/yıl filtreleri.             |
| FR-RPT-02 | Kategori dağılımı (pasta/bar)            | **Must**   | Hesap, kategori, para birimi filtreleri. |
| FR-RPT-03 | Trend analizi                            | **Should** | En az 6 aylık veriyle çizelge oluşturur. |
| FR-RPT-04 | Anomali tespiti                          | **Could**  | Harcama sıçramalarında bildirim.         |

---

### 🔎 Arama & Filtreleme

| ID         | Gereksinim                              | Öncelik    | Kabul Kriteri                        |
| ---------- | --------------------------------------- | ---------- | ------------------------------------ |
| FR-SRCH-01 | Serbest metin arama                     | **Must**   | <1 sn’de sonuç döner.                |
| FR-FLT-01  | Filtreleme (tarih, kategori, hesap vb.) | **Must**   | Kombine filtreler doğru sonuç döner. |
| FR-SRT-01  | Sıralama                                | **Should** | Artan/azalan seçimi yapılabilir.     |

---

### 🔄 İçe/Dışa Aktarım & Senkronizasyon

| ID         | Gereksinim                 | Öncelik    | Kabul Kriteri                              |
| ---------- | -------------------------- | ---------- | ------------------------------------------ |
| FR-IMP-01  | CSV/Excel içe aktarma      | **Should** | Alan eşleme sihirbazı ile yükleme.         |
| FR-EXP-01  | CSV/PDF dışa aktarma       | **Must**   | Tarih aralığı ve kolon seçimi yapılabilir. |
| FR-SYNC-01 | Banka entegrasyonu (okuma) | **Could**  | Güvenli OAuth akışı.                       |

---

### 🔔 Bildirimler

| ID        | Gereksinim                         | Öncelik    | Kabul Kriteri                          |
| --------- | ---------------------------------- | ---------- | -------------------------------------- |
| FR-NTF-01 | Bütçe ve yinelenen işlem uyarıları | **Should** | Uygulama içi + e-posta/push bildirimi. |

---

### 🌍 Erişilebilirlik & Yerelleştirme

| ID         | Gereksinim                   | Öncelik    | Kabul Kriteri                             |
| ---------- | ---------------------------- | ---------- | ----------------------------------------- |
| FR-I18N-01 | Çoklu dil desteği (TR/EN)    | **Must**   | Tarih/para formatı locale’a göre.         |
| FR-A11Y-01 | Erişilebilirlik standartları | **Should** | Klavye erişimi, ekran okuyucu etiketleri. |

---

### 🔒 Gizlilik & Veri Yönetimi

| ID         | Gereksinim                    | Öncelik    | Kabul Kriteri                 |
| ---------- | ----------------------------- | ---------- | ----------------------------- |
| FR-PRIV-01 | Veri yedekleme & geri yükleme | **Must**   | Tek tıkla indir/yükle.        |
| FR-PRIV-02 | Hesap silme                   | **Must**   | Geri döndürülemez onay akışı. |
| FR-PRIV-03 | Veri taşınabilirliği (export) | **Should** | JSON/CSV formatında.          |

---

## ✅ MoSCoW Özeti

| Öncelik    | Gereksinimler                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| **Must**   | AUTH-01/02, SET-01, SEC-01, WAL-01/02, CAT-01, TRN-01/02/06, RPT-01/02, SRCH-01, FLT-01, EXP-01, I18N-01, PRIV-01/02 |
| **Should** | AUTH-03, WAL-03, TAG-01, TRN-03/04, RPT-03, SRT-01, IMP-01, NTF-01, A11Y-01, PRIV-03                                 |
| **Could**  | WAL-04, TRN-05, BDG-02, RPT-04, SYNC-01                                                                              |

---

## 🧩 Örnek Veri Modeli

```ts
User {
  id: string
  email: string
  passwordHash: string
  locale: string
  timezone: string
  baseCurrency: string
  createdAt: Date
}

Account {
  id: string
  userId: string
  name: string
  type: 'cash' | 'bank' | 'credit'
  currency: string
  openingBalance: number
  archived: boolean
  createdAt: Date
}

Category {
  id: string
  userId: string
  name: string
  type: 'income' | 'expense'
  parentId?: string
}

Transaction {
  id: string
  userId: string
  accountId: string
  type: 'income' | 'expense' | 'transfer'
  amount: number
  currency: string
  bookedAt: Date
  categoryId?: string
  note?: string
  attachments?: string[]
  tags?: string[]
}

Budget {
  id: string
  userId: string
  categoryId: string
  period: 'month' | 'year'
  limit: number
  threshold: number
}

Goal {
  id: string
  userId: string
  name: string
  targetAmount: number
  targetDate: Date
  linkedAccounts?: string[]
}
```
