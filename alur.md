## 🌸 Alur Aplikasi Undangan Digital Interaktif dengan Animasi Bunga

Aplikasi ini dirancang sebagai website statis (HTML, CSS, JavaScript) yang dapat di‑hosting di GitHub Pages. Semua kustomisasi dilakukan oleh pengguna melalui panel admin (halaman khusus) atau melalui parameter URL. Untuk fitur ucapan tamu yang realtime dan tersimpan, kita akan menggunakan **Firebase Realtime Database** (gratis) agar data bisa dibagikan. Alternatif sederhana (tanpa backend) bisa menggunakan `localStorage`, namun data hanya tersimpan di perangkat masing‑masing pengguna.

Berikut alur lengkap aplikasi dari sudut pandang pengguna (tamu) dan pengelola (pembuat undangan).

---

### 📱 Alur Pengguna (Tamu Undangan)

1. **Membuka Link Undangan**  
   Tamu membuka URL yang telah dibagikan. Halaman pertama muncul dengan:
   - **Background** yang bisa diatur (gambar/warna) – diatur oleh pembuat undangan.
   - **Teks Salam** (tulisan Arab, misal “بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ”)
   - **Nama Acara** (misal “Pernikahan Andi & Rina”)
   - **Ayat Suci Al‑Qur’an** (teks pilihan, misal Q.S. Ar‑Rum:21)
   - **Tombol “Buka Undangan”** yang besar dan menarik.

2. **Interaksi Awal**  
   Saat tombol “Buka Undangan” diklik:
   - Halaman akan bergulir mulus ke bagian utama (Content).
   - **Musik latar otomatis mulai diputar** (pastikan browser mengizinkan autoplay setelah interaksi pengguna).  
   - Background tetap sama, namun konten baru muncul.

3. **Halaman Utama Undangan**  
   Setelah tombol diklik, tampil halaman dengan beberapa bagian yang bisa di‑scroll:
   - **Bagian Pengantin**: Foto pria & wanita, nama lengkap, nama orang tua (masing‑masing bisa diganti oleh pembuat undangan).
   - **Bagian Lokasi & Waktu**:  
     * Map dummy (jika menggunakan iframe Google Maps, atau bisa gambar statis dengan link).  
     * Tombol “Buka Google Maps” yang mengarah ke link lokasi.  
     * Teks keterangan: nama tempat, alamat, dan waktu acara.
   - **Bagian Flashback Acara**: Teks cerita singkat atau momen yang bisa dikustom.
   - **Bagian Galeri**: Grid foto (maksimal 20 foto, masing‑masing maks 10 MB). Foto diunggah oleh pembuat undangan (disimpan sebagai URL atau file di hosting).
   - **Bagian Ucapan Tamu**:  
     * Formulir: Nama, Kehadiran (Hadir/Tidak), Alamat, Ucapan/Doa.  
     * Setelah dikirim, ucapan langsung muncul di bawah formulir secara realtime (menggunakan Firebase).  
     * Ucapan-ucapan ditampilkan dalam kotak-kotak.

4. **Animasi Latar**  
   Sepanjang halaman, terdapat animasi **bunga jatuh** (falling flowers) yang lembut. Bunga dapat diganti bentuknya (misal: mawar, sakura, dll) dan warnanya oleh pembuat undangan melalui panel kustomisasi.

---

### 🛠️ Alur Pengelola (Pembuat Undangan)

Pengelola mengakses halaman **admin** (misal `/admin.html`) yang dilindungi dengan password sederhana (bisa hardcode atau menggunakan fitur hash di URL). Di halaman admin, tersedia form untuk mengatur semua konten:

- **Background**: pilih warna atau unggah gambar.
- **Teks Salam Arab** (boleh diedit).
- **Nama Acara**.
- **Ayat Al‑Qur’an** (bisa pilih dari daftar atau custom).
- **Data Pengantin** (foto, nama, nama orangtua).
- **Lokasi & Waktu** (link Google Maps, alamat, waktu).
- **Flashback** (teks bebas).
- **Galeri**: unggah gambar (akan disimpan sebagai file di folder `galeri/` atau menggunakan layanan seperti Cloudinary agar tidak membebani repo GitHub). Untuk kemudahan, bisa gunakan input URL gambar eksternal.
- **Pengaturan Animasi Bunga**: pilih bentuk (via CSS class) dan warna.

Setelah disimpan, data dikonversi menjadi **parameter URL** (seperti sebelumnya) atau disimpan di Firebase (jika ingin lebih rapi). Kemudian pengelola mendapatkan link undangan yang bisa dibagikan.

---

### 🧩 Komponen Teknis & Implementasi

#### 1. **Struktur Halaman Utama (index.html)**
Halaman utama terdiri dari dua bagian utama yang disembunyikan/ditampilkan dengan JavaScript:
- **Hero Section** (dengan salam, nama acara, ayat, tombol).
- **Main Content** (semua bagian setelah tombol diklik).

Saat tombol diklik, hero disembunyikan (atau digeser) dan main content ditampilkan dengan animasi fade‑in.

#### 2. **Musik Otomatis**
```javascript
// Pastikan musik hanya diputar setelah interaksi
document.getElementById('bukaUndangan').addEventListener('click', () => {
  document.getElementById('bgMusic').play().catch(e => console.log('Autoplay diblokir, tapi sudah interaksi'));
});
```
Gunakan elemen `<audio>` dengan sumber yang bisa diatur.

#### 3. **Bagian Pengantin**
Gunakan struktur HTML yang konsisten:
```html
<div class="pengantin-pria">
  <img src="..." class="foto-pria" alt="">
  <h3>Nama Pria</h3>
  <p>Putra Bpk. ... & Ibu ...</p>
</div>
```
Data diisi melalui JavaScript saat load berdasarkan parameter URL atau Firebase.

#### 4. **Map Dummy**
Untuk map sederhana, bisa gunakan iframe Google Maps dengan alamat yang di‑embed. Atau gunakan gambar statis dengan link ke Google Maps.
```html
<iframe src="https://www.google.com/maps?q=...&output=embed" width="100%" height="300"></iframe>
```
Tombol “Menuju Lokasi” adalah link ke URL Google Maps.

#### 5. **Galeri**
Galeri berupa grid dengan foto. Karena maksimal 20 foto dan ukuran 10MB, sebaiknya foto disimpan di folder `galeri/` di repo, atau gunakan layanan penyimpanan eksternal. Untuk memudahkan, bisa menggunakan input URL gambar (seperti sebelumnya). Jika ingin upload langsung, perlu backend (misal Firebase Storage) – namun untuk pemula, cukup dengan URL.

#### 6. **Ucapan Tamu Realtime**
- **Firebase Setup**: Buat project Firebase, aktifkan Realtime Database, atur aturan ke mode `true` untuk sementara.  
- Di halaman undangan, inisialisasi Firebase dan gunakan `onChildAdded` untuk mendengarkan ucapan baru.  
- Formulir mengirim data ke Firebase dengan `push()`.  
- Data yang tampil diurutkan dari terbaru.

Contoh kode sederhana (dengan Firebase 9):
```javascript
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = { ... };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ucapanRef = ref(db, 'ucapan');

// Kirim ucapan
function kirimUcapan(nama, hadir, alamat, doa) {
  push(ucapanRef, { nama, hadir, alamat, doa, timestamp: Date.now() });
}

// Dengarkan ucapan baru
onChildAdded(ucapanRef, (snapshot) => {
  tampilkanUcapan(snapshot.val());
});
```

#### 7. **Animasi Bunga Jatuh**
Buat partikel CSS atau kanvas. Cara termudah: gunakan library seperti `particles.js` atau buat sendiri dengan elemen `<div>` berisi gambar bunga yang dianimasikan dengan CSS `@keyframes`.  
- Buat kelas bunga (misal `.flower`) dengan background gambar bunga (bisa diganti via CSS class: `.flower.rose`, `.flower.sakura`).  
- Warna bisa diubah dengan `filter: hue-rotate()` atau menggunakan gambar dengan warna berbeda.  
- JavaScript secara periodik menambahkan elemen bunga di posisi acak dan memberinya animasi jatuh.

Contoh sederhana:
```css
.flower {
  position: fixed;
  top: -10%;
  width: 30px;
  height: 30px;
  background: url('flower.png') no-repeat center/contain;
  pointer-events: none;
  animation: fall linear infinite;
}
@keyframes fall {
  to { transform: translateY(100vh) rotate(360deg); }
}
```
JavaScript mengatur `left`, `animation-duration`, dan menghapus elemen setelah animasi selesai.

#### 8. **Panel Admin (kustomisasi)**
Buat halaman `/admin.html` dengan form untuk mengisi semua data. Setelah submit, data dikonversi menjadi query string dan redirect ke halaman utama dengan parameter tersebut. Atau jika menggunakan Firebase, simpan data di database dengan ID unik, dan bagikan link `?id=abc123`.

---

### 📦 Hosting di GitHub Pages

1. **Siapkan repositori** dengan struktur:
   ```
   undangan/
   ├── index.html
   ├── admin.html
   ├── style.css
   ├── script.js
   ├── firebase.js (opsional)
   ├── assets/
   │   ├── images/
   │   ├── music/
   │   └── flowers/
   └── README.md
   ```
2. **Upload ke GitHub** dan aktifkan GitHub Pages.
3. **Untuk Firebase**: Jangan lupa masukkan konfigurasi Firebase di kode (aman karena hanya untuk frontend, tetap lindungi aturan database).

---

### ✨ Tips Tambahan agar Menarik

- Gunakan **font Arab** yang indah (misal `Amiri` atau `Scheherazade`).
- Tambahkan efek **parallax** ringan pada background.
- Sediakan **tombol musik** untuk mematikan/menyalakan.
- Gunakan **smooth scroll** saat navigasi antar bagian.
- Untuk galeri, tambahkan **lightbox** (foto bisa diklik dan diperbesar).
- Validasi form ucapan agar tidak kosong.
- Animasi bunga bisa diatur kecepatannya oleh pengguna.

Dengan alur ini, aplikasi undangan digitalmu akan terlihat modern, interaktif, dan mudah dikustomisasi. Cocok untuk pemula yang ingin belajar sambil membuat karya nyata! 🌹