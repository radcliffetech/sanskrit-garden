#!/bin/bash

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "❗ Please run this with: source ./scripts/export-env.sh"
  exit 1
fi

# Export all entries from .env into current shell
if [ ! -f .env ]; then
  echo "❌ .env file not found in the current directory."
  exit 1
fi

echo "🔧 Exporting environment variables from .env"

# Export each line that is not a comment and not empty
while IFS='=' read -r key value; do
  if [[ ! "$key" =~ ^\s*# && -n "$key" && -n "$value" ]]; then
    # Strip surrounding quotes and export
    clean_value=$(echo "$value" | sed -e 's/^["'\'']//;s/["'\'']$//')
    export "$key"="$clean_value"
    echo "✅ Exported: $key"
  fi
done < .env