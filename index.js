const text = `hi 
i'm
Chinmay`;
const randomEmojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😜', '🤪', '🤩', '🥳', '😏', '😮', '😯', '😲', '😳', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😱', '😨', '😰', '😥', '😓', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '🙄', '😬', '😧', '😦', '😩', '😪', '😴', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😇', '🥳', '🥸', '🥺', '🤡', '🤖', '👽', '👾', '👻', '💀', '👹', '👺', '👿', '😈', '🧛‍♂️', '🧟‍♂️', '🧞‍♂️', '🧞‍♀️', '🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️', '🧜‍♂️', '🧜‍♀️', '🧝‍♂️', '🧝‍♀️'];

let index = 0;
const speed = 125; // Adjust the speed of typing here
const typewriterElement = document.getElementById('typewriter');
const enterButton = document.getElementById('enterButton');

function getRandomEmoji() {
    return randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
}

function type() {
    if (index < text.length) {
        typewriterElement.innerHTML = text.substring(0, index + 1) + '<span class="random-char">' + getRandomEmoji() + '</span>';
        index++;
        setTimeout(type, speed);
    } else {
        typewriterElement.innerHTML = text + '.';
        enterButton.classList.remove('hidden');
        setTimeout(() => {
            enterButton.style.opacity = 1; // Fade-in effect
        }, 10); // Small delay to ensure the class change is rendered
    }
}

type();
