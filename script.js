// ===================================
// Global Variables
// ===================================
let curtainOpened = false;
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
const curtainLeft = document.getElementById('curtainLeft');
const curtainRight = document.getElementById('curtainRight');
const revealContent = document.getElementById('revealContent');
const confettiCanvas = document.getElementById('confettiCanvas');

let isDragging = false;
let startX = 0;
let currentX = 0;

// Mouse/Touch Events for Curtain
function handleStart(e) {
    if (curtainOpened) return;
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    curtainLeft.style.cursor = 'grabbing';
    curtainRight.style.cursor = 'grabbing';
}

function handleMove(e) {
    if (!isDragging || curtainOpened) return;
    
    currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    
    // Only allow opening (dragging apart)
    if (Math.abs(deltaX) > 50) {
        openCurtains();
    }
}

function handleEnd() {
    isDragging = false;
    curtainLeft.style.cursor = 'grab';
    curtainRight.style.cursor = 'grab';
}

function openCurtains() {
    if (curtainOpened) return;
    
    curtainOpened = true;
    curtainLeft.classList.add('open');
    curtainRight.classList.add('open');
    
    // Show reveal content after curtain animation
    setTimeout(() => {
        revealContent.classList.add('visible');
        triggerConfetti();
        
        // Auto-play music if not already playing
        if (!audioPlaying) {
            backgroundMusic.play().catch(() => {
                // Handle autoplay restrictions
                console.log('Autoplay prevented. User must interact with audio button.');
            });
            audioToggle.classList.add('playing');
            audioPlaying = true;
        }
    }, 600);
}

// Add event listeners for curtain
curtainLeft.addEventListener('mousedown', handleStart);
curtainRight.addEventListener('mousedown', handleStart);
curtainLeft.addEventListener('touchstart', handleStart);
curtainRight.addEventListener('touchstart', handleStart);

document.addEventListener('mousemove', handleMove);
document.addEventListener('touchmove', handleMove);

document.addEventListener('mouseup', handleEnd);
document.addEventListener('touchend', handleEnd);

// Click to open curtains
curtainLeft.addEventListener('click', openCurtains);
curtainRight.addEventListener('click', openCurtains);

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
    
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Calculate scratch percentage
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) transparent++;
        }
        scratchPercentage = (transparent / (canvas.width * canvas.height)) * 100;
        
        // If 50% scratched, reveal completely
        if (scratchPercentage > 50) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = '0';
            canvas.style.transition = 'opacity 0.5s';
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
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('touchend', () => {
        isScratching = false;
    });
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

venueMap.addEventListener('click', () => {
    const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=ECR+Mahal+Veppampattu+Chennai';
    window.open(googleMapsUrl, '_blank');
});

// Add hover effect
venueMap.style.cursor = 'pointer';

// ===================================
// RSVP Form
// ===================================
const rsvpForm = document.getElementById('rsvpForm');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const guestCountGroup = document.getElementById('guestCountGroup');
const formMessage = document.getElementById('formMessage');

// Show/hide additional fields based on attendance
attendanceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'yes') {
            guestCountGroup.style.display = 'block';
        } else {
            guestCountGroup.style.display = 'none';
        }
    });
});

// Form submission
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission (in production, send to backend)
    console.log('RSVP Data:', data);
    
    // Show success message
    formMessage.textContent = 'Thank you for your RSVP! We look forward to celebrating with you.';
    formMessage.className = 'form-message success';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        rsvpForm.reset();
        formMessage.style.display = 'none';
        guestCountGroup.style.display = 'none';
    }, 3000);
    
    // In production, you would send data to a backend:
    /*
    fetch('/api/rsvp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        formMessage.textContent = 'Thank you for your RSVP!';
        formMessage.className = 'form-message success';
    })
    .catch(error => {
        formMessage.textContent = 'Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
    });
    */
});

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
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for venue illustration
    const venueSection = document.querySelector('.venue-section');
    if (venueSection) {
        const venueIllustration = document.querySelector('.villa-illustration');
        const venueOffset = venueSection.offsetTop;
        const venueScroll = scrolled - venueOffset;
        
        if (venueScroll > -window.innerHeight && venueScroll < window.innerHeight) {
            const parallaxValue = venueScroll * 0.3;
            venueIllustration.style.transform = `translateY(${parallaxValue}px)`;
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

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

// Made with Bob
