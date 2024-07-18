const text = `hi 
i'm
Chinmay
(version 2.0 coming soon)`;
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
        typewriterElement.innerHTML = text.substring(0, index + 1).split('').map((char, i) => `<span class="letter" id="letter-${i}">${char}</span>`).join('') + '<span class="random-char">' + getRandomEmoji() + '</span>';
        index++;
        setTimeout(type, speed);
    } else {
        typewriterElement.innerHTML = text.split('').map((char, i) => `<span class="letter" id="letter-${i}">${char}</span>`).join('') + '.';
        enterButton.classList.remove('hidden');
        setTimeout(() => {
            enterButton.style.opacity = 1; // Fade-in effect
        }, 10); // Small delay to ensure the class change is rendered
    }
}

type();

function applyThreeJsToLetters() {
    // Hide the button
    enterButton.style.display = 'none';

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set camera position
    camera.position.z = 50;

    // Create shapes for each letter
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const shapeTypes = ['box', 'sphere', 'dodecahedron'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

        let geometry, material, mesh;
        material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });

        switch (shapeType) {
            case 'box':
                geometry = new THREE.BoxGeometry(rect.width / 10, rect.height / 10, rect.width / 10);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(rect.width / 20, 32, 32);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(rect.width / 20);
                break;
        }

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(rect.left - window.innerWidth / 2 + rect.width / 2, -rect.top + window.innerHeight / 2 - rect.height / 2, 0);
        scene.add(mesh);

        // Remove the letter from the DOM
        letter.style.visibility = 'hidden';
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

enterButton.addEventListener('click', applyThreeJsToLetters);
