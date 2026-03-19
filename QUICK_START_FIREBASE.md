# 🚀 Quick Start - Setup Firebase dalam 5 Menit

## ⚡ Langkah Cepat

### 1️⃣ Buka Firebase Console (30 detik)
```
https://console.firebase.google.com/
```
→ Login dengan akun Google

### 2️⃣ Buat Project Baru (1 menit)
- Klik **"Add project"**
- Nama: `undangan-digital`
- Klik **"Create project"**
- Tunggu selesai → Klik **"Continue"**

### 3️⃣ Daftarkan Web App (1 menit)
- Klik ikon **Web** `</>`
- App nickname: `Undangan Digital`
- Klik **"Register app"**
- **COPY** konfigurasi yang muncul!

### 4️⃣ Update Config (1 menit)
Buka file `firebase-config.js`, ganti bagian ini:

```javascript
const firebaseConfig = {
    apiKey: "PASTE_API_KEY_DISINI",
    authDomain: "PASTE_AUTH_DOMAIN_DISINI",
    databaseURL: "PASTE_DATABASE_URL_DISINI",
    projectId: "PASTE_PROJECT_ID_DISINI",
    storageBucket: "PASTE_STORAGE_BUCKET_DISINI",
    messagingSenderId: "PASTE_MESSAGING_SENDER_ID_DISINI",
    appId: "PASTE_APP_ID_DISINI"
};
```

### 5️⃣ Aktifkan Database (1 menit)
- Sidebar: **Build** → **Realtime Database**
- Klik **"Create database"**
- Pilih lokasi: **Singapore**
- Pilih: **"Start in test mode"**
- Klik **"Enable"**

### 6️⃣ Test (30 detik)
Buka `index.html` di browser, tekan **F12**, harus muncul:
```
✅ Firebase initialized successfully
```

---

## 📋 Checklist Setup

- [ ] Firebase project dibuat
- [ ] Web app registered
- [ ] Firebase config di-copy
- [ ] File `firebase-config.js` di-update
- [ ] Realtime Database diaktifkan
- [ ] Security rules mode: test
- [ ] Test koneksi berhasil

---

## 🔗 Link Penting

| Resource | URL |
|----------|-----|
| Firebase Console | https://console.firebase.google.com/ |
| Panduan Lengkap | `FIREBASE_SETUP.md` |
| Dokumentasi | https://firebase.google.com/docs |

---

## 🆘 Troubleshooting Cepat

| Error | Solusi |
|-------|--------|
| "Firebase not initialized" | Cek `firebase-config.js` sudah diisi dengan benar |
| "Permission denied" | Set security rules ke test mode |
| Tidak ada pesan di console | Refresh halaman, hard reload (Ctrl+Shift+R) |

---

## ✅ Setelah Setup Berhasil

1. **Test kirim ucapan** di `index.html`
2. **Cek Firebase Console** → Realtime Database → Data masuk
3. **Commit & Push** perubahan ke GitHub
4. **Deploy** ke GitHub Pages

---

**Done! Firebase Anda siap! 🎉**
