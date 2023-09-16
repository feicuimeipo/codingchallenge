#!/bin/bash
# dos2unix app-build.sh
rm -rf static/*
cd ../web
yarn build
mv build/static/* ../app/static/
mv build/*.* ../app/static/

cd ../app/
pip freeze > requirements.txt

tar cvf app.tar ./*

aws s3 cp ./app.tar s3://arn:aws:s3:ap-east-1:703449490149:accesspoint/mycodingchallenge/app/

echo 'ok'
