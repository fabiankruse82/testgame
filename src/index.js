import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Box } from './shapes/Box.js';
import { boxCollision } from './utils/boxCollision.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4.61, 2.74, 8);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// Create a global audio source for background music
const backgroundMusic = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('src/sounds/punk_pop-182468.mp3', function(buffer) {
  backgroundMusic.setBuffer(buffer);
  backgroundMusic.setLoop(true);
  backgroundMusic.setVolume(0.5);
  backgroundMusic.play();
});

// Create audio sources for sound effects
const moveSound = new THREE.Audio(listener);
audioLoader.load('src/sounds/089048_woosh-slide-in-88642.mp3', function(buffer) {
  moveSound.setBuffer(buffer);
  moveSound.setVolume(0.5);
});

const jumpSound = new THREE.Audio(listener);
audioLoader.load('src/sounds/toy-button-105724.mp3', function(buffer) {
  jumpSound.setBuffer(buffer);
  jumpSound.setVolume(0.5);
});

const collisionSound = new THREE.Audio(listener);
audioLoader.load('src/sounds/ough-47202.mp3', function(buffer) {
  collisionSound.setBuffer(buffer);
  collisionSound.setVolume(0.5);
});

const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
  velocity: {
    x: 0,
    y: -0.01,
    z: 0
  }
});
cube.castShadow = true;
scene.add(cube);

const ground = new Box({
  width: 10,
  height: 0.5,
  depth: 50,
  color: '#0369a1',
  position: {
    x: 0,
    y: -2,
    z: 0
  }
});
ground.receiveShadow = true;
scene.add(ground);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 3;
light.position.z = 1;
light.castShadow = true;
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
camera.position.z = 5;

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  s: { pressed: false },
  w: { pressed: false }
};

function playSound(sound) {
  if (sound.isPlaying) sound.stop();
  sound.play();
}

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true;
      playSound(moveSound);
      break;
    case 'KeyD':
      keys.d.pressed = true;
      playSound(moveSound);
      break;
    case 'KeyS':
      keys.s.pressed = true;
      playSound(moveSound);
      break;
    case 'KeyW':
      keys.w.pressed = true;
      playSound(moveSound);
      break;
    case 'Space':
      cube.velocity.y = 0.08;
      playSound(jumpSound);
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = false;
      break;
    case 'KeyD':
      keys.d.pressed = false;
      break;
    case 'KeyS':
      keys.s.pressed = false;
      break;
    case 'KeyW':
      keys.w.pressed = false;
      break;
  }
});

const enemies = [];
let frames = 0;
let spawnRate = 200;

function animate() {
  const animationId = requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.velocity.x = 0;
  cube.velocity.z = 0;

  if (keys.a.pressed) cube.velocity.x = -0.05;
  else if (keys.d.pressed) cube.velocity.x = 0.05;
  if (keys.s.pressed) cube.velocity.z = 0.05;
  else if (keys.w.pressed) cube.velocity.z = -0.05;

  cube.update(ground);

  enemies.forEach((enemy) => {
    enemy.update(ground);
    if (boxCollision({ box1: cube, box2: enemy })) {
      playSound(collisionSound);
      cancelAnimationFrame(animationId);
    }
  });

  if (frames % spawnRate === 0) {
    if (spawnRate > 20) spawnRate -= 20;
    const enemy = new Box({
      width: 1,
      height: 1,
      depth: 1,
      position: {
        x: (Math.random() - 0.5) * 10,
        y: 0,
        z: -20
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0.005
      },
      color: 'red',
      zAcceleration: true
    });
    enemy.castShadow = true;
    scene.add(enemy);
    enemies.push(enemy);
  }

  frames++;
}

animate();
