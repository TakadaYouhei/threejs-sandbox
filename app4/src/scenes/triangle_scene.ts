import { IScene } from '../sys/iscene.ts';
import * as THREE from 'three';

class TriangleScene implements IScene {
  line: THREE.Line;
  points: THREE.Vector3[];
  
  constructor(){
    this.points = [
      new THREE.Vector3( -1, 0, 0 ),
      new THREE.Vector3( 0, 1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    ]
    this.line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(this.points),
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
    const positionAttribute = this.line.geometry.attributes.position;
    positionAttribute.setX(0, Math.sin( Date.now() * 0.001 ) * 2);
    positionAttribute.needsUpdate = true;
    //console.log(this.points[0].x)
  }
  
  async exitScene(scene: THREE.Scene): Promise<void> {
    scene.remove( this.line );
    return Promise.resolve();
  }
}

export { TriangleScene }