# 🔥 Panduan Setup Firebase untuk Undangan Digital

## Langkah 1: Buat Firebase Project

### 1.1 Buka Firebase Console
1. Buka [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Login dengan akun Google Anda

### 1.2 Buat Project Baru
1. Klik tombol **"Add project"** atau **"Create a project"**
2. Masukkan nama project, contoh: `undangan-digital`
3. Klik **Continue**

### 1.3 Google Analytics (Opsional)
- Anda bisa enable atau disable Google Analytics
- Untuk sederhana, **disable** saja
- Klik **Create project**

### 1.4 Tunggu Proses Setup
- Firebase akan membuat project Anda (tunggu beberapa detik)
- Setelah selesai, klik **Continue**

---

## Langkah 2: Daftarkan Web App

### 2.1 Tambahkan Web App ke Firebase
1. Di Firebase Console dashboard, klik ikon **Web** (`</>`)
2. Atau klik tombol **"Add app"** → pilih **Web**

### 2.2 Register App
1. **App nickname**: Masukkan nama, contoh: `Undangan Digital`
2. **Firebase Hosting**: (Opsional, bisa di-skip untuk sekarang)
3. Centang **"Also set up Firebase Hosting for this app"** jika ingin
4. Klik **Register app**

### 2.3 Copy Konfigurasi Firebase
Setelah register, Anda akan melihat konfigurasi seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**PENTING**: Copy semua nilai konfigurasi ini!

---

## Langkah 3: Aktifkan Realtime Database

### 3.1 Buat Realtime Database
1. Di sidebar kiri, klik **Build** → **Realtime Database**
2. Klik **Create database**

### 3.2 Pilih Lokasi Database
- Pilih lokasi server terdekat, contoh: **Singapore** atau **Jakarta** (jika ada)
- Klik **Next**

### 3.3 Setup Security Rules (PENTING!)

#### Mode Test (Untuk Development)
Pilih **Start in test mode** untuk memudahkan testing:

```json
{
  "rules": {
    "ucapan": {
      ".read": true,
      ".write": true
    }
  }
}
```

**Catatan**: Mode ini membuat database bisa dibaca/tulis oleh siapa saja. 
Untuk production, gunakan rules yang lebih aman (lihat bagian Security Rules di bawah).

### 3.4 Database URL
Setelah database dibuat, Anda akan melihat URL seperti:
```
https://your-project-default-rtdb.firebaseio.com/
```

**Copy URL ini** untuk konfigurasi `databaseURL`.

---

## Langkah 4: Update File firebase-config.js

### 4.1 Buka File
Buka file `firebase-config.js` di text editor Anda.

### 4.2 Replace Konfigurasi
Ganti bagian `firebaseConfig` dengan konfigurasi yang Anda copy dari Firebase Console:

```javascript
// ========================================
// KONFIGURASI FIREBASE - GANTI DENGAN MILIK ANDA!
// ========================================
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

### 4.3 Contoh Lengkap

Berikut contoh file `firebase-config.js` yang sudah diupdate:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// ========================================
// KONFIGURASI FIREBASE - GANTI DENGAN MILIK ANDA!
// ========================================
const firebaseConfig = {
    apiKey: "AIzaSyABC123XYZ456DEF789GHI012JKL345MNO",
    authDomain: "undangan-digital-12345.firebaseapp.com",
    databaseURL: "https://undangan-digital-12345-default-rtdb.firebaseio.com",
    projectId: "undangan-digital-12345",
    storageBucket: "undangan-digital-12345.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
let app, db, ucapanRef;

try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    ucapanRef = ref(db, 'ucapan');
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Export Functions
export function kirimUcapan(nama, kehadiran, alamat, ucapan) {
    if (!db) {
        console.error('Firebase not initialized');
        return Promise.reject(new Error('Firebase not initialized'));
    }

    return push(ucapanRef, {
        nama: nama,
        kehadiran: kehadiran,
        alamat: alamat || '',
        ucapan: ucapan,
        timestamp: Date.now()
    });
}

export function dengarkanUcapan(callback) {
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    const ucapanQuery = query(ucapanRef, orderByChild('timestamp'), limitToLast(50));
    
    onChildAdded(ucapanQuery, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export function dapatkanSemuaUcapan() {
    if (!db) {
        return Promise.reject(new Error('Firebase not initialized'));
    }

    const ucapanQuery = query(ucapanRef, orderByChild('timestamp'), limitToLast(50));
    
    return new Promise((resolve, reject) => {
        console.log('Get all ucapan not implemented yet');
        resolve([]);
    });
}

export { db, ucapanRef };
```

---

## Langkah 5: Test Firebase Connection

### 5.1 Buka Console Browser
1. Buka `index.html` di browser (Chrome/Firefox)
2. Klik kanan → **Inspect** → tab **Console**
3. Atau tekan `F12`

### 5.2 Cek Pesan Console
Anda harus melihat pesan:
```
✅ Firebase initialized successfully
🎉 Undangan Digital initialized
🌸 Features: Falling flowers, Firebase realtime, Lightbox gallery
✅ Firebase modules loaded
```

Jika ada error, periksa kembali konfigurasi Anda.

### 5.3 Test Kirim Ucapan
1. Scroll ke section "Kirim Ucapan & Doa"
2. Isi form (Nama, Kehadiran, Ucapan)
3. Klik "Kirim Ucapan"
4. Jika berhasil, akan muncul toast notification: "Ucapan berhasil dikirim!"
5. Ucapan akan muncul di list secara realtime

---

## Langkah 6: Security Rules (Untuk Production)

Setelah testing selesai, **PENTING** untuk mengupdate security rules agar lebih aman.

### 6.1 Buka Realtime Database Rules
1. Di Firebase Console → **Build** → **Realtime Database**
2. Klik tab **Rules**

### 6.2 Update Rules

#### Option 1: Basic Validation
```json
{
  "rules": {
    "ucapan": {
      ".read": true,
      ".write": "auth == null",
      "$ucapanId": {
        ".validate": "
          newData.hasChildren(['nama', 'ucapan', 'timestamp']) &&
          newData.child('nama').isString() &&
          newData.child('nama').val().length > 0 &&
          newData.child('nama').val().length < 100 &&
          newData.child('ucapan').isString() &&
          newData.child('ucapan').val().length > 0 &&
          newData.child('ucapan').val().length < 500 &&
          newData.child('timestamp').isNumber()
        "
      }
    }
  }
}
```

#### Option 2: Rate Limiting (Advanced)
```json
{
  "rules": {
    "ucapan": {
      ".read": true,
      ".write": "
        auth == null &&
        (!data.exists() || 
         (newData.child('timestamp').val() > (data.child('timestamp').val() || 0) + 10000))
      ",
      "$ucapanId": {
        ".validate": "
          newData.hasChildren(['nama', 'ucapan', 'timestamp']) &&
          newData.child('nama').isString() &&
          newData.child('nama').val().length > 0 &&
          newData.child('nama').val().length < 100 &&
          newData.child('ucapan').isString() &&
          newData.child('ucapan').val().length > 0 &&
          newData.child('ucapan').val().length < 500 &&
          newData.child('timestamp').isNumber()
        "
      }
    }
  }
}
```

### 6.3 Publish Rules
Klik **Publish** untuk menerapkan rules.

---

## Langkah 7: Monitoring & Debugging

### 7.1 Firebase Console - Database
- Di **Realtime Database**, Anda bisa melihat semua data ucapan yang masuk secara realtime
- Data tersimpan dalam format JSON tree

### 7.2 Firebase Console - Analytics
- Jika enable Google Analytics, Anda bisa melihat traffic dan user behavior
- Berguna untuk mengetahui berapa banyak tamu yang membuka undangan

### 7.3 Firebase Console - Performance
- Monitor performa aplikasi Anda
- Lihat loading time dan response time

---

## Troubleshooting

### ❌ Error: "Firebase not initialized"
**Solusi**: 
- Periksa kembali konfigurasi `firebaseConfig`
- Pastikan semua nilai sudah benar
- Cek console browser untuk error detail

### ❌ Error: "Permission denied"
**Solusi**:
- Periksa security rules di Realtime Database
- Untuk testing, gunakan rules dengan `.read: true, .write: true`

### ❌ Error: "Network error"
**Solusi**:
- Pastikan koneksi internet aktif
- Cek firewall/antivirus tidak memblokir Firebase

### ❌ Ucapan tidak muncul
**Solusi**:
- Buka console browser, cek ada error atau tidak
- Periksa Firebase Console → Realtime Database, apakah data masuk
- Refresh halaman

---

## Tips Tambahan

### 1. Backup Data
Secara berkala, export data dari Firebase:
1. Di Realtime Database, klik menu (⋮)
2. Pilih **Export JSON**
3. Simpan file backup

### 2. Monitoring Quota
Firebase gratis memiliki quota:
- 1 GB storage
- 10 GB/month transfer
- 100 concurrent connections

Monitor usage di **Project Settings** → **Usage and billing**

### 3. Cleanup Data
Hapus ucapan spam atau test data secara berkala:
1. Di Realtime Database, pilih node `ucapan`
2. Klik icon trash 🗑️ untuk hapus

---

## Kontak & Support

Jika ada masalah:
1. Baca dokumentasi Firebase: https://firebase.google.com/docs
2. Firebase Community: https://stackoverflow.com/questions/tagged/firebase
3. Firebase Support: https://firebase.google.com/support

---

**Selamat! Firebase Anda sudah siap digunakan! 🎉**
