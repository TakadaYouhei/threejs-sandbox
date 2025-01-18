#!/usr/bin/bash

docker run -v .:/tmp/express --rm -it express express $@

