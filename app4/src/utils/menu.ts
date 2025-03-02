/**
 * @file menu.ts
 * @fileoverview Menu class
 */

/**
 * @class Menu
 */
class Menu {
    /**
     * @constructor
     */
    constructor() {
        console.log('Menu constructor');
    }

    /**
     * @method init - 初期化
     */
    init() : void {
        console.log('Menu init');

        // id : menu_root の要素を取得
        let menuRoot = document.getElementById('menu_root');

        // id : menu_root の要素が存在しない場合 body 以下に追加
        if (!menuRoot) {
            menuRoot = document.createElement('div');
            menuRoot.id = 'menu_root';
            menuRoot.ontouchstart = (event) => { event.preventDefault(); };
            document.body.appendChild(menuRoot);
        }
    }

    /**
     * @method add - メニューを追加
     * @param {string} name - メニュー名
     * @param {Function} func - メニュー選択時の処理
     * 
     * name の内容を "menu/submenu" のように / で区切ることでサブメニューを追加できる
     */
    add(name: string, func: Function) : void {
        console.log('Menu add');

        // id : menu_root の要素を取得
        const menuRoot = document.getElementById('menu_root')!;

        // name を / で区切る
        const menu = name.split('/');

        // メニューの数だけ繰り返し
        let parent = menuRoot;
        for (let i = 0; i < menu.length; i++) {
            // id : menu の要素を取得
            let menuItem = document.getElementById('menu_' + menu[i]);

            // id : menu の要素が存在しない場合 div 要素を追加
            if (!menuItem) {
                // i = 1 は最初の次の要素
                // コンテンツの上にプルダウンメニューがのっかるようにダミー要素を追加
                if (i === 1) {
                    let dummy = document.getElementById(parent.id + '_dummy');
                    if (!dummy) {
                        dummy = document.createElement('div')!;
                        dummy.className = 'menu_dummy';
                        dummy.id = parent.id + '_dummy';
                    }
                    parent.appendChild(dummy);
                    parent = dummy;
                }

                menuItem = document.createElement('div')!;
                menuItem.id = 'menu_' + menu[i];
                // クラス名は menu_depth + 深さ
                menuItem.className = 'menu_depth' + i;
                menuItem.textContent = menu[i];
                parent.appendChild(menuItem);
            }

            // メニュー選択時の処理を登録
            if (i === menu.length - 1) {
                menuItem.onclick = () => { func() }
            }

            // 親要素を更新
            parent = menuItem;
        }
    }
}

export { Menu }
