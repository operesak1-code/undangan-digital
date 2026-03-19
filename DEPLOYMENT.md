# 🚀 Panduan Deploy ke GitHub Pages

## Langkah Lengkap untuk Pemula

### 1️⃣ Buat Repository GitHub

1. Login ke [GitHub](https://github.com/)
2. Klik tombol **+** di pojok kanan atas → **New repository**
3. Isi nama repository: `undangan-digital`
4. Pilih **Public**
5. **Jangan** centang "Initialize this repository with a README"
6. Klik **Create repository**

### 2️⃣ Upload File ke GitHub

#### Cara A: Upload via Web (Termudah)

1. Di halaman repository, klik **uploading an existing file**
2. Drag & drop semua file proyek:
   ```
   undangan.html
   assets/css/undangan-style.css
   assets/js/undangan-app.js
   assets/music/ (folder)
   assets/images/undangan/ (folder)
   ```
3. Tambahkan commit message: "Initial commit - Undangan Digital"
4. Klik **Commit changes**

#### Cara B: Menggunakan Git (Untuk yang sudah familiar)

```bash
# Clone repository
git clone https://github.com/username/undangan-digital.git
cd undangan-digital

# Copy semua file proyek ke folder ini

# Add, commit, dan push
git add .
git commit -m "Initial commit - Undangan Digital"
git push origin main
```

### 3️⃣ Aktifkan GitHub Pages

1. Buka repository Anda di GitHub
2. Klik tab **Settings** (⚙️)
3. Menu sebelah kiri, klik **Pages**
4. Bagian **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: Pilih `main` atau `master` → folder `/ (root)`
5. Klik **Save**

### 4️⃣ Tunggu Deployment

- GitHub akan memproses dalam 1-3 menit
- Refresh halaman Pages secara berkala
- Saat muncul banner hijau "Your site is live at...", artinya sudah siap!

### 5️⃣ Akses Aplikasi

Buka browser dan akses:
```
https://username.github.io/undangan-digital/undangan.html
```

Ganti `username` dengan username GitHub Anda.

---

## 🎯 Update Konten

Setelah deploy, Anda bisa update kapan saja:

### Via Web GitHub:
1. Buka file yang ingin diedit di repository
2. Klik ikon pensil (Edit)
3. Lakukan perubahan
4. Scroll ke bawah → **Commit changes**
5. Tunggu 1-2 menit, perubahan otomatis live

### Via Git:
```bash
# Edit file lokal
# Lalu:
git add .
git commit -m "Update template"
git push origin main
```

---

## 🔧 Troubleshooting

### ❌ Error: Page not found (404)
- Tunggu beberapa menit, deployment butuh waktu
- Pastikan file `undangan.html` ada di root folder
- Cek nama file case-sensitive (huruf besar/kecil berpengaruh)

### ❌ CSS/JS tidak load
- Pastikan path file benar
- Cek di browser console (F12) untuk error
- Gunakan path relatif: `assets/css/file.css`

### ❌ GitHub Pages tidak ada opsi
- Pastikan repository **Public**
- Untuk akun gratis, GitHub Pages tersedia dengan batasan tertentu

---

## 💡 Tips Gratis Hosting

### 1. Gunakan GitHub Pages
- ✅ Gratis selamanya
- ✅ SSL/HTTPS otomatis
- ✅ Custom domain bisa
- ⚠️ Hanya untuk situs statis

### 2. Alternatif Lain (Gratis)
- **Netlify**: https://netlify.com
- **Vercel**: https://vercel.com
- **Cloudflare Pages**: https://pages.cloudflare.com

Semua gratis untuk proyek personal!

---

## 📱 Cara Membagikan Undangan

Setelah deploy:

1. Buka `https://username.github.io/undangan-digital/undangan.html`
2. Kustomisasi undangan sesuai keinginan
3. Klik tombol **Salin Link Undangan**
4. Bagikan link via WhatsApp, Email, atau Media Sosial

Link akan berisi semua kustomisasi:
```
https://username.github.io/undangan-digital/undangan.html?template=1&namaPria=Ahmad&namaWanita=Rina&...
```

---

## 🎓 Belajar Lebih Lanjut

- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Docs - Publishing a website](https://docs.github.com/en/pages)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [JavaScript.info](https://javascript.info/) - Tutorial JavaScript

---

**Selamat! Website undangan Anda sudah online! 🎉**
