#!/usr/bin/env bash
sudo apt-get update

# install git
sudo apt-get install git -y

#install node js
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs -y

sudo npm install jspm@0.16x -g
sudo npm install yarn -g
sudo npm install uglify-es -g
sudo npm install concat-cli -g

# force startup folder to vagrant project
echo "cd /vagrant/src" >> /home/vagrant/.bashrc

# set hostname, makes console easier to identify
sudo echo "expreactboilerplate" > /etc/hostname
sudo echo "127.0.0.1 expreactboilerplate" >> /etc/hosts