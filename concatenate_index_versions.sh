#!/bin/bash

output_file="index_astro_all_versions.txt"
target_file="src/pages/index.astro"

echo "Concatenating all versions of $target_file from PRs that modified it..."
echo "Output file: $output_file"

# Clear output file
> "$output_file"

# Add header to output file
echo "ALL VERSIONS OF src/pages/index.astro FROM MODIFYING PRs" >> "$output_file"
echo "Generated on: $(date)" >> "$output_file"
echo "Repository: $(gh repo view --json nameWithOwner --jq '.nameWithOwner')" >> "$output_file"
echo "" >> "$output_file"

# PRs that modified index.astro: 8, 10, 16, 17, 18, 19, 20
for pr in 8 10 16 17 18 19 20; do
  echo "Processing PR #$pr..."
  
  # Get PR details
  pr_info=$(gh pr view $pr --json mergeCommit,createdAt,title,mergedAt,headRefOid 2>/dev/null)
  
  if [ $? -ne 0 ]; then
    echo "Warning: Could not get info for PR #$pr, skipping..."
    continue
  fi
  
  # Extract metadata
  merge_commit=$(echo "$pr_info" | jq -r '.mergeCommit.oid // empty')
  head_commit=$(echo "$pr_info" | jq -r '.headRefOid // empty')
  created_date=$(echo "$pr_info" | jq -r '.createdAt')
  merged_date=$(echo "$pr_info" | jq -r '.mergedAt // "Not merged"')
  title=$(echo "$pr_info" | jq -r '.title')
  
  # Use merge commit if available, otherwise head commit
  commit_to_use=""
  if [ -n "$merge_commit" ] && [ "$merge_commit" != "null" ]; then
    commit_to_use="$merge_commit"
    commit_type="merge"
  elif [ -n "$head_commit" ] && [ "$head_commit" != "null" ]; then
    commit_to_use="$head_commit"
    commit_type="head"
  else
    echo "Warning: No valid commit found for PR #$pr, skipping..."
    continue
  fi
  
  # Get the file content from that commit
  echo "  Getting file content from commit $commit_to_use..."
  file_response=$(gh api "repos/:owner/:repo/contents/$target_file?ref=$commit_to_use" 2>/dev/null)
  
  if [ $? -ne 0 ]; then
    echo "  Warning: Could not get file content for PR #$pr, skipping..."
    continue
  fi
  
  file_content=$(echo "$file_response" | jq -r '.content' | base64 -d 2>/dev/null)
  
  if [ $? -ne 0 ] || [ -z "$file_content" ]; then
    echo "  Warning: Could not decode file content for PR #$pr, skipping..."
    continue
  fi
  
  # Add to concatenated file with metadata
  echo "========================================" >> "$output_file"
  echo "PR #$pr: $title" >> "$output_file"
  echo "Created: $created_date" >> "$output_file"
  echo "Merged: $merged_date" >> "$output_file"
  echo "Commit: $commit_to_use ($commit_type)" >> "$output_file"
  echo "========================================" >> "$output_file"
  echo "" >> "$output_file"
  echo "$file_content" >> "$output_file"
  echo "" >> "$output_file"
  echo "" >> "$output_file"
  
  echo "  ✓ Added PR #$pr to output file"
done

echo ""
echo "============================================================"
echo "Concatenation completed. Output saved to: $output_file"
echo "File size: $(wc -l < "$output_file") lines"
echo "============================================================"