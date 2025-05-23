// 1. Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hero').appendChild(renderer.domElement);

// 2. Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// 3. Load Blender Model (kartu.glb)
let card;
const loader = new THREE.GLTFLoader();
loader.load(
  'models/kartu.glb',
  (gltf) => {
    card = gltf.scene;
    
    // Scale and position the card
    card.scale.set(1, 1, 1);
    card.position.set(0, 0, 0);
    
    // Add hanging band (simple box geometry)
    const bandGeometry = new THREE.BoxGeometry(0.1, 1, 0.5);
    const bandMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const band = new THREE.Mesh(bandGeometry, bandMaterial);
    band.position.y = 2; // Position above the card
    
    // Group card and band together
    const cardGroup = new THREE.Group();
    cardGroup.add(card);
    cardGroup.add(band);
    
    scene.add(cardGroup);
    
    // Animation: Make it hang/sway slightly
    let time = 0;
    function animateBand() {
      time += 0.01;
      band.rotation.z = Math.sin(time) * 0.1; // Slight sway
      requestAnimationFrame(animateBand);
    }
    animateBand();
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

// 4. Position Camera
camera.position.z = 5;

// 5. Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. Animation Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// 7. Hero Text Animation
const heroText = document.getElementById('hero-text');
gsap.to(heroText, {
  opacity: 1,
  duration: 2,
  onComplete: () => {
    gsap.to(heroText, {
      opacity: 0,
      duration: 1
    });
  }
});

// 8. Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});