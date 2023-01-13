# My Journal

This app allows you to setup your own private journal using Docker. To use a custom domain for your journal you need to configure a web proxy server, like Nginx that can handle your domain zone, and probably TLS certificats, like "Let's Encrypt".

Built on top of Loopback 3 and VueJS 2.

## Setup

```
# set password for journal
echo 'MYJOURNAL_PASSWORD=123456' > .docker-env
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
git clone https://github.com/manyahin/myjournal.git
cd myjournal

# set password
echo 'MYJOURNAL_PASSWORD=123456' > .docker-env

# build
docker-compose build

# start production
npm run prod
```

### Update production

For `web` service:

```bash
git pull origin master
docker-compose build web
docker-compose rm -s -v web
docker-compose -f production.yml up -d web
docker-compose logs web
```

# Backup

The backup script will make tar.gz archive in backup folder and will upload it to Dropbox

```bash
# setup dropbox app token (only once)
/backup/dropbox_uploader.sh
# the token will be stored in `~/.dropbox_uploader`

# run the script
/backup/run.sh

# setup cron job (todo: store logs)
# 0 0 * * * /var/www/myjournal/backup/run.sh
```

## Restore DB

```bash
tar -zxvf $FILE.tar.gz

docker run --rm --network myjournal_default -v "$(pwd)/mongo_dump":/backup mongo:5.0 bash -c 'mongorestore /backup --host db:27017'
```

__Git Bash__ in __Windows__ has [the bug](https://stackoverflow.com/questions/50608301/docker-mounted-volume-adds-c-to-end-of-windows-path-when-translating-from-linux), add the leading slash before `$(pwd)` in that case. The same technique should be used for `/backup/run.sh` script.

```bash
docker run --rm --network myjournal_default -v "/$(pwd)/mongo_dump":/backup mongo:5.0 bash -c 'mongorestore /backup --host db:27017'
```
