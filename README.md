# My Diary

This app alows you to setup your own private diary on your private server (like VPS) using Linux and Docker technologies. To use with a domain name you need to configure a web proxy server (like Nginx) on your server and setup your domain configuration.

Backend built on Loopback 3. Frontend built on VueJS. Styles are on Bulma. 

Also, you can send messages to diary via Telegram bot (need to setup it before and get token, check https://core.telegram.org/bots)

## Setup

    # set password
    echo 'DIARY_PASSWORD=123456' > .docker-env

    # no enable telegram bot set next variables
    echo 'TELEGRAM_BOT_TOKEN=SDFDSF-SDFSDF-SDFDSF' >> .docker-env
    echo 'TELEGRAM_ALLOWED_USERS=myUser' >> .docker-env


## Development

```bash
# start database
docker-compose up -d db

# start api loopback
npm install
npm run dev # or via VSCode, Debug menu -> Launch Backend

# start client part (in new terminal)
cd client
npm install
npm run dev

# optional, set host to listen to check from another device
HOST=10.0.0.1 npm run dev
```

## Production

```bash
# clone repo
git clone https://github.com/manyahin/mydiary.git
cd mydiary

# set password
echo 'DIARY_PASSWORD=123456' > .docker-env

# build
docker-compose build

# start production
npm run prod
```

### Update

#### Production

    git pull origin master
    docker-compose -f production.yml build
    docker rm -f mydiary_web_1
    npm run prod

#### Stage

    git pull origin stage
    docker-compose -f stage.yml build
    docker rm -f mydiary_stage_web_1
    npm run stage

# Backup

The backup script will make tar.gz archive in backup folder and will upload it to Dropbox

```bash
# setup dropbox app token (only once)
/backup/dropbox_uploader.sh

# run script (and setup cron)
/backup/run.sh
```

Restore DB by next command:

```bash
tar -zxvf $FILE.tar.gz
docker run --rm --network mydiary_default -v "$(pwd)/mongo_db":/backup \
  mongo:3.4 bash -c 'mongorestore /backup --host db:27017'
```
