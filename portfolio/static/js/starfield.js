// STARFIELD PARTICLE SYSTEM
class StarField {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 200;
        this.speed = 0.5;
        
        this.init();
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create stars
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                size: Math.random() * 2,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw stars
        this.stars.forEach(star => {
            // Update position (3D effect)
            star.z -= this.speed;
            if (star.z <= 0) {
                star.x = Math.random() * this.canvas.width;
                star.y = Math.random() * this.canvas.height;
                star.z = 1000;
            }
            
            // Calculate screen position
            const x = (star.x - this.canvas.width / 2) * (600 / star.z) + this.canvas.width / 2;
            const y = (star.y - this.canvas.height / 2) * (600 / star.z) + this.canvas.height / 2;
            const size = (1 - star.z / 1000) * star.size * 3;
            const opacity = (1 - star.z / 1000) * star.opacity;
            
            // Twinkle effect
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
            
            // Draw star
            this.ctx.save();
            this.ctx.globalAlpha = opacity * twinkle;
            
            // Star color variations
            const colors = [
                '#ffffff', // White
                '#ffe9c4', // Warm white
                '#d4e4ff', // Cool white
                '#ffd4d4', // Pink tint
                '#d4d4ff'  // Blue tint
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Draw star with glow
            this.ctx.shadowBlur = size * 4;
            this.ctx.shadowColor = color;
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw cross effect for brighter stars
            if (size > 1.5) {
                this.ctx.globalAlpha = opacity * twinkle * 0.5;
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = size * 0.3;
                this.ctx.beginPath();
                this.ctx.moveTo(x - size * 2, y);
                this.ctx.lineTo(x + size * 2, y);
                this.ctx.moveTo(x, y - size * 2);
                this.ctx.lineTo(x, y + size * 2);
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize starfield when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const starField = new StarField('particles');
    
    // Mouse interaction - stars react to mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add speed boost based on mouse movement
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;
        
        starField.speed = 0.5 + Math.abs(deltaX) * 2 + Math.abs(deltaY) * 2;
    });
    
    // Reset speed when mouse stops
    let mouseTimer;
    document.addEventListener('mousemove', () => {
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => {
            starField.speed = 0.5;
        }, 1000);
    });
    
    // Add shooting stars occasionally
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            starField.createShootingStar();
        }
    }, 3000);
    
    // Method to create shooting stars
    starField.createShootingStar = function() {
        const shootingStar = {
            x: Math.random() * this.canvas.width,
            y: 0,
            z: 1000,
            size: Math.random() * 3 + 2,
            opacity: 1,
            speed: Math.random() * 10 + 15,
            trail: []
        };
        
        // Animate shooting star
        const animateShootingStar = () => {
            if (shootingStar.opacity <= 0) return;
            
            // Update position
            shootingStar.y += shootingStar.speed;
            shootingStar.x += shootingStar.speed * 0.3;
            shootingStar.opacity -= 0.02;
            
            // Add to trail
            shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y, opacity: shootingStar.opacity });
            if (shootingStar.trail.length > 20) {
                shootingStar.trail.shift();
            }
            
            // Draw trail
            shootingStar.trail.forEach((point, index) => {
                this.ctx.save();
                this.ctx.globalAlpha = point.opacity * (index / shootingStar.trail.length) * 0.5;
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#ffffff';
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, shootingStar.size * (index / shootingStar.trail.length), 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            });
            
            // Draw main star
            this.ctx.save();
            this.ctx.globalAlpha = shootingStar.opacity;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            requestAnimationFrame(animateShootingStar);
        };
        
        animateShootingStar();
    };
});
