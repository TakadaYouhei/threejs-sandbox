/**
 * SceneManager で管理されるシーン情報
 */
interface IScene{
  // シーン表示に必要な読み込みを行う
  on_load(): Promise<void>;
}

export { IScene }