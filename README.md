# Aplikasi Jadwal Kuliah Optimizer

Aplikasi web untuk menyusun jadwal kuliah bebas bentrok dengan fitur filtering semester dan manajemen mata kuliah (CRUD).

## Cara Menjalankan Aplikasi
1.  Pastikan Anda memiliki **Node.js** terinstal.
2.  Buka terminal di folder project ini.
3.  Jalankan perintah:
    ```bash
    node server.js
    ```
4.  Buka browser dan akses: `http://localhost:3000`

## Cara Mengelola Database
Database yang digunakan adalah **SQLite** (`schedule.db`).

### 1. Melihat Isi Database
Cara termudah adalah menggunakan **Extension VS Code**:
1.  Install extension **SQLite Viewer** di VS Code.
2.  Klik file `schedule.db` di explorer VS Code.
3.  Data akan muncul dalam bentuk tabel.

Alternatif lain:
-   Gunakan aplikasi **DB Browser for SQLite** (https://sqlitebrowser.org/).

### 2. Menambah/Menghapus Mata Kuliah
Anda bisa melakukannya langsung dari **Aplikasi Web**:
-   **Tambah**: Klik tombol **"Tambah Manual"** di halaman utama.
-   **Hapus**: Klik ikon **Tong Sampah** di baris mata kuliah yang ingin dihapus.

## Struktur Project
-   `server.js`: Backend (API & Logika server).
-   `database.js`: Koneksi database & pembuatan tabel.
-   `public/`: File frontend (HTML, CSS, JS).
-   `schedule.db`: File database utama.
