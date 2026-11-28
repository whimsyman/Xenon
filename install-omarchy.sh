#!/usr/bin/env bash
# Install the Xenon desktop app on Omarchy (or any x86_64 Linux desktop), for this user only.
#
#   bash install-omarchy.sh             install, or move to the newest version
#   bash install-omarchy.sh --uninstall remove the app (your account and progress stay on the site)
#
# It downloads the newest AppImage from the public releases, checks it against the release's
# SHA-512, keeps it at ~/.local/share/xenon/Xenon.AppImage under that fixed name (so the app's own
# updater can replace it in place), and adds Xenon to the app launcher. No sudo is needed.
set -euo pipefail

REPO="whimsyman/Xenon"
BASE="https://github.com/$REPO/releases/latest/download"
ICON_URL="https://raw.githubusercontent.com/$REPO/main/desktop/build/icon.png"

DATA="${XDG_DATA_HOME:-$HOME/.local/share}"
APP_DIR="$DATA/xenon"
APPIMAGE="$APP_DIR/Xenon.AppImage"
DESKTOP_FILE="$DATA/applications/xenon.desktop"
ICON_FILE="$APP_DIR/xenon.png"

say() { printf '\033[1m%s\033[0m\n' "$*"; }
die() { printf 'Error: %s\n' "$*" >&2; exit 1; }

refresh_launcher() {
  command -v update-desktop-database >/dev/null && update-desktop-database -q "$DATA/applications" || true
}

if [[ "${1:-}" == "--uninstall" ]]; then
  pkill -f "$APPIMAGE" 2>/dev/null || true
  rm -f "$APPIMAGE" "$DESKTOP_FILE" "$ICON_FILE" "$DATA/icons/hicolor/512x512/apps/xenon.png"
  rmdir "$APP_DIR" 2>/dev/null || true
  refresh_launcher
  say "Xenon is removed. Its saved window state and offline copy are in ~/.config/Xenon if you want to delete those too."
  exit 0
fi

[[ "$(uname -m)" == "x86_64" ]] || die "Xenon's Linux build is for x86_64 only."
for cmd in curl openssl base64; do command -v "$cmd" >/dev/null || die "$cmd is needed."; done

# AppImages need FUSE 2 to run. Omarchy has it; offer to add it elsewhere on Arch.
if ! ldconfig -p 2>/dev/null | grep 'libfuse\.so\.2' >/dev/null; then
  if command -v pacman >/dev/null; then
    say "Installing fuse2, which AppImages need (asks for your password)..."
    sudo pacman -S --needed --noconfirm fuse2
  else
    die "FUSE 2 (libfuse.so.2) is missing. Install your system's fuse2 / libfuse2 package and run this again."
  fi
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

say "Looking up the newest version..."
curl -fsSL "$BASE/latest-linux.yml" -o "$TMP/latest-linux.yml"
VERSION="$(sed -n 's/^version: *//p' "$TMP/latest-linux.yml" | head -1)"
NAME="$(sed -n 's/^path: *//p' "$TMP/latest-linux.yml" | head -1)"
WANT="$(sed -n 's/^sha512: *//p' "$TMP/latest-linux.yml" | head -1)"
[[ -n "$VERSION" && "$NAME" == *.AppImage && -n "$WANT" ]] || die "Could not read the release information."

say "Downloading Xenon $VERSION..."
curl -fL --progress-bar "$BASE/$NAME" -o "$TMP/Xenon.AppImage"
GOT="$(openssl dgst -sha512 -binary "$TMP/Xenon.AppImage" | base64 -w0)"
[[ "$GOT" == "$WANT" ]] || die "The download does not match the release's checksum. Nothing was installed."

mkdir -p "$APP_DIR" "$(dirname "$DESKTOP_FILE")"
install -m 755 "$TMP/Xenon.AppImage" "$APPIMAGE"
curl -fsSL "$ICON_URL" -o "$ICON_FILE" || say "(Could not fetch the icon; the launcher will show a generic one.)"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Type=Application
Name=Xenon
GenericName=Learn to program
Comment=Learn it by running it.
Exec="$APPIMAGE" %U
TryExec=$APPIMAGE
Icon=$ICON_FILE
Terminal=false
Categories=Education;
Keywords=code;programming;course;learn;
StartupWMClass=Xenon
X-AppImage-Version=$VERSION
EOF

refresh_launcher
say "Xenon $VERSION is installed. Open it from the app launcher (Super + Space on Omarchy), or run:"
echo "  \"$APPIMAGE\""
