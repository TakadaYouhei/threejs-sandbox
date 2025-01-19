#!/usr/bin/bash

USERID=$(id -u)
GROUPID=$(id -g)

docker run -v .:/tmp/express --rm -it --user=$USER -e USERID=$USERID -e GROUPID=$GROUPID express express $@

