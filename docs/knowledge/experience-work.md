# Work Experience

## Magang — PT Aryaduta International Management (Januari 2026 - Sekarang)
Posisi: IT & Data Engineer Intern
Richie sedang menjalani magang sebagai IT & Data Engineer Intern di PT Aryaduta International Management, bagian dari Aryaduta Hospitality Group (AHG), jaringan hotel dan resort terkemuka di Indonesia.

## Proyek: Aryaduta Console — Internal Performance Dashboard
Richie membangun dan men-deploy full-stack web dashboard yang menggantikan pelaporan Excel manual setiap malam, mencakup **9 hotel** dan **5 leisure unit** (14 properti total), memangkas waktu pemrosesan data Head Office sebesar **3–4 jam per hari (~60%)**.

### Dampak & Pencapaian
- Membangun dan men-deploy full-stack dashboard yang menggantikan pelaporan Excel manual malam hari di 9 hotel dan 5 leisure unit — memangkas waktu pemrosesan data Head Office ~60% (3–4 jam per hari)
- Mengotomasi data pipeline via **n8n** (near-realtime hingga daily cronjobs), memproses **100.000+ records per run** dari staging ke presentation-ready layer; melayani tim Revenue, Sales, dan Unit-level di seluruh 14 properti
- Deploy ke production dengan **SSO authentication (Google OAuth)** internal, mengamankan data operasional sensitif seluruh properti

### Tech Stack yang Digunakan
- Frontend: Nuxt 3 + Vue 3 + TypeScript, Tailwind CSS, SheetJS (untuk Excel export)
- Backend: Laravel (PHP) dengan Sanctum authentication
- Database: PostgreSQL
- Data Pipeline: n8n (near-realtime & daily cronjobs)
- Auth: Google OAuth SSO

### Cakupan Fitur
Dashboard mencakup modul-modul performa bisnis (occupancy, revenue, F&B, OOD), input data (budget, forecast, closing estimate), analitik segmentasi, dan export laporan ke Excel — semuanya terintegrasi dalam satu platform terpusat dengan akses berbasis role.

### Role-Based Access Control (RBAC)
Sistem mendukung tiga jenis role dengan hak akses berbeda:
- AHO (Head Office): akses penuh ke semua properti, konsolidasi data, export Excel
- Hotel roles (AJK, AMD, APL, APK, AKB, ABD, ASM, AME, ALV, AMK): akses terbatas ke dashboard hotel masing-masing saja
- Leisure roles (ACC, IKG, PSBC, WBO, PRI, TWI): akses terbatas ke dashboard leisure masing-masing saja


### Kolaborasi & Workflow
- Bekerja secara kolaboratif dengan kolaborator internal (Dasmond Tan) menggunakan Git workflow (commit → push → pull → merge)
- Project di-deploy ke environment production internal perusahaan
