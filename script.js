document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    
    // "No" button evasion logic
    const moveNoButton = () => {
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate max boundaries within the container, keeping it accessible but moving
        const maxX = containerRect.width - btnRect.width - 20; // 20px padding
        const maxY = containerRect.height - btnRect.height - 20;
        
        const randomX = Math.floor(Math.random() * maxX) - (maxX / 2); // Center relative
        const randomY = Math.floor(Math.random() * maxY) - (maxY / 2);

        // Apply transform instead of absolute position to keep it in flow initially, 
        // but verify this logic.
        // Better approach for dodging: position absolute relative to container
        noBtn.style.position = 'absolute';
        
        // Random position within the container bounds
        // We need to calculate position relative to the .buttons container or main container
        // Let's use the main container for more space to run
        
        const mainContainer = document.querySelector('.container');
        const mainRect = mainContainer.getBoundingClientRect();
        
        const newX = Math.random() * (mainRect.width - btnRect.width - 40) + 20;
        const newY = Math.random() * (mainRect.height - btnRect.height - 40) + 20;
        
        // We need to set left/top relative to the container
        // Since .container is relative, we can just set left/top
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    };

    // Mobile touch support for "No" button
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // "Yes" button click
    yesBtn.addEventListener('click', () => {
        // Hide question, show success
        questionContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        
        // Trigger confetti
        launchConfetti();
        spawnPhotos();
    });

    function launchConfetti() {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    function spawnPhotos() {
        const photos = [
            "assets/photos/IMG_4152.jpeg",
            "assets/photos/IMG_5469.jpeg",
            "assets/photos/IMG_5469.jpeg",
            "assets/photos/IMG_5874.jpeg",
            "assets/photos/IMG_5898.jpeg",
            "assets/photos/IMG_6033.jpeg",
            "assets/photos/IMG_6126.jpeg",
            "assets/photos/IMG_6559.jpeg",
            "assets/photos/IMG_8406.jpeg",
            "assets/photos/IMG_8566.jpeg",
        ];

        const bursts = 25;
        const intervalMs = 120;

        let count = 0;
        const timer = setInterval(() => {
            popOnePhoto(photos[count % photos.length]);
            count += 1;
            if (count >= bursts) clearInterval(timer);
        }, intervalMs);
    }

});
