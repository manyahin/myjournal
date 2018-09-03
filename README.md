# My Private Diary

This app alow you to simply setup your own private diary on your private server (like VPS) using Linux and Docker technology. To use with domain you need to configure web proxy server (like Nginx) on your server and setup your domain zone.

Builed on top of loopback and vuejs.

## Setup

    # set password
    echo 'DIARY_PASSWORD=123456' > .docker-env

## Start development

    # start database
    docker-compose up -d db
    
    # start loopback server and vuejs dev env
    yarn dev
    cd client && yarn dev

## In Production

    # clone repo
    git clone https://github.com/manyahin/mydiary.git
    cd mydiary
    
    # set password
    echo 'DIARY_PASSWORD=123456' > .docker-env

    # build
    docker-compose build

    # start production
    npm run prod

# Backup

The backup system will make tar arhchive in backup folder and will upload it to Dropbox

    # setup dropbox app token (only once)
    /backup/dropbox_uploader.sh
    # run script
    /backup/run.sh

Restore DB by next command:

    tar -zxvf $FILE.tar.gz
    docker run --rm --network mydiary_default -v "$(pwd)/mongo_db":/backup \
      mongo:3.4 bash -c 'mongorestore /backup --host db:27017'
