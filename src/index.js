import { initScene, scene, camera, renderer } from './modules/scene.js';
import { initAudio, backgroundMusic, moveSound, jumpSound, collisionSound } from './modules/audio.js';
import { createObjects, cube } from './modules/gameObjects.js';
import { handleKeyDown, handleKeyUp, keys } from './modules/controls.js';
import { handleTransitions } from './modules/transitions.js';
import { boxCollision } from './utils/boxCollision.js';

let enemies = [];
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
      position: { x: (Math.random() - 0.5) * 10, y: 0, z: -20 },
      velocity: { x: 0, y: 0, z: 0.005 },
      color: 'red',
      zAcceleration: true
    });
    enemy.castShadow = true;
    scene.add(enemy);
    enemies.push(enemy);
  }

  frames++;
}

export function startGame() {
  document.getElementById('title-screen').style.display = 'none';
  backgroundMusic.play();
  initGame();
}

function initGame() {
  createObjects();
  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  initScene();
  initAudio(camera);
  handleTransitions();

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
});
