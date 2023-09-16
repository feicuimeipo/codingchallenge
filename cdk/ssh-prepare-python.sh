#!/bin/bash
# dos2unix app-build.sh

echo ''
echo ''
echo '============================install python============================'
echo ''
echo ''
sudo yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make libffi-devel openssl gcc
sudo yum install gcc-c++ zlib zlib-devel  pcre curl-devel -y
sudo yum reinstall openssl openssl-devel gcc -y
wget https://www.python.org/ftp/python/3.11.3/Python-3.11.3.tgz
tar -xvf Python-3.11.3.tgz
cd ~/Python-3.11.3
# ./configure --help | grep -Fi ssl
# --with-ssl-default-suites=openssl
# --with-openssl=/usr/bin/openssl
sudo ./configure --prefix=/usr/local/python3 --enable-optimizations --with-openssl=/usr/local/ssl

sudo make && sudo make install
#sudo rm /usr/local/bin/python3.11 -f
sudo ln -s /usr/local/python3 /usr/local/bin/python3.11
sudo ln -s /usr/local/python3/bin/python3 /usr/bin/python3
sudo ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
echo ''
echo ''
echo '============================config env'
echo ''
echo ''
cd ~
echo 'export PATH=$PATH:/usr/local/python3/bin' >> .bash_profile
echo 'alias python=/usr/local/python3/bin/python3' >> .bash_profile
source .bash_profile



echo ''
echo ''
echo '============================install pipenv gunicorn'
pip3 install --upgrade pip #-i --trusted-host=pypi.python.org --trusted-host=pypi.org --trusted-host=files.pythonhosted.org
pip3 install pipenv
pip3 install gunicorn
pip3 show gunicorn

echo ''
echo ''
echo '============================end============================'
