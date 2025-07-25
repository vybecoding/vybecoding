#!/bin/bash
# Script to generate SRI hashes for external dependencies
# Run this when updating external CDN resources

echo "Generating SRI hashes for external dependencies..."

# Function to generate SRI hash for a URL
generate_sri() {
    local url="$1"
    local name="$2"
    echo "Generating SRI hash for $name..."
    
    # Download the file and generate SHA384 hash
    curl -s "$url" | openssl dgst -sha384 -binary | openssl base64 -A
}

# Tailwind CSS CDN
TAILWIND_URL="https://cdn.tailwindcss.com/3.4.0"
TAILWIND_HASH=$(generate_sri "$TAILWIND_URL")

echo ""
echo "=== SRI Hashes Generated ==="
echo "Tailwind CSS: sha384-$TAILWIND_HASH"
echo ""
echo "Add these to your HTML:"
echo "<script src=\"https://cdn.tailwindcss.com\" "
echo "        integrity=\"sha384-$TAILWIND_HASH\" "
echo "        crossorigin=\"anonymous\""
echo "        nonce=\"vybe2025\"></script>"

echo ""
echo "Note: For production, pin to specific versions (e.g., 3.4.0) instead of latest"