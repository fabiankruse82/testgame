import { startGame } from './index.js';

export function handleTransitions() {
  const videoContainer = document.getElementById('video-container');
  const titleScreen = document.getElementById('title-screen');
  const introVideo = document.getElementById('intro-video');

  introVideo.addEventListener('ended', () => {
    videoContainer.style.display = 'none';
    titleScreen.style.display = 'flex';
  });

  window.addEventListener('keydown', startGame, { once: true });
}
