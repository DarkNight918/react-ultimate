#!/bin/sh
# Go to project folder
cd ~/react-starter.paqmind.com

# TODO: consider $ git clean [-f]
# TODO: consider just $ git pull
# Pull git branch with "force" semantics
git fetch --all
git reset --hard origin/master

# Install package.json deps
npm install

# Install bower.json deps
bower install

# Go to home folder
cd ~

systemctl restart react-starter.node.service
