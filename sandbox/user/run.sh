#!/usr/bin/bash

IMAGE=sandbox_user:latest

USERID=$(id -u)
GROUPID=$(id -g)

#docker run -v .:/tmp/express --rm -it --user=$USER ${IMAGE} $@
docker run -v .:/tmp/express --rm -it -e USERID=$USERID -e GROUPID=$GROUPID ${IMAGE} $@


