#!/usr/bin/env bash

echo "Make backup of the database"

cd $(dirname $0)

docker run --rm --network myjournal_default -v "$(pwd)/mongo_dump":/backup \
	mongo:5.0 bash -c 'mongodump --out /backup --host db:27017'

DATE=$(date +%Y%m%d)
ARCHIVE_NAME="mongodb_${DATE}.tar.gz"

tar -zcvf $ARCHIVE_NAME ./mongo_dump

rm -rf ./mongo_dump

echo "Deploy the backup to Dropbox"

./dropbox_uploader.sh upload $ARCHIVE_NAME /
