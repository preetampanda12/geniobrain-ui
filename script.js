/* ============================================
   SHREE MATA — Form&Fun JS Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. GSAP FLIP INTRO ANIMATION
    // ==========================================
    gsap.registerPlugin(Flip);
    
    const introOverlay = document.getElementById('intro-overlay');
    const logo = document.querySelector('.mata-logo');
    const dest = document.getElementById('logo-dest');

    if (introOverlay && logo && dest) {
        // 0. Hide nav items initially so they don't show during loading screen
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks) gsap.set(navLinks, { opacity: 0 });
        if (hamburger) gsap.set(hamburger, { opacity: 0 });

        // 1. Setup initial state
        gsap.set(logo, { y: 30, opacity: 0, letterSpacing: "2px" });
        
        // 2. Initial elegant reveal
        gsap.to(logo, { 
            y: 0, 
            opacity: 1, 
            letterSpacing: "8px", 
            duration: 1.2, 
            ease: "expo.out",
            onComplete: () => {
                // Get the current state AFTER reveal finishes completely
                const state = Flip.getState(logo);
                
                // Move the logo to the navbar in the DOM
                dest.appendChild(logo);

                // 3. FLIP animation for the logo moving to the navbar (Buttery smooth)
                Flip.from(state, {
                    duration: 1.2,
                    ease: "expo.inOut",
                    absolute: false
                });
                
                // 4. Slide up the overlay elegantly with a premium curved curtain effect
                gsap.to(introOverlay, {
                    yPercent: -100,
                    borderBottomLeftRadius: "50%",
                    borderBottomRightRadius: "50%",
                    duration: 1.2,
                    ease: "expo.inOut",
                    onComplete: () => {
                        introOverlay.remove();
                        const navEl = document.querySelector('.nav');
                        if (navEl) navEl.classList.remove('nav-loading');
                        
                        document.body.style.overflow = '';
                        lenis.start();
                        if (window.showDisclaimer) window.showDisclaimer();
                    }
                });

                // Fade in nav items perfectly synced with curtain slide
                if (navLinks) gsap.to(navLinks, { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
                if (hamburger) gsap.to(hamburger, { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
            }
        });
    } else {
        // Fallback if no intro animation on this page
        const navEl = document.querySelector('.nav');
        if (navEl) navEl.classList.remove('nav-loading');
        setTimeout(() => { if (window.showDisclaimer) window.showDisclaimer(); }, 500);
    }

    // ==========================================
    // 2. LENIS SMOOTH SCROLL (Physics based)
    // ==========================================
    const lenis = new Lenis({
        duration: 1.5, /* Increased duration for butter-smooth, luxurious scroll */
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), /* Soft exponential easing */
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ==========================================
    // 2.0 HAMBURGER MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                lenis.stop(); // Freeze scroll when menu is open
            } else {
                lenis.start();
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                lenis.start();
            });
        });
    }

    // ==========================================
    // 2. CUSTOM CURSOR LOGIC
    // ==========================================
    // Initialize cursor globally (CSS handles hiding on mobile)
    const cursor = document.querySelector('.cursor');
    const cursorText = document.querySelector('.cursor-text');
    
    if (cursor) {
        document.body.classList.add('custom-cursor-active');
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Smooth follow
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Lerp (Linear Interpolation) for smooth trailing effect - increased factor for faster response
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover triggers
    const interactables = document.querySelectorAll('[data-cursor]');
    
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const type = el.getAttribute('data-cursor'); // hover, view, drag
            
            cursor.classList.remove('hover-state', 'view-state', 'drag-state');
            cursor.classList.add(`${type}-state`);
            
            if (type === 'view') cursorText.innerText = 'VIEW';
            else if (type === 'drag') cursorText.innerText = 'DRAG';
            else cursorText.innerText = '';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-state', 'view-state', 'drag-state');
            cursorText.innerText = '';
        });
    });

    // ==========================================
    // 2.5 NAVBAR SCROLL EFFECT
    // ==========================================
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            // Show the frosted glass navbar almost immediately on scroll to prevent hero text overlapping the logo
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // 3. SCROLL TEXT REVEAL (REMOVED)
    // ==========================================

    // ==========================================
    // 4. MAGNETIC BUTTONS
    // ==========================================
    const magnetics = document.querySelectorAll('[data-magnetic]');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button slightly towards the mouse
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // ==========================================
    // 5. SERVICE IMAGE FOLLOW CURSOR (DESKTOP ONLY)
    // ==========================================
    // Initialize globally, mobile CSS handles visibility
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const media = item.querySelector('.service-media');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(media, {
                left: x,
                top: y,
                xPercent: -50,
                yPercent: -50,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // ==========================================
    // 6. 3D CARD STACKING EFFECT (MOBILE ONLY)
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);
    
    let mm = gsap.matchMedia();
    
    mm.add("(max-width: 768px)", () => {
        const cards = gsap.utils.toArray('.service-item');
        const cursiveTexts = gsap.utils.toArray('.cursive-text');
        
        // Ensure z-index stacking is correct (first on top)
        gsap.set(cards, { zIndex: (i, target, targets) => targets.length - i });
        gsap.set(cursiveTexts, { zIndex: (i, target, targets) => targets.length - i });

        // Create the scroll timeline to pin the ENTIRE section
        // Pinning #services instead of #services-list prevents the header from overlapping the nav!
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#services",
                start: "top top", // Pin EXACTLY at the top so the padding perfectly clears the nav
                end: "+=150%", // Reduced from 300% to make the animations trigger much faster as the user scrolls
                scrub: true,
                pin: true,
            }
        });
        
        // Swipe them away one by one!
        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Last card/text stays
            
            // 1. Swipe the card away
            tl.to(card, {
                xPercent: (index % 2 === 0) ? -120 : 120, // Swipe left for even, right for odd
                rotation: (index % 2 === 0) ? -15 : 15, // Swipe tilt
                opacity: 0,
                duration: 1,
                ease: "power1.inOut"
            }, `swipe-${index}`); // Use label to sync card and text
            
            // 2. Telegram message delete animation for the cursive text (vanish to one side)
            tl.to(cursiveTexts[index], {
                scale: 0.5,
                xPercent: (index % 2 === 0) ? -60 : 60, // Vanish to the same side as the card
                filter: "blur(5px)",
                opacity: 0,
                duration: 0.6, 
                ease: "power3.in"
            }, `swipe-${index}`);

            // 3. Fade IN the next cursive text
            tl.to(cursiveTexts[index + 1], {
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            }, `swipe-${index}+=0.4`);
        });
    });

    // ==========================================
    // 7. DISCLAIMER MODAL LOGIC
    // ==========================================
    const hasAgreed = localStorage.getItem('geniobrain_disclaimer_agreed');
    const disclaimerModal = document.getElementById('disclaimer-modal');
    const btnAgree = document.getElementById('btn-agree');
    const btnDisagree = document.getElementById('btn-disagree');

    if (disclaimerModal && btnAgree && btnDisagree) {
    window.showDisclaimer = function() {
        if (!hasAgreed && disclaimerModal) {
            disclaimerModal.classList.remove('hidden');
        }
    };

        btnAgree.addEventListener('click', () => {
            localStorage.setItem('geniobrain_disclaimer_agreed', 'true');
            disclaimerModal.classList.add('hidden');
        });

        btnDisagree.addEventListener('click', () => {
            // Redirect to a safe page if they disagree with the terms
            window.location.href = "https://www.google.com";
        });
    }

});
