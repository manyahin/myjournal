#!/usr/bin/env bash

# uncomment to debug
# set -x

echo "---------------------------------"
echo "Starting backup script..."
echo "Current date: $(date)"

cd $(dirname $0)

MONGO_VERSION="5.0"
BACKUP_FOLDER="mongo_dump"
DATE=$(date +%Y%m%d)
ARCHIVE_NAME="mongo_dump_${MONGO_VERSION}_${DATE}.tar.gz"

echo "Making a backup of MongoDB ${MONGO_VERSION}.."

docker run --rm --network myjournal_default -v "$(pwd)/${BACKUP_FOLDER}":/backup \
	mongo:${MONGO_VERSION} bash -c 'mongodump --out /backup --host db:27017'

echo "Compressing the backup using tar with current date: ${DATE}"

tar -zcvf ${ARCHIVE_NAME} ./${BACKUP_FOLDER}

echo "Removing the backup temporary folder"

rm -rf ./${BACKUP_FOLDER}

echo "Uploading the backup to Dropbox"

./dropbox_uploader.sh upload ${ARCHIVE_NAME} /

echo "Done!"
exit 0
