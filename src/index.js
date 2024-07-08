import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Box } from './shapes/Box.js';
import { loadBackgroundMusic } from './audio/backgroundMusic.js';
import { loadSoundEffects } from './audio/soundEffects.js';
import { setupKeyControls } from './controls/keyControls.js';
import { animate } from './game/animate.js';

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

const backgroundMusic = loadBackgroundMusic(camera);
const { moveSound, jumpSound, collisionSound } = loadSoundEffects(camera);

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

setupKeyControls(cube, moveSound, jumpSound);

const enemies = [];

animate(renderer, scene, camera, cube, ground, enemies, collisionSound);
