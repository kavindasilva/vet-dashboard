#!/bin/bash

## This file was used to build npm production instance

echo "Auto sync script2 started..."

# repo location
repoPath="/opt/lampp/htdocs/vet-dashboard/"

# command to build npm
cmd1="npm run-script build"


# build production inside the repo folder
cd $repoPath
$cmd1
echo "\"$cmd1\" finised in $repoPath..."

#wait 2 seconds after building
sleep 2

echo "Script execution finished"


