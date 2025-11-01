#!/bin/bash

# Package Claude Usage Tracker for distribution
# Creates a clean zip file ready for Chrome Web Store submission

echo "📦 Packaging Claude Usage Tracker..."

# Define version
VERSION="1.0.0"
PACKAGE_NAME="claude-usage-tracker-v${VERSION}.zip"

# Create temporary directory for clean package
TEMP_DIR="./dist"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy necessary files
echo "📋 Copying files..."
cp manifest.json "$TEMP_DIR/"
cp popup.html "$TEMP_DIR/"
cp popup.css "$TEMP_DIR/"
cp popup.js "$TEMP_DIR/"
cp content.js "$TEMP_DIR/"
cp background.js "$TEMP_DIR/"
cp -r icons "$TEMP_DIR/"

# Create zip file
echo "🗜️  Creating zip archive..."
cd "$TEMP_DIR"
zip -r "../${PACKAGE_NAME}" . -x "*.DS_Store" "*.git*"
cd ..

# Clean up
rm -rf "$TEMP_DIR"

echo "✅ Package created: ${PACKAGE_NAME}"
echo "📦 Ready for Chrome Web Store submission!"
echo ""
echo "Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Click 'New Item'"
echo "3. Upload ${PACKAGE_NAME}"
echo "4. Fill in store listing details"
echo "5. Submit for review!"
