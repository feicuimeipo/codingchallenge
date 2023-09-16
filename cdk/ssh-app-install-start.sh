#!/bin/bash


echo 'down app.tar'
mkdir ~/app/ -p
cd ~/app/
rm -rf *
aws s3 cp s3://arn:aws:s3:ap-east-1:703449490149:accesspoint/mycodingchallenge/app/app.tar ~/app/
tar xvf app.tar

echo 'start'
cd ~/app/
gunicorn --workers=2 app:app
#pipenv install
#pipenv install flask
#pipenv shell
#flask run

curl http://localhost:5000/file/zrlAsIeah24JqJrOOyKh7
