/**
 * Firebase Configuration
 * Undangan Digital - Realtime Database untuk Ucapan Tamu
 * 
 * Project: undangan-digital-f520a
 * Region: asia-southeast1 (Singapore)
 * 
 * ============================================
 * PANDUAN SETUP FIREBASE
 * ============================================
 * 1. Buka https://console.firebase.google.com/
 * 2. Buat project baru
 * 3. Daftarkan Web App (klik ikon </>)
 * 4. Copy konfigurasi dan paste di sini
 * 5. Aktifkan Realtime Database (Build → Realtime Database)
 * 6. Set security rules ke "test mode"
 * 
 * Dokumentasi lengkap: FIREBASE_SETUP.md
 */

// Import Firebase functions dari CDN (JANGAN UBAH!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// ========================================
// ✅ KONFIGURASI FIREBASE
// ========================================
const firebaseConfig = {
    apiKey: "AIzaSyAGbhVA7AQpGpF4iGxAcSNCcnhsyeCgX3I",
    authDomain: "undangan-digital-f520a.firebaseapp.com",
    databaseURL: "https://undangan-digital-f520a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "undangan-digital-f520a",
    storageBucket: "undangan-digital-f520a.firebasestorage.app",
    messagingSenderId: "391412998171",
    appId: "1:391412998171:web:72fa9cfc6431b3bbeb18be"
};

// ========================================
// Initialize Firebase
// ========================================
let app, db, ucapanRef;

try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    ucapanRef = ref(db, 'ucapan');
    console.log('✅ Firebase initialized successfully');
    console.log('📍 Database:', firebaseConfig.databaseURL);
    console.log('📦 Project:', firebaseConfig.projectId);
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// ========================================
// Export Functions
// ========================================

/**
 * Kirim ucapan baru ke Firebase
 */
export function kirimUcapan(nama, kehadiran, alamat, ucapan) {
    if (!db) {
        console.error('❌ Firebase not initialized');
        return Promise.reject(new Error('Firebase not initialized'));
    }

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
 */
export function dengarkanUcapan(callback) {
    if (!db) {
        console.error('❌ Firebase not initialized');
        return;
    }

    const ucapanQuery = query(ucapanRef, orderByChild('timestamp'), limitToLast(50));
    
    onChildAdded(ucapanQuery, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

/**
 * Dapatkan semua ucapan (sekali)
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

// Export database reference
export { db, ucapanRef };

// ========================================
// Debug Utility (untuk testing)
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
            }
        },
        config: firebaseConfig
    };
    console.log('💡 Ketik "firebaseDebug.checkConnection()" di console untuk test');
}
