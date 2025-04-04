import * as THREE from 'three';
import { IScene } from './iscene.ts'
class SceneManager {
  // 現在表示しているシーン
  current: IScene | null;
  // 次に表示するシーン
  next: IScene | null;
  
  // THREE シーン情報
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  constructor(){
    this.current = null
    this.next = null
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.z = 5
  }

  /**
   * scene 取得　(render に使用)
   */
  getScene():THREE.Scene{
    return this.scene
  }

  /**
   * camera 取得
   */
  getCamera():THREE.PerspectiveCamera{
    return this.camera
  }
  
  /**
   * シーンの切り替え
   * @param scene シーンクラス
   *
   * scene クラスのインスタンスを作成して切り替える
   */
  async request<T  extends IScene>(scene: new () => T ): Promise<void> {
    const next = new scene()
    this.next = next

    next.init()
    await next.loadAsync()

    return Promise.resolve()
  }

  /**
   * シーンの更新
   */
  update(dt: number):void {
    if(this.next !== null){
      if(this.current !== null){
        // todo : exitScene の Promise を待つ
        this.current.exitScene(this.scene)
      }
      this.current = this.next
      this.next = null
      this.current.enterScene(this.scene, this.camera)
    }
    if(this.current !== null){
      this.current.animate(dt)
    }
  }

  /**
   * リサイズ処理
   */
  onWindowResize():void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

export { SceneManager }