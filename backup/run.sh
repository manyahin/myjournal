#!/usr/bin/env bash

echo "Make backup of the database"

cd $(dirname $0)

docker run --rm --network myjournal_default -v "$(pwd)/mongo_db":/backup \
	mongo:3.4 bash -c 'mongodump --out /backup --host db:27017'

DATE=$(date +%Y%m%d)
ARCHIVE_NAME="mongodb_${DATE}.tar.gz"

tar -zcvf $ARCHIVE_NAME ./mongo_db

rm -rf ./mongo_db

echo "Deploy the backup to Dropbox"

./dropbox_uploader.sh upload $ARCHIVE_NAME /
