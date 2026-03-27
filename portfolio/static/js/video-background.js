// VIDEO BACKGROUND CONTROLLER
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background');
    
    if (video) {
        // Set video properties
        video.playbackRate = 0.8; // Slow down slightly for cinematic effect
        video.volume = 0; // Ensure muted
        
        // Handle video loading
        video.addEventListener('loadeddata', function() {
            console.log('Video background loaded successfully');
        });
        
        // Handle video errors
        video.addEventListener('error', function(e) {
            console.log('Video loading failed, falling back to image background');
            // Hide video if it fails to load
            video.style.display = 'none';
        });
        
        // Play video (may be needed for some browsers)
        video.play().catch(function(error) {
            console.log('Autoplay prevented, will play on first interaction');
            // Add click to play for browsers that block autoplay
            document.addEventListener('click', function playVideo() {
                video.play();
                document.removeEventListener('click', playVideo);
            }, { once: true });
        });
    }
});
