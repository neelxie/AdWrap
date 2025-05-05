#!/bin/bash

set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found!"
  exit 1
fi

DB_URL='postgresql://dhvqnslmwxgzgpfk:SPw%G%Bh1Q#34BHk3CztESlzcTZ5ZFx-@102.134.147.233:32761/roxedxqhiwclbatqedwffigt'

# REGEX="postgresql:\/\/([^:]+):([^@]*)@([^:]+):([0-9]+)\/(.+)"
# if [[ $DB_URL =~ $REGEX ]]; then
#   USER="${BASH_REMATCH[1]}"
#   PASSWORD="${BASH_REMATCH[2]}"
#   HOST="${BASH_REMATCH[3]}"
#   PORT="${BASH_REMATCH[4]}"
#   DB="${BASH_REMATCH[5]}"
# else
#   echo "Failed to parse DATABASE_URL."
#   exit 1
# fi

USER="dhvqnslmwxgzgpfk"
PASSWORD="SPw%G%Bh1Q#34BHk3CztESlzcTZ5ZFx-"
HOST="102.134.147.233"
PORT="32761"
DB="roxedxqhiwclbatqedwffigt"

export PGPASSWORD=$PASSWORD

echo "Creating tables in database '$DB'..."
psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -f "$(dirname "$0")/../db/schema.sql"

echo "Tables created successfully!"
