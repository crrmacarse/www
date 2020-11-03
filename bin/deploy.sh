#!/bin/bash

# git hash passed by github
echo $1

git checkout master

git pull

npm install

npm run build

pm2 restart api
