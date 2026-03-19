# 🎉 Undangan Digital - Buat Undangan Pernikahan Online Gratis

Aplikasi web untuk membuat undangan pernikahan digital secara online dengan mudah dan gratis. Semua kustomisasi dilakukan di browser tanpa backend, cocok untuk hosting di GitHub Pages.

![Undangan Digital Preview](assets/images/undangan/preview.png)

## ✨ Fitur

- 🎨 **5 Template Berbeda**: Klasik, Modern, Rustic, Glamour, dan Outdoor
- 📝 **Kustomisasi Lengkap**: Nama, tanggal, lokasi acara
- 🖼️ **Ganti Foto**: Upload foto melalui URL eksternal
- 🎨 **Background Custom**: Warna solid atau gambar dari URL
- 🎵 **Musik Latar**: Pilihan lagu instrumental untuk suasana romantis
- 👁️ **Preview Langsung**: Lihat perubahan secara real-time
- 🔗 **Bagikan via Link**: Salin link untuk membagikan undangan
- 📱 **Responsif**: Tampilan optimal di desktop dan mobile
- 🆓 **100% Gratis**: Hosting gratis dengan GitHub Pages

## 🚀 Demo

Lihat demo langsung di: [https://username.github.io/undangan-digital/undangan.html](https://username.github.io/undangan-digital/undangan.html)

## 📋 Prasyarat

- Akun GitHub (gratis)
- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet

## 🛠️ Instalasi & Deploy ke GitHub Pages

### Langkah 1: Fork/Clone Repository

**Opsi A - Fork (Rekomendasi untuk pemula):**
1. Buka repository ini di GitHub
2. Klik tombol **Fork** di pojok kanan atas
3. Repository akan tersalin ke akun GitHub Anda

**Opsi B - Upload Manual:**
1. Buat repository baru di GitHub dengan nama `undangan-digital`
2. Upload semua file proyek melalui web GitHub

### Langkah 2: Aktifkan GitHub Pages

1. Buka repository Anda di GitHub
2. Klik tab **Settings** (ikon ⚙️)
3. Scroll ke bagian **Pages** di menu sebelah kiri
4. Di bagian **Source**, pilih:
   - Branch: `main` atau `master`
   - Folder: `/ (root)`
5. Klik **Save**

![GitHub Pages Settings](https://docs.github.com/assets/cb-78348/images/help/pages/pages-settings.png)

### Langkah 3: Tunggu Deployment

- GitHub akan memproses dalam 1-3 menit
- Anda akan melihat notifikasi "Your site is live at..."
- Akses aplikasi di: `https://username.github.io/undangan-digital/undangan.html`

### Langkah 4: Update Konten (Opsional)

Untuk mengubah default atau menambahkan fitur:

1. Edit file di GitHub:
   - `undangan.html` - Struktur halaman
   - `assets/css/undangan-style.css` - Styling
   - `assets/js/undangan-app.js` - Logika aplikasi

2. Commit perubahan
3. Tunggu beberapa saat, perubahan akan otomatis live

## 📖 Cara Menggunakan

### Untuk Pembuat Undangan:

1. **Buka aplikasi** di `https://username.github.io/undangan-digital/undangan.html`
2. **Pilih template** yang disukai (klik thumbnail)
3. **Isi data undangan**:
   - Nama pengantin pria & wanita
   - Tanggal acara
   - Lokasi acara
   - URL foto utama
4. **Custom background**: Pilih warna atau URL gambar
5. **Pilih musik** (opsional)
6. **Preview langsung** - semua perubahan langsung terlihat
7. **Salin link** untuk membagikan undangan

### Untuk Tamu Undangan:

1. Buka link undangan yang diterima
2. Lihat undangan dengan kustomisasi lengkap
3. Klik tombol **Play** untuk memutar musik (jika ada)

## 📁 Struktur File

```
Undangan-Digital/
├── undangan.html              # Halaman utama aplikasi
├── assets/
│   ├── css/
│   │   ├── undangan-style.css # Custom styles untuk template
│   │   └── ...                # Library CSS lainnya
│   ├── js/
│   │   ├── undangan-app.js    # Logika aplikasi
│   │   └── ...                # Library JS lainnya
│   ├── images/
│   │   └── undangan/          # Folder untuk gambar undangan
│   └── music/
│       └── README.md          # Panduan menambahkan musik
└── README.md                  # Dokumentasi ini
```

## 🎨 Template yang Tersedia

### 1. Klasik
- Desain elegan dengan border floral
- Warna dominan pink lembut
- Cocok untuk pernikahan tradisional

### 2. Modern
- Minimalis dengan warna gelap
- Tipografi bold dan geometris
- Nuansa kontemporer

### 3. Rustic
- Tema alam dengan warna earth tone
- Dekorasi daun dan kayu
- Cocok untuk pernikahan outdoor

### 4. Glamour
- Mewah dengan aksen emas
- Efek glitter elegan
- Untuk pernikahan mewah

### 5. Outdoor
- Segar dengan nuansa hijau
- Dekorasi tanaman dan bunga
- Cocok untuk pernikahan di taman

## 🔧 Kustomisasi Lanjutan

### Menambah Template Baru

1. Tambahkan HTML template di `undangan.html`
2. Buat styling di `undangan-style.css`
3. Tambahkan thumbnail di panel kustomisasi

### Mengganti Font

Edit di `assets/css/undangan-style.css`:
```css
.couple-name {
    font-family: 'Great Vibes', cursive; /* Ganti font */
}
```

### Menambah Lagu Baru

1. Upload file MP3 ke folder `assets/music/`
2. Tambahkan option di dropdown:
```html
<option value="music/lagu-baru.mp3">Nama Lagu</option>
```

## 💡 Tips

- **Foto**: Gunakan URL dari Imgur atau Google Photos untuk hosting gambar gratis
- **Musik**: Gunakan musik bebas royalti dari YouTube Audio Library
- **Ukuran file**: Optimasi gambar agar loading cepat (max 500KB)
- **Browser**: Test di berbagai browser untuk kompatibilitas
- **Mobile**: Preview selalu terlihat bagus di mobile

## 🐛 Troubleshooting

### Gambar tidak muncul
- Pastikan URL gambar valid dan publik
- Gunakan HTTPS untuk URL gambar

### Musik tidak berputar
- Browser modern memblokir autoplay
- User harus interaksi (klik) terlebih dahulu
- Pastikan file MP3 ada di folder yang benar

### GitHub Pages tidak update
- Tunggu 2-5 menit setelah commit
- Hard refresh browser (Ctrl + F5)
- Clear cache browser

### Link tidak bisa disalin
- Pastikan menggunakan HTTPS
- Beberapa browser memblokir clipboard di HTTP

## 📚 Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan animasi
- **JavaScript (jQuery)** - Logika interaktif
- **Bootstrap 5** - Framework CSS responsif
- **Font Awesome** - Icon library
- **Animate.css** - Animasi preset

## 🤝 Kontribusi

Kontribusi sangat welcome! Cara kontribusi:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 License

Distributed under the MIT License. Lihat `LICENSE` untuk informasi lebih lanjut.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk membantu membuat undangan pernikahan digital yang mudah dan gratis.

## 🙏 Terima Kasih

Terima kasih kepada:
- Bootstrap Team
- Font Awesome
- Animate.css
- GitHub Pages
- Dan semua kontributor open source

---

**Happy Coding! 🎉**
