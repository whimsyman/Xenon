# Xenon

Learn to program by writing real code: **<https://xenon.justloofy.dev>**

You read a short lesson, then write code that is really compiled and tested. Every milestone ends with a
project. The lesson, the code editor, the compiler, the checks and your progress are all in one place, and your
account carries them to every device.

## What is on it

23 courses, 962 lessons and 2088 checked tasks, each course one path from the first line to
advanced work:

| | |
|---|---|
| **Languages** | C++, C, C#, Java, Python, JavaScript and TypeScript, Rust, Lua, x86-64 assembly |
| **Foundations** | How computers work, data structures and algorithms |
| **Building things** | Game development and low-level programming, raylib, the Win32 API, Dear ImGui, DLLs, Windows kernel drivers |

Around the courses there is a code editor with completion and live error checking, a terminal, a Playground
for projects of your own, review cards, notes, achievements and a leaderboard.

## The beta

Xenon is in beta. Anyone can make an account on the site, and for now accounts are limited to 150.

- Everyone who joins during the beta is a **beta user**, and keeps that role afterwards.
- It is free during the beta. A subscription is planned for later; its price and what it will include have not
  been decided.

Found a bug, or want something added? Sign in and use **Send a suggestion** in your account menu.

## The desktop app

The desktop app is the same site in windows of its own: the same account and progress, more than one window,
find on the page, saving a page as a PDF, and it opens with no connection because it keeps a copy of the site on
your computer. It updates itself.

**[Download the latest version](https://github.com/whimsyman/Xenon/releases/latest)** and pick the file for your
computer:

| System | File | How |
|---|---|---|
| Windows | `Xenon-Setup-….exe` | Run it to install. `Xenon-…-portable.exe` runs without installing. |
| macOS | `Xenon-…-mac-universal.zip` | One file for every Mac. Double-click it and keep `Xenon.app` anywhere, such as the Desktop. The first time, open Terminal and run `xattr -dr com.apple.quarantine ~/Desktop/Xenon.app` (change the path if you put it somewhere else); after that it opens with a double-click. The `.dmg` is the same app for dragging into Applications. |
| Linux | `Xenon-…-x86_64.AppImage` | Mark it executable and run it. The `.deb` installs on Debian and Ubuntu. |

**On Omarchy** (or any other x86-64 Linux desktop), one line installs it for you and adds it to the app launcher:

```bash
curl -fsSL https://raw.githubusercontent.com/whimsyman/Xenon/main/install-omarchy.sh | bash
```

It downloads the newest AppImage from the releases page, checks it against the release's checksum, keeps it in
`~/.local/share/xenon` and adds Xenon to the launcher. It needs no administrator password, and the app goes on
updating itself. Run the same line again to reinstall; add `-s -- --uninstall` after `bash` to remove it.
[Read the script](install-omarchy.sh) before running it if you like.

The Windows app is the one used every day. The macOS and Linux apps are built and checked automatically but
have had far less use, so say so with "Send a suggestion" if one misbehaves.

## What is in this repository

- **`desktop/`** is the source of the desktop app. The installers on the
  [releases page](https://github.com/whimsyman/Xenon/releases) are built from it here, in the open.
- **`site/`** is the website exactly as it is served at xenon.justloofy.dev: the files a browser is sent. They
  are published here by a tool and are not meant to be read or edited.

The website's own source, the courses as they are written and the tools that build them are kept in a private
repository.

## Rights

Copyright © 2026 whimsyman. All rights reserved. Nothing here is under an open-source licence: the site, its
courses and the app may be used as offered at xenon.justloofy.dev, and may not be copied, republished or
hosted elsewhere without permission.
