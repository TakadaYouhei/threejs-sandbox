#!/usr/bin/bash

# 存在するユーザーとグループ
USERID=1000
GROUPID=1000

# 存在しないユーザーとグループ
USERID=1003
GROUPID=1003

# すでに存在するグループIDか調べる
if [ $(getent group $GROUPID) ]; then
  echo "Group ID $GROUPID exists"
  # グループ名を変更
  groupmod -g $GROUPID dockeruser
else
  echo "Group ID $GROUPID does not exist"
  # グループを作成
  groupadd -g $GROUPID dockeruser
fi

# すでに存在するユーザーIDか調べる
if [ $(getent passwd $USERID) ]; then
  echo "User ID $USERID exists"
  # ユーザー名を変更
  usermod -u $USERID dockeruser
else
  echo "User ID $USERID does not exist"
  # ユーザーを作成
  useradd -u $USERID dockeruser -g $GROUPID -s /bin/bash
fi
