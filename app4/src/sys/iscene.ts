import * as THREE from 'three';

/**
 * SceneManager で管理されるシーン情報
 *
 * 呼び出され方
 * init()
 * loadAsync()
 * enterScene()
 *
 * exitScene()
 
 */
interface IScene{
  // 初期化を行う
  init(): void
  
  /**
   * シーン表示に必要な読み込みを行う非同期メソッド
   * 読み込み処理が完了するまで待機する。
   *
   * @returns Promise<void> - 読み込み処理が正常に完了した時に解決されるPromise
   */
  loadAsync(): Promise<void>
  
  /**
   * シーンの表示を開始する非同期メソッド。
   * シーンの表示開始の演出が完了するまで待機する。
   * 
   * @returns Promise<void> - シーン表示が正常に完了したときに解決されるPromise
   */
  enterScene(scene: THREE.Scene, camera: THREE.Camera): Promise<void>
  
  /**
   * アニメーション処理
   * 
   * @param number dt 前回呼び出してからの経過時間[秒]
   */
  animate(dt: number): void
  
  /**
   * シーン表示終了時に呼ばれる。
   */
  exitScene(scene: THREE.Scene): Promise<void>
}

export type { IScene }