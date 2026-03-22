/**
 * 🎨 Reem Alaabed Portfolio - Fixed Version
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 2200);

    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower && !('ontouchstart' in window)) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        
        setInterval(() => {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            cursor.style.left = posX + 'px';
            cursor.style.top = posY + 'px';
            follower.style.left = mouseX + 'px';
            follower.style.top = mouseY + 'px';
        }, 15);
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea, .social-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // ===== NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal, .project-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // ===== PORTFOLIO FILTERING =====
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.classList.remove('filtered');
                        card.classList.add('active');
                    } else {
                        card.classList.add('filtered');
                        card.classList.remove('active');
                    }
                }, index * 50);
            });
        });
    });

    // ===== FOOTER YEAR =====
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== CONSOLE MESSAGE =====
    console.log('🎨 Reem Alaabed Portfolio Loaded Successfully! ✨');
});

// ===== UTILITY: Debounce =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
