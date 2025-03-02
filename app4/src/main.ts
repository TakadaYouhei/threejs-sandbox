import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { Menu } from './utils/menu.ts';

createMenu();
checkWebGL2();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
//document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

addLine(scene);

camera.position.z = 5;

// メニューを構築
function createMenu() {
	const menu = new Menu();
	menu.init();
	menu.add('File/New', () => { console.log('File/New'); });
	menu.add('File/Open', () => { console.log('File/Open'); });
	menu.add('File/Save', () => { console.log('File/Save'); });
	menu.add('Edit/Copy', () => { console.log('Edit/Copy'); });
	menu.add('Edit/Paste', () => { console.log('Edit/Paste'); });
}

// シーンにラインを追加
function addLine(scene: THREE.Scene) {
	const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const points = [];
	points.push( new THREE.Vector3( -1, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 1, 0 ) );
	points.push( new THREE.Vector3( 1, 0, 0 ) );
	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, material );
	scene.add( line );
}

function checkWebGL2() {
	let msg;
	if (WebGL.isWebGL2Available()) {
		msg = document.createElement('div');
		msg.textContent = 'WebGL is available';
		console.info('WebGL is available');
	} else {
		msg = WebGL.getWebGL2ErrorMessage();
		console.info('WebGL is not available');
	}
	document.getElementById( 'container' )!.appendChild(msg);
}

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}