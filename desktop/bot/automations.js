'use strict';
/*
  The things Arc does by itself while it runs (desktop/bot/arc.js mixes these in):
    - welcome and goodbye messages, with {user}, {name}, {server} and {count} filled in;
    - roles given to everyone who joins;
    - role pickers: a message with buttons; pressing one gives (or takes back) its role;
    - custom slash commands with a reply the owner writes;
    - messages scheduled for later (once, daily or weekly); they are sent while the app is open;
    - Arc's status line ("Watching Xenon lessons").
  Their settings are kept per server in arc.json, beside the token.
*/
let D = null;
const lib = () => (D ||= require('discord.js'));
const clip = (value, max) => String(value === undefined || value === null ? '' : value).slice(0, max);
const COMMAND_NAME = /^[a-z0-9_-]{1,32}$/;
const RESERVED = ['xenon', 'arc'];

const automations = {
  /** This server's automations, with defaults filled in. */
  auto(guildId) {
    const id = guildId || this.config.guildId;
    this.config.auto ||= {};
    const a = (this.config.auto[id] ||= {});
    a.welcome ||= { on: false, channelId: '', text: 'Welcome to **{server}**, {user}! 👋 Grab your courses in Channels & Roles and say hi in here.' };
    a.goodbye ||= { on: false, channelId: '', text: '**{name}** left the server.' };
    a.autoroles ||= [];
    a.pickers ||= [];
    a.commands ||= [];
    a.schedule ||= [];
    return a;
  },

  automations() {
    const a = this.auto();
    return { ...a, presence: this.config.presence || { status: 'online', type: 'Watching', text: 'Xenon lessons' } };
  },

  fill(text, member) {
    return clip(text, 2000)
      .replace(/\{user\}/g, `<@${member.id}>`).replace(/\{name\}/g, member.displayName || member.user?.username || 'Someone')
      .replace(/\{server\}/g, member.guild.name).replace(/\{count\}/g, String(member.guild.memberCount));
  },

  async setWelcome({ kind, on, channelId, text }) {
    const a = this.auto();
    const which = kind === 'goodbye' ? 'goodbye' : 'welcome';
    a[which] = { on: !!on, channelId: clip(channelId, 30), text: clip(text, 1500) || a[which].text };
    this.save();
    this.log(`👋 ${which === 'welcome' ? 'Welcome' : 'Goodbye'} messages ${on ? 'on' : 'off'}.`);
    return this.automations();
  },

  async testWelcome({ kind }) {
    const a = this.auto(), g = this.guild();
    const w = a[kind === 'goodbye' ? 'goodbye' : 'welcome'];
    const ch = g.channels.cache.get(w.channelId);
    if (!ch) throw new Error('Pick the channel first.');
    const me = await g.members.fetch(this.client.user.id);
    await ch.send({ content: `*(a test)* ${this.fill(w.text, me)}`, allowedMentions: { parse: [] } });
    return { ok: true };
  },

  async setAutoroles({ roles }) {
    const a = this.auto();
    a.autoroles = (roles || []).filter(id => this.guild().roles.cache.has(id)).slice(0, 10);
    this.save();
    this.log(`🎟️ New members get ${a.autoroles.length ? a.autoroles.length + ' role(s)' : 'no roles'} when they join.`);
    return this.automations();
  },

  /** Posts a message with one button per role: { channelId, title, description, roles: [{ id, label, emoji }] }. */
  async createRolePicker({ channelId, title, description, roles }) {
    const g = this.guild();
    const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = lib();
    const ch = g.channels.cache.get(channelId);
    if (!ch || typeof ch.send !== 'function') throw new Error('Pick a text channel.');
    const list = (roles || []).filter(r => g.roles.cache.has(r.id)).slice(0, 25);
    if (!list.length) throw new Error('Pick at least one role.');
    const rows = [];
    for (let i = 0; i < list.length; i += 5) {
      rows.push(new ActionRowBuilder().addComponents(list.slice(i, i + 5).map(r => {
        const b = new ButtonBuilder().setCustomId(`arc-role:${r.id}`).setLabel(clip(r.label || g.roles.cache.get(r.id).name, 80)).setStyle(ButtonStyle.Secondary);
        if (r.emoji) b.setEmoji(r.emoji);
        return b;
      })));
    }
    const embed = new EmbedBuilder().setTitle(clip(title || 'Pick your roles', 256)).setDescription(clip(description || 'Press a button to get the role. Press it again to give it back.', 2000)).setColor(0x6b9ef7);
    const msg = await ch.send({ embeds: [embed], components: rows });
    const a = this.auto();
    a.pickers.push({ messageId: msg.id, channelId: ch.id, title: embed.data.title, roles: list.map(r => r.id) });
    this.save();
    this.log(`🎛️ Posted a role picker in ${ch.name}.`);
    return this.automations();
  },

  async deleteRolePicker({ messageId }) {
    const a = this.auto();
    const p = a.pickers.find(x => x.messageId === messageId);
    if (p) {
      const ch = this.guild().channels.cache.get(p.channelId);
      if (ch) await ch.messages.delete(p.messageId).catch(() => {});
      a.pickers = a.pickers.filter(x => x.messageId !== messageId);
      this.save();
    }
    return this.automations();
  },

  /** Custom slash commands: [{ name, description, response, ephemeral }]. They are this server's own commands. */
  async setCommands({ commands }) {
    const a = this.auto();
    const list = [];
    for (const c of commands || []) {
      const name = clip(c.name, 32).toLowerCase().replace(/\s+/g, '-');
      if (!COMMAND_NAME.test(name) || RESERVED.includes(name) || list.some(x => x.name === name)) continue;
      list.push({ name, description: clip(c.description || 'A Xenon command', 100) || 'A Xenon command', response: clip(c.response, 2000), ephemeral: !!c.ephemeral });
    }
    a.commands = list.slice(0, 50);
    this.save();
    await this.registerGuildCommands();
    this.log(`⌨️ ${a.commands.length} custom command${a.commands.length === 1 ? '' : 's'} saved.`);
    return this.automations();
  },

  async registerGuildCommands(guildId) {
    const g = this.guild(guildId);
    const { SlashCommandBuilder } = lib();
    const a = this.auto(g.id);
    await g.commands.set(a.commands.map(c => new SlashCommandBuilder().setName(c.name).setDescription(c.description).toJSON()));
  },

  /** A message for later: { channelId, content, at (ISO), repeat: 'once' | 'daily' | 'weekly' }. */
  async scheduleMessage({ channelId, content, at, repeat }) {
    const a = this.auto();
    const when = new Date(at);
    if (!(when > new Date())) throw new Error('Pick a time in the future.');
    if (!this.guild().channels.cache.get(channelId)) throw new Error('Pick a channel.');
    if (!clip(content, 2000).trim()) throw new Error('Write the message.');
    a.schedule.push({ id: Math.random().toString(36).slice(2, 10), channelId, content: clip(content, 2000), at: when.toISOString(), repeat: ['daily', 'weekly'].includes(repeat) ? repeat : 'once' });
    this.save();
    this.log(`⏰ Scheduled a message for ${when.toLocaleString()}.`);
    return this.automations();
  },

  async cancelScheduled({ id }) {
    const a = this.auto();
    a.schedule = a.schedule.filter(s => s.id !== id);
    this.save();
    return this.automations();
  },

  /** Sends what is due. Runs every 30 seconds while Arc is connected. */
  async tick() {
    if (!this.client || !this.ready) return;
    const now = Date.now();
    for (const [guildId, a] of Object.entries(this.config.auto || {})) {
      const g = this.client.guilds.cache.get(guildId);
      if (!g || !a.schedule || !a.schedule.length) continue;
      let changed = false;
      for (const s of [...a.schedule]) {
        if (new Date(s.at).getTime() > now) continue;
        const ch = g.channels.cache.get(s.channelId);
        if (ch) await ch.send({ content: s.content, allowedMentions: { parse: ['users', 'roles'] } }).catch(err => this.log(`A scheduled message could not be sent: ${err.message}`, 'error'));
        if (s.repeat === 'once') a.schedule = a.schedule.filter(x => x.id !== s.id);
        else { const step = s.repeat === 'daily' ? 86400000 : 604800000; let t = new Date(s.at).getTime(); while (t <= now) t += step; s.at = new Date(t).toISOString(); }
        changed = true;
        this.log(`⏰ Sent a scheduled message${ch ? ` in ${ch.name}` : ''}.`);
      }
      if (changed) { this.save(); this.emit({ type: 'automations' }); }
    }
  },

  /** Arc's status: { status: 'online'|'idle'|'dnd'|'invisible', type: 'Playing'|'Watching'|'Listening'|'Competing'|'Custom', text }. */
  async setPresence({ status, type, text }) {
    this.config.presence = { status: ['online', 'idle', 'dnd', 'invisible'].includes(status) ? status : 'online', type: ['Playing', 'Watching', 'Listening', 'Competing', 'Custom'].includes(type) ? type : 'Watching', text: clip(text, 120) };
    this.save();
    this.applyPresence();
    this.log('🟢 Changed Arc\'s status.');
    return this.automations();
  },

  applyPresence() {
    if (!this.client || !this.client.user) return;
    const { ActivityType } = lib();
    const p = this.config.presence || { status: 'online', type: 'Watching', text: 'Xenon lessons' };
    this.client.user.setPresence({ status: p.status, activities: p.text ? [{ name: p.type === 'Custom' ? 'Custom Status' : p.text, state: p.type === 'Custom' ? p.text : undefined, type: ActivityType[p.type] ?? ActivityType.Watching }] : [] });
  },

  /* ---------- what Arc does when things happen ---------- */

  async onJoin(member) {
    const a = (this.config.auto || {})[member.guild.id];
    if (!a) return;
    if (a.autoroles && a.autoroles.length && !member.user.bot) await member.roles.add(a.autoroles, 'Arc: role on joining').catch(err => this.log(`Could not give the joining roles: ${err.message}`, 'error'));
    if (a.welcome && a.welcome.on) {
      const ch = member.guild.channels.cache.get(a.welcome.channelId);
      if (ch) await ch.send({ content: this.fill(a.welcome.text, member), allowedMentions: { users: [member.id] } }).catch(() => {});
    }
  },

  async onLeave(member) {
    const a = (this.config.auto || {})[member.guild.id];
    if (!a || !a.goodbye || !a.goodbye.on) return;
    const ch = member.guild.channels.cache.get(a.goodbye.channelId);
    if (ch) await ch.send({ content: this.fill(a.goodbye.text, member), allowedMentions: { parse: [] } }).catch(() => {});
  },

  /** Role-picker buttons and custom commands. Returns true when it handled the interaction. */
  async onAutomation(i) {
    if (i.isButton() && i.customId.startsWith('arc-role:')) {
      const roleId = i.customId.slice(9);
      const member = await i.guild.members.fetch(i.user.id);
      const role = i.guild.roles.cache.get(roleId);
      if (!role) { await i.reply({ content: 'That role is gone.', ephemeral: true }); return true; }
      const has = member.roles.cache.has(roleId);
      await (has ? member.roles.remove(roleId, 'Arc: role picker') : member.roles.add(roleId, 'Arc: role picker'));
      await i.reply({ content: has ? `Took back **${role.name}**.` : `You have **${role.name}** now.`, ephemeral: true });
      return true;
    }
    if (i.isChatInputCommand() && i.guild) {
      const c = ((this.config.auto || {})[i.guild.id]?.commands || []).find(x => x.name === i.commandName);
      if (c) { await i.reply({ content: c.response || '…', ephemeral: c.ephemeral, allowedMentions: { parse: [] } }); return true; }
    }
    return false;
  },
};

module.exports = { automations };
