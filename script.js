/**
 * Undangan Digital - Main Application Script
 * Interactive Wedding Invitation with Falling Flowers & Firebase
 */

(function() {
    'use strict';

    // ========================================
    // State & Configuration
    // ========================================
    const state = {
        musicPlaying: false,
        heroOpened: false,
        flowerInterval: null,
        ucapanCount: 0
    };

    // ========================================
    // DOM Elements
    // ========================================
    const elements = {
        // Hero Section
        hero: document.getElementById('hero'),
        bukaUndangan: document.getElementById('bukaUndangan'),
        scrollIndicator: document.getElementById('scrollIndicator'),
        
        // Main Content
        mainContent: document.getElementById('mainContent'),
        musicControl: document.querySelector('.music-control'),
        musicToggle: document.getElementById('musicToggle'),
        bgMusic: document.getElementById('bgMusic'),
        
        // Form Ucapan
        formUcapan: document.getElementById('formUcapan'),
        namaInput: document.getElementById('nama'),
        kehadiranInput: document.getElementById('kehadiran'),
        ucapanInput: document.getElementById('ucapan'),
        ucapanItems: document.getElementById('ucapanItems'),
        ucapanCount: document.getElementById('ucapanCount'),
        
        // Lightbox
        lightbox: document.getElementById('lightbox'),
        lightboxImg: document.getElementById('lightbox-img'),
        lightboxClose: document.querySelector('.lightbox-close'),
        galeriItems: document.querySelectorAll('.galeri-item'),
        
        // Toast
        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toast-message'),
        
        // Flower Container
        flowerContainer: document.getElementById('flower-container')
    };

    // ========================================
    // Import Firebase Functions
    // ========================================
    let kirimUcapan, dengarkanUcapan;
    
    import('./firebase-config.js')
        .then(module => {
            kirimUcapan = module.kirimUcapan;
            dengarkanUcapan = module.dengarkanUcapan;
            console.log('✅ Firebase modules loaded');
        })
        .catch(err => {
            console.error('❌ Failed to load Firebase modules:', err);
        });

    // ========================================
    // Utility Functions
    // ========================================

    /**
     * Format timestamp to readable date
     */
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return `${minutes} menit yang lalu`;
        if (hours < 24) return `${hours} jam yang lalu`;
        if (days < 7) return `${days} hari yang lalu`;
        
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    /**
     * Show toast notification
     */
    function showToast(message, isError = false) {
        elements.toastMessage.textContent = message;
        elements.toast.querySelector('i').className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
        elements.toast.querySelector('i').style.color = isError ? '#f44336' : '#4caf50';
        elements.toast.classList.add('active');
        
        setTimeout(() => {
            elements.toast.classList.remove('active');
        }, 3000);
    }

    /**
     * Scroll to element smoothly
     */
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ========================================
    // Flower Animation
    // ========================================

    /**
     * Create a falling flower
     */
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Random flower type
        const types = ['sakura', 'rose', 'white'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        flower.classList.add(randomType);
        
        // Random position
        flower.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = 5 + Math.random() * 10;
        flower.style.animationDuration = duration + 's';
        
        // Random size
        const size = 20 + Math.random() * 20;
        flower.style.width = size + 'px';
        flower.style.height = size + 'px';
        
        elements.flowerContainer.appendChild(flower);
        
        // Remove flower after animation
        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }

    /**
     * Start flower animation
     */
    function startFlowerAnimation() {
        // Create flower every 500ms
        state.flowerInterval = setInterval(() => {
            createFlower();
        }, 500);
    }

    /**
     * Stop flower animation
     */
    function stopFlowerAnimation() {
        if (state.flowerInterval) {
            clearInterval(state.flowerInterval);
            state.flowerInterval = null;
        }
    }

    // ========================================
    // Music Control
    // ========================================

    /**
     * Toggle music play/pause
     */
    function toggleMusic() {
        if (state.musicPlaying) {
            elements.bgMusic.pause();
            elements.musicToggle.classList.remove('playing');
            elements.musicToggle.classList.add('paused');
        } else {
            elements.bgMusic.play().catch(err => {
                console.log('Music play error:', err);
                showToast('Gagal memutar musik', true);
            });
            elements.musicToggle.classList.add('playing');
            elements.musicToggle.classList.remove('paused');
        }
        
        state.musicPlaying = !state.musicPlaying;
    }

    // ========================================
    // Hero Section - Buka Undangan
    // ========================================

    /**
     * Handle buka undangan button click
     */
    function handleBukaUndangan() {
        if (state.heroOpened) return;
        
        state.heroOpened = true;
        
        // Play music
        elements.bgMusic.volume = 0.5;
        elements.bgMusic.play().then(() => {
            state.musicPlaying = true;
            elements.musicToggle.classList.add('playing');
        }).catch(err => {
            console.log('Autoplay prevented:', err);
        });
        
        // Show main content
        elements.mainContent.classList.add('active');
        elements.musicControl.classList.add('active');
        
        // Hide scroll indicator
        elements.scrollIndicator.style.display = 'none';
        
        // Scroll to main content
        setTimeout(() => {
            scrollToElement('mainContent');
        }, 500);
        
        // Start flower animation
        startFlowerAnimation();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Load ucapan from Firebase
        loadUcapan();
    }

    // ========================================
    // Scroll Animations (AOS-like)
    // ========================================

    /**
     * Initialize scroll animations
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // ========================================
    // Ucapan (Guest Book) - Firebase
    // ========================================

    /**
     * Load ucapan from Firebase
     */
    function loadUcapan() {
        if (!dengarkanUcapan) {
            elements.ucapanItems.innerHTML = `
                <div class="loading-ucapan">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Firebase belum dikonfigurasi. Silakan edit firebase-config.js</span>
                </div>
            `;
            elements.ucapanCount.textContent = '0';
            return;
        }
        
        elements.ucapanItems.innerHTML = '';
        
        dengarkanUcapan((data) => {
            addUcapanItem(data);
            state.ucapanCount++;
            elements.ucapanCount.textContent = state.ucapanCount;
        });
    }

    /**
     * Add ucapan item to the list
     */
    function addUcapanItem(data) {
        const item = document.createElement('div');
        item.className = 'ucapan-item';
        
        const kehadiranClass = data.kehadiran.toLowerCase() === 'hadir' ? 'hadir' : 'tidak-hadir';
        const kehadiranLabel = data.kehadiran === 'Hadir' ? '✓ Hadir' : '✗ Tidak Hadir';
        
        item.innerHTML = `
            <div class="ucapan-header">
                <span class="ucapan-nama">${escapeHtml(data.nama)}</span>
                <span class="ucapan-kehadiran ${kehadiranClass}">${kehadiranLabel}</span>
            </div>
            <p class="ucapan-is">${escapeHtml(data.ucapan)}</p>
            <p class="ucapan-time">${formatTime(data.timestamp)}</p>
        `;
        
        // Insert at the top
        elements.ucapanItems.insertBefore(item, elements.ucapanItems.firstChild);
    }

    /**
     * Handle form submit
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const nama = elements.namaInput.value.trim();
        const kehadiran = elements.kehadiranInput.value;
        const ucapan = elements.ucapanInput.value.trim();
        
        if (!nama || !kehadiran || !ucapan) {
            showToast('Mohon lengkapi semua field', true);
            return;
        }
        
        // Disable submit button
        const submitBtn = elements.formUcapan.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        
        // Send to Firebase
        if (kirimUcapan) {
            kirimUcapan(nama, kehadiran, '', ucapan)
                .then(() => {
                    showToast('Ucapan berhasil dikirim!');
                    elements.formUcapan.reset();
                })
                .catch(err => {
                    console.error('Error sending ucapan:', err);
                    showToast('Gagal mengirim ucapan. Coba lagi.', true);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Kirim Ucapan</span>';
                });
        } else {
            // Firebase not configured
            showToast('Firebase belum dikonfigurasi', true);
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Kirim Ucapan</span>';
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========================================
    // Lightbox for Gallery
    // ========================================

    /**
     * Open lightbox with image
     */
    function openLightbox(imgSrc) {
        elements.lightboxImg.src = imgSrc;
        elements.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close lightbox
     */
    function closeLightbox() {
        elements.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // Event Listeners
    // ========================================

    function setupEventListeners() {
        // Buka Undangan button
        elements.bukaUndangan.addEventListener('click', handleBukaUndangan);
        
        // Music toggle
        elements.musicToggle.addEventListener('click', toggleMusic);
        
        // Form submit
        elements.formUcapan.addEventListener('submit', handleFormSubmit);
        
        // Gallery lightbox
        elements.galeriItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                openLightbox(img.src);
            });
        });
        
        // Lightbox close
        elements.lightboxClose.addEventListener('click', closeLightbox);
        elements.lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && elements.lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
        
        // Show scroll indicator after page load
        setTimeout(() => {
            elements.scrollIndicator.style.display = 'block';
        }, 1000);
    }

    // ========================================
    // Initialize Application
    // ========================================

    function init() {
        console.log('🎉 Undangan Digital initialized');
        console.log('🌸 Features: Falling flowers, Firebase realtime, Lightbox gallery');
        
        // Setup event listeners
        setupEventListeners();
        
        // Start with some flowers
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFlower(), i * 300);
        }
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
