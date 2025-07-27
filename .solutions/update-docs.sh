#!/bin/bash

# Auto Documentation Updater Script
# Updates all documentation based on code changes

set -e

echo "🔍 Analyzing code changes..."

# Create temporary directory for analysis
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Get git status information
echo "📊 Gathering change information..."
git status --porcelain > "$TEMP_DIR/git-status.txt" 2>/dev/null || true
git diff > "$TEMP_DIR/git-diff.txt" 2>/dev/null || true
git diff --cached > "$TEMP_DIR/git-diff-cached.txt" 2>/dev/null || true
git log -10 --oneline > "$TEMP_DIR/git-log.txt" 2>/dev/null || true

# Find all documentation files
echo "📚 Locating documentation files..."
find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" > "$TEMP_DIR/docs-list.txt"

# Analyze project structure
echo "🏗️ Analyzing project structure..."

# Get package.json scripts if exists
if [ -f "package.json" ]; then
    node -e "
    const pkg = require('./package.json');
    const scripts = pkg.scripts || {};
    console.log('Available Scripts:');
    Object.entries(scripts).forEach(([name, cmd]) => {
        console.log(\`  - npm run \${name}: \${cmd}\`);
    });
    " > "$TEMP_DIR/npm-scripts.txt"
fi

# Find main source directories
echo "📁 Identifying source directories..."
for dir in src lib app pages components prototype api utils; do
    if [ -d "$dir" ]; then
        echo "  - $dir/: $(find "$dir" -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" 2>/dev/null | wc -l) files" >> "$TEMP_DIR/source-dirs.txt"
    fi
done

# Check for configuration files
echo "⚙️ Checking configuration files..."
for config in vite.config.js webpack.config.js tsconfig.json .eslintrc.js prettier.config.js tailwind.config.js; do
    if [ -f "$config" ]; then
        echo "  - $config" >> "$TEMP_DIR/config-files.txt"
    fi
done

# Generate update summary
echo "📝 Generating documentation update summary..."
cat > "$TEMP_DIR/update-summary.txt" << EOF
Documentation Update Summary
==========================

Files to Update:
$(cat "$TEMP_DIR/docs-list.txt" | head -10)

Recent Changes:
$(cat "$TEMP_DIR/git-log.txt" | head -5)

Modified Files:
$(cat "$TEMP_DIR/git-status.txt" | head -10)

Project Structure:
$(cat "$TEMP_DIR/source-dirs.txt" 2>/dev/null || echo "No source directories found")

Configuration Files:
$(cat "$TEMP_DIR/config-files.txt" 2>/dev/null || echo "No config files found")

NPM Scripts:
$(cat "$TEMP_DIR/npm-scripts.txt" 2>/dev/null || echo "No package.json found")
EOF

echo ""
echo "✅ Analysis complete!"
echo ""
echo "📋 Summary:"
cat "$TEMP_DIR/update-summary.txt"
echo ""
echo "🚀 Now run Claude Code with the /update-docs slash command to update all documentation!"
echo ""
echo "💡 Tip: The analysis data has been saved to help with the update process."