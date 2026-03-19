/**
 * Firebase Configuration
 * Undangan Digital - Realtime Database untuk Ucapan Tamu
 * 
 * PENTING: Ganti konfigurasi ini dengan Firebase project Anda sendiri
 * 
 * Cara mendapatkan konfigurasi:
 * 1. Buka https://console.firebase.google.com/
 * 2. Buat project baru
 * 3. Aktifkan Realtime Database
 * 4. Pergi ke Project Settings > General
 * 5. Scroll ke bawah, pilih "Add app" > Web
 * 6. Copy konfigurasi yang diberikan
 */

// Import Firebase functions dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

// ========================================
// Initialize Firebase
// ========================================
let app, db, ucapanRef;

try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    ucapanRef = ref(db, 'ucapan');
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// ========================================
// Export Functions untuk digunakan di script.js
// ========================================

/**
 * Kirim ucapan baru ke Firebase
 */
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

/**
 * Dengarkan ucapan baru dari Firebase
 */
export function dengarkanUcapan(callback) {
    if (!db) {
        console.error('Firebase not initialized');
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
 */
export function dapatkanSemuaUcapan() {
    if (!db) {
        return Promise.reject(new Error('Firebase not initialized'));
    }

    const ucapanQuery = query(ucapanRef, orderByChild('timestamp'), limitToLast(50));
    
    return new Promise((resolve, reject) => {
        // Note: onValue perlu diimport jika ingin digunakan
        console.log('Get all ucapan not implemented yet');
        resolve([]);
    });
}

// Export db untuk keperluan debugging
export { db, ucapanRef };
