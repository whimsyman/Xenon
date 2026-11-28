# Arc, the Xenon Discord bot: setting it up

Arc runs inside the Xenon desktop app (2.7.1 and later for the full console), on your computer, while the app is open. You control it from
the **Bot** page of the site (your account menu, or Admin > Open bot panel). Only the owner account sees it.

## 1. Make the bot on Discord (once)

1. Go to https://discord.com/developers/applications and press **New Application**. Name it `Arc`, accept, **Create**.
   (A separate app from the "Xenon" one used for "Continue with Discord" keeps the two apart.)
2. **General Information**: give it Arc's picture (`D:\XenonSoruce\arc-avatar.png`) and a short description, such as
   "The Xenon community bot". (Once Arc is connected, the panel's **Give Arc its name and picture** button sets the
   bot's own name and picture too.)
3. **Bot** in the left menu:
   - Set the **Username** to `Arc` and the same picture (or let the panel's button do it).
   - Under **Privileged Gateway Intents**, switch on **Server Members Intent** (lets Arc list and manage members).
     Also switch on **Message Content Intent** if you want to read other people's messages in the panel and use
     the console's message tools fully (Arc works without it; Arc's own messages always show). Presence is not needed.
   - Switch **Public Bot** off, so only you can add Arc to servers.
   - Press **Reset Token**, confirm, and **Copy** the token. Treat it like a password: anyone with it controls the bot.

## 2. Make the server (once)

In Discord, press **+** in the server list, **Create My Own**, **For me and my friends**, name it `Xenon`.

## 3. Connect Arc

1. Open the **Xenon desktop app** (update to 2.7.1 or later), sign in, open your account menu and choose **Bot**.
2. Paste the token and press **Save and connect**. It is kept encrypted on this computer only.
3. Press **Add Arc to a server**, pick your Xenon server, and allow **Administrator**. Back in the panel, pick the server.

## 4. Build the server

- **Set up** builds everything: roles, the START HERE, COMMUNITY, XENON, MINECRAFT and STAFF categories and their
  channels, the right permissions, the welcome/rules/FAQ posts, Community, the welcome screen, onboarding (new members
  pick their courses and pings) and the server icon. Watch it in the temporary channel at the top, or in Activity.
- **Nuke** deletes every channel and role first (type the server's name to confirm). A copy of the roles and channels
  is saved in the app's data folder (`arc-backups`) first; messages cannot be saved or brought back.
- **Nuke and rebuild** does both.

Arc can only delete or change roles below its own. In a brand-new server that is all of them. If you add roles by hand
later, keep **Arc**'s role at the top of Server Settings > Roles.

Afterwards, give yourself the **👑 Owner** role in the panel's Members list.

## 5. Announcements

Run `supabase/announcements.sql` once in the Supabase SQL Editor. Then write announcements in the panel: each one goes
on the site's Announcements page and, while Arc is connected, in the server's #announcements channel (pinging the
📣 Announcements role if you tick it).

## Slash commands in Discord

- `/xenon`: anyone; what Xenon is and where to start.
- `/arc setup`, `/arc nuke`, `/arc rebuild`: the server's owner only (nuke and rebuild ask for the server's name).

## The console (desktop app 2.7.0)

The Bot page is laid out like a developer console:

- **Left: the server's channels**, folded by category. **+ Channel** and **+ Category** make new ones: type a name and
  pick an emoji, and it comes out in the server's own style (`💬┃name` for text, `📁 NAME` for a category). The `+` on a
  category adds a channel inside it; the sliders open the category's settings.
- **Middle: what you opened.** A channel has *Messages* (read, pin, react, delete, clear the last few, and post as Arc:
  a message, an embed, a poll, or **files**, each with its own name and description, up to 10 files and 10 MB),
  *Settings* (name, topic, slow mode, age-restricted, category, lock, hide, sync, move, copy, delete), *Permissions*
  (allow / neutral / deny per role) and *Invites*.
- **Right: members and roles.** A member: roles, nickname, a DM from Arc, voice (move, mute, deafen, disconnect),
  time-out, kick, ban. A role: name, colour, shown separately, mentionable, its place, permissions, give to everyone.
- **Tools along the top:** *Server* (stats, name, description, icon and banner, safety settings, emergency lockdown,
  backup), *Moderation* (AutoMod filters for words, spam and mentions, the audit log, bans), *Automations* (welcome
  and goodbye messages, roles on join, button role pickers, your own slash commands, scheduled and repeating
  messages, Arc's status), *Emoji & events*, *Announcements*, *Build* (set up, nuke, rebuild) and *Connection*.
- **Bottom: the console.** Everything Arc does, as it happens, and a command line. Type `help` for the commands
  (`send #general hi`, `purge #memes 20`, `lock #general`, `create channel news 📰 in COMMUNITY`, `timeout @name 10`,
  `schedule #general 2026-12-01 18:00 Study time!`, …). Up and Down go back through earlier commands. Commands that destroy
  something (`delete`, `kick`, `ban`) need `--yes` at the end.

Automations and scheduled messages run while the desktop app is open.
