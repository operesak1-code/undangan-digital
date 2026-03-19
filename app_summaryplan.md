## 📋 Planning / Summary Alur Aplikasi Undangan Digital

Aplikasi ini bekerja sepenuhnya di sisi klien (frontend) dan tidak memerlukan server. Semua data disimpan di URL, sehingga pengguna bisa membagikan hasil kreasinya hanya dengan link.

---

### 🧭 Alur Pengguna (User Flow)

1. **Membuka Aplikasi**  
   Pengguna mengakses halaman utama. Tampil pratinjau undangan default (template 1, teks contoh, foto default, background default).

2. **Memilih Template**  
   Di panel kustomisasi, terdapat thumbnail 5 template. Pengguna mengklik salah satu → pratinjau langsung berubah ke template tersebut, sambil mempertahankan teks dan gambar yang sudah diisi sebelumnya.

3. **Mengisi Data Undangan**  
   - **Nama pengantin / acara** – input teks, perubahan langsung terlihat di pratinjau.  
   - **Tanggal acara** – input teks atau date picker, hasil langsung tampil.  
   - **Lokasi** – input teks.  
   - **Foto utama** – input URL gambar (misal dari Imgur, Google Drive, dll). Saat diisi, foto di pratinjau berganti.  
   - **Background** – bisa pilih warna dari color picker, atau masukkan URL gambar background.  
   - **Musik latar** – dropdown berisi beberapa pilihan lagu (MP3 dari folder lokal). Saat dipilih, musik dapat diputar/dijeda melalui kontrol di bawah.

4. **Melihat Pratinjau Langsung**  
   Setiap perubahan di form langsung merefleksikan tampilan undangan di area pratinjau. Tidak perlu tombol "Simpan".

5. **Membagikan Undangan**  
   Setelah puas, pengguna klik tombol "Salin Link". URL yang ada di browser saat itu (yang sudah mengandung semua parameter) akan tersalin ke clipboard. Link tersebut bisa dikirim ke tamu.

6. **Tamu Membuka Link**  
   Tamu membuka link → halaman langsung menampilkan undangan sesuai kustomisasi yang dibuat (template, teks, foto, background, musik). Musik bisa diputar manual oleh tamu.

---

### ⚙️ Alur Sistem (System Flow)

1. **Inisialisasi Halaman**  
   - Saat halaman dimuat, JavaScript membaca `window.location.search` (parameter URL).  
   - Jika ada parameter, terapkan nilainya ke form dan pratinjau.  
   - Jika tidak ada parameter, gunakan nilai default.

2. **Event Listener pada Form**  
   Setiap elemen input (radio template, text, color, URL, dropdown musik) diberi event listener `input` atau `change`.  
   - Saat event terjadi, jalankan fungsi `updatePreview()` yang mengambil nilai form dan menulisnya ke elemen pratinjau yang sesuai.  
   - Panggil fungsi `updateURL()` untuk mengubah URL tanpa reload menggunakan `history.pushState()`. Parameter baru disusun dari semua nilai form.

3. **Mekanisme Ganti Template**  
   - Tiap template adalah elemen `<div>` dengan class `template template1`, `template template2`, dst.  
   - Saat template dipilih, semua template disembunyikan, hanya template yang dipilih yang ditampilkan.  
   - Data teks, foto, background tetap diterapkan ke elemen di template baru karena kita menggunakan kelas yang sama (misal `.nama-pengantin`, `.foto-utama`).

4. **Update Foto & Background**  
   - **Foto**: Input URL → ubah atribut `src` pada elemen `<img class="foto-utama">` di template aktif.  
   - **Background**: Ubah `style.background` pada container pratinjau sesuai input (warna atau `url(...)`).

5. **Musik Latar**  
   - Elemen `<audio>` dengan `id="bg-music"` dan sumber default.  
   - Saat dropdown berubah, ubah atribut `src` audio, lalu panggil `load()` dan `play()` jika diinginkan (atau biarkan user menekan play).  
   - Kontrol play/pause disediakan di bawah pratinjau.

6. **Update URL**  
   Fungsi `updateURL()` mengumpulkan:  
   `template=1&nama=...&tanggal=...&foto=...&bg=...&musik=...`  
   (nilai di‑encode agar aman sebagai URL).  
   Menggunakan `history.pushState(null, '', '?' + queryString)` sehingga URL berubah tapi halaman tidak reload.

---

### 🧩 Komponen Teknis yang Diperlukan

- **HTML**  
  - Form kustomisasi (radio, input teks, color picker, dropdown)  
  - Area pratinjau (container untuk template)  
  - 5 struktur template HTML (tersembunyi kecuali satu aktif)  
  - Elemen audio dan kontrol play/pause  
  - Tombol salin link

- **CSS**  
  - Layout grid/flex untuk memisahkan panel form dan pratinjau  
  - Gaya visual untuk tiap template (font, warna, tata letak)  
  - Responsif untuk mobile

- **JavaScript**  
  - Fungsi inisialisasi `initFromURL()`  
  - Fungsi `applyChanges()` untuk memperbarui pratinjau  
  - Fungsi `updateURL()`  
  - Event listener untuk semua input  
  - Logika untuk menyalin link ke clipboard (`navigator.clipboard.writeText`)

---

### 🚀 Langkah Pengembangan (untuk Pemula)

1. **Buat struktur dasar HTML** – form sederhana, satu template statis.  
2. **Tambahkan CSS** – atur tampilan form dan pratinjau.  
3. **Tulis JavaScript untuk update teks** – event listener input → ubah teks di pratinjau.  
4. **Tambahkan pilihan template** – buat 5 template, logika ganti tampilan.  
5. **Implementasikan ganti foto & background** – melalui URL.  
6. **Tambahkan musik** – dropdown dan kontrol.  
7. **Integrasikan dengan URL** – baca parameter saat load, perbarui URL saat ada perubahan.  
8. **Tambahkan tombol salin link** – uji coba.  
9. **Perbaiki tampilan (UI/UX)** – buat thumbnail template, pastikan responsif.  
10. **Upload ke GitHub** dan aktifkan GitHub Pages.

Dengan alur ini, aplikasi siap digunakan dan bisa di‑hosting secara gratis. Selamat mencoba! 🎉