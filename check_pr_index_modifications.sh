#!/bin/bash

echo "Checking PRs 1-21 for modifications to src/pages/index.astro"
echo "============================================================"

for pr in {1..21}; do
  # Get files changed in PR
  files=$(gh pr view $pr --json files --jq '.files[].path' 2>/dev/null)
  
  # Check if the command was successful
  if [ $? -ne 0 ]; then
    echo "PR $pr: ERROR (PR may not exist or be inaccessible)"
    continue
  fi
  
  # Check if index.astro is in the list of modified files
  if echo "$files" | grep -q "^src/pages/index.astro$"; then
    echo "PR $pr: true"
  else
    echo "PR $pr: false"
  fi
done

echo "============================================================"
echo "Script completed."