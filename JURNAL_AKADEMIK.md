# APLIKASI PENJADWALAN MATA KULIAH TANPA BENTROK BERBASIS ALGORITMA BACKTRACKING

**Nama Mahasiswa 1<sup>1</sup>, Nama Mahasiswa 2<sup>2</sup>**

<sup>1,2</sup> Program Studi Teknik Informatika, Fakultas Teknik, Universitas Muhammadiyah Makassar

E-mail: <sup>1</sup>email1@gmail.com, <sup>2</sup>email2@gmail.com

---

## ABSTRAK

Proses penyusunan jadwal kuliah di institusi pendidikan tinggi sering kali menghadapi berbagai kendala apabila dilakukan secara manual, seperti terjadinya bentrok jadwal antar mata kuliah, ketidaksesuaian dengan batasan SKS maksimum, serta lamanya waktu penyusunan jadwal yang optimal. Permasalahan tersebut berdampak pada efektivitas dan efisiensi penyelenggaraan kegiatan perkuliahan. Penelitian ini bertujuan untuk merancang dan mengimplementasikan sistem informasi penjadwalan mata kuliah berbasis web yang mampu mengotomatisasi proses pencarian kombinasi jadwal tanpa bentrok dengan menerapkan Algoritma Backtracking. Metode pengembangan sistem yang digunakan adalah System Development Life Cycle (SDLC) dengan tahapan analisis kebutuhan, perancangan sistem, implementasi, dan pengujian. Sistem dibangun menggunakan bahasa pemrograman JavaScript dengan framework Node.js dan Express.js, basis data SQLite, serta antarmuka berbasis HTML, CSS, dan TailwindCSS. Hasil penelitian menunjukkan bahwa sistem yang dikembangkan mampu mengelola data mata kuliah secara terintegrasi serta menghasilkan kombinasi jadwal kuliah secara otomatis tanpa bentrok berdasarkan parameter semester dan batas SKS maksimum. Dengan adanya sistem ini, proses penyusunan jadwal kuliah menjadi lebih cepat, akurat, dan mudah diakses dibandingkan dengan metode manual, sehingga dapat meningkatkan efisiensi perencanaan akademik mahasiswa.

**Kata kunci:** penjadwalan mata kuliah, algoritma backtracking, aplikasi web, Node.js, SQLite

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang

Institusi pendidikan tinggi modern menghadapi tantangan signifikan dalam membantu mahasiswa menyusun jadwal kuliah yang optimal. Setiap semester, mahasiswa harus memilih kombinasi mata kuliah yang tepat dengan mempertimbangkan berbagai faktor seperti waktu pelaksanaan, hari kuliah, jumlah SKS, dan semester yang sedang ditempuh. Proses pemilihan ini, ketika dilakukan secara manual, sering kali menimbulkan berbagai masalah yang berdampak langsung pada kualitas perencanaan akademik.

Permasalahan umum yang terjadi dalam proses penyusunan jadwal kuliah manual mencakup: (1) terjadinya tumpang tindih jadwal kuliah yang menyebabkan mahasiswa tidak dapat mengikuti semua mata kuliah yang dipilih, (2) kesulitan dalam memaksimalkan jumlah SKS yang dapat diambil tanpa terjadi bentrok, (3) memakan waktu yang sangat lama dalam proses pemilihan kombinasi yang tepat, serta (4) sulitnya melihat semua kemungkinan kombinasi jadwal yang valid. Masalah-masalah ini tidak hanya mengurangi efisiensi perencanaan akademik, tetapi juga dapat mengganggu kelancaran proses pembelajaran.

Dengan berkembangnya teknologi informasi dan komunikasi, pemanfaatan sistem otomatis untuk mengatasi masalah penjadwalan menjadi semakin relevan dan diperlukan. Algoritma Backtracking dipilih dalam penelitian ini karena kemampuannya yang terbukti dalam menyelesaikan masalah *Constraint Satisfaction Problems* (CSP), termasuk masalah penjadwalan kuliah. Algoritma ini bekerja dengan membangun solusi secara bertahap dan melakukan *backtrack* ketika menemui kendala, sehingga mampu menemukan semua kombinasi jadwal yang valid dengan mempertimbangkan semua kendala yang ada.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah:
1. Bagaimana merancang sistem informasi penjadwalan mata kuliah berbasis web yang dapat menghasilkan kombinasi jadwal tanpa bentrok?
2. Bagaimana mengimplementasikan Algoritma Backtracking untuk menemukan semua kombinasi jadwal yang valid berdasarkan parameter yang diberikan?
3. Bagaimana efektivitas sistem yang dikembangkan dalam membantu mahasiswa menyusun jadwal kuliah?

### 1.3 Tujuan Penelitian

Tujuan dari penelitian ini adalah:
1. Merancang dan membangun sistem informasi penjadwalan mata kuliah berbasis web menggunakan teknologi Node.js dan SQLite.
2. Mengimplementasikan Algoritma Backtracking untuk menghasilkan kombinasi jadwal kuliah tanpa bentrok.
3. Menguji efektivitas sistem dalam menghasilkan jadwal yang optimal berdasarkan parameter semester dan batas SKS maksimum.

### 1.4 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini adalah:
1. **Bagi Mahasiswa:** Memudahkan proses pemilihan kombinasi mata kuliah yang optimal tanpa bentrok jadwal.
2. **Bagi Institusi:** Menyediakan alat bantu yang efisien untuk perencanaan akademik.
3. **Bagi Pengembang:** Memberikan referensi implementasi Algoritma Backtracking dalam sistem penjadwalan berbasis web.

---

## 2. TINJAUAN PUSTAKA

### 2.1 Penjadwalan Mata Kuliah

Penjadwalan mata kuliah adalah proses mengatur waktu, hari, dan alokasi mata kuliah agar tidak terjadi bentrok sehingga mahasiswa dapat mengikuti semua mata kuliah yang dipilih sesuai dengan ketentuan yang berlaku. Masalah penjadwalan termasuk dalam kategori *Constraint Satisfaction Problems* (CSP) yang memerlukan algoritma khusus untuk penyelesaiannya.

### 2.2 Algoritma Backtracking

Algoritma Backtracking adalah teknik pemrograman yang digunakan untuk memecahkan masalah secara sistematis dengan mencoba berbagai kemungkinan solusi dan mundur (*backtrack*) ketika solusi tidak valid ditemukan. Algoritma ini sangat efektif untuk masalah kombinatorial seperti penjadwalan.

**Cara Kerja Algoritma Backtracking:**
1. **Choose (Pilih):** Pilih satu elemen kandidat untuk dimasukkan ke dalam solusi.
2. **Explore (Jelajahi):** Jelajahi semua kemungkinan dengan elemen yang dipilih.
3. **Unchoose (Batalkan Pilihan):** Jika solusi tidak valid, batalkan pilihan dan coba elemen berikutnya.

**Pseudocode Algoritma Backtracking untuk Penjadwalan:**

```
function findCombinations(index, currentSKS):
    if currentCombination is not empty:
        store currentCombination as valid solution
    
    for i from index to courses.length:
        course = courses[i]
        
        // Constraint 1: Check SKS Limit
        if currentSKS + course.sks > maxSKS:
            continue
        
        // Constraint 2: Check Time Conflict
        if hasTimeConflict(course, currentCombination):
            continue
        
        // Choose
        currentCombination.add(course)
        
        // Explore
        findCombinations(i + 1, currentSKS + course.sks)
        
        // Unchoose (Backtrack)
        currentCombination.remove(course)
```

### 2.3 Teknologi yang Digunakan

1. **Node.js:** Runtime JavaScript yang memungkinkan eksekusi JavaScript di sisi server.
2. **Express.js:** Framework web minimalis untuk Node.js yang menyediakan fitur routing dan middleware.
3. **SQLite:** Sistem manajemen basis data relasional yang ringan dan berbasis file.
4. **HTML/CSS/JavaScript:** Teknologi standar untuk pengembangan antarmuka web.
5. **TailwindCSS:** Framework CSS utility-first untuk styling yang cepat dan responsif.

---

## 3. METODE PENELITIAN

### 3.1 Objek Penelitian

Objek yang diteliti meliputi penjadwalan mata kuliah, sistem informasi berbasis web, dan algoritma backtracking. Penjadwalan mata kuliah didefinisikan sebagai proses mengatur kombinasi mata kuliah berdasarkan hari, waktu, semester, dan SKS agar tidak terjadi bentrok jadwal.

### 3.2 Metode Pengembangan Sistem

Pengembangan sistem mengikuti pendekatan *System Development Life Cycle* (SDLC) model Waterfall dengan tahapan sebagai berikut:

```
┌─────────────────┐
│   Requirement   │
│    Analysis     │
└────────┬────────┘
         ▼
┌─────────────────┐
│     Design      │
└────────┬────────┘
         ▼
┌─────────────────┐
│      Code       │
│ (Implementation)│
└────────┬────────┘
         ▼
┌─────────────────┐
│      Test       │
└─────────────────┘
```

**a. Requirement Analysis (Analisis Kebutuhan)**

Tahapan ini dilakukan untuk mengidentifikasi dan menganalisis kebutuhan sistem:
- Sistem harus dapat menyimpan data mata kuliah (kode, nama, hari, jam mulai, jam selesai, SKS, semester)
- Sistem harus dapat menampilkan daftar mata kuliah
- Sistem harus dapat menambah dan menghapus mata kuliah
- Sistem harus dapat menghasilkan kombinasi jadwal tanpa bentrok berdasarkan parameter semester dan batas SKS

**b. Design (Perancangan)**

Perancangan sistem meliputi:
- Perancangan struktur basis data menggunakan SQLite
- Perancangan API endpoint untuk backend
- Perancangan antarmuka pengguna (UI)
- Perancangan alur proses penjadwalan dengan algoritma backtracking

**c. Code (Implementasi)**

Sistem diimplementasikan dengan:
- **Backend:** Node.js dengan Express.js
- **Database:** SQLite dengan library sqlite3
- **Frontend:** HTML, CSS (TailwindCSS), JavaScript

**d. Test (Pengujian)**

Pengujian dilakukan menggunakan metode *Black Box Testing* untuk memastikan seluruh fungsi berjalan sesuai kebutuhan.

### 3.3 Struktur Basis Data

Basis data menggunakan SQLite dengan tabel utama `courses`:

| Field | Type | Keterangan |
|-------|------|------------|
| id | INTEGER | Primary Key, Auto Increment |
| code | TEXT | Kode mata kuliah |
| name | TEXT | Nama mata kuliah |
| day | TEXT | Hari pelaksanaan |
| start_time | TEXT | Jam mulai (HH:MM) |
| end_time | TEXT | Jam selesai (HH:MM) |
| sks | INTEGER | Jumlah SKS |
| semester | INTEGER | Semester mata kuliah |

### 3.4 Alur Proses Penjadwalan

```
┌──────────────────┐
│   Input Data     │
│   Mata Kuliah    │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Pilih Parameter  │
│ (Semester, SKS)  │
└────────┬─────────┘
         ▼
┌──────────────────┐
│   Algoritma      │
│   Backtracking   │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Cek Constraint:  │
│ - SKS ≤ Maks     │
│ - No Time Clash  │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Hasil Kombinasi │
│  Jadwal Valid    │
└──────────────────┘
```

---

## 4. HASIL DAN PEMBAHASAN

### 4.1 Analisis Sistem

Hasil analisis menunjukkan bahwa penyusunan jadwal kuliah secara manual memakan waktu lama karena harus mencocokkan mata kuliah satu per satu untuk menghindari bentrok. Sistem yang dikembangkan bertujuan untuk mengotomatisasi proses ini.

### 4.2 Implementasi Backend

**a. Konfigurasi Server (server.js)**

Server dibangun menggunakan Express.js dengan konfigurasi berikut:
- Port: 3000
- Middleware: CORS, Body Parser, Static Files
- API Endpoints:
  - `GET /api/courses` - Mengambil semua mata kuliah
  - `POST /api/courses` - Menambah mata kuliah baru
  - `DELETE /api/courses/:id` - Menghapus mata kuliah
  - `POST /api/optimize` - Menghasilkan kombinasi jadwal

**b. Implementasi Algoritma Backtracking**

Algoritma backtracking diimplementasikan dalam endpoint `/api/optimize`:

```javascript
// Helper function to parse time "HH:MM" to minutes from midnight
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Helper to check if two time intervals overlap
function isOverlapping(start1, end1, start2, end2) {
    return Math.max(start1, start2) < Math.min(end1, end2);
}

// Backtracking Algorithm
function findCombinations(index, currentSKS) {
    // Base case: store valid non-empty combinations
    if (currentCombination.length > 0) {
        validCombinations.push([...currentCombination]);
    }

    // Limit results to avoid browser crash
    if (validCombinations.length > 500) return;

    for (let i = index; i < courses.length; i++) {
        const course = courses[i];

        // Constraint 1: Check SKS Limit
        if (currentSKS + course.sks > maxSKS) {
            continue;
        }

        // Constraint 2: Check Time Conflict
        let hasConflict = false;
        const newStart = timeToMinutes(course.start_time);
        const newEnd = timeToMinutes(course.end_time);

        for (const scheduledCourse of currentCombination) {
            if (scheduledCourse.day === course.day) {
                const scheduledStart = timeToMinutes(scheduledCourse.start_time);
                const scheduledEnd = timeToMinutes(scheduledCourse.end_time);

                if (isOverlapping(newStart, newEnd, scheduledStart, scheduledEnd)) {
                    hasConflict = true;
                    break;
                }
            }
        }

        if (!hasConflict) {
            // Choose
            currentCombination.push(course);

            // Explore
            findCombinations(i + 1, currentSKS + course.sks);

            // Un-choose (Backtrack)
            currentCombination.pop();
        }
    }
}
```

### 4.3 Implementasi Frontend

**a. Halaman Utama (Dashboard)**

Halaman utama menampilkan:
- Header dengan judul aplikasi
- Tabel daftar mata kuliah dengan kolom: Kode, Nama, Semester, Hari, Jam, SKS
- Tombol "Tambah Manual" untuk menambah mata kuliah baru
- Panel pengaturan parameter (Semester dan Maksimal SKS)
- Tombol "Cari Kombinasi" untuk generate jadwal

**b. Form Input Mata Kuliah**

Modal form untuk menambahkan mata kuliah dengan field:
- Kode mata kuliah
- Nama mata kuliah
- Hari (Senin - Sabtu)
- Jam Mulai dan Jam Selesai
- SKS (1-6)
- Semester (1-8)

**c. Tampilan Hasil Kombinasi**

Hasil kombinasi jadwal ditampilkan dalam bentuk kartu yang menunjukkan:
- Nomor opsi jadwal
- Total SKS
- Jumlah mata kuliah
- Daftar nama mata kuliah
- Tombol "Lihat Detail" untuk melihat jadwal lengkap

### 4.4 Screenshot Aplikasi

#### 4.4.1 Tampilan Dashboard Utama
Dashboard menampilkan daftar mata kuliah dalam bentuk tabel yang terorganisir dengan warna berbeda untuk setiap hari. Panel di sebelah kanan memungkinkan pengguna mengatur parameter pencarian.

#### 4.4.2 Form Tambah Mata Kuliah
Modal popup untuk menambahkan data mata kuliah baru dengan validasi input yang lengkap.

#### 4.4.3 Hasil Kombinasi Jadwal
Setelah menekan tombol "Cari Kombinasi", sistem menampilkan semua opsi jadwal yang valid dalam bentuk kartu yang informatif.

#### 4.4.4 Detail Jadwal
Modal detail menampilkan jadwal lengkap yang terurut berdasarkan hari dan waktu.

### 4.5 Pengujian Sistem

Pengujian dilakukan menggunakan metode *Black Box Testing*:

| No | Fitur yang Diuji | Langkah Pengujian | Hasil |
|----|------------------|-------------------|-------|
| 1 | Tampilan Dashboard | Akses halaman utama | ✓ Sukses |
| 2 | Tambah Mata Kuliah | - Klik "Tambah Manual"<br>- Isi form lengkap<br>- Klik "Simpan" | ✓ Sukses |
| 3 | Hapus Mata Kuliah | - Klik ikon hapus<br>- Konfirmasi penghapusan | ✓ Sukses |
| 4 | Generate Jadwal | - Pilih semester<br>- Atur maksimal SKS<br>- Klik "Cari Kombinasi" | ✓ Sukses |
| 5 | Lihat Detail Jadwal | Klik "Lihat Detail" pada kartu hasil | ✓ Sukses |
| 6 | Validasi Tanpa Bentrok | Verifikasi hasil tidak memiliki jadwal bentrok | ✓ Sukses |
| 7 | Validasi Batas SKS | Verifikasi total SKS ≤ batas maksimum | ✓ Sukses |

Berdasarkan hasil pengujian, seluruh fungsi utama sistem berjalan sesuai dengan kebutuhan dan spesifikasi yang dirancang. Algoritma backtracking berhasil menemukan semua kombinasi jadwal yang valid tanpa bentrok.

### 4.6 Analisis Kompleksitas Algoritma

**Kompleksitas Waktu:** O(2^n) dalam kasus terburuk, di mana n adalah jumlah mata kuliah. Namun, dengan adanya *pruning* (pemangkasan) berdasarkan constraint SKS dan bentrok waktu, kompleksitas aktual jauh lebih rendah.

**Kompleksitas Ruang:** O(n) untuk menyimpan kombinasi sementara selama proses backtracking.

**Optimasi yang Diterapkan:**
1. Pembatasan maksimal 500 kombinasi untuk menghindari crash browser
2. Hasil diurutkan berdasarkan total SKS (descending) untuk menampilkan kombinasi terbaik terlebih dahulu
3. Hanya 20 kombinasi teratas yang dikirim ke client

---

## 5. KESIMPULAN DAN SARAN

### 5.1 Kesimpulan

Berdasarkan hasil penelitian dan pengembangan sistem, dapat disimpulkan bahwa:

1. Sistem informasi penjadwalan mata kuliah berbasis web berhasil dikembangkan menggunakan Node.js, Express.js, SQLite, dan teknologi web modern (HTML, CSS dengan TailwindCSS, JavaScript).

2. Algoritma Backtracking berhasil diimplementasikan untuk menemukan semua kombinasi jadwal kuliah yang valid tanpa bentrok, dengan mempertimbangkan constraint batas SKS maksimum dan konflik waktu.

3. Sistem yang dikembangkan mampu:
   - Mengelola data mata kuliah (tambah, lihat, hapus)
   - Memfilter mata kuliah berdasarkan semester
   - Menghasilkan kombinasi jadwal secara otomatis
   - Menampilkan hasil dalam antarmuka yang informatif dan mudah dipahami

4. Hasil pengujian menunjukkan seluruh fungsi berjalan dengan baik dan menghasilkan kombinasi jadwal yang valid sesuai parameter yang diberikan.

5. Dengan adanya sistem ini, proses penyusunan jadwal kuliah menjadi lebih cepat, akurat, dan mudah diakses dibandingkan dengan metode manual, sehingga dapat meningkatkan efisiensi perencanaan akademik mahasiswa.

### 5.2 Saran

Untuk pengembangan lebih lanjut, disarankan:

1. **Penambahan Fitur Autentikasi:** Menambahkan sistem login untuk menyimpan preferensi jadwal per mahasiswa.

2. **Integrasi dengan Sistem Akademik:** Menghubungkan dengan sistem informasi akademik kampus untuk sinkronisasi data mata kuliah otomatis.

3. **Fitur Export:** Menambahkan kemampuan export jadwal ke format PDF atau kalender (iCal).

4. **Prioritas Mata Kuliah:** Menambahkan fitur untuk memberi prioritas pada mata kuliah tertentu yang wajib diambil.

5. **Optimasi Algoritma:** Mengimplementasikan algoritma optimasi tambahan seperti *Branch and Bound* atau *Genetic Algorithm* untuk performa yang lebih baik pada dataset besar.

---

## DAFTAR PUSTAKA

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.

2. Russell, S., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson.

3. Node.js Foundation. (2024). *Node.js Documentation*. https://nodejs.org/docs

4. Express.js. (2024). *Express.js Documentation*. https://expressjs.com

5. SQLite. (2024). *SQLite Documentation*. https://www.sqlite.org/docs.html

6. TailwindCSS. (2024). *TailwindCSS Documentation*. https://tailwindcss.com/docs

---

## LAMPIRAN

### Lampiran A: Struktur Project

```
Aplikasi-Pencari-Mata-Kuliah-Tanpa-Bentrok/
├── public/
│   ├── index.html      # Halaman utama (frontend)
│   └── script.js       # Logika frontend JavaScript
├── database.js         # Konfigurasi dan koneksi database
├── server.js           # Backend server dan API
├── schedule.db         # File database SQLite
├── package.json        # Konfigurasi Node.js
└── README.md           # Dokumentasi project
```

### Lampiran B: Cara Menjalankan Aplikasi

1. Pastikan Node.js terinstal di komputer
2. Buka terminal di folder project
3. Jalankan perintah:
   ```bash
   npm install
   node server.js
   ```
4. Buka browser dan akses: `http://localhost:3000`

### Lampiran C: Contoh Data Mata Kuliah

| Kode | Nama | Hari | Jam | SKS | Semester |
|------|------|------|-----|-----|----------|
| IF301 | Algoritma dan Pemrograman | Senin | 08:00-10:00 | 3 | 3 |
| IF302 | Struktur Data | Senin | 10:00-12:00 | 3 | 3 |
| IF303 | Basis Data | Selasa | 08:00-10:00 | 3 | 3 |
| IF304 | Pemrograman Web | Rabu | 13:00-15:00 | 3 | 3 |
| IF305 | Jaringan Komputer | Kamis | 08:00-10:00 | 3 | 3 |
