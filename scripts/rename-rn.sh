#!/bin/bash

# === 🛠️ React Native Rename Script ===

# === Step 1: Input Project Name & Bundle ID ===
read -p "Enter new project name (e.g. MyNewApp): " NEW_NAME
read -p "Enter new bundle ID (optional, e.g. com.example.mynewapp): " BUNDLE_ID

# === Step 2: Rename Project ===
if [ -z "$BUNDLE_ID" ]; then
  echo "🔄 Renaming project to '$NEW_NAME'..."
  npx react-native-rename "$NEW_NAME"
else
  echo "🔄 Renaming project to '$NEW_NAME' with bundle ID '$BUNDLE_ID'..."
  npx react-native-rename "$NEW_NAME" -b "$BUNDLE_ID"
fi

# === Step 3: Clean Android ===
echo "🧹 Cleaning Android build..."
cd ../android && ./gradlew clean && cd ..

# === Step 4: Clean iOS ===
if [ -d "ios" ]; then
  echo "🧹 Cleaning iOS build..."
  cd ios && xcodebuild clean && cd ..
  rm -rf ~/Library/Developer/Xcode/DerivedData
fi

echo "✅ Done! Project renamed to '$NEW_NAME'"