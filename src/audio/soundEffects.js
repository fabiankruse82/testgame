import * as THREE from 'three';

export function loadSoundEffects(camera) {
  const listener = new THREE.AudioListener();
  camera.add(listener);

  const audioLoader = new THREE.AudioLoader();

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

  return { moveSound, jumpSound, collisionSound };
}
