#!/bin/bash

# Visual Audit Runner Script
# Compares Next.js implementation with demo across multiple breakpoints

echo "🎨 Visual Audit - Comparing Next.js vs Demo"
echo "==========================================="

# Check if servers are running
check_server() {
    local url=$1
    local name=$2
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|404"; then
        echo "✅ $name server is running at $url"
        return 0
    else
        echo "❌ $name server is not running at $url"
        return 1
    fi
}

# Check both servers
check_server "http://localhost:3000" "Next.js"
NEXTJS_RUNNING=$?

check_server "http://localhost:8080" "Demo"
DEMO_RUNNING=$?

# Demo must be running
if [ $DEMO_RUNNING -ne 0 ]; then
    echo ""
    echo "⚠️  Demo server must be running!"
    echo "   Start it with: npm run demo"
    echo ""
    exit 1
fi

# Warn if Next.js not running but continue
if [ $NEXTJS_RUNNING -ne 0 ]; then
    echo ""
    echo "⚠️  Next.js server is not running"
    echo "   The audit will analyze the demo only."
    echo "   For full comparison, start Next.js with: npm run dev"
    echo ""
fi

echo ""
echo "📸 Starting visual audit..."
echo ""

# Run Playwright tests - use enhanced version
cd "$(dirname "$0")"
npx playwright test visual-audit-enhanced.spec.js --reporter=list

echo ""
echo "✅ Visual audit complete!"
echo ""
echo "📊 Results saved to: ./visual-audit-results/"
echo "   - visual-audit-report.md - Main report with analysis"
echo "   - demo-analysis.json - Demo design system extraction"
echo "   - server-status.json - Server availability"

if [ $NEXTJS_RUNNING -eq 0 ]; then
    echo "   - comparison-results.json - Visual differences"
    echo "   - screenshots/ - Side-by-side screenshots"
else
    echo "   - demo-only/ - Demo screenshots at all breakpoints"
fi

echo ""
echo "📖 View the report: cat ./visual-audit-results/visual-audit-report.md"

# Open the report if on macOS/Linux with appropriate viewer
if command -v xdg-open > /dev/null 2>&1; then
    xdg-open ./visual-audit-results/visual-audit-report.md 2>/dev/null
elif command -v open > /dev/null 2>&1; then
    open ./visual-audit-results/visual-audit-report.md 2>/dev/null
fi