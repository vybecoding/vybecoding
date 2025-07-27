#!/bin/bash

# Session Review Generator
# Generates comprehensive review of changes made in current session

set -e

echo "📊 Generating Session Review..."

# Configuration
REVIEW_FILE=".solutions/session-review-$(date +%Y%m%d-%H%M%S).md"
CLAUDE_BRANCH="claude"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Function to analyze claude branch commits from this session
analyze_session_commits() {
    if ! git show-ref --verify --quiet "refs/heads/$CLAUDE_BRANCH"; then
        echo "No claude branch found - no auto-commits to analyze"
        return
    fi
    
    # Get commits from last 24 hours (typical session length)
    local today_commits=$(git log "$CLAUDE_BRANCH" --since="24 hours ago" --oneline --no-merges 2>/dev/null || echo "")
    
    if [ -z "$today_commits" ]; then
        echo "No commits in current session"
        return
    fi
    
    echo "## Claude Branch Commits (Last 24 Hours)"
    echo ""
    echo "$today_commits" | while read -r line; do
        echo "- $line"
    done
    echo ""
    
    # Extract complexity metrics
    local simple_count=$(echo "$today_commits" | grep -c "\[SIMPLE:" || true)
    local medium_count=$(echo "$today_commits" | grep -c "\[MEDIUM:" || true)
    local complex_count=$(echo "$today_commits" | grep -c "\[COMPLEX:" || true)
    
    echo "### Complexity Distribution:"
    echo "- SIMPLE: $simple_count changes"
    echo "- MEDIUM: $medium_count changes"
    echo "- COMPLEX: $complex_count changes"
    echo ""
}

# Function to analyze file changes
analyze_file_changes() {
    echo "## Files Modified in Session"
    echo ""
    
    # Get unique files from claude branch commits
    if git show-ref --verify --quiet "refs/heads/$CLAUDE_BRANCH"; then
        local files=$(git log "$CLAUDE_BRANCH" --since="24 hours ago" --name-only --pretty=format: | sort | uniq | grep -v '^$' || true)
        
        if [ -n "$files" ]; then
            echo "### Changed Files:"
            echo "$files" | while read -r file; do
                if [ -n "$file" ]; then
                    echo "- \`$file\`"
                fi
            done
            echo ""
            
            # Count by file type
            echo "### File Type Summary:"
            echo "- JavaScript/TypeScript: $(echo "$files" | grep -cE '\.(js|ts|jsx|tsx)$' || true) files"
            echo "- Markdown: $(echo "$files" | grep -c '\.md$' || true) files"
            echo "- CSS: $(echo "$files" | grep -c '\.css$' || true) files"
            echo "- Config: $(echo "$files" | grep -cE '\.(json|yaml|yml|toml)$' || true) files"
            echo "- Shell Scripts: $(echo "$files" | grep -c '\.sh$' || true) files"
            echo ""
        fi
    fi
}

# Function to check for solutions learned
check_solutions_learned() {
    echo "## Solutions Learned"
    echo ""
    
    if [ -f ".solutions/solutions.log" ]; then
        local today_solutions=$(grep "$(date +%Y-%m-%d)" .solutions/solutions.log 2>/dev/null | wc -l || true)
        if [ "$today_solutions" -gt 0 ]; then
            echo "✅ Added $today_solutions new solutions to knowledge base today"
        else
            echo "No new solutions added today"
        fi
    else
        echo "No solutions log found"
    fi
    echo ""
}

# Function to analyze current working changes
analyze_working_changes() {
    echo "## Current Working Changes"
    echo ""
    
    local staged=$(git diff --cached --name-only | wc -l)
    local unstaged=$(git diff --name-only | wc -l)
    local untracked=$(git ls-files --others --exclude-standard | wc -l)
    
    echo "- Staged files: $staged"
    echo "- Unstaged files: $unstaged"
    echo "- Untracked files: $untracked"
    echo ""
}

# Function to generate recommendations
generate_recommendations() {
    echo "## Recommendations"
    echo ""
    
    # Check if mostly complex changes
    if git show-ref --verify --quiet "refs/heads/$CLAUDE_BRANCH"; then
        local complex_ratio=$(git log "$CLAUDE_BRANCH" --since="24 hours ago" --oneline | grep -c "\[COMPLEX:" || true)
        local total_commits=$(git log "$CLAUDE_BRANCH" --since="24 hours ago" --oneline | wc -l || true)
        
        if [ "$total_commits" -gt 0 ] && [ "$complex_ratio" -gt $((total_commits / 2)) ]; then
            echo "⚠️  High complexity detected - consider breaking down future changes"
        fi
    fi
    
    # Check for uncommitted changes
    if [ "$(git status --porcelain | wc -l)" -gt 0 ]; then
        echo "📝 You have uncommitted changes - consider committing or stashing"
    fi
    
    # Suggest running tests
    echo "🧪 Remember to run tests after significant changes"
    echo "📚 Consider running /update-docs to sync documentation"
    echo ""
}

# Generate the review
{
    echo "# Session Review - $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""
    echo "Branch: \`$CURRENT_BRANCH\`"
    echo ""
    
    analyze_session_commits
    analyze_file_changes
    check_solutions_learned
    analyze_working_changes
    generate_recommendations
    
    echo "---"
    echo "*Generated by generate-review.sh*"
} > "$REVIEW_FILE"

echo "✅ Session review generated: $REVIEW_FILE"
echo ""
echo "Preview:"
echo "========"
head -20 "$REVIEW_FILE"
echo "..."
echo ""
echo "📄 Full review saved to: $REVIEW_FILE"