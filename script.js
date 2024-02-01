
document.addEventListener('DOMContentLoaded', function() {
    const emojiSet = ["❤️", "💕", "💓", "💖", "💗", "💛", "🥰", "💘", "💞"];
    let lastX = -10;
    let lastY = -10;

    document.addEventListener('mousemove', function(event) {
        const distance = Math.sqrt(Math.pow(event.clientX - lastX, 2) + Math.pow(event.clientY - lastY, 2));
        if (distance > 5) {
            lastX = event.clientX;
            lastY = event.clientY;
            spawnEmoji(event.clientX, event.clientY);
        }
    });

    function spawnEmoji(x, y) {
        const emoji = document.createElement('div');
        emoji.innerHTML = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        emoji.style.userSelect = 'none';
        emoji.style.pointerEvents = 'none';
        const rotation = Math.random() * 120 - 60; // Random rotation between -60 and +60 degrees
        emoji.style.transform = `rotate(${rotation}deg)`;
        document.body.appendChild(emoji);

        // Animation: descend and fade out
        let opacity = 1;
        const interval = setInterval(function() {
            opacity -= 0.1;
            y += 5;
            emoji.style.opacity = opacity;
            emoji.style.top = `${y}px`;
            if (opacity <= 0) {
                clearInterval(interval);
                document.body.removeChild(emoji);
            }
        }, 100); // Update every 100 ms for 1 second total duration
    }

    // Existing code for the "No" button and image changing
    const noButton = document.getElementById('noButton');
    noButton.style.transition = 'all 0.5s ease'; // Ensure transition is applied from the start

    function handleNoButtonMove(event) {
        const noButton = event.target;
        const margin = 38; // Margin in pixels for 1 cm
        const minMovePercentage = 0.15; // Minimum movement as a percentage of the screen's max distance
        const maxMoveX = window.innerWidth - noButton.offsetWidth - margin * 2;
        const maxMoveY = window.innerHeight - noButton.offsetHeight - margin * 2;
        const minMoveX = maxMoveX * minMovePercentage;
        const minMoveY = maxMoveY * minMovePercentage;

        // Ensure the new position is within the viewport
        const newX = Math.min(window.innerWidth - noButton.offsetWidth - margin, margin + minMoveX + Math.random() * (maxMoveX - minMoveX));
        const newY = Math.min(window.innerHeight - noButton.offsetHeight - margin, margin + minMoveY + Math.random() * (maxMoveY - minMoveY));

        noButton.style.position = 'absolute';
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    
        // Get the current image source
        const valentineImage = document.getElementById('valentineImage');
        const currentSrc = valentineImage.src.split('/').pop(); // Extract the filename
    
        // Determine and set the new image source
        valentineImage.src = currentSrc === 'image2.png' ? 'image2.1.png' : 'image2.png';
    }
    
    // Attach this function to the "No" button event listener
    document.getElementById('noButton').addEventListener('mouseover', handleNoButtonMove);
    document.getElementById('noButton').addEventListener('touchstart', handleNoButtonMove, {passive: true});

    noButton.addEventListener('mouseover', handleNoButtonMove);
    noButton.addEventListener('touchstart', handleNoButtonMove, {passive: true});

    document.getElementById('yesButton').addEventListener('click', function() {
        // Change image to IMAGE3
        document.getElementById('valentineImage').src = 'image3.png';
        // Redirect after a delay
        setTimeout(function() {
            window.location.href = 'nextpage.html'; // The URL to redirect to
        }, 2000); // Delay in milliseconds
    });
});
