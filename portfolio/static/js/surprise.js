// SURPRISE EASTER EGG GAME
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const easterEgg = document.getElementById('easterEgg');
    const surpriseOverlay = document.getElementById('surpriseOverlay');
    const rocketContainer = document.getElementById('rocketContainer');
    const rocket = document.getElementById('rocket');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeBtn = document.getElementById('welcomeBtn');
    const animeCharacterContainer = document.querySelector('.anime-character-container');
    
    let isGameActive = false;
    
    // Show easter egg after a delay
    setTimeout(() => {
        easterEgg.classList.add('visible');
    }, 3000);
    
    // Easter egg click handler
    easterEgg.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isGameActive) {
            startSurpriseGame();
        }
    });
    
    function startSurpriseGame() {
        isGameActive = true;
        
        // Hide easter egg
        easterEgg.classList.remove('visible');
        
        // Start screen splitting animation
        setTimeout(() => {
            surpriseOverlay.classList.add('active');
            
            // Play sound effect (if available)
            playSound('split');
        }, 300);
        
        // Show rocket after split animation starts
        setTimeout(() => {
            rocketContainer.classList.add('active');
            
            // Launch rocket after a moment
            setTimeout(() => {
                launchRocket();
            }, 1000);
        }, 800);
    }
    
    function launchRocket() {
        rocketContainer.classList.add('launching');
        playSound('rocket');
        
        // Show welcome screen after rocket launches
        setTimeout(() => {
            showWelcomeScreen();
        }, 2000);
    }
    
    function showWelcomeScreen() {
        welcomeScreen.classList.add('active');
        
        // Animate anime character
        animateCharacter();
        
        // Add floating particles
        animateWelcomeParticles();
        
        // Play welcome sound
        playSound('welcome');
    }
    
    function animateCharacter() {
        // Add extra interactions for the dancing anime character
        if (animeCharacterContainer) {
            // Make container bounce more on hover
            animeCharacterContainer.addEventListener('mouseenter', () => {
                animeCharacterContainer.style.animation = 'characterBounce 0.5s ease-in-out infinite, danceGlow 1s ease-in-out infinite';
            });
            
            animeCharacterContainer.addEventListener('mouseleave', () => {
                animeCharacterContainer.style.animation = 'characterBounce 2s ease-in-out infinite';
            });
            
            // Add dance party effect when clicking on the character
            animeCharacterContainer.addEventListener('click', () => {
                createDanceParty();
                playSound('dance');
            });
        }
    }
    
    function createDanceParty() {
        // Create extra confetti and effects for dance party
        const colors = ['#ff6b35', '#f7931e', '#fdc830', '#00f7ff', '#8a2be2', '#ffeaa7'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 15 + 5}px;
                height: ${Math.random() * 15 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 0.9;
                transform: rotate(${Math.random() * 360}deg);
                transition: all 3s ease-out;
                pointer-events: none;
                z-index: 10002;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.transform = `rotate(${Math.random() * 1440}deg) translateX(${(Math.random() - 0.5) * 200}px)`;
                confetti.style.opacity = '0';
            }, Math.random() * 500);
            
            setTimeout(() => {
                confetti.remove();
            }, 3500);
        }
        
        // Show dance message
        showDanceMessage();
    }
    
    function showDanceMessage() {
        const danceMsg = document.createElement('div');
        danceMsg.innerHTML = '🎉 DANCE PARTY! 🎉';
        danceMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            font-size: 3rem;
            font-weight: bold;
            color: #ff6b35;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
            z-index: 10003;
            pointer-events: none;
            animation: danceMessagePop 2s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes danceMessagePop {
                0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
                50% { transform: translate(-50%, -50%) scale(1.2) rotate(10deg); }
                100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(danceMsg);
        
        setTimeout(() => {
            danceMsg.remove();
            style.remove();
        }, 2000);
    }
    
    function animateWelcomeParticles() {
        const particles = document.querySelectorAll('.welcome-particle');
        particles.forEach((particle, index) => {
            // Add random delays to particle animations
            particle.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    // Welcome button handler
    welcomeBtn.addEventListener('click', function() {
        closeWelcomeScreen();
    });
    
    function closeWelcomeScreen() {
        welcomeScreen.classList.remove('active');
        
        // Hide overlay
        setTimeout(() => {
            surpriseOverlay.classList.remove('active');
            rocketContainer.classList.remove('active', 'launching');
            
            // Reset game state
            isGameActive = false;
            
            // Show easter egg again after delay
            setTimeout(() => {
                easterEgg.classList.add('visible');
            }, 2000);
        }, 800);
        
        playSound('close');
    }
    
    // Sound effects (placeholder - you can add actual sound files)
    function playSound(type) {
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'split':
                oscillator.frequency.value = 200;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'rocket':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.15;
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
            case 'welcome':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.1;
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'dance':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.2;
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.4);
                break;
            case 'close':
                oscillator.frequency.value = 300;
                gainNode.gain.value = 0.1;
                oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
        }
    }
    
    // Keyboard shortcut to trigger easter egg (Ctrl + Shift + E)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            if (!isGameActive && easterEgg.classList.contains('visible')) {
                startSurpriseGame();
            }
        }
    });
    
    // Add some extra fun - character follows mouse slightly on welcome screen
    welcomeScreen.addEventListener('mousemove', function(e) {
        if (welcomeScreen.classList.contains('active') && animeCharacterContainer) {
            const rect = welcomeScreen.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 50;
            const moveY = (y - centerY) / 50;
            
            animeCharacterContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // Add character wave animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes characterWave {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-10deg) scale(1.05); }
            75% { transform: rotate(10deg) scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    
    // Add confetti effect when welcome screen appears
    function createConfetti() {
        const colors = ['#00f7ff', '#8a2be2', '#ffeaa7', '#74b9ff', '#ff6b35'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 0.8;
                transform: rotate(${Math.random() * 360}deg);
                transition: all 2s ease-out;
                pointer-events: none;
                z-index: 10002;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
                confetti.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                confetti.remove();
            }, 2100);
        }
    }
    
    // Trigger confetti when welcome screen appears
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (welcomeScreen.classList.contains('active')) {
                    setTimeout(createConfetti, 500);
                }
            }
        });
    });
    
    observer.observe(welcomeScreen, { attributes: true });
    
});
