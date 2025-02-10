#!/usr/bin/bash

ls -al ~/.ssh
cat ~/.ssh/known_hosts

GIT_SSH_COMMAND="ssh -o BatchMode=yes" git clone git@github.com:TakadaYouhei/threejs-sandbox-output.git output_git
cp -r ~/artifacts/* output_git/
pushd output_git
git add *
git commit -m "Add build results"
git push origin main
popd

