#!/usr/bin/env bash

# uncomment to debug
# set -x

echo "---------------------------------"
echo "Starting backup script..."
echo "Current date: $(date)"

MONGO_VERSION="5.0"

BACKUP_DIR_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
PROJECT_ROOT_PATH=$(dirname "${BACKUP_DIR_PATH}")
BACKUP_FOLDER_PATH="${PROJECT_ROOT_PATH}/mongo_dump"

ARCHIVE_DATE=$(date +%Y%m%d)
ARCHIVE_NAME="mongo_dump_${MONGO_VERSION}_${ARCHIVE_DATE}.tar.gz"
ARCHIVE_PATH="${PROJECT_ROOT_PATH}/${ARCHIVE_NAME}"

echo "Making a backup of MongoDB ${MONGO_VERSION}.."

docker run --rm --network myjournal_default -v "${BACKUP_FOLDER_PATH}":/backup \
	mongo:${MONGO_VERSION} bash -c 'mongodump --out /backup --host db:27017'

echo "Compressing the backup using tar with current date: ${DATE}"

tar -zcvf ${ARCHIVE_PATH} ${BACKUP_FOLDER_PATH}

echo "Removing the backup temporary folder"

rm -rf ${BACKUP_FOLDER_PATH}

echo "Uploading the backup to Dropbox"

./dropbox_uploader.sh upload ${ARCHIVE_PATH} /

echo "Removing the backup archive"

rm -rf ${ARCHIVE_PATH}

echo "Done!"
exit 0
