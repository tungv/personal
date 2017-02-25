#!/usr/bin/env sh
#
# Usage:
#   USR=abcd12345 PSW=ghij67890 ./updater.sh

URL="https://domains.google.com/nic/update"
HOST=tungv.com
TARGET=alias.zeit.co
HOST_IP=$(dig @8.8.8.8 +short A "$HOST" | sort | tail -1)
TARGET_IP=$(dig @8.8.8.8 +short A "$TARGET" | sort | tail -1)

if [ "$HOST_IP" != "$TARGET_IP" ]; then
  echo "Updating Dynamic DNS record for host $(tput bold)$HOST$(tput sgr0) to IP $(tput bold)$TARGET_IP$(tput sgr0)"
  curl \
    --silent \
    --request POST \
    --user "$USR:$PSW" \
    --header "Content-Length: 0" \
    --header "User-Agent: https://git.io/v6LQz" \
    "$URL?hostname=$HOST&myip=$TARGET_IP"
  echo
else
  echo "Dynamic DNS for host $(tput bold)$HOST$(tput sgr0) is up-to-date!"
fi
