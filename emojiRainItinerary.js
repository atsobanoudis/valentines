const emojiSet = ["❤️", "💕", "💓", "💖", "💗", "💛", "🥰", "💘", "💞"];
const emojiBaseSize = 100; // Updated base size of emojis

function initializeEmojiRain() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const columnWidth = emojiBaseSize * 1.5;
    let numberOfColumns = Math.floor(screenWidth / columnWidth) + 4; // Ensure coverage with extra columns

    // Adjust for an odd number of columns to center properly
    if (numberOfColumns % 2 === 0) numberOfColumns++;

    const leftOffset = (screenWidth - (numberOfColumns * columnWidth)) / 2;

    // Initial vertical population
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        const columnLeft = leftOffset + columnIndex * columnWidth;
        const emojisInColumn = Math.floor(screenHeight / emojiBaseSize) + 1;

        for (let i = 0; i < emojisInColumn; i++) {
            createEmoji(columnLeft, -i * emojiBaseSize, true); // True for initial placement
        }

        // Continuous spawning
        (function spawnEmojiInColumn() {
            createEmoji(columnLeft, -emojiBaseSize);
            setTimeout(spawnEmojiInColumn, 3000); // Adjust timing for continuous spawning
        })();
    }
}

function createEmoji(leftPosition, topPosition, initial = false) {
    const emoji = document.createElement('div');
    emoji.innerHTML = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    const rotation = Math.random() * 60 + 60;

    Object.assign(emoji.style, {
        position: 'fixed',
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
        transform: `rotate(${rotation}deg)`,
        fontSize: `${emojiBaseSize}px`,
        opacity: '0.5',
        zIndex: initial ? '-2' : '-1' // Ensure initial emojis are further back
    });

    document.body.appendChild(emoji);

    if (!initial) animateEmojiFall(emoji);
}

function animateEmojiFall(emoji) {
    let posY = parseInt(emoji.style.top, 10);
    const fallSpeed = 2; // Adjust fall speed as needed

    function fall() {
        posY += fallSpeed;
        emoji.style.top = `${posY}px`;

        if (posY > window.innerHeight) {
            emoji.remove();
        } else {
            requestAnimationFrame(fall);
        }
    }

    fall();
}

document.addEventListener('DOMContentLoaded', initializeEmojiRain);