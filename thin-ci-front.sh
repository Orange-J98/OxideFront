#!/bin/bash

set -e

echo 'make sure the code is the newest'
sleep 2

npm run build

docker build -f thin.Dockerfile . -t registry.cn-hangzhou.aliyuncs.com/crucialize/oxide-front:latest

echo
echo
echo 'build image success!'

docker push registry.cn-hangzhou.aliyuncs.com/crucialize/oxide-front:latest

echo
echo
echo 'push success!'