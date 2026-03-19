# Undangan Digital

Aplikasi web untuk membuat undangan pernikahan digital secara online dengan mudah dan gratis. Dibuat dengan HTML, CSS, dan JavaScript murni tanpa framework.

🌐 **[Demo Live](https://operesak1-code.github.io/undangan-digital/)**

---

## ✨ Fitur Utama

- **5 Template Undangan** - Klasik, Modern, Rustic, Glamour, Outdoor
- **Kustomisasi Lengkap** - Nama, tanggal, lokasi, foto, background, musik
- **Preview Langsung** - Perubahan langsung terlihat tanpa reload
- **URL State Management** - Data tersimpan di URL, mudah dibagikan
- **Musik Latar** - Support MP3 dengan kontrol play/pause
- **Responsive Design** - Tampilan optimal di desktop dan mobile
- **Tanpa Backend** - 100% frontend, cocok untuk GitHub Pages
- **Copy Link** - Bagikan undangan dengan satu klik

---

## 📋 Struktur File

```
undangan-digital/
├── index.html          # Halaman utama aplikasi
├── style.css           # Styling untuk 5 template
├── script.js           # Logika aplikasi & URL management
├── templates/
│   ├── README.md
│   └── music/
│       ├── README.md
│       ├── romantic-piano.mp3.placeholder
│       ├── acoustic-guitar.mp3.placeholder
│       ├── classical-violin.mp3.placeholder
│       ├── smooth-jazz.mp3.placeholder
│       └── soft-ambient.mp3.placeholder
├── app_summary.md      # Ringkasan aplikasi
├── app_summaryplan.md  # Planning & alur sistem
└── README.md           # Dokumentasi ini
```

---

## 🚀 Quick Start

### 1. Clone atau Download

```bash
git clone https://github.com/operesak1-code/undangan-digital.git
cd undangan-digital
```

### 2. Buka di Browser

Cukup buka file `index.html` di browser modern (Chrome, Firefox, Edge).

### 3. Mulai Kustomisasi

- Pilih template favoritmu
- Isi data undangan (nama, tanggal, lokasi)
- Upload foto via URL
- Pilih background dan musik
- Klik "Salin Link" untuk membagikan

---

## 🎨 Template yang Tersedia

### 1. Klasik
- Warna: Pink lembut dengan border floral
- Font: Great Vibes (elegant script)
- Cocok untuk: Undangan tradisional Indonesia

### 2. Modern
- Warna: Dark blue gradient
- Font: Montserrat (minimalist sans-serif)
- Cocok untuk: Pernikahan modern & minimalist

### 3. Rustic
- Warna: Earth tone (coklat & hijau)
- Font: Playfair Display (serif classic)
- Cocok untuk: Pernikahan tema alam & vintage

### 4. Glamour
- Warna: Black & gold
- Font: Cinzel (luxury serif)
- Cocok untuk: Pernikahan mewah & elegan

### 5. Outdoor
- Warna: Green nature
- Font: Dancing Script (casual script)
- Cocok untuk: Pernikahan outdoor & garden

---

## 🎵 Cara Menambahkan Musik

1. Siapkan file MP3 (ukuran < 2MB untuk loading cepat)
2. Upload ke folder `templates/music/`
3. Update dropdown musik di `index.html`:

```html
<select id="musik" class="form-control">
    <option value="templates/music/nama-file.mp3">Nama Lagu</option>
</select>
```

### Sumber Musik Gratis

- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Bensound](https://www.bensound.com/)
- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/music/)

---

## 💡 Cara Menggunakan

### Kustomisasi Undangan

1. **Pilih Template** - Klik salah satu dari 5 thumbnail template
2. **Isi Data** - Nama pengantin, tanggal, lokasi acara
3. **Upload Foto** - Masukkan URL foto (dari Unsplash, Imgur, dll)
4. **Background** - Pilih warna atau URL gambar background
5. **Musik** - Pilih lagu dari dropdown

### Membagikan Undangan

Setelah selesai kustomisasi:

1. Klik tombol **"Salin Link Undangan"**
2. URL yang sudah berisi semua data akan tersalin
3. Bagikan link via WhatsApp, email, atau media sosial

### Tamu Membuka Link

Tamu yang membuka link akan melihat:
- Template yang Anda pilih
- Data undangan yang sudah diisi
- Foto dan background yang disesuaikan
- Musik latar (jika dipilih)

---

## 🔧 Development

### Teknologi

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan CSS Grid & Flexbox
- **JavaScript (Vanilla)** - Logika tanpa framework
- **Google Fonts** - 5 font berbeda untuk template
- **Font Awesome** - Icon library

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Local Development

Tidak perlu server lokal. Cukup buka `index.html` di browser.

Jika ingin menggunakan live server (opsional):

```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js (npx)
npx http-server -p 8000
```

---

## 📤 Deploy ke GitHub Pages

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Aktifkan GitHub Pages**
   - Buka repository di GitHub
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `main`, Folder: `/root`
   - Save

3. **Akses Aplikasi**
   ```
   https://username.github.io/undangan-digital/
   ```

---

## 📝 Dokumentasi Lengkap

- [App Summary](app_summary.md) - Gambaran umum aplikasi
- [App Summary Plan](app_summaryplan.md) - Alur pengguna & sistem
- [Flow Diagram](FLOW_DIAGRAM.md) - Diagram alur aplikasi

---

## 🤝 Kontribusi

Kontribusi sangat welcome! Cara kontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur/baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/baru`)
5. Buat Pull Request

---

## 📄 License

Proyek ini open source dan tersedia di bawah license GPL v3.

---

## 👨‍💻 Creator

Dibuat dengan ❤️ oleh **operesak1-code**

---

## 🙏 Terima Kasih

Terima kasih kepada:
- Google Fonts untuk font gratis
- Font Awesome untuk icon library
- Unsplash untuk foto placeholder
- Semua kontributor open source

---

**Selamat membuat undangan digital! 🎉**
