import { IScene } from '../sys/iscene.ts';
import * as THREE from 'three';

class TriangleScene implements IScene {
  line: THREE.Line;
  points: THREE.Mesh[];
  
  constructor(){
    const points = [
      new THREE.Vector3( -1, 0, 0 ),
      new THREE.Vector3( 0, 1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    ]
    this.line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial( { color: 0x0000ff } )
    );

    this.points = []
    const positionAttribute = this.line.geometry.attributes.position
    for (let i = 0; i < positionAttribute.itemSize; i++) {
      const geometry = new THREE.SphereGeometry( 0.1, 32, 32 )
      const material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
      const mesh = new THREE.Mesh( geometry, material )
      this.points.push(mesh)
      this.points[i].position.set(
          positionAttribute.getX(i), 
          positionAttribute.getY(i), 
          positionAttribute.getZ(i));
    }
  }
  
  init(): void {
  }
  
  async loadAsync(): Promise<void> {
    return Promise.resolve();
  }
  
  async enterScene(scene: THREE.Scene, _camera: THREE.Camera): Promise<void> {
    scene.add( this.line );
    for (let i = 0; i < this.points.length; i++) {
      scene.add( this.points[i] );
    }
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
    for (let i = 0; i < this.points.length; i++) {
      scene.remove( this.points[i] );
    }
    return Promise.resolve();
  }
}

export { TriangleScene }