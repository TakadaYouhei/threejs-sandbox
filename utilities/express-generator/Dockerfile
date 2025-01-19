# syntax=docker/dockerfile:1.3-labs
FROM node:23.6.0-slim

RUN npm install -g express-generator \
    && apt-get update \
    && apt-get install -y gosu

# 新しい entrypoint を設定
RUN <<eot
echo '#! /usr/bin/bash
echo "Hello, World! $USERID $GROUPID"
# すでに存在するグループIDか調べる
if [ $(getent group $GROUPID) ]; then
  echo "Group ID $GROUPID exists"
  # グループ名を変更
  groupmod -n dockeruser $(getent group $GROUPID | cut -d: -f1)
else
  echo "Group ID $GROUPID does not exist"
  # グループを作成
  groupadd -g $GROUPID dockeruser
fi

# すでに存在するユーザーIDか調べる
if [ $(getent passwd $USERID) ]; then
  echo "User ID $USERID exists"
  # ユーザー名を変更
  usermod -l dockeruser -g $GROUPID $(getent passwd $USERID | cut -d: -f1)
else
  echo "User ID $USERID does not exist"
  # ユーザーを作成
  useradd -u $USERID dockeruser -g $GROUPID -s /usr/bin/bash
fi
exec /usr/sbin/gosu dockeruser docker-entrypoint.sh "$@"
#exec docker-entrypoint.sh "$@"
' > /usr/local/bin/myentrypoint.sh
chmod +x /usr/local/bin/myentrypoint.sh
eot
ENTRYPOINT ["/usr/local/bin/myentrypoint.sh"]

# デフォルトのコマンド
CMD ["express", "--version"]

WORKDIR /tmp/express
