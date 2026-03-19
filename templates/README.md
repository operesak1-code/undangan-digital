# Templates & Assets - Undangan Digital

Folder ini berisi aset-aset untuk aplikasi Undangan Digital.

## Struktur Folder

```
templates/
├── music/
│   ├── README.md
│   ├── romantic-piano.mp3.placeholder
│   ├── acoustic-guitar.mp3.placeholder
│   ├── classical-violin.mp3.placeholder
│   ├── smooth-jazz.mp3.placeholder
│   └── soft-ambient.mp3.placeholder
└── README.md
```

## Music

Folder `music/` berisi file musik latar untuk undangan.

**PENTING**: File `.placeholder` hanyalah penanda. Anda perlu menambahkan file MP3 asli Anda sendiri.

Lihat `music/README.md` untuk panduan lengkap menambahkan musik.

## Menambahkan Aset Lainnya

Anda dapat menambahkan folder lain di sini untuk:
- `images/` - Gambar dekorasi tambahan
- `fonts/` - Font custom (jika diperlukan)
- `icons/` - Ikon khusus

## Update Referensi di index.html

Jika Anda menambahkan file musik baru, jangan lupa update dropdown di `index.html`:

```html
<select id="musik" class="form-control">
    <option value="templates/music/nama-file-baru.mp3">Nama Lagu</option>
</select>
```
