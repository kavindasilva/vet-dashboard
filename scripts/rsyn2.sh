#!/bin/bash

## This file was used to build npm production instance, and
## to sync the local build with the localhost server


echo "Auto sync script2 started..."


# repo location
repoPath="/home/vetstoria/kavinda/vet-dashboard/"


# command to build npm
cmd1="npm run-script build"


# build production inside the repo folder
cd $repoPath
$cmd1
echo "$cmd1 finised..."

#wait 2 seconds after building
sleep 2

#rsync -avzh /home/vetstoria/kavinda/vet-dashboard/phpApi/ /opt/lampp/htdocs/aa
rsync -avzh /home/vetstoria/kavinda/vet-dashboard/build/ /opt/lampp/htdocs/reactBuild
echo "rSync completed"


