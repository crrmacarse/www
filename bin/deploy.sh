#!/bin/bash
echo A proud project by crrmacarse(crrmacarse@gmail.com)
echo

# extract the package.json version
PKG_VERSION=`node -p "require('./package.json').version"`

# git hash passed by github. could be use to checkout
# on specific commit
echo $1

# make sure to be in master branch
git checkout master

# get latest changes
git pull

# install necessary dependencies
npm install

# build files
npm run build

# we need to manually set the npm verion as env variable since
# pm2 is not utilziing npm on start.
npm_package_version=PKG_VERSION pm2 restart api --update-env
