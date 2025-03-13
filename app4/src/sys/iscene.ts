/**
 * SceneManager で管理されるシーン情報
 */
interface iscene{
  // シーン表示に必要な読み込みを行う
  on_load(): Promise<void>;
}