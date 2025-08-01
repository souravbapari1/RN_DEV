#!/bin/bash

# === CONFIGURATION ===
APP_NAME="MyApp"  # Optional, for logs only
ROOT_DIR=$(pwd)
ANDROID_DIR="${ROOT_DIR}/../android"
GRADLEW="${ANDROID_DIR}/gradlew"
OUTPUT_DIR_AAB="${ANDROID_DIR}/app/build/outputs/bundle/release"
OUTPUT_DIR_APK="${ANDROID_DIR}/app/build/outputs/apk/release"
APK_PATH="${OUTPUT_DIR_APK}/app-release.apk"
AAB_PATH="${OUTPUT_DIR_AAB}/app-release.aab"

# === CHECK FILES ===
if [ ! -f "$GRADLEW" ]; then
  echo "❌ gradlew not found at $GRADLEW"
  echo "Make sure you're running this from the root of your React Native project."
  exit 1
fi

# === MAKE gradlew EXECUTABLE ===
chmod +x "$GRADLEW"

# === CLEAN ===
echo "🧹 Cleaning project..."
cd "$ANDROID_DIR" || { echo "❌ Failed to cd into android directory"; exit 1; }
./gradlew clean || { echo "❌ Gradle clean failed"; exit 1; }

# === BUILD APK ===
echo "📦 Building APK..."
./gradlew assembleRelease || { echo "❌ APK build failed"; exit 1; }

# === BUILD AAB ===
echo "📦 Building AAB..."
./gradlew bundleRelease || { echo "❌ AAB build failed"; exit 1; }

# === DONE ===
cd "$ROOT_DIR"

echo ""
echo "✅ Android build complete for $APP_NAME"

if [ -f "$APK_PATH" ]; then
  echo "📍 APK: $APK_PATH"
else
  echo "❌ APK not found"
fi

if [ -f "$AAB_PATH" ]; then
  echo "📍 AAB: $AAB_PATH"
else
  echo "❌ AAB not found"
fi
