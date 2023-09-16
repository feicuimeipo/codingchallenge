#!/bin/bash
# dos2unix app-build.sh

echo ''
echo ''
echo '============================start============================'
echo ''
echo ''

sudo yum remove awscli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
cd /usr/local/bin/
aws --version
/usr/local/bin/aws --version

echo ''
echo ''
echo 'aws config....'
aws configure set region ap-east-1
aws configure set output ap-east-1
aws configure set aws_access_key_id AKIA2HSG3MLS2543WZ4Y
aws configure set aws_secret_access_key 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
echo ''
echo ''
echo '============================end============================'
echo ''
echo ''
