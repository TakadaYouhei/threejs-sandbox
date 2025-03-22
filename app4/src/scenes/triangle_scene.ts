import { IScene } from '../sys/iscene.ts';
import * as THREE from 'three';

class TriangleScene implements IScene {
  line: THREE.Line;
  
  constructor(){
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
    scene.add( this.line );
    return Promise.resolve();
  }
  
  animate(_dt: number): void {
  }
  
  async exitScene(): Promise<void> {
    return Promise.resolve();
  }
}

export { TriangleScene }