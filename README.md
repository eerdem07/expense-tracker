# 💰 Expense Tracker

Basit ama güçlü bir **kişisel finans takip uygulaması**.  
Kullanıcıların gelir ve giderlerini takip etmelerine, kategorilere ayırmalarına ve bütçelerini kontrol etmelerine yardımcı olur.

## 🛠️ Teknolojiler

- **Frontend:** React  
- **Backend:** Node.js (ESM) + Express  
- **Veritabanı:** PostgreSQL  
- **ORM:** Prisma  
- **Validation:** Zod  
- **Diğer:** RESTful API yapısı, monorepo mimarisi

## ✨ Özellikler

- 💵 Gelir ve gider ekleme  
- 🧾 Harcamaları kategori bazlı görüntüleme  
- 📊 Toplam bakiye hesaplama  
- 🧭 Basit ve temiz kullanıcı arayüzü  
- 🧑‍💻 Backend – frontend ayrımı (monorepo yapısı)  
- ✅ Zod ile tip güvenli request/response doğrulama

## 🏗️ Proje Yapısı
```
expense-tracker/
├── backend/         # ExpressJS backend API + Prisma + Zod
├── frontend/        # React frontend uygulaması
├── .gitignore
├── README.md
└── package.json
```

## 🚀 Kurulum

### 1. Repozitoriyi klonla
```bash
git clone https://github.com/eerdem07/expense-tracker.git
cd expense-tracker
```

### 2. Backend kurulumu
```bash
cd backend
npm install
```

### 3. Veritabanı bağlantısı
`.env` dosyasında PostgreSQL bağlantı URL’ini tanımlayın 👇
```
DATABASE_URL="postgresql://username:password@localhost:5432/expense_tracker?schema=public"
```

Prisma şemasını migrate edin 👇
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 4. Frontend kurulumu
```bash
cd ../frontend
npm install
npm run dev
```

## 📌 Notlar

- Backend `.env` dosyanızı **gizli tutun**, Git’e eklemeyin.  
- Prisma şemasını değiştirdikten sonra mutlaka `npx prisma migrate dev` komutunu çalıştırın.  
- Frontend `.env` dosyasına API endpoint’lerini ekleyebilirsiniz.  
- Zod, backend katmanında input validation (girdi doğrulama) için kullanılır. Bu sayede istek gövdeleri, parametreler ve yanıtlar tip güvenli hale gelir.

## 📝 Lisans

Bu proje açık kaynaklıdır. Dilediğiniz gibi geliştirebilir veya üzerine ekleme yapabilirsiniz.
