#!/bin/sh

docker run --rm --network mydiary_default -v $(pwd)/mongo_db:/backup \
	mongo:3.4 bash -c 'mongodump --out /backup --host db:27017'

DATE=$(date +%Y%m%d)

tar -zcvf mongo_db_$DATE.tar.gz ./mongo_db

rm -rf ./mongo_db
