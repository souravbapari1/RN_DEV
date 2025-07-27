#!/bin/bash

# === CONFIGURATION ===
APP_NAME="StarterApp"                         # Your .xcworkspace and scheme name
TEAM_ID="PVNZ3FQ5MA"                          # Replace with your real Apple Team ID
CONFIGURATION="Release"

# === PATHS ===
ROOT_DIR=$(pwd)
IOS_DIR="${ROOT_DIR}/ios"
BUILD_DIR="${IOS_DIR}/build"
ARCHIVE_PATH="${BUILD_DIR}/${APP_NAME}.xcarchive"
EXPORT_PATH="${BUILD_DIR}"
EXPORT_OPTIONS_PLIST="${BUILD_DIR}/ExportOptions.plist"
IPA_PATH="${EXPORT_PATH}/${APP_NAME}.ipa"

# === Step 1: Clean ===
echo "🧹 Cleaning project..."
xcodebuild clean \
  -workspace "${IOS_DIR}/${APP_NAME}.xcworkspace" \
  -scheme "${APP_NAME}" \
  -configuration "${CONFIGURATION}" \
  || { echo "❌ Clean failed"; exit 1; }

# === Step 2: Archive ===
echo "📦 Archiving app..."
xcodebuild archive \
  -workspace "${IOS_DIR}/${APP_NAME}.xcworkspace" \
  -scheme "${APP_NAME}" \
  -configuration "${CONFIGURATION}" \
  -archivePath "${ARCHIVE_PATH}" \
  -allowProvisioningUpdates \
  DEVELOPMENT_TEAM="${TEAM_ID}" \
  || { echo "❌ Archive failed"; exit 1; }

# === Step 3: Create ExportOptions.plist ===
echo "🛠️  Creating ExportOptions.plist..."
cat > "${EXPORT_OPTIONS_PLIST}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>signingStyle</key>
  <string>automatic</string>
  <key>teamID</key>
  <string>${TEAM_ID}</string>
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


# === Step 4: Export IPA ===
echo "📤 Exporting .ipa..."
xcodebuild -exportArchive \
  -archivePath "${ARCHIVE_PATH}" \
  -exportOptionsPlist "${EXPORT_OPTIONS_PLIST}" \
  -exportPath "${EXPORT_PATH}" \
  -allowProvisioningUpdates \
  || { echo "❌ Export failed"; exit 1; }

# === Step 5: Output Result ===
if [ -f "${IPA_PATH}" ]; then
  echo "✅ .ipa build complete!"
  echo "📍 IPA file located at: ${IPA_PATH}"
else
  echo "❌ .ipa file not found."
  exit 1
fi