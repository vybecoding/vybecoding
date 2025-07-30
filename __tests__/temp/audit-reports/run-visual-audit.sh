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
NEXTJS_RUNNING=$(check_server "http://localhost:3000" "Next.js")
DEMO_RUNNING=$(check_server "http://localhost:8080" "Demo")

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Please ensure both servers are running:"
    echo "   - Next.js: npm run dev (port 3000)"
    echo "   - Demo: npm run demo (port 8080)"
    echo ""
    echo "Start them in separate terminals and run this script again."
    exit 1
fi

echo ""
echo "📸 Starting visual audit..."
echo ""

# Run Playwright tests
cd "$(dirname "$0")"
npx playwright test visual-audit.spec.js --reporter=list

echo ""
echo "✅ Visual audit complete!"
echo ""
echo "📊 Results saved to: ./visual-audit-results/"
echo "   - visual-fidelity-report.md - Human-readable report"
echo "   - visual-fidelity-report.json - Detailed data"
echo "   - screenshots/ - All captured screenshots"
echo "   - accessible-pages.json - Page availability data"
echo "   - style-comparison.json - Detailed style differences"

# Open the report if on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    open ./visual-audit-results/visual-fidelity-report.md
fi