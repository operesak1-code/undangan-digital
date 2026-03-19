/**
 * Firebase Configuration
 * Undangan Digital - Realtime Database untuk Ucapan Tamu
 * 
 * ============================================
 * PANDUAN SETUP FIREBASE (WAJIB DIBACA!)
 * ============================================
 * 
 * Ikuti langkah-langkah di bawah ini untuk mengaktifkan fitur ucapan tamu:
 * 
 * 1. BUKA FIREBASE CONSOLE
 *    → https://console.firebase.google.com/
 * 
 * 2. BUAT PROJECT BARU
 *    → Klik "Add project" atau "Create a project"
 *    → Masukkan nama project (contoh: "undangan-digital")
 *    → Klik "Create project"
 * 
 * 3. DAFTARKAN WEB APP
 *    → Klik ikon Web (</>) atau "Add app"
 *    → Masukkan nama app (contoh: "Undangan Digital")
 *    → Klik "Register app"
 * 
 * 4. COPY FIREBASE CONFIG
 *    → Copy semua nilai konfigurasi yang ditampilkan
 *    → Paste ke bagian firebaseConfig di bawah ini
 *    → GANTI SEMUA NILAI DENGAN MILIK ANDA!
 * 
 * 5. AKTIFKAN REALTIME DATABASE
 *    → Di sidebar: Build → Realtime Database
 *    → Klik "Create database"
 *    → Pilih lokasi (Singapore/Jakarta)
 *    → Pilih "Start in test mode"
 *    → Klik "Enable"
 * 
 * 6. COPY DATABASE URL
 *    → URL akan terlihat seperti: https://your-project.firebaseio.com
 *    → Copy URL ini untuk databaseURL
 * 
 * 7. TEST KONEKSI
 *    → Buka index.html di browser
 *    → Buka Console (F12)
 *    → Harus muncul: "✅ Firebase initialized successfully"
 * 
 * ============================================
 * DOKUMENTASI LENGKAP: FIREBASE_SETUP.md
 * ============================================
 */

// Import Firebase functions dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// ========================================
// ⚠️ KONFIGURASI FIREBASE - GANTI DENGAN MILIK ANDA! ⚠️
// ========================================
// 
// CARA MENDAPATKAN NILAI-NILAI INI:
// 1. Buka Firebase Console: https://console.firebase.google.com/
// 2. Pilih project Anda
// 3. Klik ikon Web (</>) untuk melihat konfigurasi
// 4. Copy semua nilai dan paste di sini
// 
// CONTOH (GANTI DENGAN NILAI ANDA SENDIRI):
const firebaseConfig = {
    // apiKey: Copy dari Firebase Console
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-GANTI_DENGAN_API_KEY_ANDA",
    
    // authDomain: Biasanya nama-project.firebaseapp.com
    authDomain: "your-project.firebaseapp.com-GANTI_DENGAN_AUTH_DOMAIN_ANDA",
    
    // databaseURL: URL Realtime Database Anda
    databaseURL: "https://your-project-default-rtdb.firebaseio.com-GANTI_DENGAN_DATABASE_URL_ANDA",
    
    // projectId: Nama project Firebase Anda
    projectId: "your-project-GANTI_DENGAN_PROJECT_ID_ANDA",
    
    // storageBucket: Biasanya nama-project.appspot.com
    storageBucket: "your-project.appspot.com-GANTI_DENGAN_STORAGE_BUCKET_ANDA",
    
    // messagingSenderId: Angka ID pengirim
    messagingSenderId: "123456789012-GANTI_DENGAN_MESSAGING_SENDER_ID_ANDA",
    
    // appId: ID aplikasi Firebase Anda
    appId: "1:123456789012:web:abcdef1234567890-GANTI_DENGAN_APP_ID_ANDA"
};

// ========================================
// JANGAN EDIT BAGIAN DI BAWAH INI
// ========================================

// Initialize Firebase
let app, db, ucapanRef;

try {
    // Cek apakah konfigurasi sudah diubah
    const isDefaultConfig = firebaseConfig.apiKey.includes('GANTI_DENGAN');
    
    if (isDefaultConfig) {
        console.warn('⚠️ PERINGATAN: Firebase config belum dikonfigurasi!');
        console.warn('📖 Silakan baca FIREBASE_SETUP.md untuk panduan setup lengkap.');
        console.warn('🔗 Atau buka: https://console.firebase.google.com/');
    }
    
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    ucapanRef = ref(db, 'ucapan');
    
    if (!isDefaultConfig) {
        console.log('✅ Firebase initialized successfully');
        console.log('📍 Database URL:', firebaseConfig.databaseURL);
        console.log('📦 Project ID:', firebaseConfig.projectId);
    }
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.error('💡 Pastikan konfigurasi Firebase sudah benar');
    console.error('📖 Baca FIREBASE_SETUP.md untuk bantuan');
}

// ========================================
// Export Functions untuk digunakan di script.js
// ========================================

/**
 * Kirim ucapan baru ke Firebase
 * @param {string} nama - Nama pengirim
 * @param {string} kehadiran - Status kehadiran (Hadir/Tidak Hadir)
 * @param {string} alamat - Alamat (opsional)
 * @param {string} ucapan - Ucapan dan doa
 * @returns {Promise} Promise yang akan resolve dengan reference data
 */
export function kirimUcapan(nama, kehadiran, alamat, ucapan) {
    if (!db) {
        console.error('❌ Firebase not initialized');
        console.error('📖 Silakan setup Firebase terlebih dahulu (baca FIREBASE_SETUP.md)');
        return Promise.reject(new Error('Firebase not initialized'));
    }

    // Validasi input
    if (!nama || !ucapan) {
        return Promise.reject(new Error('Nama dan ucapan harus diisi'));
    }

    return push(ucapanRef, {
        nama: nama,
        kehadiran: kehadiran,
        alamat: alamat || '',
        ucapan: ucapan,
        timestamp: Date.now()
    });
}

/**
 * Dengarkan ucapan baru dari Firebase (realtime)
 * @param {function} callback - Function yang dipanggil saat ada ucapan baru
 */
export function dengarkanUcapan(callback) {
    if (!db) {
        console.error('❌ Firebase not initialized');
        console.error('📖 Silakan setup Firebase terlebih dahulu (baca FIREBASE_SETUP.md)');
        return;
    }

    // Query untuk mengambil 50 ucapan terakhir
    const ucapanQuery = query(ucapanRef, orderByChild('timestamp'), limitToLast(50));
    
    onChildAdded(ucapanQuery, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

/**
 * Dapatkan semua ucapan (sekali)
 * Note: Fungsi ini perlu implementasi lebih lanjut
 * @returns {Promise} Promise dengan array ucapan
 */
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

// Export db untuk keperluan debugging
export { db, ucapanRef };

// ========================================
// DEBUG INFO (HAPUS SETELAH PRODUCTION)
// ========================================
if (typeof window !== 'undefined') {
    window.firebaseDebug = {
        checkConnection: () => {
            if (db) {
                console.log('✅ Firebase connected');
                console.log('📊 Database:', db);
                console.log('📍 Reference:', ucapanRef);
            } else {
                console.error('❌ Firebase not connected');
                console.error('📖 Baca FIREBASE_SETUP.md untuk setup');
            }
        },
        config: firebaseConfig
    };
    
    console.log('💡 Ketik "firebaseDebug.checkConnection()" di console untuk test koneksi');
}
