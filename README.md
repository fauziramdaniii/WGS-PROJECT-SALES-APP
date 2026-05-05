# WGS-PROJECT-SALES-APP

Project For Hiring Recruitment PT. WGS Bootcamp Batch 7

---

## Fitur

- Role: Superadmin, Admin, User
- Login, Register, Reset Password, Forgot Password, Change Password via Email
- Dashboard & App Log
- Category, Product, Order, Cart Management
- App Config (Terms & Conditions, Cancel Order Timer, dll)

---

## Prasyarat (Install Dulu Sebelum Mulai)

Pastikan semua tools berikut sudah terinstall di komputer kamu:

| Tool | Versi Minimal | Link Download |
|------|--------------|---------------|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | (sudah include dengan Node.js) |
| PostgreSQL | v14+ | https://www.postgresql.org/download |
| Git | terbaru | https://git-scm.com |

Cek versi dengan perintah:
```bash
node -v
npm -v
psql --version
```

---

## Setup Database (PostgreSQL)

### 1. Buka psql atau pgAdmin, lalu buat database baru

```sql
CREATE DATABASE sales_app;
```

### 2. Pastikan user PostgreSQL kamu sesuai dengan config

Default config project menggunakan:
- **Username:** `postgres`
- **Password:** `P@ssw0rd`
- **Database:** `sales_app`
- **Host:** `127.0.0.1`
- **Port:** `5432`

Jika username/password PostgreSQL kamu berbeda, sesuaikan di file `backend/config/config.json`.

---

## Setup Backend

### 1. Masuk ke folder backend

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Sequelize CLI secara global (jika belum ada)

```bash
npm install -g sequelize-cli
```

### 4. Buat file `.env` di dalam folder `backend/`

```
JWT_SECRET=asomasowuzi
PORT=3000
```

> Kamu bisa ganti `JWT_SECRET` dengan string random apapun, tapi pastikan konsisten.

### 5. Jalankan migrasi database (buat semua tabel)

```bash
npx sequelize-cli db:migrate
```

### 6. Jalankan seeder (isi data awal: superadmin, admin, user)

```bash
npx sequelize-cli db:seed:all
```

### 7. Jalankan server backend

```bash
npm start
```

Server akan berjalan di: **http://localhost:3000**

Jika berhasil, terminal akan menampilkan:
```
Server is running on port 3000
```

---

## Setup Frontend

### 1. Buka terminal baru, masuk ke folder frontend

```bash
cd frontend
```

### 2. Install dependencies

> **Penting:** gunakan flag `--legacy-peer-deps` karena ada konflik versi antara `@material-ui/core` v4 dan `@types/react` v18.

```bash
npm install --legacy-peer-deps
```

### 3. Buat file `.env` di dalam folder `frontend/`

```
VITE_API_URL=http://localhost:3000/
```

> Pastikan URL ini mengarah ke backend yang sedang berjalan. Jangan lupa tambahkan `/` di akhir URL.

### 4. Jalankan frontend

```bash
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

---

## Akun Default (Hasil Seeder)

| Role | Email | Password |
|------|-------|----------|
| Superadmin | superadmin@example.com | P@ssw0rd |
| Admin | admin@example.com | P@ssw0rd |
| User | user@example.com | P@ssw0rd |

---

## Struktur Folder

```
WGS-PROJECT-SALES-APP/
├── backend/
│   ├── config/         # Konfigurasi database (config.json)
│   ├── controllers/    # Logic handler tiap endpoint
│   ├── middleware/     # Auth middleware (JWT)
│   ├── migrations/     # Skema tabel database
│   ├── models/         # Model Sequelize
│   ├── routes/         # Definisi route API
│   ├── seeders/        # Data awal (superadmin, admin, user)
│   ├── uploads/        # Folder upload gambar produk/kategori
│   ├── .env            # Environment variable backend
│   └── index.js        # Entry point server
└── frontend/
    ├── src/
    │   ├── components/ # Komponen UI reusable
    │   ├── pages/      # Halaman (visitor, admin, superadmin)
    │   ├── redux/      # State management (Redux Toolkit)
    │   ├── routes/     # Route guard per role
    │   ├── stores/     # Store per fitur (auth, cart, order, dll)
    │   └── utils/      # API service (axios wrapper)
    ├── .env            # Environment variable frontend
    └── vite.config.js  # Konfigurasi Vite
```

---

## Urutan Menjalankan (Quick Start)

```bash
# Terminal 1 — Backend
cd backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start

# Terminal 2 — Frontend
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Buka browser: **http://localhost:5173**

---

## Troubleshooting

### `ERESOLVE` / konflik peer dependency saat `npm install` di frontend
- Jalankan dengan flag legacy: `npm install --legacy-peer-deps`
- Penyebab: `@material-ui/core` v4 tidak kompatibel dengan `@types/react` v18

### `SequelizeConnectionRefusedError` saat migrate
- Pastikan PostgreSQL sudah berjalan
- Cek username/password di `backend/config/config.json`

### Frontend tidak bisa connect ke backend
- Pastikan `VITE_API_URL` di `frontend/.env` sudah benar dan backend sedang berjalan
- Jangan lupa tambahkan `/` di akhir URL (contoh: `http://localhost:3000/`)

### Port sudah dipakai
- Ganti `PORT` di `backend/.env` lalu sesuaikan juga `VITE_API_URL` di `frontend/.env`

### `npx sequelize-cli` tidak dikenali
- Install sequelize-cli: `npm install -g sequelize-cli`
