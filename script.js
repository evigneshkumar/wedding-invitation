// ===================================
// Global Variables
// ===================================
let audioPlaying = false;

// ===================================
// Audio Player
// ===================================
const audioToggle = document.getElementById('audioToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

audioToggle.addEventListener('click', () => {
    if (audioPlaying) {
        backgroundMusic.pause();
        audioToggle.classList.remove('playing');
    } else {
        backgroundMusic.play();
        audioToggle.classList.add('playing');
    }
    audioPlaying = !audioPlaying;
});

// ===================================
// Curtain Reveal Effect
// ===================================
const leftCurtain = document.querySelector("#leftCurtain");
const rightCurtain = document.querySelector("#rightCurtain");
const revealContent = document.getElementById('revealContent');
const confettiCanvas = document.getElementById('confettiCanvas');
const stage = document.getElementById('stage');

let curtainOpened = false;

// Click to open curtains
stage.addEventListener('click', openCurtains);

function openCurtains() {
    if (curtainOpened) return;
    curtainOpened = true;

    // Add the opened class to trigger the CSS transitions
    // This handles the smooth scaling and translation of the entire curtain group
    stage.classList.add('opened');

    // Show names and trigger confetti after curtains start opening
    setTimeout(() => {
        revealContent.classList.add('visible');
        triggerConfetti();

        // Auto-play music if not already playing
        if (!audioPlaying) {
            backgroundMusic.play().catch(() => {
                console.log('Autoplay prevented. User must interact with audio button.');
            });
            audioToggle.classList.add('playing');
            audioPlaying = true;
        }
    }, 800);
}

// ===================================
// Confetti Effect
// ===================================
function triggerConfetti() {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#800020', '#d4af37', '#f5f5dc', '#f4d03f', '#a0304a'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    // Animation loop
    let animationFrames = 0;
    const maxFrames = 300; // 5 seconds at 60fps
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        animationFrames++;
        if (animationFrames < maxFrames) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animateConfetti();
}

// ===================================
// Scratch-to-Reveal Effect
// ===================================
const scratchCanvases = document.querySelectorAll('.scratch-canvas');
let allCardsRevealed = false;

function revealAllCards() {
    if (allCardsRevealed) return;
    allCardsRevealed = true;
    
    scratchCanvases.forEach(canvas => {
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.pointerEvents = 'none';
        }, 500);
    });
}

scratchCanvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = 150;
    canvas.height = 150;
    
    // Draw gold scratch layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(0.5, '#f4d03f');
    gradient.addColorStop(1, '#b8860b');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 50; i++) {
        ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            2,
            2
        );
    }
    
    // Add "Scratch Here" text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = 'bold 16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch', canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText('Here', canvas.width / 2, canvas.height / 2 + 10);
    
    let isScratching = false;
    let scratchPercentage = 0;
    let isRevealed = false;
    
    function scratch(x, y) {
        if (isRevealed) return;
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Calculate scratch percentage - check actual transparency
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        const totalPixels = canvas.width * canvas.height;
        
        // Check every pixel's alpha channel
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) { // Consider semi-transparent as scratched
                transparent++;
            }
        }
        
        scratchPercentage = (transparent / totalPixels) * 100;
        
        // If 20% scratched, reveal all cards
        if (scratchPercentage > 20 && !isRevealed) {
            isRevealed = true;
            revealAllCards();
        }
    }
    
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        if (e.type.includes('mouse')) {
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        } else {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
    }
    
    canvas.addEventListener('mousedown', (e) => {
        isScratching = true;
        const pos = getPosition(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isScratching = false;
    });
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isScratching = true;
        const pos = getPosition(e);
        scratch(pos.x, pos.y);
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    }, { passive: false });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isScratching = false;
    }, { passive: false });
});

// ===================================
// Countdown Timer
// ===================================
const weddingDate = new Date('2026-05-08T18:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem; color: var(--gold);">The Big Day is Here! 🎉</p>';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ===================================
// Interactive Map
// ===================================
const venueMap = document.getElementById('venueMap');

if (venueMap) {
    // The venue map is now a link, so we don't need to add click handler
    // The link will handle navigation to Google Maps
    venueMap.style.cursor = 'pointer';
}

// ===================================
// RSVP Section
// ===================================
// RSVP is now handled via Google Forms link
// No form validation needed as it's an external link

// ===================================
// Scroll Animations with Intersection Observer
// ===================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with animation
const animatedSections = document.querySelectorAll('.section-animate');
animatedSections.forEach(section => {
    observer.observe(section);
});

// ===================================
// Parallax Effect
// ===================================
// Parallax effect removed to prevent venue image from moving out of position

// ===================================
// Smooth Scroll for Internal Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===================================
// Resize Handler
// ===================================
window.addEventListener('resize', () => {
    // Update confetti canvas size if visible
    if (curtainOpened) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
});

// ===================================
// Prevent Context Menu on Interactive Elements
// ===================================
document.querySelectorAll('.curtain, .scratch-canvas, .venue-illustration').forEach(element => {
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Message
// ===================================
console.log('%c💍 Vignesh Kumar & Venmani Sekar Wedding Invitation 💍', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cMay 08, 2026', 'font-size: 14px; color: #800020;');
console.log('%cECR Mahal, Veppampattu, Chennai', 'font-size: 12px; color: #2a2a2a;');

