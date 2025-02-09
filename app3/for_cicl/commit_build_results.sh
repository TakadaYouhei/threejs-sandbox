#!/usr/bin/bash

# The authenticity of host 'github.com (x.x.x.x)' can't be established.
# auto yes
echo yes | git clone git@github.com:TakadaYouhei/threejs-sandbox-output.git output_git
cp -r ~/artifacts/* output_git/
pushd output_git
git add *
git commit -m "Add build results"
git push origin main
popd

