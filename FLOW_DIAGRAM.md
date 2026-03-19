# 🔄 Alur Aplikasi Undangan Digital

## 📊 User Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PENGGUNA MEMBUKA APLIKASI                     │
│              (https://.../undangan.html)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CEK URL PARAMETERS                            │
│  ?template=1&namaPria=Ahmad&namaWanita=Rina&...                │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────┐            ┌─────────────────┐
│ ADA PARAMETER   │            │ TIDAK ADA PARAM │
│ Load dari URL   │            │ Load Default    │
└────────┬────────┘            └────────┬────────┘
         │                               │
         └───────────────┬───────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TAMPILKAN DEFAULT TEMPLATE                    │
│  - Template 1 (Klasik) aktif                                    │
│  - Data default (Ahmad & Rina)                                  │
│  - Foto default dari Unsplash                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PENGGUNA INTERAKSI                            │
│                                                                  │
│  1️⃣  PILIH TEMPLATE                                             │
│      ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                        │
│      │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  │                        │
│      └────┘ └────┘ └────┘ └────┘ └────┘                        │
│                                                                  │
│  2️⃣  ISI DATA UNDANGAN                                          │
│      - Nama Pengantin Pria   [____________]                     │
│      - Nama Pengantin Wanita [____________]                     │
│      - Tanggal Acara         [📅____-__-__]                     │
│      - Lokasi Acara          [____________]                     │
│      - URL Foto              [____________]                     │
│                                                                  │
│  3️⃣  CUSTOM BACKGROUND                                          │
│      - Color Picker: [#______]                                  │
│      - URL Gambar: [____________]                               │
│                                                                  │
│  4️⃣  PILIH MUSIK                                                │
│      ┌──────────────────────┐                                   │
│      │ ▼ Pilih Lagu         │                                   │
│      └──────────────────────┘                                   │
│      [▶ Play] [⏸ Pause]                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EVENT LISTENER TRIGGER                        │
│  Setiap input berubah → Event 'input'/'change'                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UPDATE STATE OBJECT                           │
│  state = {                                                      │
│    template: '1',                                               │
│    namaPria: 'Ahmad',                                           │
│    namaWanita: 'Rina',                                          │
│    tanggalAcara: '2024-12-25',                                  │
│    lokasiAcara: 'Grand Ballroom',                               │
│    fotoUrl: 'https://...',                                      │
│    bgColor: '#fff5f5',                                          │
│    musikUrl: 'music/romantic-1.mp3'                             │
│  }                                                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ├──────────────────┐
                         │                  │
                         ▼                  ▼
┌─────────────────────────────────┐ ┌──────────────────────────────┐
│    UPDATE PREVIEW (Live)        │ │    UPDATE URL                │
│  - .nama-pria text → "Ahmad"    │ │  history.pushState()         │
│  - .nama-wanita text → "Rina"   │ │  ?template=1&namaPria=...    │
│  - .tanggal-acara → "25..."     │ │  URL berubah, no reload      │
│  - img.src → new URL            │ │                              │
│  - background → new color       │ │                              │
│  - audio.src → new MP3          │ │                              │
└─────────────────────────────────┘ └──────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PREVIEW LANGSUNG BERUBAH                      │
│  User melihat perubahan real-time!                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PENGGUNA PUAS                                │
│  Klik "Salin Link Undangan"                                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    COPY LINK TO CLIPBOARD                        │
│  navigator.clipboard.writeText(currentURL)                      │
│  Toast: "✓ Link berhasil disalin!"                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BAGIKAN LINK                                 │
│  Via WhatsApp / Facebook / Instagram / Email                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TAMU BUKA LINK                               │
│  https://.../undangan.html?template=1&namaPria=...              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INIT FROM URL                                │
│  - Baca URLSearchParams                                         │
│  - Decode semua parameter                                       │
│  - Apply ke state                                               │
│  - Update form inputs                                           │
│  - Update preview                                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TAMU MELIHAT UNDANGAN                         │
│  Sesuai dengan kustomisasi pembuat!                             │
│  - Template yang dipilih                                        │
│  - Nama pengantin                                               │
│  - Tanggal & lokasi                                             │
│  - Foto yang diupload                                           │
│  - Background custom                                            │
│  - Musik (jika diputar)                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND ONLY                            │
│                     (No Backend Required)                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  HTML (undangan.html)                                           │
│  ├── Form Kustomisasi                                           │
│  │   ├── Template Selector (Radio)                              │
│  │   ├── Input Teks (Nama, Tanggal, Lokasi)                     │
│  │   ├── Input URL (Foto, Background)                           │
│  │   ├── Color Picker (Background)                              │
│  │   ├── Dropdown (Musik)                                       │
│  │   └── Buttons (Copy, Preview)                                │
│  │                                                              │
│  └── Preview Area                                               │
│      ├── Template 1 (Klasik)                                    │
│      ├── Template 2 (Modern)                                    │
│      ├── Template 3 (Rustic)                                    │
│      ├── Template 4 (Glamour)                                   │
│      └── Template 5 (Outdoor)                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  CSS (undangan-style.css)                                       │
│  ├── Layout (Bootstrap 5 Grid)                                  │
│  ├── Template Styles (5 themes)                                 │
│  ├── Animations (Animate.css)                                   │
│  └── Responsive Design                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  JavaScript (undangan-app.js)                                   │
│  ├── State Management                                           │
│  │   └── state = { template, namaPria, ... }                    │
│  │                                                              │
│  ├── URL Management                                             │
│  │   ├── initFromURL() - Read params on load                    │
│  │   └── updateURL() - Push state without reload                │
│  │                                                              │
│  ├── Event Listeners                                            │
│  │   ├── Template click → switchTemplate()                      │
│  │   ├── Input change → update state → updatePreview()          │
│  │   └── Button click → copyLink() / showFullPreview()          │
│  │                                                              │
│  └── DOM Manipulation                                           │
│      └── jQuery for easy selection & update                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Browser Local Storage (Optional - Future Enhancement)          │
│  └── Save draft undangan                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📡 Data Flow

```
┌──────────────┐
│  User Input  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Event Listener (input/change/click)     │
│  - $('#nama-pria').on('input', ...)      │
│  - $('.template-option').on('click', ...)│
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Update State Object                     │
│  state.namaPria = $('#nama-pria').val()  │
└──────┬───────────────────────────────────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│  updateURL() │  │  updatePreview() │
│  - Build     │  │  - Update DOM     │
│    params    │  │  - Apply to all  │
│  - pushState │  │    templates     │
└──────────────┘  └──────────────┘
```

---

## 🎯 Key Features Implementation

### 1. Template Switching
```javascript
function switchTemplate(templateId) {
    state.template = templateId;
    $('.template-option').removeClass('active');
    $(`.template-option[data-template="${templateId}"]`).addClass('active');
    $('.template').removeClass('active');
    $(`#template-${templateId}`).addClass('active');
    updateURL();
}
```

### 2. Live Preview
```javascript
function updatePreview() {
    $('.nama-pria').text(state.namaPria);
    $('.nama-wanita').text(state.namaWanita);
    $('.tanggal-acara').text(formatDate(state.tanggalAcara));
    $('.lokasi-acara').text(state.lokasiAcara);
    $('.foto-utama').attr('src', state.fotoUrl);
    // Update background
    if (state.bgImageUrl) {
        $('#preview-wrapper').css('background', `url(${state.bgImageUrl})`);
    } else {
        $('#preview-wrapper').css('background', state.bgColor);
    }
}
```

### 3. URL State Management
```javascript
function updateURL() {
    const params = new URLSearchParams();
    params.set('template', state.template);
    params.set('namaPria', encodeURIComponent(state.namaPria));
    params.set('namaWanita', encodeURIComponent(state.namaWanita));
    // ... set other params
    
    window.history.pushState({}, '', '?' + params.toString());
}
```

### 4. Copy Link
```javascript
function copyLink() {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
        .then(() => showToast('Link berhasil disalin!'));
}
```

---

## 🚀 Deployment Flow

```
┌─────────────┐
│  Local Dev  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Upload to GH   │  git push / upload via web
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  GitHub Pages   │  Static hosting
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Build & Deploy │  1-3 minutes
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Live Site      │  https://username.github.io/...
└─────────────────┘
```

---

**Dokumentasi lengkap ada di README_UNDANGAN.md dan DEPLOYMENT.md**
