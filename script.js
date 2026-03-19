/**
 * Undangan Digital - Main Application Script
 * Mengelola kustomisasi undangan, URL state, dan preview langsung
 * Sesuai spesifikasi: frontend-only, state di URL, 5 template
 */

(function() {
    'use strict';

    // ========================================
    // State Management
    // ========================================
    const state = {
        template: '1',
        namaPengantin: 'Ahmad & Rina',
        tanggal: '2024-12-25',
        lokasi: 'Grand Ballroom Hotel',
        fotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        bgColor: '#fff5f5',
        bgImageUrl: '',
        musikUrl: ''
    };

    // ========================================
    // DOM Elements
    // ========================================
    const elements = {
        // Template selector
        templateOptions: document.querySelectorAll('.template-option'),
        templates: document.querySelectorAll('.template'),
        templateRadios: document.querySelectorAll('input[name="template"]'),

        // Form inputs
        namaPengantinInput: document.getElementById('nama-pengantin'),
        tanggalInput: document.getElementById('tanggal'),
        lokasiInput: document.getElementById('lokasi'),
        fotoInput: document.getElementById('foto'),
        bgColorInput: document.getElementById('bg-color'),
        bgImageInput: document.getElementById('bg-image'),
        musikSelect: document.getElementById('musik'),

        // Preview elements
        previewWrapper: document.getElementById('preview-wrapper'),

        // Buttons
        btnPlay: document.getElementById('btn-play'),
        btnPause: document.getElementById('btn-pause'),
        btnCopyLink: document.getElementById('btn-copy-link'),
        btnPreview: document.getElementById('btn-preview'),

        // Audio
        bgMusic: document.getElementById('bg-music'),

        // Modal
        modal: document.getElementById('full-preview-modal'),
        modalClose: document.querySelector('.modal-close'),
        modalBody: document.getElementById('modal-preview-body'),

        // Toast
        toast: document.getElementById('toast')
    };

    // ========================================
    // Utility Functions
    // ========================================

    /**
     * Format tanggal dari YYYY-MM-DD ke DD MMMM YYYY
     */
    function formatDate(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    /**
     * Encode nilai untuk URL
     */
    function encodeValue(value) {
        return encodeURIComponent(value || '');
    }

    /**
     * Decode nilai dari URL
     */
    function decodeValue(value) {
        try {
            return decodeURIComponent(value || '');
        } catch (e) {
            return value || '';
        }
    }

    /**
     * Show toast notification
     */
    function showToast(message) {
        elements.toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        elements.toast.classList.add('show');
        
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }

    // ========================================
    // Core Functions
    // ========================================

    /**
     * Update preview berdasarkan state
     */
    function updatePreview() {
        // Update nama pengantin di semua template
        document.querySelectorAll('.nama-pengantin').forEach(el => {
            el.textContent = state.namaPengantin;
        });

        // Update tanggal (format yang sudah diformat)
        const formattedDate = formatDate(state.tanggal);
        document.querySelectorAll('.tanggal').forEach(el => {
            el.textContent = formattedDate;
        });

        // Update lokasi
        document.querySelectorAll('.lokasi').forEach(el => {
            el.textContent = state.lokasi;
        });

        // Update foto di semua template
        document.querySelectorAll('.foto-utama').forEach(el => {
            el.src = state.fotoUrl;
            el.alt = 'Foto Pengantin';
        });

        // Update background preview wrapper
        if (state.bgImageUrl) {
            elements.previewWrapper.style.background = `url(${state.bgImageUrl}) center/cover`;
        } else {
            elements.previewWrapper.style.background = state.bgColor;
        }

        // Update musik
        if (state.musikUrl) {
            const source = elements.bgMusic.querySelector('source');
            if (source) {
                source.src = state.musikUrl;
                elements.bgMusic.load();
            }
        }
    }

    /**
     * Ganti template aktif
     */
    function switchTemplate(templateId) {
        state.template = templateId;

        // Update radio button
        elements.templateRadios.forEach(radio => {
            radio.checked = radio.value === templateId;
        });

        // Update UI template selector
        elements.templateOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.template === templateId) {
                option.classList.add('active');
            }
        });

        // Update template yang ditampilkan
        elements.templates.forEach(template => {
            template.classList.remove('active');
            if (template.id === `template-${templateId}`) {
                template.classList.add('active');
            }
        });

        // Update URL tanpa reload
        updateURL();
    }

    /**
     * Update URL dengan state saat ini
     */
    function updateURL() {
        const params = new URLSearchParams();

        params.set('template', state.template);
        params.set('nama', encodeValue(state.namaPengantin));
        params.set('tanggal', state.tanggal);
        params.set('lokasi', encodeValue(state.lokasi));
        params.set('foto', encodeValue(state.fotoUrl));
        params.set('bgColor', state.bgColor.replace('#', ''));

        if (state.bgImageUrl) {
            params.set('bgImage', encodeValue(state.bgImageUrl));
        }

        if (state.musikUrl) {
            params.set('musik', encodeValue(state.musikUrl));
        }

        const queryString = params.toString();
        const newURL = `${window.location.pathname}?${queryString}`;

        // Update URL tanpa reload menggunakan history.pushState
        window.history.pushState({}, '', newURL);
    }

    /**
     * Inisialisasi state dari URL
     */
    function initFromURL() {
        const params = new URLSearchParams(window.location.search);

        if (params.toString()) {
            // Ada parameter di URL, load state
            state.template = params.get('template') || '1';
            state.namaPengantin = decodeValue(params.get('nama')) || state.namaPengantin;
            state.tanggal = params.get('tanggal') || state.tanggal;
            state.lokasi = decodeValue(params.get('lokasi')) || state.lokasi;
            state.fotoUrl = decodeValue(params.get('foto')) || state.fotoUrl;

            const bgColorParam = params.get('bgColor');
            if (bgColorParam) {
                state.bgColor = `#${bgColorParam}`;
            }

            state.bgImageUrl = decodeValue(params.get('bgImage')) || '';
            state.musikUrl = decodeValue(params.get('musik')) || '';

            // Update form inputs
            elements.namaPengantinInput.value = state.namaPengantin;
            elements.tanggalInput.value = state.tanggal;
            elements.lokasiInput.value = state.lokasi;
            elements.fotoInput.value = state.fotoUrl;
            elements.bgColorInput.value = state.bgColor;
            elements.bgImageInput.value = state.bgImageUrl;
            elements.musikSelect.value = state.musikUrl;

            // Switch ke template yang dipilih
            switchTemplate(state.template);
        }

        // Update preview
        updatePreview();
    }

    /**
     * Salin link ke clipboard
     */
    function copyLink() {
        const currentURL = window.location.href;

        navigator.clipboard.writeText(currentURL).then(() => {
            showToast('Link berhasil disalin!');
        }).catch(err => {
            console.error('Gagal menyalin link:', err);

            // Fallback untuk browser lama
            const textArea = document.createElement('textarea');
            textArea.value = currentURL;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                showToast('Link berhasil disalin!');
            } catch (err) {
                alert('Gagal menyalin link. Silakan salin manual dari address bar.');
            }

            document.body.removeChild(textArea);
        });
    }

    /**
     * Tampilkan preview full screen
     */
    function showFullPreview() {
        // Clone template aktif ke modal
        const activeTemplate = document.querySelector('.template.active');
        if (activeTemplate) {
            const clonedTemplate = activeTemplate.cloneNode(true);
            clonedTemplate.style.display = 'block';
            
            elements.modalBody.innerHTML = '';
            elements.modalBody.appendChild(clonedTemplate);
            
            // Tampilkan modal
            elements.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Tutup modal
     */
    function closeModal() {
        elements.modal.classList.remove('active');
        document.body.style.overflow = '';
        elements.modalBody.innerHTML = '';
    }

    // ========================================
    // Event Listeners Setup
    // ========================================
    function setupEventListeners() {
        // Template selector - radio buttons
        elements.templateRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                switchTemplate(this.value);
            });
        });

        // Template selector - click on option
        elements.templateOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Jangan trigger jika yang diklik adalah radio input
                if (e.target.tagName !== 'INPUT') {
                    const templateId = this.dataset.template;
                    const radio = this.querySelector('input[type="radio"]');
                    radio.checked = true;
                    switchTemplate(templateId);
                }
            });
        });

        // Input handlers - update state dan preview
        elements.namaPengantinInput.addEventListener('input', function() {
            state.namaPengantin = this.value;
            updatePreview();
            updateURL();
        });

        elements.tanggalInput.addEventListener('input', function() {
            state.tanggal = this.value;
            updatePreview();
            updateURL();
        });

        elements.lokasiInput.addEventListener('input', function() {
            state.lokasi = this.value;
            updatePreview();
            updateURL();
        });

        elements.fotoInput.addEventListener('input', function() {
            state.fotoUrl = this.value;
            updatePreview();
            updateURL();
        });

        elements.bgColorInput.addEventListener('input', function() {
            state.bgColor = this.value;
            state.bgImageUrl = ''; // Reset image URL saat pilih warna
            elements.bgImageInput.value = '';
            updatePreview();
            updateURL();
        });

        elements.bgImageInput.addEventListener('input', function() {
            state.bgImageUrl = this.value;
            if (state.bgImageUrl) {
                elements.bgColorInput.value = '#ffffff'; // Reset warna saat pakai image
            }
            updatePreview();
            updateURL();
        });

        elements.musikSelect.addEventListener('change', function() {
            state.musikUrl = this.value;
            updatePreview();
        });

        // Music controls
        elements.btnPlay.addEventListener('click', function() {
            if (state.musikUrl) {
                elements.bgMusic.play().catch(err => {
                    console.log('Autoplay dicegah oleh browser:', err);
                    alert('Silakan interaksi dengan halaman terlebih dahulu untuk memutar musik.');
                });
            } else {
                alert('Pilih lagu terlebih dahulu!');
            }
        });

        elements.btnPause.addEventListener('click', function() {
            elements.bgMusic.pause();
        });

        // Action buttons
        elements.btnCopyLink.addEventListener('click', copyLink);
        elements.btnPreview.addEventListener('click', showFullPreview);

        // Modal close
        elements.modalClose.addEventListener('click', closeModal);
        elements.modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', function(e) {
            initFromURL();
        });

        // Close modal dengan Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ========================================
    // Initialize Application
    // ========================================
    function init() {
        console.log('Undangan Digital initialized');
        console.log('Template: 5 (Klasik, Modern, Rustic, Glamour, Outdoor)');
        console.log('Features: URL state management, live preview, music player');

        // Setup event listeners
        setupEventListeners();

        // Initialize from URL
        initFromURL();

        // Set default template active
        const defaultOption = document.querySelector(`.template-option[data-template="${state.template}"]`);
        if (defaultOption) {
            defaultOption.classList.add('active');
        }

        // Auto play music jika ada parameter musik di URL (setelah user interaction)
        let hasUserInteraction = false;
        document.addEventListener('click', function() {
            if (!hasUserInteraction) {
                hasUserInteraction = true;
                if (state.musikUrl) {
                    elements.bgMusic.play().catch(err => {
                        console.log('Autoplay dicegah:', err);
                    });
                }
            }
        }, { once: true });
    }

    // ========================================
    // Start Application
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
