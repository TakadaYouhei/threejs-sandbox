import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Menu } from './utils/menu.ts';
import { SceneManager } from './sys/scene_manager.ts'

import { TriangleScene } from './scenes/triangle_scene.ts';
import { BoxScene } from './scenes/box_scene.ts';
import { BothScene } from './scenes/both_scene copy.ts';

const clock = new THREE.Clock()
const sm = new SceneManager()
sm.request(TriangleScene)

const contents = document.getElementById('contents')!;

setup_ontouchstart(contents);
createMenu();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
contents.appendChild( renderer.domElement );

const orbit = new OrbitControls( sm.getCamera(), renderer.domElement );
orbit.update();

// グリッドを表示
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
sm.getScene().add( gridHelper );

// 座標軸を表示
const axesHelper = new THREE.AxesHelper( 5 );
sm.getScene().add( axesHelper );

// リサイズ処理
window.addEventListener( 'resize', onWindowResize );

/**
 * ipad でいい感じにタッチイベントを処理するためのおまじない
 * これをしないと menu の hover の処理が適切に実行されない
 */
function setup_ontouchstart(contents: HTMLElement) {
	
	contents.ontouchstart = (event) => { event.preventDefault(); }
}

// メニューを構築
function createMenu() {
	const menu = new Menu();
	menu.init();
	menu.add('File/New', () => { console.log('File/New'); });
	menu.add('File/Open', () => { console.log('File/Open'); });
	menu.add('File/Save', () => { console.log('File/Save'); });
	menu.add('Edit/Copy', () => { console.log('Edit/Copy'); });
	menu.add('Edit/Paste', () => { console.log('Edit/Paste'); });

	menu.add('Scene/Triangle', () => { sm.request(TriangleScene); });
	menu.add('Scene/Box', () => { sm.request(BoxScene); });
	menu.add('Scene/Both', () => { sm.request(BothScene); });
}

function animate() {
	const dt = clock.getDelta()
	sm.update(dt)
	orbit.update()
	renderer.render( sm.getScene(), sm.getCamera() );
}

// リサイズ時の処理
function onWindowResize() {
	sm.onWindowResize()
	renderer.setSize( window.innerWidth, window.innerHeight );
}