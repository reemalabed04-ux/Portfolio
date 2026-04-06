/**
 * Reem Alaabed Portfolio — Redesigned JS
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader?.classList.add('hidden');
        }, 2300);
    });

    // ===== CUSTOM CURSOR =====
    const cursor     = document.querySelector('.cursor');
    const follower   = document.querySelector('.cursor-follower');

    if (cursor && follower && !('ontouchstart' in window)) {
        let mx = 0, my = 0;
        let fx = 0, fy = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top  = my + 'px';
        });

        // Smooth follower
        const animFollower = () => {
            fx += (mx - fx) * 0.12;
            fy += (my - fy) * 0.12;
            follower.style.left = fx + 'px';
            follower.style.top  = fy + 'px';
            requestAnimationFrame(animFollower);
        };
        animFollower();

        // Hover expand
        document.querySelectorAll('a, button, .project-card, input, textarea, .cat-btn, .social-pill, .tool')
            .forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== MOBILE NAV =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu   = document.querySelector('.nav-menu');

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close nav on outside click
    document.addEventListener('click', e => {
        if (navMenu?.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== SCROLL REVEAL (data-reveal) =====
    const revealEls = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // Project cards reveal
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = (i % 3) * 80; // stagger by column
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.project-card').forEach(card => {
        cardObserver.observe(card);
    });

    // ===== PORTFOLIO FILTERING =====
    const catBtns    = document.querySelectorAll('.cat-btn');
    const projectCards = document.querySelectorAll('.project-card');

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.dataset.category;

            projectCards.forEach((card, i) => {
                const match = cat === 'all' || card.dataset.category === cat;

                if (match) {
                    card.classList.remove('filtered');
                    // re-animate on reveal
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), i * 40);
                } else {
                    card.classList.add('filtered');
                    card.classList.remove('visible');
                }
            });
        });
    });

    // ===== PARALLAX ORBS (subtle, on mousemove) =====
    const orbs = document.querySelectorAll('.hero-orb');
    document.addEventListener('mousemove', e => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        orbs.forEach((orb, i) => {
            const strength = (i + 1) * 12;
            orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        });
    });

    // ===== ACTIVE NAV HIGHLIGHT =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    // ===== FOOTER YEAR =====
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== CONTACT FORM (Formspree) =====
    const form  = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');

    const showToast = (msg, success = true) => {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        toast.querySelector('i').className = success
            ? 'fas fa-check-circle'
            : 'fas fa-exclamation-circle';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    };

    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (res.ok) {
                    showToast('Message sent! I\'ll get back to you soon ✨');
                    form.reset();
                } else {
                    showToast('Something went wrong. Try emailing directly.', false);
                }
            } catch {
                showToast('Connection error. Try emailing directly.', false);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    console.log('✦ Reem Alaabed Portfolio ✦ Loaded');
});
