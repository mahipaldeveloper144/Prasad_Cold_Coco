// --- Countdown Timer ---
// Targeted Date: February 15th, 2026
const countdownDate = new Date("Feb 17, 2026 10:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the UI
    if (document.getElementById('days')) document.getElementById('days').innerText = days.toString().padStart(2, '0');
    if (document.getElementById('hours')) document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    if (document.getElementById('minutes')) document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    if (document.getElementById('seconds')) document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownContainer = document.querySelector('.countdown-container');
        countdownContainer.classList.add('countdown-containerLive');
        countdownContainer.innerHTML = "<h3 class='live-text'>We are LIVE!</h3>";

        // Trigger celebration
        launchCelebration();
    }
}

function launchCelebration() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    // --- Side Blasts (Bottom Corners) ---
    const blastDefaults = { startVelocity: 45, spread: 80, ticks: 110, zIndex: 1000 };
    const blastInterval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(blastInterval);
        }

        const particleCount = 75 * (timeLeft / duration);

        // Blast from Bottom Left
        confetti(Object.assign({}, blastDefaults, {
            particleCount,
            angle: 60,
            origin: { x: 0, y: 1 }
        }));

        // Blast from Bottom Right
        confetti(Object.assign({}, blastDefaults, {
            particleCount,
            angle: 120,
            origin: { x: 1, y: 1 }
        }));
    }, 250);

    // --- Rain Effect (Top) ---
    // Custom colors matching the brand
    const colors = ['#D2691E', '#4E342E', '#FFD700', '#ffffff', '#FF5733'];

    const rainInterval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(rainInterval);
        }

        // Spawn drops randomly across the top
        confetti({
            particleCount: 5,
            angle: 270, // Downwards
            spread: 55,
            origin: { x: Math.random(), y: -0.1 }, // Start slightly above screen
            colors: colors,
            startVelocity: 10,
            gravity: 0.9,
            scalar: 0.9,
            ticks: 300,
            zIndex: 999
        });
    }, 50);
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// --- Custom Cursor ---
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(78, 52, 46, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// --- Background Blob Movement ---
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelector('.blob-1').style.transform = `translate(${moveX}px, ${moveY}px)`;
    document.querySelector('.blob-2').style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    document.querySelector('.blob-3').style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
});

// --- Text Reveal Animation ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-text').forEach(text => {
    observer.observe(text);
});
