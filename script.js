// 1. Starfield Background Logic
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#EADEC8";
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
    });
    requestAnimationFrame(animateStars);
}

// 2. Project Data with Behance Links
const projects = [
    { title: "Between the Streets", cat: "film", img: "between-the-streets-cover.jpg", url: "https://www.behance.net/gallery/182512147/Between-the-Streets" },
    { title: "Senova – Mental Health App", cat: "multimedia", img: "senova-ui-ux.jpg", url: "https://www.behance.net/gallery/183204987/Senova-Mental-Health-App" },
    { title: "Vigor – Protein Brand Identity", cat: "multimedia", img: "vigor-branding.jpg", url: "https://www.behance.net/gallery/182506669/Vigor-Protein-Brand-Identity" },
    { title: "طين وفن", cat: "film", img: "teen-wa-fan-cover.jpg", url: "https://www.behance.net/reemal-aabd" },
    { title: "Echoes Inside", cat: "3d", img: "echoes-inside-cover.jpg", url: "https://www.behance.net/reemal-aabd" },
    { title: "Rahhal", cat: "film", img: "rahhal-cover.jpg", url: "https://www.behance.net/reemal-aabd" }
    // أضيفي الباقي بنفس الستايل
];

function loadGallery() {
    const grid = document.getElementById('project-grid');
    projects.forEach(p => {
        grid.innerHTML += `
            <div class="project-card" onclick="window.open('${p.url}', '_blank')">
                <img src="${p.img}" alt="${p.title}">
                <div class="project-overlay">
                    <h3>${p.title}</h3>
                    <p>View on Behance ↗</p>
                </div>
            </div>
        `;
    });
}

// Initialize Everything
window.addEventListener('resize', initStars);
initStars();
animateStars();
loadGallery();
