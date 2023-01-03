#!/bin/sh

echo "Make backup of database"

cd $(dirname $0)

docker run --rm --network myjournal_default -v "$(pwd)/mongo_db":/backup \
	mongo:3.4 bash -c 'mongodump --out /backup --host db:27017'

DATE=$(date +%Y%m%d)
FILE=mongodb_$DATE.tar.gz

tar -zcvf $FILE ./mongo_db

rm -rf ./mongo_db

./dropbox_uploader.sh upload $FILE /
