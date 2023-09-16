#!/bin/bash


pip install virtualenv
virtualenv --version
virtualenv myvenv
python3 -m venv myvenv
source venv/bin/activate # 进入环境
pip install requests
deactivate




tar xvf app.tar
pipenv --python 3
pipenv shell
pipenv install
pipenv install flask

