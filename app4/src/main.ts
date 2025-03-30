import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

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

const transform_controls = new TransformControls(sm.getCamera(), renderer.domElement);
transform_controls.update(0.0)
const transform_helper = transform_controls.getHelper()
sm.getScene().add( transform_helper )

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

// クリック処理
document.addEventListener('click', onClick );

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
	orbit.update(dt)
	transform_controls.update(dt)
	renderer.render( sm.getScene(), sm.getCamera() );
}

// リサイズ時の処理
function onWindowResize() {
	sm.onWindowResize()
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// クリックした位置から Raycaster に渡す Vector2 を計算する関数
function getClickPosition(event: MouseEvent) : THREE.Vector2 {
	const element = event.target as HTMLElement
	if (!element) {
		console.error(`element is not HTMLElement ${element}`)
		return new THREE.Vector2(0, 0)
	}
	const x = ( (event.clientX - element.offsetLeft) / element.offsetWidth ) * 2 - 1
	const y = - ( (event.clientY - element.offsetTop) / element.offsetHeight ) * 2 + 1
	return new THREE.Vector2(x, y)
}

/**
 *  raycaster の intersectObjects から SphereMesh を取得するための関数
 * 
 * intersects は Raycaster の intersectObjects から取得した配列
 */
function getIntersectSphereMesh<TIntersected extends THREE.Object3D>(
		intersects: Array<THREE.Intersection<TIntersected>>
		) : THREE.Mesh | null {
	for (const intersect of intersects) {
		const obj = intersect.object;
		if (obj instanceof THREE.Mesh) {
			if (obj.geometry instanceof THREE.SphereGeometry) {
				//console.log(`Mesh ${obj.name} clicked`);
				return obj
			}
		}
	}
	return null
}

// クリック時の処理
function onClick(event: MouseEvent) : void {
	// クリックした位置の座標を取得する
	const click_pos = getClickPosition(event)

	// raycast を飛ばしてクリックしたオブジェクトを取得する
	const raycaster = new THREE.Raycaster();
	
	raycaster.setFromCamera( click_pos, sm.getCamera() );
	const intersects = raycaster.intersectObjects(sm.getScene().children,false);

	// 取得したオブジェクトの中から マニピュレーター (SphereMesh) を取得する
	const mesh = getIntersectSphereMesh(intersects)
	if(mesh == null){
		//console.log("Mesh is null")
		// 頂点以外をクリックした時は何もしない
	} else {
		//console.log(`Mesh ${mesh.name} clicked`);
		// 頂点をクリックした時は TransformControls を表示する
		// https://threejs.org/docs/?q=Control#examples/en/controls/TransformControls
		transform_controls.attach(mesh);
	}
}