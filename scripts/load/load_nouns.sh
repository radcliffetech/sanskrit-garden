#!/bin/bash

# List of 25 noun stems with their gender and class
# Feel free to edit or expand this
shabdas+=(
  "vṛkṣa masculine a-stem"        # tree  
  "dhenu feminine ū-stem"         # cow  
  "tejas neuter consonant-stem"   # brilliance  
  "rati feminine i-stem"          # love, pleasure  
  "śakti feminine ī-stem"         # power, energy  
)
# Loop over each noun and generate/upload it
for entry in "${shabdas[@]}"; do
  set -- $entry
  stem=$1
  gender=$2
  class=$3

  echo "⚙️ Generating: $stem ($gender, $class)"
  pnpm tsx scripts/review/review-cli.ts generate-shabda $stem $gender $class
  echo
done

echo "✅ All done generating shabdas."