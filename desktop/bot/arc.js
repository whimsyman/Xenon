'use strict';
/*
  Arc: the Xenon Discord bot. It runs inside the Xenon desktop app, on the owner's computer, while the app is open,
  and does what the Bot panel on the site asks (src/screens/Bot.tsx, through desktop/main.js and preload.js):

    - connects with the bot's token (kept encrypted on this computer, never anywhere else);
    - builds the Xenon server from desktop/bot/layout.js: roles, categories, channels, permissions, the welcome
      posts, Community, the welcome screen and onboarding ("setup"), and can first clear the server out ("nuke");
    - manages channels, categories, roles and members;
    - posts the site's announcements in the announcements channel;
    - answers a few slash commands: /xenon for everyone, and /arc setup | nuke | rebuild for the server's owner.

  Every step is reported through `log`, which the panel shows and which is written in the server's #arc-log.
  Nothing here can touch a server unless it is the one picked in the panel (or the slash command's own server),
  and clearing one out needs its name typed exactly, and saves a copy of its roles and channels first.
*/
const fs = require('fs');
const path = require('path');
const L = require('./layout');

let D = null;                                  // discord.js, loaded on first use (the app starts faster without it)
const lib = () => (D ||= require('discord.js'));

class Arc {
  /**
   * @param {object} o
   * @param {string} o.dir          where Arc keeps its settings and backups (the app's user data folder)
   * @param {object} o.secrets      { encrypt(text) -> string, decrypt(string) -> text, available() } (Electron safeStorage)
   * @param {(event: object) => void} o.emit   tells the panel about progress and changes
   */
  constructor({ dir, secrets, emit }) {
    this.dir = dir; this.secrets = secrets; this.emit = emit || (() => {});
    this.client = null; this.ready = false; this.membersIntent = false; this.busy = '';
    this.lines = [];
    this.config = this.read();
  }

  /* ---------- settings kept on this computer ---------- */

  file() { return path.join(this.dir, 'arc.json'); }
  read() { try { return JSON.parse(fs.readFileSync(this.file(), 'utf8')); } catch { return {}; } }
  save() { fs.mkdirSync(this.dir, { recursive: true }); fs.writeFileSync(this.file(), JSON.stringify(this.config, null, 1)); }
  hasToken() { return !!this.config.token; }

  /** One line of progress: to the panel, and (when building) to the server's own channels. */
  log(text, level = 'info') {
    const line = { at: new Date().toISOString(), text: String(text), level };
    this.lines.push(line); if (this.lines.length > 300) this.lines.shift();
    this.emit({ type: 'log', line });
    if (this.logChannel) this.logChannel.send({ content: `${level === 'error' ? '⚠️ ' : ''}${line.text}`.slice(0, 1900), allowedMentions: { parse: [] } }).catch(() => {});
  }

  /**
   * A panel request that failed: writes it in the console (with the Discord address it failed on, ids left out) and
   * returns the words for the panel. Discord's own "404: Not Found" means the address itself does not exist.
   */
  failed(name, err) {
    const raw = (err && err.message) || String(err);
    const route = err && err.url ? ` (${err.method || ''} ${String(err.url).replace(/^https?:\/\/[^/]+\/api\/v\d+/, '').replace(/\d{15,}/g, ':id')})` : '';
    const words = /^404: Not Found$/.test(raw) ? 'Discord could not find that. It may have been deleted, or Arc asked for it the wrong way.'
      : /Missing Permissions/i.test(raw) ? 'Arc is not allowed to do that here. Check that its role is above the roles and channels it changes.'
      : /Missing Access/i.test(raw) ? 'Arc cannot see that channel.'
      : raw;
    if (!/^(Connect Arc first|Pick the server)/.test(raw)) this.log(`⚠️ ${name} failed: ${raw}${route}`, 'error');
    return words;
  }

  /* ---------- connecting ---------- */

  async connect(token) {
    if (token) {
      token = String(token).trim();
      if (!/^[\w-]{20,}\.[\w-]{4,}\.[\w-]{20,}$/.test(token)) throw new Error('That does not look like a bot token. Copy it again from the Bot page of your app on the Discord Developer Portal.');
      if (!this.secrets.available()) throw new Error(process.platform === 'linux'
        ? 'This computer cannot keep the token encrypted, so it was not saved. Start a key store (GNOME Keyring, or KWallet on KDE) and open the app again.'
        : 'This computer cannot keep the token encrypted, so it was not saved.');
      this.config.token = this.secrets.encrypt(token); this.save();
    }
    if (!this.config.token) throw new Error('Paste the bot token first.');
    await this.disconnect();
    const { Client, GatewayIntentBits, Partials } = lib();
    const plain = this.secrets.decrypt(this.config.token);
    const I = GatewayIntentBits;
    const make = (members, content) => new Client({
      intents: [I.Guilds, I.GuildModeration, I.GuildMessages, I.GuildMessageReactions, I.GuildVoiceStates, I.GuildExpressions,
        I.GuildScheduledEvents, I.GuildInvites, I.AutoModerationConfiguration, I.AutoModerationExecution,
        ...(members ? [I.GuildMembers] : []), ...(content ? [I.MessageContent] : [])],
      partials: [Partials.GuildMember, Partials.Message, Partials.Channel],
    });
    // Two parts of Discord need switching on for the bot in the Developer Portal: the member list ("Server Members
    // Intent") and other people's message text ("Message Content Intent"). Arc asks for both, and works without them.
    const tries = [[true, true], [true, false], [false, true], [false, false]];
    for (const [k, [members, content]] of tries.entries()) {
      const client = make(members, content);
      try {
        await new Promise((resolve, reject) => { client.once('clientReady', resolve); client.login(plain).catch(reject); });
        this.client = client; this.membersIntent = members; this.contentIntent = content; break;
      } catch (err) {
        client.destroy();
        if (k < tries.length - 1 && /disallowed intents/i.test(err.message || '')) continue;
        if (/invalid token|TokenInvalid/i.test(`${err.code} ${err.message}`)) throw new Error('Discord did not accept that token. Reset it on the Bot page of your app and paste the new one.');
        throw err;
      }
    }
    this.ready = true;
    this.wire();
    this.applyPresence();
    for (const g of this.client.guilds.cache.values()) if (((this.config.auto || {})[g.id]?.commands || []).length) await this.registerGuildCommands(g.id).catch(() => {});
    this.timer = setInterval(() => this.tick().catch(() => {}), 30000);
    await this.registerCommands().catch(err => this.log(`Slash commands not registered: ${err.message}`, 'error'));
    this.log(`Connected as ${this.client.user.tag}.`);
    this.emit({ type: 'status' });
    return this.status();
  }

  async disconnect() {
    clearInterval(this.timer); this.timer = null;
    if (this.client) { try { await this.client.destroy(); } catch { /* gone */ } }
    this.client = null; this.ready = false;
    this.emit({ type: 'status' });
  }

  async forget() { await this.disconnect(); delete this.config.token; this.save(); this.emit({ type: 'status' }); }

  inviteUrl() {
    if (!this.client) return '';
    return `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&integration_type=0&scope=bot+applications.commands`;
  }

  status() {
    const c = this.client;
    return {
      hasToken: this.hasToken(), connected: !!(c && this.ready), busy: this.busy, membersIntent: this.membersIntent, contentIntent: !!this.contentIntent,
      user: c && c.user ? { id: c.user.id, tag: c.user.tag, avatar: c.user.displayAvatarURL({ size: 64 }) } : null,
      guilds: c ? [...c.guilds.cache.values()].map(g => ({ id: g.id, name: g.name, icon: g.iconURL({ size: 64 }), members: g.memberCount, community: g.features.includes('COMMUNITY') })) : [],
      guildId: this.config.guildId || '', invite: this.inviteUrl(), log: this.lines.slice(-80),
    };
  }

  select(guildId) {
    if (!this.client || !this.client.guilds.cache.has(guildId)) throw new Error('Arc is not in that server. Add it with the invite link first.');
    this.config.guildId = guildId; this.save();
    return this.status();
  }

  /** The server to work on: an id, or the panel's arguments ({ guildId }), or else the one picked in the panel. */
  guild(id) {
    if (!this.client || !this.ready) throw new Error('Connect Arc first.');
    const want = typeof id === 'string' ? id : id && typeof id === 'object' && typeof id.guildId === 'string' ? id.guildId : '';
    const g = this.client.guilds.cache.get(want || this.config.guildId);
    if (!g) throw new Error('Pick the server Arc should manage.');
    return g;
  }

  /** Only one big job at a time: building and clearing out must never overlap. */
  async job(name, fn) {
    if (this.busy) throw new Error(`Arc is busy: ${this.busy}. Wait for it to finish.`);
    this.busy = name; this.emit({ type: 'status' });
    try { return await fn(); } finally { this.busy = ''; this.logChannel = null; this.emit({ type: 'status' }); }
  }

  /* ---------- events: welcome, joins and leaves, slash commands ---------- */

  wire() {
    const c = this.client;
    c.on('guildCreate', () => this.emit({ type: 'status' }));
    c.on('guildDelete', () => this.emit({ type: 'status' }));
    c.on('guildMemberAdd', m => { this.modlog(m.guild, `📥 ${m.user.tag} joined (${m.guild.memberCount} members).`); this.onJoin(m).catch(() => {}); this.emit({ type: 'members' }); });
    c.on('guildMemberRemove', m => { this.modlog(m.guild, `📤 ${m.user ? m.user.tag : 'Someone'} left.`); this.onLeave(m).catch(() => {}); this.emit({ type: 'members' }); });
    for (const e of ['channelCreate', 'channelDelete', 'channelUpdate', 'roleCreate', 'roleDelete', 'roleUpdate']) c.on(e, () => this.emit({ type: 'structure' }));
    c.on('messageCreate', m => { if (m.guild && m.guild.id === this.config.guildId) this.emit({ type: 'message', channelId: m.channelId }); });
    c.on('interactionCreate', i => this.onAutomation(i).then(done => (done ? null : this.interaction(i))).catch(err => {
      const reply = { content: `Something went wrong: ${err.message}`, ephemeral: true };
      (i.replied || i.deferred ? i.followUp(reply) : i.reply(reply)).catch(() => {});
    }));
  }

  modlog(guild, text) {
    const id = (this.config.channels || {})[guild.id]?.modlog;
    const ch = id && guild.channels.cache.get(id);
    if (ch) ch.send({ content: text, allowedMentions: { parse: [] } }).catch(() => {});
  }

  async registerCommands() {
    const { SlashCommandBuilder } = lib();
    const commands = [
      new SlashCommandBuilder().setName('xenon').setDescription('What Xenon is, and where to start learning'),
      new SlashCommandBuilder().setName('arc').setDescription("Arc's server tools (the server owner only)").setDefaultMemberPermissions(0)
        .addSubcommand(s => s.setName('setup').setDescription('Build the Xenon roles, channels, welcome and onboarding'))
        .addSubcommand(s => s.setName('nuke').setDescription('Delete every channel and role in this server (asks to confirm)'))
        .addSubcommand(s => s.setName('rebuild').setDescription('Delete everything, then build the Xenon server from scratch (asks to confirm)')),
    ].map(c => c.toJSON());
    await this.client.application.commands.set(commands);
  }

  async interaction(i) {
    const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = lib();
    if (i.isChatInputCommand() && i.commandName === 'xenon') {
      const embed = new EmbedBuilder().setTitle('Xenon ⚡').setURL(L.SITE).setColor(0x6b9ef7)
        .setDescription(`Learn to program by writing real code: short lessons, code that is really compiled and checked, projects and certificates.\n\n**Start here:** ${L.SITE}`);
      return i.reply({ embeds: [embed] });
    }
    if (i.isChatInputCommand() && i.commandName === 'arc') {
      if (!i.guild || i.user.id !== i.guild.ownerId) return i.reply({ content: 'Only the owner of this server can use this.', ephemeral: true });
      const sub = i.options.getSubcommand();
      if (sub === 'setup') {
        await i.reply({ content: 'Building the Xenon server. Progress shows in a temporary channel at the top.', ephemeral: true });
        return this.setup(i.guild.id);
      }
      // Clearing out asks for the server's name, typed exactly, in a small form.
      const modal = new ModalBuilder().setCustomId(`arc-confirm:${sub}`).setTitle(sub === 'nuke' ? 'Delete every channel and role?' : 'Delete everything and rebuild?');
      modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('name').setLabel(`Type the server's name: ${i.guild.name}`.slice(0, 45)).setStyle(TextInputStyle.Short).setRequired(true)));
      return i.showModal(modal);
    }
    if (i.isModalSubmit() && i.customId.startsWith('arc-confirm:')) {
      if (!i.guild || i.user.id !== i.guild.ownerId) return i.reply({ content: 'Only the owner of this server can do this.', ephemeral: true });
      const what = i.customId.split(':')[1];
      const typed = i.fields.getTextInputValue('name');
      if (typed !== i.guild.name) return i.reply({ content: 'That is not the server\'s name, so nothing was changed.', ephemeral: true });
      await i.reply({ content: what === 'nuke' ? 'Clearing the server out…' : 'Clearing the server out, then building it again…', ephemeral: true });
      if (what === 'nuke') return this.nuke(i.guild.id, typed);
      return this.rebuild(i.guild.id, typed);
    }
    return undefined;
  }

  /* ---------- clearing a server out ---------- */

  /** Writes the server's roles and channels (not messages) to a file, before they are deleted. */
  backup(g) {
    const data = {
      server: { id: g.id, name: g.name }, at: new Date().toISOString(),
      roles: [...g.roles.cache.values()].map(r => ({ id: r.id, name: r.name, color: r.hexColor, hoist: r.hoist, mentionable: r.mentionable, position: r.position, permissions: r.permissions.toArray(), managed: r.managed })),
      channels: [...g.channels.cache.values()].map(c => ({ id: c.id, name: c.name, type: c.type, parent: c.parentId, position: c.rawPosition, topic: c.topic || '',
        overwrites: c.permissionOverwrites ? [...c.permissionOverwrites.cache.values()].map(o => ({ id: o.id, type: o.type, allow: o.allow.toArray(), deny: o.deny.toArray() })) : [] })),
    };
    const dir = path.join(this.dir, 'arc-backups');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${g.id}-${data.at.replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(file, JSON.stringify(data, null, 1));
    return file;
  }

  /** A channel at the top that shows what is happening while everything else is being replaced. */
  async tempChannel(g) {
    const { ChannelType } = lib();
    let ch = g.channels.cache.find(c => c.name === L.TEMP_CHANNEL && c.type === ChannelType.GuildText);
    if (!ch) ch = await g.channels.create({ name: L.TEMP_CHANNEL, type: ChannelType.GuildText, position: 0, topic: 'Arc is building the server. This channel goes away when it is done.' });
    this.logChannel = ch;
    return ch;
  }

  async nuke(guildId, confirm, { keepTemp = false } = {}) {
    const g = this.guild(guildId);
    if (confirm !== g.name) throw new Error(`Type the server's name exactly (${g.name}) to clear it out.`);
    return this.job('clearing the server out', async () => {
      const file = this.backup(g);
      this.log(`Saved a copy of the roles and channels to ${file}.`);
      const temp = await this.tempChannel(g);
      this.log('🧹 Clearing the server out…');
      // A Community server keeps its rules and updates channels; point them at the temporary one so the others can go.
      if (g.features.includes('COMMUNITY')) {
        try { await g.editOnboarding({ enabled: false, defaultChannels: [], prompts: [] }); } catch { /* not set up */ }
        await g.edit({ rulesChannel: temp, publicUpdatesChannel: temp }).catch(err => this.log(`Could not move the rules channel: ${err.message}`, 'error'));
      }
      let channels = 0, roles = 0;
      for (const ch of [...g.channels.cache.values()].filter(c => c.id !== temp.id).sort((a, b) => (a.type === 4) - (b.type === 4))) {
        try { await ch.delete('Arc: clearing the server out'); channels++; } catch (err) { this.log(`Could not delete #${ch.name}: ${err.message}`, 'error'); }
      }
      const me = g.members.me;
      for (const role of [...g.roles.cache.values()]) {
        if (role.id === g.id || role.managed || !role.editable || (me && role.position >= me.roles.highest.position)) continue;
        try { await role.delete('Arc: clearing the server out'); roles++; } catch (err) { this.log(`Could not delete the role ${role.name}: ${err.message}`, 'error'); }
      }
      this.log(`🧹 Deleted ${channels} channels and ${roles} roles.`);
      if (!keepTemp) this.log('The server is empty except for this channel. Run setup to build it, or delete this channel by hand.');
      delete (this.config.channels ||= {})[g.id]; this.save();
      return { channels, roles, backup: file };
    });
  }

  /** Clear out and build again, in one go. */
  async rebuild(guildId, confirm) {
    await this.nuke(guildId, confirm, { keepTemp: true });
    return this.setup(guildId);
  }

  /* ---------- building the Xenon server ---------- */

  async setup(guildId) {
    const g = this.guild(guildId);
    const { ChannelType, PermissionFlagsBits: P, GuildVerificationLevel, GuildExplicitContentFilter, GuildDefaultMessageNotifications,
      GuildOnboardingPromptType, GuildOnboardingMode, EmbedBuilder } = lib();
    const bits = names => names.reduce((n, name) => n | P[name], 0n);
    return this.job('building the server', async () => {
      const temp = await this.tempChannel(g);
      this.log('🛠️ Building the Xenon server…');

      // Everyone: chat, images, reactions, threads and voice everywhere, unless a channel says otherwise.
      await g.roles.everyone.setPermissions(bits(L.EVERYONE), 'Arc: what everyone may do');
      this.log('✅ Set what everyone may do.');

      // Roles, highest first: Discord puts each new role at the bottom of the list (just above @everyone), so making
      // them in order pushes the earlier ones up and the list ends up in the planned order.
      const role = {};
      for (const r of L.ROLES) {
        const existing = g.roles.cache.find(x => x.name === r.name && !x.managed);
        role[r.id] = existing || await g.roles.create({ name: r.name, colors: { primaryColor: r.color }, hoist: !!r.hoist, mentionable: !!r.mentionable, permissions: bits(r.permissions || []), reason: 'Arc: Xenon roles' });
      }
      this.log(`✅ Made ${L.ROLES.length} roles.`);
      const staff = L.STAFF_ROLES.map(id => role[id]).filter(Boolean);
      const readOnly = [
        { id: g.roles.everyone.id, deny: bits(['SendMessages', 'SendMessagesInThreads', 'CreatePublicThreads', 'CreatePrivateThreads']) },
        ...staff.map(r => ({ id: r.id, allow: bits(['SendMessages', 'SendMessagesInThreads']) })),
      ];
      const hidden = [
        { id: g.roles.everyone.id, deny: bits(['ViewChannel']) },
        ...staff.map(r => ({ id: r.id, allow: bits(['ViewChannel', 'SendMessages']) })),
        { id: this.client.user.id, allow: bits(['ViewChannel', 'SendMessages', 'EmbedLinks']) },
      ];

      // Categories and channels, top to bottom. An announcement channel needs Community, so it starts as text.
      const made = {};
      for (const cat of L.CATEGORIES) {
        const category = await g.channels.create({ name: cat.name, type: ChannelType.GuildCategory, permissionOverwrites: cat.staff ? hidden : [], reason: 'Arc: Xenon layout' });
        for (const c of cat.channels) {
          const type = c.type === 'voice' ? ChannelType.GuildVoice : c.type === 'forum' ? ChannelType.GuildForum : ChannelType.GuildText;
          const options = { name: c.name, type, parent: category, reason: 'Arc: Xenon layout' };
          if (c.topic && type !== ChannelType.GuildVoice) options.topic = c.topic;
          if (c.slowmode) options.rateLimitPerUser = c.slowmode;
          if (cat.staff) options.permissionOverwrites = hidden;
          else if (c.readOnly) options.permissionOverwrites = readOnly;
          if (c.tags) options.availableTags = c.tags.map(t => ({ name: t.name, emoji: t.emoji ? { id: null, name: t.emoji } : null, moderated: !!t.moderated }));
          made[c.key] = await g.channels.create(options);
        }
        this.log(`✅ ${cat.name}: ${cat.channels.length} channels.`);
      }
      this.logChannel = made.arclog || temp;

      // The read-only channels' messages. <#key> becomes a link to that channel.
      const link = text => text.replace(/<#([a-z]+)>/g, (m, key) => (made[key] ? `<#${made[key].id}>` : m));
      for (const [key, embeds] of Object.entries(L.POSTS)) {
        if (!made[key]) continue;
        await made[key].send({ embeds: embeds.map(e => new EmbedBuilder().setTitle(e.title).setDescription(link(e.description)).setColor(e.color)), allowedMentions: { parse: [] } });
      }
      this.log('✅ Wrote the welcome, rules and FAQ posts.');

      // Community: the rules and updates channels, safety settings, the server's look.
      const icon = path.join(__dirname, '..', 'build', 'icon.png');
      try {
        await g.edit({
          features: [...new Set([...g.features, 'COMMUNITY'])],
          verificationLevel: GuildVerificationLevel[L.SERVER.verificationLevel],
          explicitContentFilter: GuildExplicitContentFilter[L.SERVER.explicitContentFilter],
          defaultMessageNotifications: GuildDefaultMessageNotifications[L.SERVER.defaultMessageNotifications],
          rulesChannel: made.rules, publicUpdatesChannel: made.modlog, systemChannel: made[L.SERVER.systemChannel],
          description: L.SERVER.description,
          ...(fs.existsSync(icon) ? { icon } : {}),
          reason: 'Arc: Community and server settings',
        });
        this.log('✅ Switched on Community, set the rules channel, safety settings and the server icon.');
      } catch (err) { this.log(`Community could not be switched on: ${err.message}. Switch it on in Server Settings > Enable Community.`, 'error'); }

      if (g.features.includes('COMMUNITY') || (await g.fetch()).features.includes('COMMUNITY')) {
        try { await made.announcements.setType(ChannelType.GuildAnnouncement); this.log('✅ #announcements can be followed from other servers.'); }
        catch (err) { this.log(`#announcements stays a text channel: ${err.message}`, 'error'); }
        try {
          await g.editWelcomeScreen({ enabled: true, description: L.WELCOME_SCREEN.description,
            welcomeChannels: L.WELCOME_SCREEN.channels.filter(w => made[w.key]).map(w => ({ channel: made[w.key], description: w.description, emoji: w.emoji })) });
          this.log('✅ Set the welcome screen.');
        } catch (err) { this.log(`Welcome screen not set: ${err.message}`, 'error'); }
        try {
          await g.editOnboarding({
            enabled: true, mode: GuildOnboardingMode.OnboardingDefault,
            defaultChannels: L.ONBOARDING.defaultChannels.map(k => made[k]).filter(Boolean),
            prompts: L.ONBOARDING.prompts.map(p => ({
              title: p.title, singleSelect: p.singleSelect, required: p.required, inOnboarding: true, type: GuildOnboardingPromptType.MultipleChoice,
              options: p.options.map(o => ({ title: o.title, description: o.description || null, emoji: o.emoji, roles: (o.roles || []).map(id => role[id]).filter(Boolean), channels: (o.channels || []).map(k => made[k]).filter(Boolean) })),
            })),
          });
          this.log('✅ Switched on onboarding: new members pick their courses and pings.');
        } catch (err) { this.log(`Onboarding not switched on: ${err.message}. Finish it in Server Settings > Onboarding.`, 'error'); }
      }

      // Remember where things are, for announcements and the logs.
      (this.config.channels ||= {})[g.id] = Object.fromEntries(Object.entries(made).map(([k, c]) => [k, c.id]));
      this.config.roles = { ...(this.config.roles || {}), [g.id]: Object.fromEntries(Object.entries(role).map(([k, r]) => [k, r.id])) };
      this.config.guildId = g.id;
      this.save();
      await temp.delete('Arc: building finished').catch(() => {});
      this.log('🎉 The Xenon server is ready.');
      this.emit({ type: 'structure' });
      return { channels: Object.keys(made).length, roles: Object.keys(role).length };
    });
  }

  /* ---------- the panel's tools ---------- */

  structure(guildId) {
    const g = this.guild(guildId);
    const { ChannelType } = lib();
    const kind = t => ({ [ChannelType.GuildText]: 'text', [ChannelType.GuildVoice]: 'voice', [ChannelType.GuildForum]: 'forum', [ChannelType.GuildAnnouncement]: 'announcement', [ChannelType.GuildStageVoice]: 'stage', [ChannelType.GuildCategory]: 'category', [ChannelType.GuildMedia]: 'media' }[t] || 'other');
    const all = [...g.channels.cache.values()].filter(c => !c.isThread()).sort((a, b) => a.rawPosition - b.rawPosition);
    const view = c => ({ id: c.id, name: c.name, type: kind(c.type), topic: c.topic || '', parentId: c.parentId || null });
    const me = g.members.me;
    return {
      server: { id: g.id, name: g.name, icon: g.iconURL({ size: 64 }), members: g.memberCount },
      categories: all.filter(c => c.type === ChannelType.GuildCategory).map(c => ({ ...view(c), channels: all.filter(x => x.parentId === c.id).map(view) })),
      loose: all.filter(c => c.type !== ChannelType.GuildCategory && !c.parentId).map(view),
      roles: [...g.roles.cache.values()].filter(r => r.id !== g.id).sort((a, b) => b.position - a.position)
        .map(r => ({ id: r.id, name: r.name, color: r.hexColor, hoist: r.hoist, mentionable: r.mentionable, managed: r.managed, members: r.members.size, admin: r.permissions.has('Administrator'), editable: !r.managed && r.editable && (!me || r.position < me.roles.highest.position) })),
      // Where Arc's own (highest) role sits: Discord lets a bot give, change or delete only the roles below it, and a
      // bot cannot move itself up. `above` counts the server's own roles (not apps') that are above or level with it.
      arc: me ? (() => {
        const top = me.roles.highest;
        const above = [...g.roles.cache.values()].filter(r => r.id !== g.id && r.id !== top.id && !r.managed && r.position >= top.position);
        return { roleId: top.id, roleName: top.name, above: above.length, aboveNames: above.sort((a, b) => b.position - a.position).slice(0, 6).map(r => r.name) };
      })() : null,
    };
  }

  async createChannel({ name, emoji, type, parentId, topic }) {
    const g = this.guild();
    const { ChannelType } = lib();
    const types = { text: ChannelType.GuildText, voice: ChannelType.GuildVoice, forum: ChannelType.GuildForum, announcement: ChannelType.GuildAnnouncement, category: ChannelType.GuildCategory };
    const t = types[type] ?? ChannelType.GuildText;
    const full = channelName(name, emoji, t === ChannelType.GuildText || t === ChannelType.GuildAnnouncement || t === ChannelType.GuildForum, t === ChannelType.GuildCategory);
    const ch = await g.channels.create({ name: full, type: t, parent: t === ChannelType.GuildCategory ? undefined : (parentId || undefined), topic: topic && t !== ChannelType.GuildVoice && t !== ChannelType.GuildCategory ? String(topic).slice(0, 1024) : undefined, reason: 'Arc panel' });
    this.log(`➕ Made ${t === ChannelType.GuildCategory ? 'the category' : 'the channel'} ${ch.name}.`);
    return { id: ch.id, name: ch.name };
  }

  async editChannel({ id, name, emoji, topic, parentId }) {
    const g = this.guild();
    const ch = g.channels.cache.get(id);
    if (!ch) throw new Error('That channel is gone.');
    const { ChannelType } = lib();
    const patch = { reason: 'Arc panel' };
    if (typeof name === 'string' && name.trim()) patch.name = channelName(name, emoji, ch.type !== ChannelType.GuildVoice && ch.type !== ChannelType.GuildCategory, ch.type === ChannelType.GuildCategory);
    if (typeof topic === 'string' && 'topic' in ch) patch.topic = topic.slice(0, 1024);
    if (parentId !== undefined && ch.type !== ChannelType.GuildCategory) patch.parent = parentId || null;
    await ch.edit(patch);
    this.log(`✏️ Changed ${ch.name}.`);
    return { id: ch.id, name: ch.name };
  }

  async deleteChannel({ id }) {
    const g = this.guild();
    const ch = g.channels.cache.get(id);
    if (!ch) return { ok: true };
    const name = ch.name;
    await ch.delete('Arc panel');
    this.log(`🗑️ Deleted ${name}.`);
    return { ok: true };
  }

  async createRole({ name, color, hoist, mentionable, preset }) {
    const g = this.guild();
    const { PermissionFlagsBits: P } = lib();
    const presets = { member: [], helper: ['ManageThreads'], moderator: L.ROLES.find(r => r.id === 'Moderator').permissions, admin: ['Administrator'] };
    const perms = (presets[preset] || []).reduce((n, p) => n | P[p], 0n);
    const r = await g.roles.create({ name: String(name).slice(0, 100), colors: { primaryColor: /^#[0-9a-f]{6}$/i.test(color || '') ? color : '#99aab5' }, hoist: !!hoist, mentionable: !!mentionable, permissions: perms, reason: 'Arc panel' });
    this.log(`➕ Made the role ${r.name}.`);
    return { id: r.id };
  }

  async editRole({ id, name, color, hoist, mentionable }) {
    const g = this.guild();
    const r = g.roles.cache.get(id);
    if (!r || !r.editable || r.managed) throw new Error('Arc cannot change that role (it is above Arc\'s own role, or belongs to an app).');
    await r.edit({ name: name ? String(name).slice(0, 100) : undefined, colors: color ? { primaryColor: color } : undefined, hoist: typeof hoist === 'boolean' ? hoist : undefined, mentionable: typeof mentionable === 'boolean' ? mentionable : undefined, reason: 'Arc panel' });
    this.log(`✏️ Changed the role ${r.name}.`);
    return { id };
  }

  async deleteRole({ id }) {
    const g = this.guild();
    const r = g.roles.cache.get(id);
    if (!r) return { ok: true };
    if (!r.editable || r.managed) throw new Error('Arc cannot delete that role.');
    const name = r.name;
    await r.delete('Arc panel');
    this.log(`🗑️ Deleted the role ${name}.`);
    return { ok: true };
  }

  async members({ query }) {
    const g = this.guild();
    let list;
    if (query) list = await g.members.search({ query: String(query).slice(0, 100), limit: 50 });
    else if (this.membersIntent) list = await g.members.fetch({ limit: 200 }).catch(() => g.members.cache);
    else list = g.members.cache;
    return {
      membersIntent: this.membersIntent,
      members: [...list.values()].slice(0, 200).map(m => ({
        id: m.id, name: m.displayName, tag: m.user.tag, avatar: m.displayAvatarURL({ size: 64 }), bot: m.user.bot, owner: m.id === g.ownerId,
        joined: m.joinedAt ? m.joinedAt.toISOString() : null, timedOut: !!(m.communicationDisabledUntil && m.communicationDisabledUntil > new Date()),
        roles: m.roles.cache.filter(r => r.id !== g.id).map(r => r.id),
      })),
    };
  }

  async memberRoles({ id, add = [], remove = [] }) {
    const g = this.guild();
    const m = await g.members.fetch(id);
    if (add.length) await m.roles.add(add, 'Arc panel');
    if (remove.length) await m.roles.remove(remove, 'Arc panel');
    this.log(`👤 Changed ${m.displayName}'s roles.`);
    return { ok: true };
  }

  async memberAction({ id, action, minutes, reason }) {
    const g = this.guild();
    const m = await g.members.fetch(id);
    if (m.id === g.ownerId) throw new Error('That is the server\'s owner.');
    const why = reason ? String(reason).slice(0, 400) : 'Arc panel';
    if (action === 'timeout') await m.timeout(Math.max(1, Math.min(40320, Number(minutes) || 10)) * 60000, why);
    else if (action === 'untimeout') await m.timeout(null, why);
    else if (action === 'kick') await m.kick(why);
    else if (action === 'ban') await m.ban({ reason: why, deleteMessageSeconds: 0 });
    else throw new Error('Unknown action');
    this.log(`🔨 ${action} ${m.user.tag}${reason ? `: ${reason}` : ''}.`);
    this.modlog(g, `🔨 ${m.user.tag}: ${action}${reason ? ` (${reason})` : ''}`);
    return { ok: true };
  }

/** Gives the bot its name and its picture (desktop/bot/arc-avatar.png). Discord allows a new name twice an hour. */
  async brand() {
    if (!this.client || !this.ready) throw new Error('Connect Arc first.');
    const done = [];
    const picture = path.join(__dirname, 'arc-avatar.png');
    if (fs.existsSync(picture)) { await this.client.user.setAvatar(picture); done.push('picture'); }
    if (this.client.user.username !== 'Arc') {
      try { await this.client.user.setUsername('Arc'); done.push('name'); }
      catch (err) { this.log(`The name was not changed: ${err.message} (Discord allows two changes an hour; or set it on the Bot page of the Developer Portal).`, 'error'); }
    }
    this.log(`🎨 Gave Arc its ${done.join(' and ') || 'look'}.`);
    this.emit({ type: 'status' });
    return this.status();
  }

  /* ---------- announcements ---------- */

  /** Posts one of the site's announcements in the server's announcements channel; returns the message's id. */
  async announce({ title, body, url, ping }) {
    const g = this.guild();
    const { EmbedBuilder, ChannelType } = lib();
    const known = (this.config.channels || {})[g.id] || {};
    const ch = g.channels.cache.get(known.announcements) || g.channels.cache.find(c => /announcements/.test(c.name) && (c.type === ChannelType.GuildAnnouncement || c.type === ChannelType.GuildText));
    if (!ch) throw new Error('There is no announcements channel. Run setup, or make a channel with "announcements" in its name.');
    const embed = new EmbedBuilder().setTitle(String(title).slice(0, 256)).setDescription(String(body || '').slice(0, 4000)).setColor(0x6b9ef7)
      .setFooter({ text: 'Xenon announcements' }).setTimestamp(new Date());
    if (url) embed.setURL(url);
    const roleId = ((this.config.roles || {})[g.id] || {}).Announcements;
    const msg = await ch.send({ content: ping && roleId ? `<@&${roleId}>` : undefined, embeds: [embed], allowedMentions: { roles: ping && roleId ? [roleId] : [] } });
    if (ch.type === ChannelType.GuildAnnouncement) await msg.crosspost().catch(() => {});
    this.log(`📣 Posted "${title}" in ${ch.name}.`);
    return { messageId: msg.id, channelId: ch.id };
  }
}

/** A channel's name with its emoji in front, the way the rest of the server is named ("💬┃general"). */
function channelName(name, emoji, text, category) {
  let base = String(name || '').trim();
  if (text) base = base.toLowerCase().replace(/\s+/g, '-');
  if (category) base = base.toUpperCase();
  const e = String(emoji || '').trim();
  if (!e) return base.slice(0, 100);
  return (category ? `${e} ${base}` : text ? `${e}┃${base}` : `${e} ${base}`).slice(0, 100);
}

module.exports = { Arc, channelName };

// The tools (desktop/bot/tools.js), the automations (automations.js) and the console (console.js) are part of Arc.
const { tools } = require('./tools');
const { automations } = require('./automations');
const { consoleCommands } = require('./console');
Object.assign(Arc.prototype, tools, automations, consoleCommands);

/** Everything the Bot panel may ask Arc to do (desktop/main.js lets through only these). */
const PANEL_CALLS = ['status', 'connect', 'disconnect', 'forget', 'select', 'structure', 'createChannel', 'editChannel', 'deleteChannel',
  'createRole', 'editRole', 'deleteRole', 'members', 'memberRoles', 'memberAction', 'nuke', 'setup', 'rebuild', 'announce', 'brand',
  ...Object.keys(tools).filter(k => k !== 'channelOf'),
  ...['automations', 'setWelcome', 'testWelcome', 'setAutoroles', 'createRolePicker', 'deleteRolePicker', 'setCommands', 'scheduleMessage', 'cancelScheduled', 'setPresence'],
  'runCommand'];
module.exports.PANEL_CALLS = PANEL_CALLS;
