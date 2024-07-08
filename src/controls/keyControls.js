export const keys = {
    a: { pressed: false },
    d: { pressed: false },
    s: { pressed: false },
    w: { pressed: false }
  };
  
  export function setupKeyControls(cube, moveSound, jumpSound) {
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
  }
  