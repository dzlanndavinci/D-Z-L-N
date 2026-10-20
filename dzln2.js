// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        showNotification('✨ Selamat Datang!', 'Klik di mana saja untuk efek interaktif!');
    }, 1500);
});

// ===== RGB CURSOR =====
const cursorMain = document.getElementById('cursorMain');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let hue = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorMain.style.left = mouseX - 10 + 'px';
    cursorMain.style.top = mouseY - 10 + 'px';

    hue = (hue + 2) % 360;
    cursorMain.style.background = `conic-gradient(from ${hue}deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0088, #ff0000)`;
});

// Smooth ring follow
function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX - 20 + 'px';
    cursorRing.style.top = ringY - 20 + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Cursor grow on hover
document.querySelectorAll('a, button, .card, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = '#ff0080';
        cursorMain.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.5)';
        cursorMain.style.transform = 'scale(1)';
    });
});

// ===== CLICK RIPPLE EFFECT =====
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX - 100 + 'px';
    ripple.style.top = e.clientY - 100 + 'px';
    ripple.style.background = `radial-gradient(circle, hsl(${Math.random()*360}, 100%, 60%), transparent)`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);

    // Spawn particles on click
    for (let i = 0; i < 8; i++) {
        createClickParticle(e.clientX, e.clientY);
    }
});

function createClickParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.borderRadius = '50%';
    particle.style.background = `hsl(${Math.random()*360}, 100%, 60%)`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '99995';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let posX = 0, posY = 0, opacity = 1;
    function animate() {
        posX += vx * 0.02;
        posY += vy * 0.02 + 1;
        opacity -= 0.02;
        particle.style.transform = `translate(${posX}px, ${posY}px)`;
        particle.style.opacity = opacity;
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    animate();
}

// ===== FLOATING PARTICLES =====
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.background = `hsl(${Math.random()*360}, 100%, 60%)`;
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 20000);
}

setInterval(createParticle, 300);
for (let i = 0; i < 30; i++) setTimeout(createParticle, i * 100);

// ===== FLOATING SHAPES =====
const shapesContainer = document.getElementById('floatingShapes');
const shapeTypes = ['●', '■', '▲', '◆', '★'];
for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.textContent = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.fontSize = (Math.random() * 40 + 20) + 'px';
    shape.style.color = `hsl(${Math.random()*360}, 100%, 60%)`;
    shape.style.animationDelay = Math.random() * 10 + 's';
    shape.style.animationDuration = (Math.random() * 20 + 15) + 's';
    shapesContainer.appendChild(shape);
}

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .section-title, .counter-section, .color-mixer').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// ===== MUSIC CONTROL =====
const bgAudio = document.getElementById('bgAudio');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgAudio.pause();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('playing');
    } else {
        bgAudio.play().catch(e => console.log('Audio play failed:', e));
        musicBtn.textContent = '⏸️';
        musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// ===== AUDIO VISUALIZER =====
const visualizer = document.getElementById('visualizer');
const barCount = 60;
for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'viz-bar';
    bar.style.height = '5px';
    visualizer.appendChild(bar);
}

function animateVisualizer() {
    const bars = document.querySelectorAll('.viz-bar');
    bars.forEach((bar, i) => {
        if (isPlaying) {
            const height = Math.random() * 40 + 5;
            bar.style.height = height + 'px';
            bar.style.background = `linear-gradient(to top, hsl(${(i/barCount)*360}, 100%, 60%), hsl(${(i/barCount)*360 + 60}, 100%, 60%))`;
        } else {
            bar.style.height = '5px';
        }
    });
    requestAnimationFrame(animateVisualizer);
}
animateVisualizer();

// ===== COUNTER =====
let count = 0;
const counterDisplay = document.getElementById('counterDisplay');

document.getElementById('increaseBtn').addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
    counterDisplay.style.transform = 'scale(1.3)';
    setTimeout(() => counterDisplay.style.transform = 'scale(1)', 200);
});

document.getElementById('decreaseBtn').addEventListener('click', () => {
    count--;
    counterDisplay.textContent = count;
    counterDisplay.style.transform = 'scale(0.8)';
    setTimeout(() => counterDisplay.style.transform = 'scale(1)', 200);
});

document.getElementById('resetBtn').addEventListener('click', () => {
    count = 0;
    counterDisplay.textContent = count;
    counterDisplay.style.transform = 'scale(1.5) rotate(360deg)';
    setTimeout(() => counterDisplay.style.transform = 'scale(1) rotate(0deg)', 500);
});

// ===== COLOR MIXER =====
const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const colorPreview = document.getElementById('colorPreview');

function updateColor() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;
    document.getElementById('redVal').textContent = r;
    document.getElementById('greenVal').textContent = g;
    document.getElementById('blueVal').textContent = b;
    colorPreview.style.background = `rgb(${r}, ${g}, ${b})`;
    colorPreview.style.boxShadow = `0 0 60px rgba(${r}, ${g}, ${b}, 0.5)`;
}

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);

// ===== INTERACTIVE TEXT =====
const interactiveText = document.getElementById('interactiveText');
const text = interactiveText.textContent;
interactiveText.innerHTML = '';
text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    interactiveText.appendChild(span);
});

// ===== TOOLTIP =====
const tooltip = document.getElementById('tooltip');
document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        tooltip.textContent = el.getAttribute('data-tooltip');
        tooltip.style.opacity = '1';
    });
    el.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.clientX + 20 + 'px';
        tooltip.style.top = e.clientY - 10 + 'px';
    });
    el.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
});

// ===== THEME TOGGLE =====
const themes = [
    { overlay: 'linear-gradient(135deg, rgba(10,10,10,0.7), rgba(20,0,40,0.8))' },
    { overlay: 'linear-gradient(135deg, rgba(0,10,20,0.7), rgba(0,20,40,0.8))' },
    { overlay: 'linear-gradient(135deg, rgba(20,0,0,0.7), rgba(40,0,20,0.8))' },
    { overlay: 'linear-gradient(135deg, rgba(0,20,0,0.7), rgba(0,40,20,0.8))' },
];
let currentTheme = 0;

document.getElementById('themeBtn').addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    document.querySelector('.bg-overlay').style.background = themes[currentTheme].overlay;
    showNotification('🎨 Tema Berubah!', `Tema ${currentTheme + 1} dari ${themes.length} aktif`);
});

// ===== NOTIFICATION =====
function showNotification(title, body) {
    const notif = document.getElementById('notification');
    notif.querySelector('.notification-title').textContent = title;
    notif.querySelector('.notification-body').textContent = body;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== PARALLAX ON MOUSE MOVE =====
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelector('.bg-video').style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        musicBtn.click();
    }
    if (e.key === 't' || e.key === 'T') {
        document.getElementById('themeBtn').click();
    }
});

console.log('%c✨ Website Super Interaktif', 'font-size: 24px; color: #ff0080; font-weight: bold;');
console.log('%cDibuat dengan ❤️', 'font-size: 14px; color: #7928ca;');