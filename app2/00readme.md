# app2 express-generator を使用したコード

# 起動方法

```shell
npm install
npm run
```

ブラウザで http://localhost:3000/ にアクセス

# 機能仕様

## / トップページ

下記ページへのリンクがある

* /users/regist ..... ユーザー追加
* /users/list ..... ユーザー一覧

## /users/regist ユーザー追加

ユーザー名を入力するテキストと、登録を実行するボタンがある。
登録ボタンを押すと /api/regist_user を呼び出しユーザーを追加する

## /users/list ユーザー一覧

ユーザー一覧表示する

## /api/regist_user ユーザー登録

パラメータ
name .... ユーザー名

# 履歴

```shell
# テンプレートから作成
express --viw=pug app2

# npm モジュールのインストール
cd app2
npm install

# 更新したら自動敵に再起動する nodemon のインストール
npm install --save-dev nodemon

# package.json に devStart 追加
``` 
