import { IScene } from '../sys/iscene.ts';
import * as THREE from 'three';

class TriangleScene implements IScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  line: THREE.Line;
  
  constructor(){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
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
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setAnimationLoop( this.animate.bind(this) );
    document.getElementById('contents')!.appendChild( this.renderer.domElement );
    this.scene.add( this.cube );
    this.scene.add( this.line );
    this.camera.position.z = 5;
  }
  
  async loadAsync(): Promise<void> {
    return Promise.resolve();
  }
  
  async enterScene(): Promise<void> {
    return Promise.resolve();
  }
  
  animate(dt: number): void {
    this.cube.rotation.x += 0.1 * dt;
    this.cube.rotation.y += 0.1 * dt;
    this.renderer.render( this.scene, this.camera );
  }
  
  async exitScene(): Promise<void> {
    return Promise.resolve();
  }
}

export { TriangleScene }