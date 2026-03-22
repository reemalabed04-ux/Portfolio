/**
 * 🎨 Reem Alaabed Portfolio - Interactive JavaScript
 * Features: Preloader, Custom Cursor, Scroll Animations, 
 *           Portfolio Filtering, Form Handling, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader?.classList.add('hidden');
        // Enable custom cursor after preloader
        document.body.style.cursor = 'none';
    }, 2200);

    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower && !('ontouchstart' in window)) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        
        // Smooth follow animation
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
        
        // Hover effects for interactive elements
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
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect
    const handleScroll = () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

    // ===== SCROLL REVEAL ANIMATIONS =====
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
    
    // Initial check + scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // ===== PORTFOLIO FILTERING =====
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.classList.remove('filtered');
                        card.classList.add('active');
                    } else {
                        card.classList.add('filtered');
                        card.classList.remove('active');
                    }
                }, index * 50); // Staggered animation
            });
        });
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // NOTE: For production, connect to a backend service like Formspree, EmailJS, or Netlify Forms
            // This is a demo simulation:
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success toast
            toastMessage.textContent = 'Thank you! Your message has been sent. ✨';
            toast.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Also send to email via mailto fallback (optional)
            const mailtoLink = `mailto:Reem.alabed04@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
            // window.location.href = mailtoLink; // Uncomment to open email client
            
        } catch (error) {
            toastMessage.textContent = 'Oops! Something went wrong. Please try emailing me directly.';
            toast.classList.add('show');
            console.error('Form submission error:', error);
        } finally {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide toast after 5 seconds
            setTimeout(() => toast.classList.remove('show'), 5000);
        }
    });

    // ===== TOAST AUTO-HIDE =====
    toast?.addEventListener('click', () => {
        toast.classList.remove('show');
    });

    // ===== FOOTER YEAR =====
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== PARALLAX EFFECT FOR HERO (subtle) =====
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroTop = hero?.offsetTop || 0;
            
            if (scrolled < heroTop + window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // ===== PROJECT CARD HOVER SOUND (optional - commented out) =====
    /*
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.volume = 0.1;
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {}); // Silent fail if autoplay blocked
        });
    });
    */

    // ===== KEYBOARD NAVIGATION SUPPORT =====
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile menu
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== LAZY LOADING ENHANCEMENT =====
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported - images already have loading="lazy"
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }

    // ===== CONSOLE EASTER EGG =====
    console.log(`
    🎨 Hello there! 
    You found the console. 
    Interested in working together?
    
    ✉️  Reem.alabed04@gmail.com
    📱  +962 79 940 4682
    🌐  https://www.behance.net/reemal-aabd
    
    Designed & coded with ❤️ by Reem Alaabed
    `);
});

// ===== UTILITY: Debounce function for performance =====
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

// ===== UTILITY: Add to reveal on resize =====
window.addEventListener('resize', debounce(() => {
    // Re-trigger reveal check on resize
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('active');
    });
    // Trigger scroll event to re-check
    window.dispatchEvent(new Event('scroll'));
}, 250));
