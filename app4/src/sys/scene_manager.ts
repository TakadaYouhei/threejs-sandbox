import { IScene } from './iscene.ts'
class SceneManager {
  // 現在表示しているシーン
  current: IScene;
  // 次に表示するシーン
  next: IScene;
  
  constructor(){
    
  }
  
  /**
   * シーンの切り替え
   * @param string name シーンクラス名
   *
   * name クラスのインスタンスを作成して切り替える
   */
  request(name: string):void {
    console.info(name)
  }
}