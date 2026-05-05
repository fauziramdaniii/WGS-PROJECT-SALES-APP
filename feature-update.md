# Feature Update Log — WGS Sales App

Catatan status pengerjaan fitur. Diupdate secara berkala sesuai progress development.

---

## Autentikasi & Akun

| Status | Fitur |
|--------|-------|
| ✅ DONE | Login dengan email & password |
| ✅ DONE | Register akun baru (role default: user) |
| ✅ DONE | Forgot password (kirim link reset ke email) |
| ✅ DONE | Reset password via email |
| ✅ DONE | Change password (dari dalam akun) |
| ✅ DONE | JWT token authentication |
| ✅ DONE | Role-based access: Superadmin, Admin, User |
| ✅ DONE | Logout & clear session |
| ❌ NOT YET | Remember me / stay logged in |
| ❌ NOT YET | Login dengan Google / OAuth |

---

## Manajemen Produk

| Status | Fitur |
|--------|-------|
| ✅ DONE | CRUD produk (tambah, lihat, edit, hapus) |
| ✅ DONE | Upload gambar produk |
| ✅ DONE | Manajemen stok produk |
| ✅ DONE | Produk tidak ditampilkan jika stok = 0 |
| ✅ DONE | Produk terhubung ke kategori |
| ❌ NOT YET | Pencarian produk by nama |
| ❌ NOT YET | Filter produk by kategori / rentang harga |
| ❌ NOT YET | Sorting produk (termurah, terbaru, terlaris) |
| ❌ NOT YET | Multi-gambar per produk |
| ❌ NOT YET | Produk varian (ukuran, warna) |

---

## Manajemen Kategori

| Status | Fitur |
|--------|-------|
| ✅ DONE | CRUD kategori |
| ✅ DONE | Upload gambar kategori |
| ✅ DONE | Kategori ditampilkan dinamis di halaman visitor |
| ❌ NOT YET | Sub-kategori (kategori bertingkat) |

---

## Keranjang (Cart)

| Status | Fitur |
|--------|-------|
| ✅ DONE | Tambah produk ke keranjang |
| ✅ DONE | Tambah & kurangi quantity di keranjang |
| ✅ DONE | Hapus item dari keranjang |
| ✅ DONE | Kalkulasi subtotal & total |
| ✅ DONE | Cart tersimpan di database (bukan hanya localStorage) |
| ❌ NOT YET | Simpan keranjang saat belum login (guest cart) |
| ❌ NOT YET | Batas maksimum quantity sesuai stok tersedia |

---

## Pemesanan (Order)

| Status | Fitur |
|--------|-------|
| ✅ DONE | Buat order dari keranjang (Collect at Store) |
| ✅ DONE | Tampilkan syarat & ketentuan sebelum order |
| ✅ DONE | Kirim invoice order ke email pembeli |
| ✅ DONE | Auto-cancel order setelah timeout (durasi dinamis via App Config) |
| ✅ DONE | Stok dikembalikan otomatis jika order di-cancel |
| ✅ DONE | Riwayat order by user |
| ✅ DONE | Admin bisa update status order |
| ❌ NOT YET | Form checkout dengan input nama penerima & nomor HP |
| ❌ NOT YET | Opsi pengiriman (delivery / collect at store) |
| ❌ NOT YET | Input alamat pengiriman |
| ❌ NOT YET | Pilihan metode pembayaran (transfer, QRIS, cash) |
| ❌ NOT YET | Upload bukti pembayaran oleh user |
| ❌ NOT YET | Verifikasi pembayaran oleh admin sebelum order dikonfirmasi |
| ❌ NOT YET | Flow status lengkap: pending → confirmed → ready to pickup → done |
| ❌ NOT YET | User bisa batalkan order secara manual (sebelum dikonfirmasi) |
| ❌ NOT YET | Notifikasi real-time ke admin saat ada order baru |
| ❌ NOT YET | Halaman detail order dengan breakdown lengkap |
| ❌ NOT YET | Download invoice / struk order (PDF) |

---

## Dashboard & Laporan

| Status | Fitur |
|--------|-------|
| ✅ DONE | Dashboard admin: total user, order, produk, revenue |
| ✅ DONE | Grafik penjualan |
| ✅ DONE | App Log aktivitas (login, tambah produk, dll) |
| ❌ NOT YET | Laporan penjualan export ke PDF / Excel |
| ❌ NOT YET | Filter dashboard by rentang tanggal |
| ❌ NOT YET | Top produk terlaris |
| ❌ NOT YET | Laporan stok menipis (low stock alert) |

---

## Manajemen User (Admin)

| Status | Fitur |
|--------|-------|
| ✅ DONE | CRUD user oleh admin/superadmin |
| ✅ DONE | Reset password user oleh admin |
| ✅ DONE | Lihat daftar user |
| ❌ NOT YET | Suspend / nonaktifkan akun user |
| ❌ NOT YET | Filter user by role |

---

## App Config (Pengaturan Aplikasi)

| Status | Fitur |
|--------|-------|
| ✅ DONE | Syarat & Ketentuan dinamis (bisa diedit admin) |
| ✅ DONE | Durasi auto-cancel order bisa dikonfigurasi |
| ❌ NOT YET | Konfigurasi info toko (nama, alamat, nomor HP) |
| ❌ NOT YET | Konfigurasi ongkos kirim |
| ❌ NOT YET | Banner / promo homepage bisa diubah admin |

---

## Halaman Visitor / Pembeli

| Status | Fitur |
|--------|-------|
| ✅ DONE | Halaman beranda dengan daftar produk |
| ✅ DONE | Halaman detail produk |
| ✅ DONE | Halaman kategori produk |
| ✅ DONE | Halaman keranjang |
| ✅ DONE | Halaman riwayat order |
| ✅ DONE | Halaman about & contact |
| ✅ DONE | Halaman ganti password |
| ❌ NOT YET | Halaman profil user (edit nama, alamat, foto) |
| ❌ NOT YET | Halaman checkout terpisah dengan form lengkap |
| ❌ NOT YET | Pencarian produk dari navbar |
| ❌ NOT YET | Wishlist / simpan produk favorit |
| ❌ NOT YET | Rating & ulasan produk dari pembeli |
| ❌ NOT YET | Notifikasi in-app (order dikonfirmasi, siap diambil, dll) |

---

## Teknikal & Infrastruktur

| Status | Fitur |
|--------|-------|
| ✅ DONE | REST API dengan Express.js |
| ✅ DONE | Database PostgreSQL dengan Sequelize ORM |
| ✅ DONE | Migrasi & seeder database |
| ✅ DONE | Upload file gambar dengan Multer |
| ✅ DONE | Kirim email dengan Nodemailer |
| ✅ DONE | State management frontend dengan Redux Toolkit |
| ❌ NOT YET | Validasi input yang konsisten di semua endpoint |
| ❌ NOT YET | Rate limiting & proteksi brute force login |
| ❌ NOT YET | Pagination di semua list (produk, order, user) |
| ❌ NOT YET | API documentation (Swagger / Postman collection) |
| ❌ NOT YET | Unit test & integration test |
| ❌ NOT YET | Environment production yang terpisah dari development |

---

## Ringkasan

| | Jumlah |
|-|--------|
| ✅ Sudah selesai (DONE) | 42 |
| ❌ Belum dikerjakan (NOT YET) | 38 |
| **Total** | **80** |

---

*File ini diupdate terakhir: Mei 2026*
