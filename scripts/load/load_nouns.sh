#!/bin/bash

# List of 25 noun stems with their gender and class
# Feel free to edit or expand this
shabdas+=(
  "kaṭa masculine a-stem"          # mat
  "vāc feminine consonant-stem"    # speech
  "nayana neuter a-stem"           # eye
  "śānti feminine ī-stem"          # peace
  "putrikā feminine ā-stem"        # daughter
)
# Loop over each noun and generate/upload it
for entry in "${shabdas[@]}"; do
  set -- $entry
  stem=$1
  gender=$2
  class=$3

  echo "⚙️ Generating: $stem ($gender, $class)"
  pnpm tsx scripts/shabda/shabda-cli.ts generate-shabda $stem $gender $class
  echo
done

echo "✅ All done generating shabdas."