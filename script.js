// 1. Mouse Follower Effect
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX - 16 + 'px';
    outline.style.top = e.clientY - 16 + 'px';
});

// 2. Project Data
const projects = [
    { title: "Between the Streets", cat: "film", img: "between-the-streets-cover.jpg" },
    { title: "Senova", cat: "multimedia", img: "senova-ui-ux.jpg" },
    { title: "3D Animation", cat: "3d", img: "3d-animation-main.jpg" },
    { title: "Hikaya", cat: "film", img: "hikaya-cover.jpg" },
    { title: "Vigor Branding", cat: "multimedia", img: "vigor-branding.jpg" }
    // كملي باقي مشاريعك هون بنفس الطريقة
];

function loadProjects(filter = 'all') {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = '';
    
    const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
    
    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="project-card">
                <img src="${p.img}" alt="${p.title}">
                <div class="project-info">
                    <h3>${p.title}</h3>
                </div>
            </div>
        `;
    });
}

// 3. Filters Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
        loadProjects(btn.dataset.filter);
    });
});

// 4. Contact Panel Toggle
const contactBtn = document.getElementById('contact-btn');
const panel = document.getElementById('contact-panel');
const closeBtn = document.querySelector('.close-btn');

contactBtn.addEventListener('click', () => panel.classList.add('active'));
closeBtn.addEventListener('click', () => panel.classList.remove('active'));

// Initialize
loadProjects();
