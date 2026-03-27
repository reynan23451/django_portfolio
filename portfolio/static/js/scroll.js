// PARALLAX SCROLLING AND REVEAL ANIMATIONS
document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax scrolling for background layers
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const floatingElements = document.querySelectorAll('.floating-element');
    const abstractShapes = document.querySelectorAll('.abstract-shape');
    const blobs = document.querySelectorAll('.blob');
    const patterns = document.querySelectorAll('.abstract-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for background layers
        parallaxLayers.forEach((layer, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
        
        // Parallax effect for floating elements
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.2);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.001 + index) * 20;
            element.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
        
        // Parallax effect for abstract shapes
        abstractShapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.15);
            const yPos = -(scrolled * speed);
            const xPos = Math.cos(scrolled * 0.0008 + index) * 15;
            const rotation = scrolled * 0.05 * (index % 2 === 0 ? 1 : -1);
            shape.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation}deg)`;
        });
        
        // Parallax effect for blobs
        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.0006 + index * 2) * 25;
            const scale = 1 + Math.sin(scrolled * 0.001 + index) * 0.1;
            blob.style.transform = `translate(${xPos}px, ${yPos}px) scale(${scale})`;
        });
        
        // Parallax effect for patterns
        patterns.forEach((pattern, index) => {
            const speed = 0.05 + (index * 0.03);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.02 * (index % 2 === 0 ? 1 : -1);
            pattern.style.transform = `translate(0, ${yPos}px) rotate(${rotation}deg)`;
        });
        
        // Trigger abstract elements based on scroll position
        const scrollPercent = scrolled / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Reveal abstract shapes gradually
        abstractShapes.forEach((shape, index) => {
            const triggerPoint = 0.1 + (index * 0.05);
            if (scrollPercent > triggerPoint) {
                shape.classList.add('visible');
            }
        });
        
        // Reveal blobs gradually
        blobs.forEach((blob, index) => {
            const triggerPoint = 0.15 + (index * 0.08);
            if (scrollPercent > triggerPoint) {
                blob.classList.add('visible');
            }
        });
        
        // Reveal patterns gradually
        patterns.forEach((pattern, index) => {
            const triggerPoint = 0.2 + (index * 0.1);
            if (scrollPercent > triggerPoint) {
                pattern.classList.add('visible');
            }
        });
    });
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.bar span');
                    if (bar) {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.transition = 'width 1s ease';
                            bar.style.width = width;
                        }, 200);
                    }
                }
                
                // Trigger abstract elements when sections come into view
                if (entry.target.classList.contains('section')) {
                    const sectionId = entry.target.id;
                    triggerAbstractElements(sectionId);
                }
            }
        });
    }, observerOptions);
    
    // Function to trigger abstract elements based on section
    function triggerAbstractElements(sectionId) {
        switch(sectionId) {
            case 'about':
                setTimeout(() => {
                    document.querySelector('.shape-1')?.classList.add('visible');
                    document.querySelector('.blob-1')?.classList.add('visible');
                }, 300);
                break;
            case 'skills':
                setTimeout(() => {
                    document.querySelector('.shape-2')?.classList.add('visible');
                    document.querySelector('.shape-3')?.classList.add('visible');
                    document.querySelector('.pattern-1')?.classList.add('visible');
                }, 300);
                break;
            case 'education':
                setTimeout(() => {
                    document.querySelector('.shape-4')?.classList.add('visible');
                    document.querySelector('.shape-5')?.classList.add('visible');
                    document.querySelector('.blob-2')?.classList.add('visible');
                }, 300);
                break;
            case 'projects':
                setTimeout(() => {
                    document.querySelector('.shape-6')?.classList.add('visible');
                    document.querySelector('.pattern-2')?.classList.add('visible');
                    document.querySelector('.blob-3')?.classList.add('visible');
                }, 300);
                break;
            case 'contact':
                setTimeout(() => {
                    document.querySelector('.pattern-3')?.classList.add('visible');
                }, 300);
                break;
        }
    }
    
    // Observe elements for reveal animations
    const elementsToObserve = document.querySelectorAll(
        '.section-title, .about-container, .skill-card, .education-card, .project-card, .contact-box, .typing, .section'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Navbar background on scroll
    const navbar = document.querySelector('.nav-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.5)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Mouse interaction with abstract elements
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Make blobs react to mouse
        blobs.forEach((blob, index) => {
            const rect = blob.getBoundingClientRect();
            const blobX = rect.left + rect.width / 2;
            const blobY = rect.top + rect.height / 2;
            
            const dx = mouseX - blobX;
            const dy = mouseY - blobY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                const moveX = (dx / distance) * force * 10;
                const moveY = (dy / distance) * force * 10;
                
                blob.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.1})`;
            }
        });
    });
    
    // Original code
    const elements = document.querySelectorAll(".section");
    window.addEventListener("scroll", () => {
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if(position < window.innerHeight - 100){
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    });
    
});