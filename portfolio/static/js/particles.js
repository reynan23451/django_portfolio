// ENHANCED PARTICLES ANIMATION
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; // Random initial position
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulse = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Pulsing effect
            this.pulsePhase += this.pulse;
            const currentSize = this.size + Math.sin(this.pulsePhase) * 0.5;
            
            // Reset particle when it goes off screen
            if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
            }
            
            return currentSize;
        }
        
        draw() {
            const currentSize = this.update();
            
            // Create gradient for each particle
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize);
            gradient.addColorStop(0, `rgba(0, 247, 255, ${this.opacity})`);
            gradient.addColorStop(0.5, `rgba(138, 43, 226, ${this.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(0, 247, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
        }
        
        connectTo(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.2;
                ctx.strokeStyle = `rgba(0, 247, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
    }
    
    // Create particles
    const particleCount = Math.min(100, window.innerWidth / 10); // Responsive particle count
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((particle, i) => {
            particle.draw();
            
            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                particle.connectTo(particles[j]);
            }
            
            // Mouse interaction
            if (isMouseMoving) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.speedX += (dx / distance) * force * 0.1;
                    particle.speedY += (dy / distance) * force * 0.1;
                }
            }
            
            // Apply some friction
            particle.speedX *= 0.99;
            particle.speedY *= 0.99;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
