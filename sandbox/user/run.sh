#!/usr/bin/bash

IMAGE=sandbox_user:latest

#docker run -v .:/tmp/express --rm -it --user=$USER ${IMAGE} $@
docker run -v .:/tmp/express --rm -it ${IMAGE} $@


