const emojiSet = ["❤️", "💕", "💓", "💖", "💗", "💛", "🥰", "💘", "💞", "🥒"];
const emojiBaseSize = 100; // Updated base size of emojis

function initializeEmojiRain() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const columnWidth = emojiBaseSize * 1.5;
    let numberOfColumns = Math.floor(screenWidth / columnWidth) + 4; // Ensure coverage with extra columns

    // Adjust for an odd number of columns to center properly
    if (numberOfColumns % 2 === 0) numberOfColumns++;

    const leftOffset = (screenWidth - (numberOfColumns * columnWidth)) / 2;

    // Track which columns have spawned an emoji
    const spawnedColumns = new Set();

    // Continuous spawning
    let currentColumnIndex = -1; // Initialize as -1 to select a random column first

    function spawnEmojiInRandomColumn() {
        // If all columns have spawned an emoji, reset the set
        if (spawnedColumns.size === numberOfColumns) {
            spawnedColumns.clear();
        }

        let randomColumnIndex;

        do {
            randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        } while (spawnedColumns.has(randomColumnIndex)); // Ensure the column hasn't already spawned an emoji

        const columnLeft = leftOffset + randomColumnIndex * columnWidth;

        // Create emojis above the window in the randomly selected column
        createEmoji(columnLeft, -2 * emojiBaseSize);

        // Mark this column as spawned
        spawnedColumns.add(randomColumnIndex);

        setTimeout(spawnEmojiInRandomColumn, 300); // Adjust timing for continuous spawning
    }

    spawnEmojiInRandomColumn();
}

function createEmoji(leftPosition, topPosition) {
    const emoji = document.createElement('div');
    emoji.innerHTML = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    const rotation = Math.random() * 120 - 60;

    Object.assign(emoji.style, {
        position: 'fixed',
        left: `${leftPosition}px`,
        top: `${topPosition}px`,
        transform: `rotate(${rotation}deg)`,
        fontSize: `${emojiBaseSize}px`,
        opacity: '0.5',
        zIndex: '-1' // Ensure emojis are behind other elements
    });

    document.body.appendChild(emoji);
    animateEmojiFall(emoji);
}

function animateEmojiFall(emoji) {
    let posY = parseInt(emoji.style.top, 10);
    const fallSpeed = 4; // Adjust fall speed as needed

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
