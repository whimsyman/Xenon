'use strict';
/*
  Arc's tools for the Bot panel and the console: the server, channels, messages, roles, members, moderation,
  emoji and events. Mixed into the Arc class (desktop/bot/arc.js). Every method takes one plain object (what the
  panel sends through the desktop app) and returns plain data, and logs what it changed.
*/
const fs = require('fs');
const path = require('path');

let D = null;
const lib = () => (D ||= require('discord.js'));

const MB = 1024 * 1024;
const clip = (value, max) => String(value === undefined || value === null ? '' : value).slice(0, max);
const isoOr = d => (d ? new Date(d).toISOString() : null);
/** A file the panel sent: { name, data (base64), description }. */
function fileFrom(f, max = 10 * MB) {
  if (!f || typeof f.data !== 'string' || !f.name) return null;
  const buffer = Buffer.from(f.data, 'base64');
  if (buffer.length > max) throw new Error(`${f.name} is ${(buffer.length / MB).toFixed(1)} MB; Discord takes at most ${max / MB} MB here.`);
  return { attachment: buffer, name: clip(f.name, 100).replace(/[\\/:*?"<>|]/g, '_'), description: f.description ? clip(f.description, 1024) : undefined };
}
const hex = c => (/^#[0-9a-f]{6}$/i.test(c || '') ? parseInt(c.slice(1), 16) : 0x6b9ef7);

/** Permissions the panel can switch on a channel, in the order it shows them. */
const CHANNEL_PERMS = ['ViewChannel', 'SendMessages', 'SendMessagesInThreads', 'CreatePublicThreads', 'AttachFiles', 'EmbedLinks', 'AddReactions',
  'UseExternalEmojis', 'MentionEveryone', 'ManageMessages', 'ReadMessageHistory', 'Connect', 'Speak', 'Stream', 'UseApplicationCommands', 'SendPolls'];
/** Permissions the panel can switch on a role. */
const ROLE_PERMS = ['Administrator', 'ManageGuild', 'ManageChannels', 'ManageRoles', 'ManageMessages', 'ManageThreads', 'ManageNicknames',
  'ManageGuildExpressions', 'ManageEvents', 'ManageWebhooks', 'ViewAuditLog', 'KickMembers', 'BanMembers', 'ModerateMembers', 'MuteMembers',
  'DeafenMembers', 'MoveMembers', 'MentionEveryone', 'ViewChannel', 'SendMessages', 'AttachFiles', 'EmbedLinks', 'AddReactions', 'Connect',
  'Speak', 'Stream', 'ChangeNickname', 'CreateInstantInvite', 'UseExternalEmojis', 'SendPolls', 'PinMessages'];

const tools = {
  /* ---------- the server ---------- */

  async serverInfo() {
    const g = this.guild();
    const { ChannelType } = lib();
    const channels = [...g.channels.cache.values()];
    const count = t => channels.filter(c => c.type === t).length;
    let bots = null;
    if (this.membersIntent) { const all = await g.members.fetch().catch(() => g.members.cache); bots = all.filter(m => m.user.bot).size; }
    return {
      id: g.id, name: g.name, description: g.description || '', icon: g.iconURL({ size: 256 }), banner: g.bannerURL({ size: 512 }),
      created: isoOr(g.createdAt), owner: g.ownerId, members: g.memberCount, bots, boosts: g.premiumSubscriptionCount || 0, tier: g.premiumTier,
      channels: { text: count(ChannelType.GuildText), voice: count(ChannelType.GuildVoice), forum: count(ChannelType.GuildForum), announcement: count(ChannelType.GuildAnnouncement), categories: count(ChannelType.GuildCategory) },
      roles: g.roles.cache.size - 1, emojis: g.emojis.cache.size, features: g.features,
      verificationLevel: g.verificationLevel, explicitContentFilter: g.explicitContentFilter, defaultMessageNotifications: g.defaultMessageNotifications,
      afkChannelId: g.afkChannelId, afkTimeout: g.afkTimeout, systemChannelId: g.systemChannelId, rulesChannelId: g.rulesChannelId,
      vanity: g.vanityURLCode || null,
    };
  },

  async editServer({ name, description, verificationLevel, explicitContentFilter, defaultMessageNotifications, afkChannelId, afkTimeout, systemChannelId }) {
    const g = this.guild();
    const patch = { reason: 'Arc panel' };
    if (name) patch.name = clip(name, 100);
    if (typeof description === 'string') patch.description = clip(description, 120);
    if (Number.isInteger(verificationLevel)) patch.verificationLevel = verificationLevel;
    if (Number.isInteger(explicitContentFilter)) patch.explicitContentFilter = explicitContentFilter;
    if (Number.isInteger(defaultMessageNotifications)) patch.defaultMessageNotifications = defaultMessageNotifications;
    if (afkChannelId !== undefined) patch.afkChannel = afkChannelId || null;
    if (Number.isInteger(afkTimeout)) patch.afkTimeout = afkTimeout;
    if (systemChannelId !== undefined) patch.systemChannel = systemChannelId || null;
    await g.edit(patch);
    this.log('⚙️ Changed the server settings.');
    return this.serverInfo();
  },

  /** The server's icon or banner, from a picked image ({ kind: 'icon' | 'banner', file }) or Xenon's own icon. */
  async serverImage({ kind, file, xenon }) {
    const g = this.guild();
    const image = xenon ? path.join(__dirname, '..', 'build', 'icon.png') : fileFrom(file, 8 * MB)?.attachment;
    if (!image) throw new Error('Pick an image first.');
    if (kind === 'banner') await g.setBanner(image, 'Arc panel'); else await g.setIcon(image, 'Arc panel');
    this.log(`🖼️ Changed the server ${kind === 'banner' ? 'banner' : 'icon'}.`);
    return this.serverInfo();
  },

  /** Writes a copy of the roles and channels to the backups folder now. */
  async backupNow() {
    const file = this.backup(this.guild());
    this.log(`💾 Saved a copy of the roles and channels to ${file}.`);
    return { file };
  },

  /** Locks (or unlocks) every text channel at once: nobody but the staff can post. */
  async lockdown({ on }) {
    const g = this.guild();
    const { ChannelType } = lib();
    let n = 0;
    for (const c of g.channels.cache.values()) {
      if (![ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildAnnouncement].includes(c.type)) continue;
      await c.permissionOverwrites.edit(g.roles.everyone, { SendMessages: on ? false : null, SendMessagesInThreads: on ? false : null, CreatePublicThreads: on ? false : null }, { reason: on ? 'Arc: lockdown' : 'Arc: lockdown over' }).catch(() => {});
      n++;
    }
    this.log(on ? `🔒 Lockdown: ${n} channels locked.` : `🔓 Lockdown over: ${n} channels open again.`);
    this.modlog(g, on ? '🔒 The server is in lockdown.' : '🔓 Lockdown is over.');
    return { channels: n };
  },

  /* ---------- one channel ---------- */

  channelOf(id) {
    const ch = this.guild().channels.cache.get(id);
    if (!ch) throw new Error('That channel is gone.');
    return ch;
  },

  async channelInfo({ id }) {
    const ch = this.channelOf(id);
    const g = ch.guild;
    const everyone = ch.permissionOverwrites ? ch.permissionOverwrites.cache.get(g.id) : null;
    return {
      id: ch.id, name: ch.name, type: ch.type, topic: ch.topic || '', nsfw: !!ch.nsfw, slowmode: ch.rateLimitPerUser || 0, parentId: ch.parentId,
      position: ch.position, created: isoOr(ch.createdAt), bitrate: ch.bitrate || null, userLimit: ch.userLimit ?? null,
      locked: !!(everyone && everyone.deny.has('SendMessages')), hidden: !!(everyone && everyone.deny.has('ViewChannel')),
      synced: ch.permissionsLocked ?? null, canSend: typeof ch.send === 'function', forum: ch.type === lib().ChannelType.GuildForum, voice: ch.type === lib().ChannelType.GuildVoice,
      overwrites: ch.permissionOverwrites ? [...ch.permissionOverwrites.cache.values()].map(o => ({
        id: o.id, kind: o.type === 0 ? 'role' : 'member', name: o.type === 0 ? (g.roles.cache.get(o.id)?.name || 'role') : (g.members.cache.get(o.id)?.displayName || 'member'),
        allow: o.allow.toArray(), deny: o.deny.toArray(),
      })) : [],
      perms: CHANNEL_PERMS,
    };
  },

  async channelSettings({ id, topic, slowmode, nsfw, userLimit, bitrate }) {
    const ch = this.channelOf(id);
    const patch = { reason: 'Arc panel' };
    if (typeof topic === 'string' && 'topic' in ch) patch.topic = clip(topic, 1024);
    if (Number.isInteger(slowmode)) patch.rateLimitPerUser = Math.max(0, Math.min(21600, slowmode));
    if (typeof nsfw === 'boolean') patch.nsfw = nsfw;
    if (Number.isInteger(userLimit)) patch.userLimit = Math.max(0, Math.min(99, userLimit));
    if (Number.isInteger(bitrate)) patch.bitrate = Math.max(8000, Math.min(96000, bitrate));
    await ch.edit(patch);
    this.log(`⚙️ Changed the settings of ${ch.name}.`);
    return this.channelInfo({ id });
  },

  async lockChannel({ id, on }) {
    const ch = this.channelOf(id);
    await ch.permissionOverwrites.edit(ch.guild.roles.everyone, { SendMessages: on ? false : null, SendMessagesInThreads: on ? false : null, AddReactions: on ? false : null }, { reason: 'Arc panel' });
    this.log(`${on ? '🔒 Locked' : '🔓 Unlocked'} ${ch.name}.`);
    return this.channelInfo({ id });
  },

  async hideChannel({ id, on }) {
    const ch = this.channelOf(id);
    await ch.permissionOverwrites.edit(ch.guild.roles.everyone, { ViewChannel: on ? false : null }, { reason: 'Arc panel' });
    this.log(`${on ? '🙈 Hid' : '👀 Showed'} ${ch.name}.`);
    return this.channelInfo({ id });
  },

  /** One role's (or member's) say on one channel: { perm: true (allow) | false (deny) | null (as the server says) }. */
  async setOverwrite({ id, target, perms }) {
    const ch = this.channelOf(id);
    const clean = {};
    for (const [k, v] of Object.entries(perms || {})) if (CHANNEL_PERMS.includes(k)) clean[k] = v === true ? true : v === false ? false : null;
    await ch.permissionOverwrites.edit(target, clean, { reason: 'Arc panel' });
    this.log(`🔑 Changed who may do what in ${ch.name}.`);
    return this.channelInfo({ id });
  },

  async removeOverwrite({ id, target }) {
    const ch = this.channelOf(id);
    await ch.permissionOverwrites.delete(target, 'Arc panel');
    return this.channelInfo({ id });
  },

  async syncChannel({ id }) {
    const ch = this.channelOf(id);
    if (!ch.parent) throw new Error('That channel has no category to copy from.');
    await ch.lockPermissions();
    this.log(`🔗 ${ch.name} now follows its category's permissions.`);
    return this.channelInfo({ id });
  },

  async cloneChannel({ id }) {
    const ch = this.channelOf(id);
    const copy = await ch.clone({ reason: 'Arc panel' });
    this.log(`📄 Copied ${ch.name}.`);
    return { id: copy.id, name: copy.name };
  },

  /** Moves a channel (or category) one place up or down among its neighbours. */
  async moveChannel({ id, by }) {
    const ch = this.channelOf(id);
    await ch.setPosition(Math.max(0, ch.position + (by < 0 ? -1 : 1)), { reason: 'Arc panel' });
    return { ok: true };
  },

  /* ---------- messages ---------- */

  async messages({ id, limit = 40 }) {
    const ch = this.channelOf(id);
    if (!ch.messages) return { messages: [], content: this.contentIntent };
    const list = await ch.messages.fetch({ limit: Math.max(1, Math.min(100, limit)) });
    return {
      content: this.contentIntent,
      messages: [...list.values()].reverse().map(m => ({
        id: m.id, author: m.member ? m.member.displayName : m.author.username, avatar: m.author.displayAvatarURL({ size: 64 }), bot: m.author.bot, mine: m.author.id === this.client.user.id,
        at: isoOr(m.createdAt), edited: !!m.editedAt, pinned: m.pinned, content: m.content,
        embeds: m.embeds.map(e => ({ title: e.title, description: e.description, color: e.hexColor, url: e.url })),
        files: [...m.attachments.values()].map(a => ({ name: a.name, url: a.url, size: a.size, image: /^image\//.test(a.contentType || ''), description: a.description || '' })),
        poll: m.poll ? { question: m.poll.question.text, answers: [...m.poll.answers.values()].map(a => ({ text: a.text, votes: a.voteCount })) } : null,
      })),
    };
  },

  /**
   * Sends a message as Arc in a channel: text, an embed, files (each with a name and a description) and/or a poll.
   * { id, content, embed: { title, description, color, url, image, footer }, files: [{ name, data, description }], poll: { question, answers, hours, multi }, silent }
   */
  async sendMessage({ id, content, embed, files, poll, silent }) {
    const ch = this.channelOf(id);
    const { EmbedBuilder, MessageFlags } = lib();
    if (typeof ch.send !== 'function') throw new Error('Arc cannot post in that kind of channel.');
    const msg = { allowedMentions: { parse: ['users', 'roles'] } };
    if (content) msg.content = clip(content, 2000);
    if (embed && (embed.title || embed.description)) {
      const e = new EmbedBuilder().setColor(hex(embed.color));
      if (embed.title) e.setTitle(clip(embed.title, 256));
      if (embed.description) e.setDescription(clip(embed.description, 4000));
      if (embed.url && /^https?:\/\//.test(embed.url)) e.setURL(embed.url);
      if (embed.image && /^https?:\/\//.test(embed.image)) e.setImage(embed.image);
      if (embed.footer) e.setFooter({ text: clip(embed.footer, 200) });
      if (embed.timestamp) e.setTimestamp(new Date());
      msg.embeds = [e];
    }
    const attached = (files || []).map(f => fileFrom(f)).filter(Boolean);
    if (attached.length) {
      const total = attached.reduce((n, f) => n + f.attachment.length, 0);
      if (total > 10 * MB) throw new Error('Those files come to more than 10 MB together, Discord\'s limit for a message.');
      msg.files = attached;
    }
    if (poll && poll.question && Array.isArray(poll.answers) && poll.answers.filter(Boolean).length >= 2) {
      msg.poll = { question: { text: clip(poll.question, 300) }, answers: poll.answers.filter(Boolean).slice(0, 10).map(a => ({ text: clip(a, 55) })), duration: Math.max(1, Math.min(768, Number(poll.hours) || 24)), allowMultiselect: !!poll.multi };
    }
    if (silent) msg.flags = MessageFlags.SuppressNotifications;
    if (!msg.content && !msg.embeds && !msg.files && !msg.poll) throw new Error('Write a message, add an embed or a file, or make a poll.');
    const sent = await ch.send(msg);
    this.log(`💬 Sent a message in ${ch.name}${attached.length ? ` with ${attached.map(f => f.name).join(', ')}` : ''}.`);
    return { id: sent.id };
  },

  async editMessage({ id, messageId, content }) {
    const m = await this.channelOf(id).messages.fetch(messageId);
    if (m.author.id !== this.client.user.id) throw new Error('Arc can only edit its own messages.');
    await m.edit({ content: clip(content, 2000) });
    return { ok: true };
  },

  async deleteMessage({ id, messageId }) {
    const m = await this.channelOf(id).messages.fetch(messageId);
    await m.delete();
    this.log(`🗑️ Deleted a message in ${m.channel.name}.`);
    return { ok: true };
  },

  async pinMessage({ id, messageId, on }) {
    const m = await this.channelOf(id).messages.fetch(messageId);
    if (on) await m.pin('Arc panel'); else await m.unpin('Arc panel');
    return { ok: true };
  },

  async reactMessage({ id, messageId, emoji }) {
    const m = await this.channelOf(id).messages.fetch(messageId);
    await m.react(clip(emoji, 60));
    return { ok: true };
  },

  /** Deletes the last `count` messages (Discord only bulk-deletes messages under two weeks old), optionally only from one member. */
  async purge({ id, count, userId }) {
    const ch = this.channelOf(id);
    let list = await ch.messages.fetch({ limit: 100 });
    if (userId) list = list.filter(m => m.author.id === userId);
    const take = [...list.values()].slice(0, Math.max(1, Math.min(100, Number(count) || 10)));
    const gone = await ch.bulkDelete(take, true);
    this.log(`🧹 Cleared ${gone.size} messages in ${ch.name}.`);
    this.modlog(ch.guild, `🧹 ${gone.size} messages cleared in <#${ch.id}>.`);
    return { deleted: gone.size };
  },

  async threads({ id }) {
    const ch = this.channelOf(id);
    if (!ch.threads) return { threads: [] };
    const active = await ch.threads.fetchActive().catch(() => ({ threads: new Map() }));
    return { threads: [...active.threads.values()].map(t => ({ id: t.id, name: t.name, messages: t.messageCount, archived: t.archived, locked: t.locked })) };
  },

  async threadAction({ threadId, action }) {
    const t = this.guild().channels.cache.get(threadId) || await this.client.channels.fetch(threadId);
    if (action === 'archive') await t.setArchived(true); else if (action === 'lock') await t.setLocked(true); else if (action === 'delete') await t.delete(); else if (action === 'open') { await t.setArchived(false); await t.setLocked(false); }
    return { ok: true };
  },

  /* ---------- invites ---------- */

  async invites() {
    const list = await this.guild().invites.fetch();
    return { invites: [...list.values()].map(i => ({ code: i.code, url: i.url, channel: i.channel ? i.channel.name : '', uses: i.uses, maxUses: i.maxUses, expires: isoOr(i.expiresAt), by: i.inviter ? i.inviter.username : '' })) };
  },

  async createInvite({ id, hours, uses }) {
    const ch = this.channelOf(id);
    const inv = await ch.createInvite({ maxAge: Math.max(0, Math.min(168, Number(hours) || 0)) * 3600, maxUses: Math.max(0, Math.min(100, Number(uses) || 0)), unique: true, reason: 'Arc panel' });
    this.log(`🔗 Made an invite to ${ch.name}: ${inv.url}`);
    return { url: inv.url, code: inv.code };
  },

  async deleteInvite({ code }) {
    const inv = await this.guild().invites.fetch(code);
    await inv.delete('Arc panel');
    return { ok: true };
  },

  /* ---------- roles ---------- */

  async roleInfo({ id }) {
    const r = this.guild().roles.cache.get(id);
    if (!r) throw new Error('That role is gone.');
    return { id: r.id, name: r.name, color: r.hexColor, hoist: r.hoist, mentionable: r.mentionable, managed: r.managed, editable: r.editable && !r.managed,
      members: r.members.map(m => ({ id: m.id, name: m.displayName })), permissions: r.permissions.toArray(), all: ROLE_PERMS };
  },

  async rolePermissions({ id, permissions }) {
    const r = this.guild().roles.cache.get(id);
    if (!r || !r.editable || r.managed) throw new Error('Arc cannot change that role.');
    await r.setPermissions((permissions || []).filter(p => ROLE_PERMS.includes(p)), 'Arc panel');
    this.log(`🔑 Changed what ${r.name} may do.`);
    return this.roleInfo({ id });
  },

  async moveRole({ id, by }) {
    const r = this.guild().roles.cache.get(id);
    if (!r || !r.editable) throw new Error('Arc cannot move that role.');
    await r.setPosition(Math.max(1, r.position + (by < 0 ? 1 : -1)), { reason: 'Arc panel' });
    return { ok: true };
  },

  /** Gives a role to everyone (who does not have it yet), or takes it from everyone. Needs the member list. */
  async roleToAll({ id, give }) {
    const g = this.guild();
    if (!this.membersIntent) throw new Error('This needs the Server Members Intent (see the Connection card).');
    const all = await g.members.fetch();
    let n = 0;
    for (const m of all.values()) {
      if (m.user.bot) continue;
      if (give && !m.roles.cache.has(id)) { await m.roles.add(id, 'Arc panel').catch(() => {}); n++; }
      if (!give && m.roles.cache.has(id)) { await m.roles.remove(id, 'Arc panel').catch(() => {}); n++; }
    }
    this.log(`${give ? '➕ Gave' : '➖ Took'} a role ${give ? 'to' : 'from'} ${n} members.`);
    return { changed: n };
  },

  /* ---------- members ---------- */

  async memberInfo({ id }) {
    const g = this.guild();
    const m = await g.members.fetch(id);
    return {
      id: m.id, name: m.displayName, username: m.user.username, avatar: m.displayAvatarURL({ size: 128 }), bot: m.user.bot,
      created: isoOr(m.user.createdAt), joined: isoOr(m.joinedAt), boosting: isoOr(m.premiumSince), nickname: m.nickname || '',
      timedOutUntil: m.communicationDisabledUntil && m.communicationDisabledUntil > new Date() ? isoOr(m.communicationDisabledUntil) : null,
      roles: m.roles.cache.filter(r => r.id !== g.id).sort((a, b) => b.position - a.position).map(r => ({ id: r.id, name: r.name, color: r.hexColor })),
      voice: m.voice && m.voice.channel ? { id: m.voice.channel.id, name: m.voice.channel.name, muted: !!m.voice.serverMute, deafened: !!m.voice.serverDeaf } : null,
      owner: m.id === g.ownerId,
    };
  },

  async setNickname({ id, nickname }) {
    const m = await this.guild().members.fetch(id);
    await m.setNickname(nickname ? clip(nickname, 32) : null, 'Arc panel');
    this.log(`✏️ ${nickname ? `Named ${m.user.username} "${nickname}"` : `Cleared ${m.user.username}'s nickname`}.`);
    return this.memberInfo({ id });
  },

  async voiceAction({ id, action, channelId }) {
    const m = await this.guild().members.fetch(id);
    if (!m.voice || !m.voice.channel) throw new Error(`${m.displayName} is not in a voice channel.`);
    if (action === 'move') await m.voice.setChannel(channelId, 'Arc panel');
    else if (action === 'disconnect') await m.voice.disconnect('Arc panel');
    else if (action === 'mute' || action === 'unmute') await m.voice.setMute(action === 'mute', 'Arc panel');
    else if (action === 'deafen' || action === 'undeafen') await m.voice.setDeaf(action === 'deafen', 'Arc panel');
    this.log(`🔊 ${action} ${m.displayName}.`);
    return this.memberInfo({ id });
  },

  async dmMember({ id, content }) {
    const m = await this.guild().members.fetch(id);
    await m.send({ content: clip(content, 2000) });
    this.log(`✉️ Sent ${m.displayName} a direct message.`);
    return { ok: true };
  },

  async bans() {
    const list = await this.guild().bans.fetch();
    return { bans: [...list.values()].map(b => ({ id: b.user.id, name: b.user.username, avatar: b.user.displayAvatarURL({ size: 64 }), reason: b.reason || '' })) };
  },

  async unban({ id }) {
    const g = this.guild();
    await g.bans.remove(id, 'Arc panel');
    this.log('🔓 Lifted a ban.');
    this.modlog(g, `🔓 Ban lifted for <@${id}>.`);
    return this.bans();
  },

  /* ---------- moderation ---------- */

  async auditLog({ limit = 40 }) {
    const { AuditLogEvent } = lib();
    const names = Object.fromEntries(Object.entries(AuditLogEvent).filter(([, v]) => typeof v === 'number').map(([k, v]) => [v, k.replace(/([a-z])([A-Z])/g, '$1 $2')]));
    const logs = await this.guild().fetchAuditLogs({ limit: Math.max(1, Math.min(100, limit)) });
    return { entries: [...logs.entries.values()].map(e => ({ id: e.id, action: names[e.action] || String(e.action), by: e.executor ? e.executor.username : '', target: e.target ? (e.target.name || e.target.username || e.target.tag || e.targetId) : '', reason: e.reason || '', at: isoOr(e.createdAt) })) };
  },

  async automod() {
    const list = await this.guild().autoModerationRules.fetch();
    return { rules: [...list.values()].map(r => ({ id: r.id, name: r.name, enabled: r.enabled, trigger: r.triggerType, words: r.triggerMetadata.keywordFilter || [], mentions: r.triggerMetadata.mentionTotalLimit || null })) };
  },

  /** Makes an automatic filter: { kind: 'words' | 'spam' | 'mentions' | 'presets', name, words, mentions, alertChannelId, timeoutMinutes }. */
  async createAutomod({ kind, name, words, mentions, alertChannelId, timeoutMinutes }) {
    const g = this.guild();
    const { AutoModerationRuleTriggerType: T, AutoModerationRuleEventType, AutoModerationActionType: A, AutoModerationRuleKeywordPresetType: Preset } = lib();
    const actions = [{ type: A.BlockMessage, metadata: { customMessage: 'Arc stopped this message: it breaks the server rules.' } }];
    if (alertChannelId) actions.push({ type: A.SendAlertMessage, metadata: { channel: alertChannelId } });
    if (timeoutMinutes && kind !== 'spam' && kind !== 'presets') actions.push({ type: A.Timeout, metadata: { durationSeconds: Math.max(60, Math.min(2419200, Number(timeoutMinutes) * 60)) } });
    const rule = {
      name: clip(name || { words: 'Blocked words', spam: 'Spam', mentions: 'Mass mentions', presets: 'Slurs and swearing' }[kind] || 'Arc rule', 100),
      eventType: AutoModerationRuleEventType.MessageSend, enabled: true, actions, reason: 'Arc panel',
    };
    if (kind === 'words') { rule.triggerType = T.Keyword; rule.triggerMetadata = { keywordFilter: String(words || '').split(/[,\n]/).map(w => w.trim()).filter(Boolean).slice(0, 1000) }; }
    else if (kind === 'spam') rule.triggerType = T.Spam;
    else if (kind === 'mentions') { rule.triggerType = T.MentionSpam; rule.triggerMetadata = { mentionTotalLimit: Math.max(1, Math.min(50, Number(mentions) || 5)) }; }
    else if (kind === 'presets') { rule.triggerType = T.KeywordPreset; rule.triggerMetadata = { presets: [Preset.Profanity, Preset.SexualContent, Preset.Slurs] }; }
    else throw new Error('Unknown kind of rule');
    await g.autoModerationRules.create(rule);
    this.log(`🛡️ Made the automatic filter "${rule.name}".`);
    return this.automod();
  },

  async toggleAutomod({ id, enabled }) {
    const r = await this.guild().autoModerationRules.fetch(id);
    await r.setEnabled(!!enabled);
    return this.automod();
  },

  async deleteAutomod({ id }) {
    const r = await this.guild().autoModerationRules.fetch(id);
    await r.delete('Arc panel');
    return this.automod();
  },

  /* ---------- emoji and events ---------- */

  async emojis() {
    const list = await this.guild().emojis.fetch();
    return { emojis: [...list.values()].map(e => ({ id: e.id, name: e.name, url: e.imageURL({ size: 64 }), animated: !!e.animated })) };
  },

  async uploadEmoji({ name, file }) {
    const f = fileFrom(file, 256 * 1024);
    if (!f) throw new Error('Pick an image (PNG, JPG or GIF, under 256 KB).');
    const n = clip(name, 32).replace(/[^\w]/g, '_') || 'emoji';
    await this.guild().emojis.create({ attachment: f.attachment, name: n, reason: 'Arc panel' });
    this.log(`😀 Added the emoji :${n}:.`);
    return this.emojis();
  },

  async deleteEmoji({ id }) {
    const e = await this.guild().emojis.fetch(id);
    await e.delete('Arc panel');
    return this.emojis();
  },

  async events() {
    const list = await this.guild().scheduledEvents.fetch();
    return { events: [...list.values()].map(e => ({ id: e.id, name: e.name, description: e.description || '', start: isoOr(e.scheduledStartAt), end: isoOr(e.scheduledEndAt), where: e.entityMetadata?.location || (e.channel ? e.channel.name : ''), interested: e.userCount ?? null, url: e.url })) };
  },

  /** A scheduled event: in a voice channel ({ channelId }) or somewhere else ({ location }). */
  async createEvent({ name, description, start, hours, channelId, location }) {
    const g = this.guild();
    const { GuildScheduledEventEntityType: E, GuildScheduledEventPrivacyLevel: Priv } = lib();
    const startAt = new Date(start);
    if (!(startAt > new Date())) throw new Error('Pick a start time in the future.');
    const endAt = new Date(startAt.getTime() + Math.max(0.25, Number(hours) || 1) * 3600000);
    const ev = await g.scheduledEvents.create({
      name: clip(name, 100), description: description ? clip(description, 1000) : undefined, scheduledStartTime: startAt, privacyLevel: Priv.GuildOnly,
      ...(channelId ? { entityType: E.Voice, channel: channelId } : { entityType: E.External, scheduledEndTime: endAt, entityMetadata: { location: clip(location || 'Xenon', 100) } }),
      reason: 'Arc panel',
    });
    this.log(`📅 Made the event "${ev.name}".`);
    return this.events();
  },

  async deleteEvent({ id }) {
    const ev = await this.guild().scheduledEvents.fetch(id);
    await ev.delete();
    return this.events();
  },
};

module.exports = { tools, CHANNEL_PERMS, ROLE_PERMS, fileFrom };
