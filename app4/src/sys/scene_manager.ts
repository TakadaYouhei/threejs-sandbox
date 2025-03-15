import { IScene } from './iscene.ts'
class SceneManager {
  // 現在表示しているシーン
  current: IScene | null;
  // 次に表示するシーン
  next: IScene | null;
  
  constructor(){
    this.current = null
    this.next = null
  }
  
  /**
   * シーンの切り替え
   * @param scene シーンクラス
   *
   * scene クラスのインスタンスを作成して切り替える
   */
  request<T  extends IScene>(scene: new () => T ):void {
    const next = new scene()
    this.next = next
  }

  /**
   * シーンの更新
   */
  update(dt: number):void {
    if(this.next !== null){
      if(this.current !== null){
        //this.current.destroy()
      }
      this.current = this.next
      this.next = null
      this.current.init()
    }
    if(this.current !== null){
      this.current.animate(dt)
    }
  }
}

export { SceneManager }