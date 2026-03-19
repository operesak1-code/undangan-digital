## Gambaran Aplikasi Undangan Digital Berbasis Web (Hosting GitHub)

Aplikasi ini memungkinkan pengguna membuat undangan pernikahan atau acara secara online dengan memilih template, mengganti foto, nama, latar belakang, dan musik latar. Semua kustomisasi dilakukan di browser tanpa perlu server backend, sehingga cocok untuk di‑hosting di GitHub Pages. Data undangan disimpan di URL, sehingga pengguna bisa membagikan link hasil kreasinya.

---

### 1. Alur Planning

**Tujuan**  
Membuat aplikasi web statis yang responsif dan interaktif, dengan fitur kustomisasi instan dan pratinjau langsung.

**Fitur Utama**  
- Pilih minimal 5 template undangan (layout berbeda).  
- Ganti teks (nama pengantin, tanggal, lokasi, dll).  
- Ganti foto utama melalui URL gambar eksternal.  
- Ganti latar belakang (warna solid atau gambar dari URL).  
- Putar musik latar dari daftar lagu yang disediakan (file MP3 lokal).  
- Pratinjau langsung saat pengguna mengubah data.  
- Tombol “Salin Link” untuk membagikan undangan dengan state saat ini.

**Target Pengguna**  
Programmer pemula yang ingin belajar membuat web interaktif dan memahami cara kerja GitHub Pages.

---

### 2. Frontend

#### a. Struktur Dasar
- **index.html** – kerangka halaman (form kustomisasi, area pratinjau, elemen audio).  
- **style.css** – styling global dan masing‑masing template.  
- **script.js** – logika interaksi, membaca/memperbarui URL, mengganti konten.  
- **/templates** – folder berisi aset gambar, musik, dan CSS tambahan jika diperlukan.

#### b. Implementasi Template
Buat 5 template berbeda dengan struktur HTML yang konsisten. Misalnya setiap template memiliki elemen dengan kelas yang sama agar mudah diisi ulang:
```html
<div class="template" id="template1">
  <h2 class="nama-pengantin">Nama Pengantin</h2>
  <p class="tanggal">Tanggal Acara</p>
  <img class="foto-utama" src="default.jpg" alt="Foto">
  <!-- ... -->
</div>
```
Saat pengguna mengganti input, JavaScript akan memperbarui seluruh elemen dengan kelas terkait di template yang sedang aktif.

#### c. Menangani Kustomisasi
- **Pilih template** – gunakan radio button atau thumbnail. Saat berubah, sembunyikan semua template dan tampilkan yang dipilih.  
- **Input teks** – setiap input (nama, tanggal, lokasi) langsung mengubah isi elemen melalui event `input`.  
- **Ganti foto** – input URL gambar → ubah `src` elemen `<img>` yang sesuai. Validasi URL sederhana.  
- **Ganti background** – input warna (type="color") atau URL gambar → ubah `background` container pratinjau.  
- **Musik latar** – dropdown berisi beberapa pilihan lagu (file MP3 diletakkan di folder `/music`). Saat dipilih, ubah `src` elemen `<audio>` dan tambahkan kontrol play/pause.

#### d. State di URL
Gunakan `URLSearchParams` untuk membaca parameter saat halaman dimuat dan memperbarui URL saat ada perubahan tanpa reload.
```javascript
// Contoh parameter: ?template=1&nama=Andi%26Rina&foto=https://...&bg=red&musik=lagu1.mp3
```
Setiap kali pengguna mengubah nilai, panggil fungsi `updateURL()` yang menyusun parameter baru dan mengganti `window.location.search`. Agar tidak reload, gunakan `history.pushState()`.

#### e. Pratinjau Langsung
Pasang event listener pada setiap elemen form. Begitu ada perubahan, fungsi `applyChanges()` akan membaca nilai form dan menulisnya ke elemen pratinjau.

---

### 3. Backend

**Tidak ada backend server** – seluruh logika berjalan di browser.  
- Data tidak disimpan di database; undangan dibagikan melalui link yang mengandung semua parameter.  
- Foto dan musik berasal dari URL eksternal atau file lokal dalam repo.  
- Karena GitHub Pages hanya menyajikan file statis, pendekatan ini paling sederhana untuk pemula.

---

### 4. UI/UX Menarik

- **Desain responsif** – gunakan CSS Grid/Flexbox agar pratinjau dan form tertata rapi di desktop maupun mobile.  
- **Tampilan template** – berikan cuplikan kecil (thumbnail) agar pengguna bisa membayangkan hasilnya.  
- **Interaksi mulus** – perubahan langsung terlihat tanpa tombol “Simpan”.  
- **Panduan pengguna** – sertakan tooltip atau placeholder yang jelas.  
- **Minimal 5 template** – misal:  
  1. Klasik (bingkai floral, font elegan)  
  2. Modern (minimalis, tipografi tebal)  
  3. Rustic (warna earth tone, latar kayu)  
  4. Glamour (warna emas, glitter)  
  5. Outdoor (tema alam, hijau)  
- Masing‑masing template didefinisikan melalui CSS berbeda (misal class `.template1`, `.template2`).

---

### 5. Hosting di GitHub

1. **Buat repository** di GitHub (misal `undangan-digital`).  
2. **Upload semua file** proyek (HTML, CSS, JS, aset gambar/musik).  
3. **Aktifkan GitHub Pages**:  
   - Masuk ke *Settings* → *Pages*.  
   - Pilih branch `main` dan folder `/root`, lalu *Save*.  
4. **Akses aplikasi** melalui `https://username.github.io/undangan-digital`.  
5. Setiap perubahan di repo akan otomatis diterapkan setelah beberapa saat.

**Catatan untuk pemula**:  
- Gunakan Git atau upload manual via web GitHub.  
- Pastikan nama file dan path sudah benar (case‑sensitive).  
- File musik sebaiknya berukuran kecil agar loading cepat.

---

### 6. Tips untuk Programmer Pemula

- Mulailah dengan satu template sederhana, lalu tambahkan fitur satu per satu.  
- Gunakan `console.log()` untuk memeriksa nilai variabel saat debugging.  
- Manfaatkan CSS framework seperti Tailwind atau Bootstrap jika ingin cepat, namun vanilla CSS lebih disarankan untuk belajar.  
- Uji coba di berbagai perangkat (browser, ukuran layar) setelah selesai.  
- Simpan kode di GitHub sejak awal agar terbiasa dengan version control.

Dengan pendekatan ini, kamu bisa membuat aplikasi undangan digital yang fungsional dan bisa langsung dibagikan, hanya dengan modal HTML, CSS, dan JavaScript. Selamat mencoba!