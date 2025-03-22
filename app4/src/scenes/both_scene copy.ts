import { IScene } from '../sys/iscene.ts';
import * as THREE from 'three';

class BothScene implements IScene {
  cube: THREE.Mesh;
  line: THREE.Line;
  
  constructor(){
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    );
    this.line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3( -1, 0, 0 ),
        new THREE.Vector3( 0, 1, 0 ),
        new THREE.Vector3( 1, 0, 0 )
      ]),
      new THREE.LineBasicMaterial( { color: 0x0000ff } )
    );
  }
  
  init(): void {
  }
  
  async loadAsync(): Promise<void> {
    return Promise.resolve();
  }
  
  async enterScene(scene: THREE.Scene, _camera: THREE.Camera): Promise<void> {
    scene.add( this.cube );
    scene.add( this.line );
    return Promise.resolve();
  }
  
  animate(dt: number): void {
    this.cube.rotation.x += 0.1 * dt;
    this.cube.rotation.y += 0.1 * dt;
  }
  
  async exitScene(scene: THREE.Scene): Promise<void> {
    scene.remove( this.cube );
    scene.remove( this.line );
    return Promise.resolve();
  }
}

export { BothScene }