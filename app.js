/**
 * APP LOGIC - EMERGENCY FIX
 * Mengelola interaksi, animasi, dan sinkronisasi data.
 */

import { saveWish, listenWishes, getWishes } from './firebase.js';

let isPlaying = false;

// Variabel global carousel
let wishSlides = [];
let wishIndex = 0;
let wishAutoTimer = null;

document.addEventListener('DOMContentLoaded', function() {
    // 1. Data Initialization
    initData();
    initCountdown();
    checkURLParams();

    // 2. Open Invitation Logic (High Robustness)
    const btnOpen = document.querySelector(
        '#btnOpen, #btnOpenInvitation, .btn-open-invitation, ' +
        '[onclick*="open"], button.open-btn, ' +
        '#openBtn, .open-invitation-btn'
    );

    if (btnOpen) {
        // Hapus event listener lama jika ada (dengan cloning)
        const newBtn = btnOpen.cloneNode(true);
        btnOpen.parentNode.replaceChild(newBtn, btnOpen);
        
        newBtn.addEventListener('click', function() {
            const cover = document.getElementById('cover') || 
                          document.querySelector('.cover-section') ||
                          document.querySelector('[id*="cover"]');
                          
            const mainContent = document.getElementById('main-content') ||
                                document.getElementById('mainContent') ||
                                document.querySelector('main') ||
                                document.querySelector('[id*="main"]');

            if (!cover || !mainContent) {
                console.error('Cover atau mainContent tidak ditemukan!');
                return;
            }

            // Sembunyikan cover
            cover.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            cover.style.opacity = '0';
            cover.style.transform = 'translateY(-20px)';

            setTimeout(function() {
                cover.style.display = 'none';
                document.body.classList.remove('no-scroll');
                
                // Tampilkan konten utama
                mainContent.style.display = 'block';
                mainContent.style.opacity = '0';
                
                requestAnimationFrame(function() {
                    mainContent.style.transition = 'opacity 0.4s ease';
                    mainContent.style.opacity = '1';
                    window.scrollTo(0, 0);

                    // Lazy Init Features
                    initFeaturesAfterOpen(mainContent);
                });
            }, 400);
        });
    } else {
        console.error('Tombol Open Invitation tidak ditemukan!');
    }
});

function initFeaturesAfterOpen(mainContent) {
    // 1. Init GSAP Scroll Animations
    try {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            initScrollAnimations();
        }
    } catch(e) {
        console.warn('GSAP error:', e);
    }

    // 2. Start Music with Fade In
    setTimeout(() => {
        const music = document.getElementById('bgMusic');
        if (music) {
            fadeInMusic(music, 1.0, 2000);
        }
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) musicToggle.style.display = 'flex';
    }, 500);

    // 3. Init Real-time Data
    initRealTimeListeners();
    initOtherEventListeners();
}

function fadeInMusic(audioEl, targetVolume, duration) {
    audioEl.volume = 0;
    audioEl.play().then(() => {
        isPlaying = true;
        const musicToggle = document.getElementById('musicToggle');
        const musicIcon = document.getElementById('musicIcon');
        if (musicToggle) musicToggle.classList.add('playing');
        if (musicIcon) musicIcon.textContent = '■';
        
        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            audioEl.volume = Math.min(targetVolume, volumeStep * currentStep);
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }).catch(e => {
        console.warn('Autoplay blocked:', e);
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) musicToggle.style.display = 'flex';
        isPlaying = false;
    });
}

function initScrollAnimations() {
    gsap.utils.toArray('.fade-up').forEach(function(el) {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play reset play reset'
                }
            }
        );
    });
}

function initData() {
    try {
        document.getElementById('weddingQuote').innerText = CONFIG.wedding.quote;
        document.getElementById('weddingQuoteSource').innerText = CONFIG.wedding.quoteSource;
        document.getElementById('btnCalendar').href = CONFIG.wedding.calendarLink;

        document.getElementById('brideName').innerText = CONFIG.bride.fullName;
        document.getElementById('brideDesc').innerText = CONFIG.bride.desc;
        document.getElementById('brideParents').innerText = CONFIG.bride.parents;
        
        document.getElementById('groomName').innerText = CONFIG.groom.fullName;
        document.getElementById('groomDesc').innerText = CONFIG.groom.desc;
        document.getElementById('groomParents').innerText = CONFIG.groom.parents;

        document.getElementById('akadDate').innerText = `Sabtu, 18 Juli 2026`;
        document.getElementById('akadTime').innerText = CONFIG.event.akad.time;
        document.getElementById('akadPlace').innerText = CONFIG.event.akad.place;
        document.getElementById('akadAddress').innerText = CONFIG.event.akad.address;
        document.getElementById('btnAkadMaps').href = CONFIG.event.akad.maps;

        document.getElementById('resepsiDate').innerText = `Sabtu, 18 Juli 2026`;
        document.getElementById('resepsiTime').innerText = CONFIG.event.resepsi.time;
        document.getElementById('resepsiPlace').innerText = CONFIG.event.resepsi.place;
        document.getElementById('resepsiAddress').innerText = CONFIG.event.resepsi.address;
        document.getElementById('btnResepsiMaps').href = CONFIG.event.resepsi.maps;

        document.getElementById('storyContent').innerText = CONFIG.story.content;
    } catch(e) {
        console.warn('Data init error:', e);
    }
}

function initCountdown() {
    const targetDate = new Date(CONFIG.wedding.date).getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            clearInterval(interval);
            const d = document.getElementById('days'), h = document.getElementById('hours'), m = document.getElementById('minutes'), s = document.getElementById('seconds');
            if(d) d.innerText = "00";
            if(h) h.innerText = "00";
            if(m) m.innerText = "00";
            if(s) s.innerText = "00";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const d = document.getElementById('days'), h = document.getElementById('hours'), m = document.getElementById('minutes'), s = document.getElementById('seconds');
        if(d) d.innerText = days.toString().padStart(2, '0');
        if(h) h.innerText = hours.toString().padStart(2, '0');
        if(m) m.innerText = minutes.toString().padStart(2, '0');
        if(s) s.innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('to');
    
    if (name && name.trim() !== '') {
        return decodeURIComponent(name.trim());
    }
    return 'Tamu Undangan';
}

function checkURLParams() {
    const guestName = getGuestName();
    
    // Cari semua elemen yang tampilkan nama tamu
    const guestEls = document.querySelectorAll(
        '#guestName, .guest-name, .tamu-name, ' +
        '[data-guest-name]'
    );
    
    guestEls.forEach(el => {
        el.textContent = guestName;
    });
    
    // Update title halaman juga
    document.title = `Undangan - ${guestName}`;
}

function initRealTimeListeners() {
    listenWishes((wishes) => {
        renderWishCarousel(wishes);
    });
}

function initOtherEventListeners() {
    // Music Toggle
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                if (musicIcon) musicIcon.textContent = '♪';
                musicBtn.classList.remove('playing');
                isPlaying = false;
            } else {
                bgMusic.play();
                if (musicIcon) musicIcon.textContent = '■';
                musicBtn.classList.add('playing');
                isPlaying = true;
            }
        });
    }

    // Scroll Top
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400 && scrollTop) scrollTop.style.display = 'flex';
        else if (scrollTop) scrollTop.style.display = 'none';
    });
    if (scrollTop) {
        scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Form Submissions
    const wishForm = document.getElementById('wishForm');
    if (wishForm) {
        wishForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                name: document.getElementById('wishName').value,
                message: document.getElementById('wishMessage').value
            };
            if (await saveWish(data)) {
                alert("Ucapan Anda telah terkirim!");
                wishForm.reset();
                goWishSlide(0); // Move to the newest wish
                resetWishAuto();
            }
        });
    }

    // Modal Gift
    const giftModal = document.getElementById('giftModal');
    const btnShowGift = document.getElementById('btnShowGift');
    if (btnShowGift && giftModal) {
        btnShowGift.addEventListener('click', () => giftModal.classList.add('show'));
        const closeBtn = giftModal.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', () => giftModal.classList.remove('show'));
        window.addEventListener('click', (e) => { if (e.target == giftModal) giftModal.classList.remove('show'); });
    }

    // Event tombol panah carousel
    const prev = document.getElementById('wishPrev');
    const next = document.getElementById('wishNext');
    
    prev?.addEventListener('click', () => {
        if (wishIndex > 0) {
            goWishSlide(wishIndex - 1);
            resetWishAuto();
        }
    });
    
    next?.addEventListener('click', () => {
        if (wishIndex < wishSlides.length - 1) {
            goWishSlide(wishIndex + 1);
            resetWishAuto();
        }
    });
}

// --- WEDDING WISH CAROUSEL LOGIC ---

function renderWishCarousel(data) {
    const track = document.getElementById('wishTrack');
    const dotsRow = document.getElementById('wishDots');
    
    if (!track || !dotsRow) {
        console.error('Carousel elements not found');
        return;
    }
    
    wishSlides = data;
    // Jangan reset index jika hanya update data (kecuali dari form submit)

    if (!data || data.length === 0) {
        track.innerHTML = `
            <div class="wish-slide">
                <div class="wish-slide-quote">"</div>
                <p class="wish-slide-message" style="opacity:0.4;">Jadilah yang pertama memberikan ucapan...</p>
            </div>`;
        dotsRow.innerHTML = '';
        return;
    }

    // Render kartu
    track.innerHTML = data.map(w => `
        <div class="wish-slide">
            <div class="wish-slide-quote">"</div>
            <p class="wish-slide-message">${escapeHtml(w.message)}</p>
            <div class="wish-slide-name">— ${escapeHtml(w.name)}</div>
        </div>
    `).join('');

    // Render dots
    dotsRow.innerHTML = data.map((_, i) => `
        <div class="wish-dot ${i === wishIndex ? 'active' : ''}" onclick="window.jumpWishSlide(${i})"></div>
    `).join('');

    goWishSlide(wishIndex);
    setupWishSwipe();
    startWishAuto();
}

function goWishSlide(index) {
    const track = document.getElementById('wishTrack');
    const dots = document.querySelectorAll('.wish-dot');
    const prevBtn = document.getElementById('wishPrev');
    const nextBtn = document.getElementById('wishNext');
    
    if (!track) return;
    if (index >= wishSlides.length && wishSlides.length > 0) index = 0;
    
    wishIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
    
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = wishSlides.length <= 1 || index === wishSlides.length - 1;
}

window.jumpWishSlide = function(i) {
    goWishSlide(i);
    resetWishAuto();
};

function startWishAuto() {
    clearInterval(wishAutoTimer);
    if (wishSlides.length <= 1) return;
    wishAutoTimer = setInterval(() => {
        const next = wishIndex < wishSlides.length - 1 ? wishIndex + 1 : 0;
        goWishSlide(next);
    }, 4000);
}

function resetWishAuto() {
    startWishAuto();
}

function setupWishSwipe() {
    const viewport = document.getElementById('wishViewport');
    if (!viewport) return;
    
    let startX = 0;
    
    viewport.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    viewport.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) < 40) return;
        
        if (diff > 0 && wishIndex < wishSlides.length-1) {
            goWishSlide(wishIndex + 1);
        } else if (diff < 0 && wishIndex > 0) {
            goWishSlide(wishIndex - 1);
        }
        resetWishAuto();
    }, { passive: true });
}

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;');
}

// Global Helpers
window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Nomor rekening tersalin!"))
    .catch(err => console.error('Failed to copy: ', err));
};

window.openLightbox = (index) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (!lightbox || !lightboxImg) return;

    let bgUrl = '';
    if (index === 0) {
        const el = document.querySelector('.gallery-main');
        if (el) bgUrl = window.getComputedStyle(el).backgroundImage;
    } else {
        const items = document.querySelectorAll('.gallery-item');
        if (items && items[index - 1]) {
            bgUrl = window.getComputedStyle(items[index - 1]).backgroundImage;
        }
    }

    if (bgUrl && bgUrl !== 'none') {
        lightboxImg.style.backgroundImage = bgUrl;
        lightboxImg.style.backgroundSize = 'cover';
        lightboxImg.style.backgroundPosition = 'center';
    } else {
        lightboxImg.style.background = 'linear-gradient(135deg, var(--navy), var(--gold))';
    }

    lightbox.classList.add('show');
};

window.closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('show');
};
