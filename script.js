/**
 * Reem Alaabed Portfolio - Interactive Script
 * Master Controller for: Cursor, Projects Filter, and Contact Panel
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. قاعدة بيانات المشاريع (الآري كاملة)
    const projects = [
        // --- Filmmaking ---
        { title: "Between the Streets", cat: "film", img: "between-the-streets-cover.jpg" },
        { title: "طين وفن (Tein wa Fan)", cat: "film", img: "teen-wa-fan-cover.jpg" },
        { title: "La Fuente", cat: "film", img: "la-fuente-cover.jpg" },
        { title: "حكاية (Hikaya)", cat: "film", img: "hikaya-cover.jpg" },
        { title: "لفة لويبدة (A Walk in Weibdeh)", cat: "film", img: "weibdeh-walk-cover.jpg" },
        { title: "فن الملاحظة (The Art of Observation)", cat: "film", img: "observation-art-cover.jpg" },
        { title: "Rahhal (رحال)", cat: "film", img: "rahhal-cover.jpg" },

        // --- Modeling & Animation ---
        { title: "3D Animation", cat: "3d", img: "3d-animation-main.jpg" },
        { title: "Andalus", cat: "3d", img: "andalus-3d-render.jpg" },
        { title: "Fantasia", cat: "3d", img: "fantasia-3d-render.jpg" },
        { title: "Echoes Inside (صدى الداخل)", cat: "3d", img: "echoes-inside-cover.jpg" },

        // --- Multimedia & Branding ---
        { title: "Senova - Mental Health App", cat: "multimedia", img: "senova-ui-ux.jpg" },
        { title: "Vigor - Protein Brand", cat: "multimedia", img: "vigor-branding.jpg" },
        { title: "Maknoon - Heritage Hackathon", cat: "multimedia", img: "maknoon-concept.jpg" },
        { title: "Wing - Typography", cat: "multimedia", img: "wing-typography.jpg" },
        { title: "Axiomcare - Social Media", cat: "multimedia", img: "axiomcare-sm.jpg" },
        { title: "Broasted - Social Media", cat: "multimedia", img: "broasted-sm.jpg" },
        { title: "حامل المسك - Social Media", cat: "multimedia", img: "hamel-al-misk-sm.jpg" },
        { title: "Australian Culture", cat: "multimedia", img: "australian-culture-cover.jpg" }
    ];

    // 2. محرك عرض المشاريع (Project Engine)
    const grid = document.getElementById('project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function loadProjects(filter = 'all') {
        if (!grid) return;
        
        // تأثير اختفاء بسيط قبل التبديل
        grid.style.opacity = '0';
        
        setTimeout(() => {
            grid.innerHTML = '';
            const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
            
            filtered.forEach(p => {
                const card = `
                    <div class="project-card" data-category="${p.cat}">
                        <img src="${p.img}" alt="${p.title}" loading="lazy">
                        <div class="project-info">
                            <h3>${p.title}</h3>
                        </div>
                    </div>
                `;
                grid.innerHTML += card;
            });
            grid.style.opacity = '1';
        }, 300);
    }

    // تفعيل الفلترة عند الضغط على الأزرار
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            loadProjects(btn.getAttribute('data-filter'));
        });
    });

    // 3. تحكم لوحة التواصل (Contact Panel)
    const contactBtn = document.getElementById('contact-btn');
    const panel = document.getElementById('contact-panel');
    const closeBtn = document.querySelector('.close-btn');

    if (contactBtn && panel) {
        contactBtn.addEventListener('click', () => panel.classList.add('active'));
        closeBtn.addEventListener('click', () => panel.classList.remove('active'));
    }

    // 4. تأثير الماوس التفاعلي (Custom Cursor)
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // النقطة الصغيرة تتبع الماوس فوراً
        dot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        // الدائرة الكبيرة تتبع ببطء (تأثير Smooth)
        outline.animate({
            transform: `translate(${posX - 16}px, ${posY - 16}px)`
        }, { duration: 500, fill: "forwards" });
    });

    // تكبير الماوس عند المرور على الروابط أو الصور
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => outline.style.transform += ' scale(1.5)');
        el.addEventListener('mouseleave', () => outline.style.transform = outline.style.transform.replace(' scale(1.5)', ''));
    });

    // 5. تشغيل أولي للمشاريع
    loadProjects();

});
