#!/usr/bin/bash

# このファイルのフォルダ名を取得
cur_dir=$(cd $(dirname $0); pwd)

# すでにある時は削除
if [ -e $HOME/bin/express ]; then
  unlink $HOME/bin/express
fi

if [ -e $HOME/bin/npm ]; then
  unlink $HOME/bin/npm
fi

# run.sh のシンボリックリンクを ~/bin/express という名前で作成する
chmod +x $cur_dir/run.sh
ln -s $cur_dir/run.sh $HOME/bin/express

chmod +x $cur_dir/run_npm.sh
ln -s $cur_dir/run_npm.sh $HOME/bin/npm
