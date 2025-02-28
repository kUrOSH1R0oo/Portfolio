// Particle Background Setup
function initializeParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Failed to get 2D context for canvas!");
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.life = Math.random() * 60 + 30;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            if (this.life <= 0) {
                this.reset();
            }
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(57, 255, 20, ${this.life / 90})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = Math.random() * 60 + 30;
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
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();
}

window.onload = () => {
    initializeParticles();

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar .bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.width = '0'; 
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, 100);
                });
            } else {
                skillBars.forEach(bar => {
                    bar.style.width = '0';
                });
            }
        });
    }, {
        threshold: 0.5
    });

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