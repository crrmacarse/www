#!/bin/bash
git checkout master

git pull

npm install

npm run build

pm2 restart api
