#!/usr/bin/bash

docker run -v .:/tmp/express --rm -it --user=$USER express express $@

