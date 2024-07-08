import * as THREE from 'three';

export function loadBackgroundMusic(camera) {
  const listener = new THREE.AudioListener();
  camera.add(listener);

  const backgroundMusic = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('src/sounds/punk_pop-182468.mp3', function(buffer) {
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true);
    backgroundMusic.setVolume(0.5);
    backgroundMusic.play();
  });

  return backgroundMusic;
}
