#!/bin/bash
sudo apt-get update&&sudo apt upgrade -y
sudo apt upgrade python3
sudo apt install python3-pip
sudo apt install python3-venv
sudo python3 -m venv venv
sudo source venv/bin/activate
sudo pip3 install django
sudo pip3 install -r requirements.txt
sudo pip3 install django-cors-headers
sudo chmod 777 media
sudo chmod 777 media/*
sudo python3 manage.py makemigrations&&sudo python3 manage.py migrate
