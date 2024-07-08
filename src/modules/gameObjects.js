import * as THREE from 'three';
import { Box } from './shapes/Box.js';
import { scene } from './scene.js';

let cube, ground, light;

export function createObjects() {
  cube = new Box({
    width: 1,
    height: 1,
    depth: 1,
    velocity: { x: 0, y: -0.01, z: 0 }
  });
  cube.castShadow = true;
  scene.add(cube);

  ground = new Box({
    width: 10,
    height: 0.5,
    depth: 50,
    color: '#0369a1',
    position: { x: 0, y: -2, z: 0 }
  });
  ground.receiveShadow = true;
  scene.add(ground);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.y = 3;
  light.position.z = 1;
  light.castShadow = true;
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  camera.position.z = 5;
}

export { cube, ground };
