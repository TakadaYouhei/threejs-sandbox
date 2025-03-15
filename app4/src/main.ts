import * as THREE from 'three';
import { Menu } from './utils/menu.ts';
import { SceneManager } from './sys/scene_manager.ts'

import { TriangleScene } from './scenes/triangle_scene.ts';

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
}

function animate() {
	const dt = clock.getDelta()
	sm.update(dt)
	renderer.render( sm.getScene(), sm.getCamera() );
}