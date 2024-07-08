import * as THREE from 'three';

let backgroundMusic, moveSound, jumpSound, collisionSound;

export function initAudio(camera) {
  const listener = new THREE.AudioListener();
  camera.add(listener);

  backgroundMusic = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('src/sounds/punk_pop-182468.mp3', function(buffer) {
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true);
    backgroundMusic.setVolume(0.5);
  });

  moveSound = new THREE.Audio(listener);
  audioLoader.load('src/sounds/089048_woosh-slide-in-88642.mp3', function(buffer) {
    moveSound.setBuffer(buffer);
    moveSound.setVolume(0.5);
  });

  jumpSound = new THREE.Audio(listener);
  audioLoader.load('src/sounds/toy-button-105724.mp3', function(buffer) {
    jumpSound.setBuffer(buffer);
    jumpSound.setVolume(0.5);
  });

  collisionSound = new THREE.Audio(listener);
  audioLoader.load('src/sounds/ough-47202.mp3', function(buffer) {
    collisionSound.setBuffer(buffer);
    collisionSound.setVolume(0.5);
  });
}

export function playSound(sound) {
  if (sound.isPlaying) sound.stop();
  sound.play();
}

export { backgroundMusic, moveSound, jumpSound, collisionSound };
