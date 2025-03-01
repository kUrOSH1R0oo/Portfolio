// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Custom Cursor
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    ring.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
});

// Mobile Touch Support for Cursor
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    ring.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
});

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Enhanced Interactive Particles
function initializeParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = Math.floor(window.innerWidth / 8);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.baseSpeedX = Math.random() * 0.5 - 0.25;
            this.baseSpeedY = Math.random() * 0.5 - 0.25;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
            this.connectDistance = 120;
            this.attractionStrength = 0.05;
            this.glow = 0;
        }
        update() {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
                this.speedX += (dx / distance) * this.attractionStrength;
                this.speedY += (dy / distance) * this.attractionStrength;
                this.glow = Math.min(1 - distance / 200, 0.8);
            } else {
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
                this.glow = Math.max(this.glow - 0.05, 0);
            }

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(57, 255, 20, ${0.5 + this.glow})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            if (this.glow > 0) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#39ff14';
            } else {
                ctx.shadowBlur = 0;
            }
        }
        connect() {
            for (let other of particlesArray) {
                const dx = this.x - other.x;
                const dy = this.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.connectDistance) {
                    ctx.strokeStyle = `rgba(57, 255, 20, ${1 - distance / this.connectDistance})`;
                    ctx.lineWidth = 1 + this.glow;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        }
    }

    function initParticles() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particlesArray) {
            particle.update();
            particle.connect();
            particle.draw();
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    });

    initParticles();
    animateParticles();
}

// Typing Effect
const typingElement = document.querySelector('.typing-effect');
const text = typingElement.getAttribute('data-text');
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            index = 0;
            typingElement.textContent = '';
            type();
        }, 2000);
    }
}

// Function to add gradient definition to SVG
function addGradientToSVG(svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#58a6ff');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#39ff14');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
}

// Window Load
window.onload = () => {
    initializeParticles();
    type();

    // Smooth Scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ 
                behavior: 'smooth' 
            });
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Add gradient to all skill circle SVGs
    document.querySelectorAll('.circle-svg').forEach(svg => {
        addGradientToSVG(svg);
    });

    // Skill Circles Animation
    const skillsSection = document.getElementById('skills');
    const skillCircles = document.querySelectorAll('.skill-circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillCircles.forEach(circle => {
                    const percentage = circle.getAttribute('data-percentage');
                    const progress = circle.querySelector('.circle-progress');
                    const circumference = 2 * Math.PI * 65; 
                    const offset = circumference - (percentage / 100) * circumference;
                    progress.style.strokeDashoffset = offset;
                });
            } else {
                skillCircles.forEach(circle => {
                    const progress = circle.querySelector('.circle-progress');
                    progress.style.strokeDashoffset = 408;
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.classList.add('hidden');
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    }
                }, 300);
            });
        });
    });
};