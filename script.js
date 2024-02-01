
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
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;
    
        // Calculate maximum x and y positions
        const maxX = viewportWidth - buttonWidth - margin;
        const maxY = viewportHeight - buttonHeight - margin;
    
        // Randomly choose a new position within the constraints
        const newX = Math.random() * maxX + margin;
        const newY = Math.random() * maxY + margin;
    
        noButton.style.position = 'fixed'; // Use 'fixed' instead of 'absolute'
        noButton.style.left = `${Math.max(0, newX)}px`;
        noButton.style.top = `${Math.max(0, Math.min(newY, maxY))}px`; // Ensure newY does not exceed maxY
    
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
