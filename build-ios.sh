#!/bin/bash

# ==== CONFIGURATION ====
APP_NAME="YourApp"  # <-- Replace with your scheme/app name

# ==== Paths ====
ARCHIVE_PATH="./build/${APP_NAME}.xcarchive"
EXPORT_PATH="./build"
EXPORT_OPTIONS_PLIST="./ExportOptions.plist"
IPA_PATH="${EXPORT_PATH}/${APP_NAME}.ipa"

# ==== Step 1: Clean ====
echo "🧹 Cleaning project..."
xcodebuild clean -workspace "${APP_NAME}.xcworkspace" -scheme "${APP_NAME}" -configuration Release

# ==== Step 2: Archive ====
echo "📦 Archiving app..."
xcodebuild archive \
  -workspace "${APP_NAME}.xcworkspace" \
  -scheme "${APP_NAME}" \
  -configuration Release \
  -archivePath "${ARCHIVE_PATH}" \
  || { echo "❌ Archive failed"; exit 1; }

# ==== Step 3: Create ExportOptions.plist ====
echo "🛠️  Creating ExportOptions.plist..."
cat > "${EXPORT_OPTIONS_PLIST}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store</string>
  <key>signingStyle</key>
  <string>automatic</string>
  <key>compileBitcode</key>
  <true/>
  <key>stripSwiftSymbols</key>
  <true/>
  <key>uploadBitcode</key>
  <false/>
  <key>uploadSymbols</key>
  <true/>
</dict>
</plist>
EOF

# ==== Step 4: Export .ipa ====
echo "📤 Exporting .ipa..."
xcodebuild -exportArchive \
  -archivePath "${ARCHIVE_PATH}" \
  -exportOptionsPlist "${EXPORT_OPTIONS_PLIST}" \
  -exportPath "${EXPORT_PATH}" \
  || { echo "❌ Export failed"; exit 1; }

# ==== Step 5: Output .ipa path ====
if [ -f "${IPA_PATH}" ]; then
  echo "✅ .ipa build complete:"
  echo "📍 IPA file located at: ${IPA_PATH}"
else
  echo "❌ .ipa file not found."
  exit 1
fi
