# My Private Diary

This app allows you to setup your own private diary using Docker. To use a custom domain for your diary you need to configure a web proxy server, like Nginx that can handle your domain zone, and probably TLS certificats, like "Let's Encrypt".

Built on top of Loopback 3 and VueJS 2.

## Setup

```
# set password for diary
echo 'DIARY_PASSWORD=123456' > .docker-env
```

## Development

Node 11.15.0 is required

```bash
# install nvm (https://github.com/nvm-sh/nvm)
nvm install 11.15.0
nvm use 11.15.0
```

add the next line to your hosts file
>  127.0.0.1   db

```bash
# install base dev dependencies
npm install --global nodemon

# start database
docker compose up -d db

# start back-end
npm install
npm run dev

# start front-end (in a new terminal)
cd client
npm install
npm run dev

# optional, set host to check from another device
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

```bash
git pull origin master
sudo docker-compose build
sudo docker rm -f mydiary_web_1
sudo npm run prod
```

# Backup

The backup script will make tar.gz archive in backup folder and will upload it to Dropbox

```bash
# setup dropbox app token (only once)
/backup/dropbox_uploader.sh

# run script
/backup/run.sh
```

## Restore DB

```bash
tar -zxvf $FILE.tar.gz
docker run --rm --network mydiary_default -v "$(pwd)/mongo_db":/backup \
  mongo:3.4 bash -c 'mongorestore /backup --host db:27017'
```
