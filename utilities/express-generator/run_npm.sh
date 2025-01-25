#!/usr/bin/bash

USERID=$(id -u)
GROUPID=$(id -g)
PORT=3000

docker run \
    -v .:/tmp/express \
    -p $PORT:$PORT \
    --rm \
    -it \
    -e USERID=$USERID \
    -e GROUPID=$GROUPID \
    -e PORT=$PORT \
    express \
    npm $@

