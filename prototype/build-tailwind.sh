#!/bin/bash

# Build Tailwind CSS from source
# This script generates a custom Tailwind build to replace the CDN

echo "🎨 Building Tailwind CSS..."

# Check if npx is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js and npm."
    exit 1
fi

# Create a temporary CSS file with Tailwind directives
cat > tailwind-input.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utility classes */
@layer utilities {
  .text-gradient-brand {
    background: linear-gradient(135deg, #8a2be2, #d946a0, #e96b3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .logo-main-gradient {
    background: linear-gradient(135deg, #8a2be2, #d946a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .avatar-purple-gradient {
    background: linear-gradient(135deg, #8a2be2, #d946a0);
  }
}
EOF

# Build Tailwind (this will download Tailwind CLI if needed)
echo "📦 Generating Tailwind build..."
npx tailwindcss -i tailwind-input.css -o dist/css/tailwind.css --minify

if [ $? -eq 0 ]; then
    echo "✅ Tailwind CSS built successfully!"
    
    # Get file sizes
    TAILWIND_SIZE=$(ls -lh dist/css/tailwind.css | awk '{print $5}')
    echo "📊 Tailwind CSS size: $TAILWIND_SIZE"
    
    # Clean up
    rm tailwind-input.css
    
    echo ""
    echo "📝 To use the custom build, replace:"
    echo '   <script src="https://cdn.tailwindcss.com"></script>'
    echo "   with:"
    echo '   <link rel="stylesheet" href="dist/css/tailwind.css">'
    echo ""
    echo "Note: Remove the tailwind.config from the <script> tag as it's now built-in."
else
    echo "❌ Failed to build Tailwind CSS"
    exit 1
fi