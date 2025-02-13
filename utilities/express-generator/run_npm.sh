#!/usr/bin/bash

USERID=$(id -u)
GROUPID=$(id -g)
PORT=3000
PORT2=5173

docker run \
    -v .:/tmp/express \
    -p $PORT:$PORT \
    -p $PORT2:$PORT2 \
    --rm \
    -it \
    -e USERID=$USERID \
    -e GROUPID=$GROUPID \
    -e PORT=$PORT \
    express \
    npm $@

