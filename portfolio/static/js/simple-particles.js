// SIMPLE PARTICLE OVERLAY SYSTEM
class SimpleParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 50; // Fewer particles for subtle effect
        
        this.init();
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create simple particles
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(168, 85, 247, ',  // Purple
            'rgba(0, 247, 255, ',     // Cyan  
            'rgba(255, 107, 53, ',    // Orange
            'rgba(255, 255, 255, ',  // White
            'rgba(138, 43, 226, '    // Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        // Clear canvas completely (no trail effect)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Update twinkle
            particle.twinklePhase += particle.twinkleSpeed;
            const twinkle = Math.sin(particle.twinklePhase) * 0.3 + 0.7;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * twinkle;
            this.ctx.fillStyle = particle.color + (particle.opacity * twinkle) + ')';
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.shadowColor = particle.color + '0.8)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const particles = new SimpleParticles('particles');
});
