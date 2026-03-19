/**
 * Undangan Digital - Main Application Script
 * Mengelola kustomisasi undangan, URL state, dan preview langsung
 */

(function($) {
    'use strict';

    // ========================================
    // State Management
    // ========================================
    const state = {
        template: '1',
        namaPria: 'Ahmad',
        namaWanita: 'Rina',
        tanggalAcara: '2024-12-25',
        lokasiAcara: 'Grand Ballroom Hotel',
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
        templateOptions: $('.template-option'),
        templates: $('.template'),
        
        // Form inputs
        namaPriaInput: $('#nama-pria'),
        namaWanitaInput: $('#nama-wanita'),
        tanggalAcaraInput: $('#tanggal-acara'),
        lokasiAcaraInput: $('#lokasi-acara'),
        fotoUrlInput: $('#foto-url'),
        bgColorInput: $('#bg-color'),
        bgImageUrlInput: $('#bg-image-url'),
        musikSelect: $('#musik-select'),
        
        // Preview elements
        previewWrapper: $('#preview-wrapper'),
        
        // Buttons
        btnPlay: $('#btn-play'),
        btnPause: $('#btn-pause'),
        btnCopyLink: $('#btn-copy-link'),
        btnPreviewFull: $('#btn-preview-full'),
        
        // Audio
        bgMusic: $('#bg-music')[0],
        
        // Modal
        fullPreviewModal: $('#fullPreviewModal'),
        fullPreviewBody: $('#full-preview-body'),
        
        // Toast
        copyToast: $('#copyToast')
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

    // ========================================
    // Core Functions
    // ========================================

    /**
     * Update preview berdasarkan state
     */
    function updatePreview() {
        // Update nama pengantin di semua template
        $('.nama-pria').text(state.namaPria);
        $('.nama-wanita').text(state.namaWanita);
        
        // Update tanggal
        $('.tanggal-acara').text(formatDate(state.tanggalAcara));
        
        // Update lokasi
        $('.lokasi-acara').text(state.lokasiAcara);
        
        // Update foto
        $('.foto-utama').attr('src', state.fotoUrl);
        
        // Update background preview wrapper
        if (state.bgImageUrl) {
            elements.previewWrapper.css('background', `url(${state.bgImageUrl}) center/cover`);
        } else {
            elements.previewWrapper.css('background', state.bgColor);
        }
        
        // Update musik
        if (state.musikUrl) {
            elements.bgMusic.src = state.musikUrl;
            elements.bgMusic.load();
        }
    }

    /**
     * Ganti template aktif
     */
    function switchTemplate(templateId) {
        state.template = templateId;
        
        // Update UI template selector
        elements.templateOptions.removeClass('active');
        $(`.template-option[data-template="${templateId}"]`).addClass('active');
        
        // Update template yang ditampilkan
        elements.templates.removeClass('active');
        $(`#template-${templateId}`).addClass('active');
        
        // Update URL tanpa reload
        updateURL();
    }

    /**
     * Update URL dengan state saat ini
     */
    function updateURL() {
        const params = new URLSearchParams();
        
        params.set('template', state.template);
        params.set('namaPria', encodeValue(state.namaPria));
        params.set('namaWanita', encodeValue(state.namaWanita));
        params.set('tanggal', state.tanggalAcara);
        params.set('lokasi', encodeValue(state.lokasiAcara));
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
        
        // Update URL tanpa reload
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
            state.namaPria = decodeValue(params.get('namaPria')) || state.namaPria;
            state.namaWanita = decodeValue(params.get('namaWanita')) || state.namaWanita;
            state.tanggalAcara = params.get('tanggal') || state.tanggalAcara;
            state.lokasiAcara = decodeValue(params.get('lokasi')) || state.lokasiAcara;
            state.fotoUrl = decodeValue(params.get('foto')) || state.fotoUrl;
            
            const bgColorParam = params.get('bgColor');
            if (bgColorParam) {
                state.bgColor = `#${bgColorParam}`;
            }
            
            state.bgImageUrl = decodeValue(params.get('bgImage')) || '';
            state.musikUrl = decodeValue(params.get('musik')) || '';
            
            // Update form inputs
            elements.namaPriaInput.val(state.namaPria);
            elements.namaWanitaInput.val(state.namaWanita);
            elements.tanggalAcaraInput.val(state.tanggalAcara);
            elements.lokasiAcaraInput.val(state.lokasiAcara);
            elements.fotoUrlInput.val(state.fotoUrl);
            elements.bgColorInput.val(state.bgColor);
            elements.bgImageUrlInput.val(state.bgImageUrl);
            elements.musikSelect.val(state.musikUrl);
            
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
            // Tampilkan toast notification
            const toast = new bootstrap.Toast(elements.copyToast[0]);
            toast.show();
        }).catch(err => {
            console.error('Gagal menyalin link:', err);
            
            // Fallback untuk browser lama
            const textArea = document.createElement('textarea');
            textArea.value = currentURL;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                const toast = new bootstrap.Toast(elements.copyToast[0]);
                toast.show();
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
        const activeTemplate = $('.template.active').clone();
        activeTemplate.css('display', 'block');
        
        elements.fullPreviewBody.html(activeTemplate);
        
        // Tampilkan modal
        const modal = new bootstrap.Modal(elements.fullPreviewModal[0]);
        modal.show();
    }

    // ========================================
    // Event Handlers
    // ========================================

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Template selector
        elements.templateOptions.on('click', function() {
            const templateId = $(this).data('template');
            switchTemplate(templateId);
        });
        
        // Input handlers - update state dan preview
        elements.namaPriaInput.on('input', function() {
            state.namaPria = $(this).val();
            updatePreview();
            updateURL();
        });
        
        elements.namaWanitaInput.on('input', function() {
            state.namaWanita = $(this).val();
            updatePreview();
            updateURL();
        });
        
        elements.tanggalAcaraInput.on('input', function() {
            state.tanggalAcara = $(this).val();
            updatePreview();
            updateURL();
        });
        
        elements.lokasiAcaraInput.on('input', function() {
            state.lokasiAcara = $(this).val();
            updatePreview();
            updateURL();
        });
        
        elements.fotoUrlInput.on('input', function() {
            state.fotoUrl = $(this).val();
            updatePreview();
            updateURL();
        });
        
        elements.bgColorInput.on('input', function() {
            state.bgColor = $(this).val();
            state.bgImageUrl = ''; // Reset image URL saat pilih warna
            elements.bgImageUrlInput.val('');
            updatePreview();
            updateURL();
        });
        
        elements.bgImageUrlInput.on('input', function() {
            state.bgImageUrl = $(this).val();
            if (state.bgImageUrl) {
                elements.bgColorInput.val('#ffffff'); // Reset warna saat pakai image
            }
            updatePreview();
            updateURL();
        });
        
        elements.musikSelect.on('change', function() {
            state.musikUrl = $(this).val();
            updatePreview();
            updateURL();
        });
        
        // Music controls
        elements.btnPlay.on('click', function() {
            if (state.musikUrl) {
                elements.bgMusic.play().catch(err => {
                    console.log('Autoplay dicegah oleh browser:', err);
                    alert('Silakan interaksi dengan halaman terlebih dahulu untuk memutar musik.');
                });
            } else {
                alert('Pilih lagu terlebih dahulu!');
            }
        });
        
        elements.btnPause.on('click', function() {
            elements.bgMusic.pause();
        });
        
        // Action buttons
        elements.btnCopyLink.on('click', copyLink);
        elements.btnPreviewFull.on('click', showFullPreview);
        
        // Handle browser back/forward
        window.addEventListener('popstate', function(e) {
            initFromURL();
        });
    }

    // ========================================
    // Initialize Application
    // ========================================
    
    $(document).ready(function() {
        console.log('Undangan Digital initialized');
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize from URL
        initFromURL();
        
        // Set default template active
        $(`.template-option[data-template="${state.template}"]`).addClass('active');
        
        // Auto play music jika ada parameter musik di URL (setelah user interaction)
        let hasUserInteraction = false;
        $(document).one('click', function() {
            hasUserInteraction = true;
            if (state.musikUrl) {
                elements.bgMusic.play().catch(err => {
                    console.log('Autoplay dicegah:', err);
                });
            }
        });
    });

})(jQuery);
