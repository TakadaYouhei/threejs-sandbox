#!/usr/bin/bash

# このファイルのフォルダ名を取得
cur_dir=$(cd $(dirname $0); pwd)

# run.sh のシンボリックリンクを utilities に express という名前で作成する
ln -s $cur_dir/run.sh $cur_dir/../../../utilities/express
