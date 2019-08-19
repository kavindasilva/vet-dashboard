
# to clean system logs etc...
# reference to remove .gz
# https://gist.github.com/Iman/8c4605b2b3ce8226b08a

# these commands should be run as super user, sudo may not work

cd /var/log/

find /var/log -type f -regex ".*\.gz$" | xargs rm -Rf

sudo echo "" > kern.log
sudo echo "" > kern.log.1

sudo echo "" > syslog
sudo echo "" > syslog.1

# run disk usage analyser as sudo
sudo baobab

# view directory size in human readable manner
sudo du -h --max-depth=1 /folder/path
