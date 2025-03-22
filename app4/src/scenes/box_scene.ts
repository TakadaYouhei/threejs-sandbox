import { IScene } from '../sys/iscene.ts';
import * as THREE from 'three';

class BoxScene implements IScene {
  cube: THREE.Mesh;
  
  constructor(){
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    );
  }
  
  init(): void {
  }
  
  async loadAsync(): Promise<void> {
    return Promise.resolve();
  }
  
  async enterScene(scene: THREE.Scene, _camera: THREE.Camera): Promise<void> {
    scene.add( this.cube );
    return Promise.resolve();
  }
  
  animate(dt: number): void {
    this.cube.rotation.x += 0.1 * dt;
    this.cube.rotation.y += 0.1 * dt;
  }
  
  async exitScene(): Promise<void> {
    return Promise.resolve();
  }
}

export { BoxScene }