'use strict';
/*
  Arc's console: the command line at the bottom of the Bot panel. One line in, a few lines of answer out.
  Channels, roles and members are found by name ("#general", "@ada", "Python") or by id, so nothing has to be copied.
  `help` lists everything. Commands that delete things ask for "--yes" at the end.
*/

/** Splits a line into words, keeping "quoted text" and everything after a "|" together. */
function words(line) {
  const out = [];
  const re = /"([^"]*)"|(\S+)/g;
  let m;
  while ((m = re.exec(line))) out.push(m[1] !== undefined ? m[1] : m[2]);
  return out;
}
const plain = s => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');

const HELP = [
  ['help', 'this list'],
  ['status', 'is Arc online, which server it manages'],
  ['servers · use <server>', 'the servers Arc is in · pick one'],
  ['info', 'the server at a glance'],
  ['channels · roles', 'list them'],
  ['members [name]', 'list or search members'],
  ['who @member', 'one member: roles, joined, voice'],
  ['send #channel <text>', 'post a message as Arc'],
  ['embed #channel <title> | <text>', 'post an embed'],
  ['poll #channel <question> | <answer> | <answer> …', 'post a poll (24 hours)'],
  ['announce <title> | <text>', 'post an announcement in #announcements'],
  ['dm @member <text>', 'send a direct message'],
  ['purge [#channel] <count> [@member]', 'delete recent messages'],
  ['lock #channel · unlock #channel', 'stop or allow posting'],
  ['hide #channel · show #channel', 'hide from or show to everyone'],
  ['slowmode #channel <seconds>', '0 switches it off'],
  ['topic #channel <text>', 'change the topic'],
  ['rename #channel <name> [emoji]', 'rename, in the server\'s style'],
  ['create channel <name> [emoji] [in <category>] [voice|forum|announcement]', 'make a channel'],
  ['create category <name> [emoji]', 'make a category'],
  ['delete #channel --yes', 'delete a channel'],
  ['clone #channel', 'copy a channel'],
  ['invite #channel [hours] [uses]', 'make an invite link (0 = never ends)'],
  ['role create <name> [#colour] · role delete <name> --yes', 'make or delete a role'],
  ['give @member <role> · take @member <role>', 'give or take a role'],
  ['nick @member <name>', 'set a nickname ("-" clears it)'],
  ['timeout @member <minutes> [reason] · untimeout @member', 'mute someone for a while'],
  ['kick @member [reason] --yes · ban @member [reason] --yes · unban <id>', 'remove someone'],
  ['lockdown on · lockdown off', 'lock every channel at once'],
  ['schedule #channel <YYYY-MM-DD> <HH:MM> <text>', 'send a message later'],
  ['presence <playing|watching|listening|competing> <text>', 'Arc\'s status line'],
  ['status online|idle|dnd|invisible', 'Arc\'s dot'],
  ['audit [count] · bans · emojis · events · invites', 'look things up'],
  ['backup', 'save a copy of the roles and channels'],
  ['setup', 'build the Xenon server (see Build)'],
];

const consoleCommands = {
  async runCommand({ line }) {
    const text = String(line || '').trim();
    if (!text) return { lines: [] };
    this.log(`> ${text}`, 'command');
    try {
      const lines = await this.command(text);
      return { lines: Array.isArray(lines) ? lines : [String(lines)] };
    } catch (err) {
      this.log(err.message, 'error');
      return { lines: [`⚠️ ${err.message}`], error: true };
    }
  },

  /* ---------- finding things by name ---------- */

  findChannel(ref, { optional } = {}) {
    const g = this.guild();
    if (!ref) { if (optional) return null; throw new Error('Name a channel, like #general.'); }
    const id = (/^<#(\d+)>$/.exec(ref) || /^(\d{15,})$/.exec(ref) || [])[1];
    if (id && g.channels.cache.has(id)) return g.channels.cache.get(id);
    const want = plain(ref.replace(/^#/, ''));
    const all = [...g.channels.cache.values()].filter(c => !c.isThread());
    const hit = all.find(c => plain(c.name) === want) || all.find(c => plain(c.name).endsWith(want)) || all.find(c => plain(c.name).includes(want));
    if (!hit) { if (optional) return null; throw new Error(`No channel called ${ref}.`); }
    return hit;
  },

  findRole(ref) {
    const g = this.guild();
    const id = (/^<@&(\d+)>$/.exec(ref) || /^(\d{15,})$/.exec(ref) || [])[1];
    if (id && g.roles.cache.has(id)) return g.roles.cache.get(id);
    const want = plain(ref.replace(/^@/, ''));
    const all = [...g.roles.cache.values()].filter(r => r.id !== g.id);
    const hit = all.find(r => plain(r.name) === want) || all.find(r => plain(r.name).includes(want));
    if (!hit) throw new Error(`No role called ${ref}.`);
    return hit;
  },

  async findMember(ref) {
    const g = this.guild();
    if (!ref) throw new Error('Name a member, like @ada.');
    const id = (/^<@!?(\d+)>$/.exec(ref) || /^(\d{15,})$/.exec(ref) || [])[1];
    if (id) return g.members.fetch(id);
    const want = ref.replace(/^@/, '');
    const found = await g.members.search({ query: want, limit: 5 });
    const hit = [...found.values()].find(m => plain(m.displayName) === plain(want) || plain(m.user.username) === plain(want)) || found.first();
    if (!hit) throw new Error(`Nobody called ${ref}.`);
    return hit;
  },

  /* ---------- the commands ---------- */

  async command(text) {
    const w = words(text);
    const cmd = (w.shift() || '').toLowerCase();
    const rest = () => w.join(' ');
    const yes = () => { const i = w.indexOf('--yes'); if (i < 0) return false; w.splice(i, 1); return true; };
    const pipe = () => rest().split('|').map(s => s.trim());
    const needYes = what => { throw new Error(`That ${what}. Add --yes at the end to go ahead.`); };

    switch (cmd) {
      case 'help': case '?': return HELP.map(([c, d]) => `${c.padEnd(44)} ${d}`);
      case 'clear': return ['(cleared)'];
      case 'status': {
        if (w[0]) { const s = await this.setPresence({ ...(this.config.presence || {}), status: w[0] }); return [`Arc's dot: ${s.presence.status}.`]; }
        const s = this.status();
        return [`Arc is ${s.connected ? `online as ${s.user.tag}` : 'offline'}.`, s.guildId ? `Managing: ${(s.guilds.find(g => g.id === s.guildId) || {}).name || s.guildId}.` : 'No server picked yet (use <server>).'];
      }
      case 'servers': return this.status().guilds.map(g => `${g.name}  (${g.members} members)  ${g.id}`);
      case 'use': {
        const want = plain(rest());
        const g = this.status().guilds.find(x => x.id === rest() || plain(x.name) === want || plain(x.name).includes(want));
        if (!g) throw new Error(`Arc is not in a server called ${rest()}.`);
        this.select(g.id);
        this.emit({ type: 'status' });
        return [`Now managing ${g.name}.`];
      }
      case 'info': {
        const i = await this.serverInfo();
        return [`${i.name}: ${i.members} members${i.bots !== null ? ` (${i.bots} bots)` : ''}, ${i.roles} roles, ${i.emojis} emoji, ${i.boosts} boosts.`,
          `Channels: ${i.channels.text} text, ${i.channels.voice} voice, ${i.channels.forum} forums, ${i.channels.announcement} announcement, ${i.channels.categories} categories.`,
          `Made ${new Date(i.created).toLocaleDateString()}. ${i.features.includes('COMMUNITY') ? 'Community is on.' : 'Community is off.'}`];
      }
      case 'channels': {
        const s = this.structure();
        return [...s.loose.map(c => `  ${c.name}`), ...s.categories.flatMap(k => [k.name, ...k.channels.map(c => `  ${c.type === 'voice' ? '🔊' : '#'} ${c.name}`)])];
      }
      case 'roles': return this.structure().roles.map(r => `${r.name}  ·  ${r.members} member${r.members === 1 ? '' : 's'}${r.admin ? '  ·  admin' : ''}`);
      case 'members': {
        const r = await this.members({ query: rest() });
        if (!r.members.length) return ['Nobody found.'];
        return r.members.slice(0, 40).map(m => `${m.name} (@${m.tag})${m.bot ? ' · bot' : ''}${m.timedOut ? ' · timed out' : ''}`);
      }
      case 'who': {
        const m = await this.findMember(w[0]);
        const i = await this.memberInfo({ id: m.id });
        return [`${i.name} (@${i.username})${i.bot ? ' · bot' : ''}${i.owner ? ' · owner' : ''}`, `Joined ${i.joined ? new Date(i.joined).toLocaleDateString() : '?'}, account made ${new Date(i.created).toLocaleDateString()}.`,
          `Roles: ${i.roles.map(r => r.name).join(', ') || 'none'}.`, ...(i.voice ? [`In voice: ${i.voice.name}.`] : []), ...(i.timedOutUntil ? [`Timed out until ${new Date(i.timedOutUntil).toLocaleString()}.`] : [])];
      }
      case 'send': case 'say': {
        const ch = this.findChannel(w.shift());
        await this.sendMessage({ id: ch.id, content: rest() });
        return [`Sent in ${ch.name}.`];
      }
      case 'embed': {
        const ch = this.findChannel(w.shift());
        const [title, description] = pipe();
        await this.sendMessage({ id: ch.id, embed: { title, description, color: '#6b9ef7' } });
        return [`Posted an embed in ${ch.name}.`];
      }
      case 'poll': {
        const ch = this.findChannel(w.shift());
        const [question, ...answers] = pipe();
        await this.sendMessage({ id: ch.id, poll: { question, answers, hours: 24 } });
        return [`Posted a poll in ${ch.name}.`];
      }
      case 'announce': {
        const [title, body] = pipe();
        const r = await this.announce({ title, body: body || '', ping: false });
        return [`Posted "${title}" (message ${r.messageId}). It is on Discord only; use the panel to put it on the site too.`];
      }
      case 'dm': {
        const m = await this.findMember(w.shift());
        await this.dmMember({ id: m.id, content: rest() });
        return [`Sent ${m.displayName} a direct message.`];
      }
      case 'purge': {
        const ch = this.findChannel(w[0] && /^#|^<#/.test(w[0]) ? w.shift() : null, { optional: true });
        if (!ch) throw new Error('Name the channel: purge #general 20');
        const count = Number(w.shift()) || 10;
        const who = w[0] ? await this.findMember(w.shift()) : null;
        const r = await this.purge({ id: ch.id, count, userId: who ? who.id : undefined });
        return [`Deleted ${r.deleted} messages in ${ch.name}.`];
      }
      case 'lock': case 'unlock': { const ch = this.findChannel(w[0]); await this.lockChannel({ id: ch.id, on: cmd === 'lock' }); return [`${cmd === 'lock' ? 'Locked' : 'Unlocked'} ${ch.name}.`]; }
      case 'hide': case 'show': { const ch = this.findChannel(w[0]); await this.hideChannel({ id: ch.id, on: cmd === 'hide' }); return [`${cmd === 'hide' ? 'Hid' : 'Showed'} ${ch.name}.`]; }
      case 'slowmode': { const ch = this.findChannel(w[0]); await this.channelSettings({ id: ch.id, slowmode: Number(w[1]) || 0 }); return [`Slow mode in ${ch.name}: ${Number(w[1]) || 0} seconds.`]; }
      case 'topic': { const ch = this.findChannel(w.shift()); await this.channelSettings({ id: ch.id, topic: rest() }); return [`Changed the topic of ${ch.name}.`]; }
      case 'rename': {
        const ch = this.findChannel(w.shift());
        const emoji = w.length > 1 && !/^[\p{L}\p{N}-]/u.test(w[w.length - 1]) ? w.pop() : undefined;
        const r = await this.editChannel({ id: ch.id, name: rest(), emoji });
        return [`Renamed to ${r.name}.`];
      }
      case 'create': {
        const what = (w.shift() || '').toLowerCase();
        if (what !== 'channel' && what !== 'category') throw new Error('create channel <name> … or create category <name> …');
        const types = ['text', 'voice', 'forum', 'announcement'];
        const type = what === 'category' ? 'category' : (types.includes((w[w.length - 1] || '').toLowerCase()) ? w.pop().toLowerCase() : 'text');
        let parentId = null;
        const inAt = w.findIndex(x => x.toLowerCase() === 'in');
        if (inAt >= 0) { const parent = this.findChannel(w.slice(inAt + 1).join(' ')); parentId = parent.id; w.splice(inAt); }
        const emoji = w.length > 1 && !/^[\p{L}\p{N}-]/u.test(w[w.length - 1]) ? w.pop() : '';
        const r = await this.createChannel({ name: rest(), emoji, type, parentId });
        return [`Made ${r.name}.`];
      }
      case 'delete': {
        if (!yes()) needYes('deletes the channel and its messages for good');
        const ch = this.findChannel(w[0]);
        await this.deleteChannel({ id: ch.id });
        return [`Deleted ${ch.name}.`];
      }
      case 'clone': { const ch = this.findChannel(w[0]); const r = await this.cloneChannel({ id: ch.id }); return [`Made ${r.name}, a copy of ${ch.name}.`]; }
      case 'invite': { const ch = this.findChannel(w[0]); const r = await this.createInvite({ id: ch.id, hours: Number(w[1]) || 0, uses: Number(w[2]) || 0 }); return [r.url]; }
      case 'role': {
        const sub = (w.shift() || '').toLowerCase();
        if (sub === 'create') { const color = /^#[0-9a-f]{6}$/i.test(w[w.length - 1] || '') ? w.pop() : undefined; await this.createRole({ name: rest(), color, preset: 'member' }); return [`Made the role ${rest()}.`]; }
        if (sub === 'delete') { if (!yes()) needYes('deletes the role for everyone'); const r = this.findRole(rest()); await this.deleteRole({ id: r.id }); return [`Deleted the role ${r.name}.`]; }
        throw new Error('role create <name> [#colour]  or  role delete <name> --yes');
      }
      case 'give': case 'take': {
        const m = await this.findMember(w.shift());
        const r = this.findRole(rest());
        await this.memberRoles({ id: m.id, [cmd === 'give' ? 'add' : 'remove']: [r.id] });
        return [`${cmd === 'give' ? 'Gave' : 'Took'} ${r.name} ${cmd === 'give' ? 'to' : 'from'} ${m.displayName}.`];
      }
      case 'nick': { const m = await this.findMember(w.shift()); await this.setNickname({ id: m.id, nickname: rest() === '-' ? '' : rest() }); return [`Done.`]; }
      case 'timeout': { const m = await this.findMember(w.shift()); const min = Number(w.shift()) || 10; await this.memberAction({ id: m.id, action: 'timeout', minutes: min, reason: rest() }); return [`Timed out ${m.displayName} for ${min} minutes.`]; }
      case 'untimeout': { const m = await this.findMember(w[0]); await this.memberAction({ id: m.id, action: 'untimeout' }); return [`${m.displayName} can talk again.`]; }
      case 'kick': case 'ban': {
        if (!yes()) needYes(cmd === 'ban' ? 'bans them until someone lifts it' : 'removes them from the server');
        const m = await this.findMember(w.shift());
        await this.memberAction({ id: m.id, action: cmd, reason: rest() });
        return [`${cmd === 'ban' ? 'Banned' : 'Kicked'} ${m.user.username}.`];
      }
      case 'unban': { await this.unban({ id: w[0] }); return ['Ban lifted.']; }
      case 'lockdown': { const on = (w[0] || '').toLowerCase() !== 'off'; const r = await this.lockdown({ on }); return [`${on ? 'Locked' : 'Unlocked'} ${r.channels} channels.`]; }
      case 'schedule': {
        const ch = this.findChannel(w.shift());
        const at = new Date(`${w.shift()}T${w.shift()}`);
        if (Number.isNaN(at.getTime())) throw new Error('schedule #channel 2026-12-01 18:00 <text>');
        await this.scheduleMessage({ channelId: ch.id, content: rest(), at: at.toISOString(), repeat: 'once' });
        return [`Scheduled for ${at.toLocaleString()} in ${ch.name}.`];
      }
      case 'presence': {
        const type = (w.shift() || 'watching').toLowerCase();
        const t = { playing: 'Playing', watching: 'Watching', listening: 'Listening', competing: 'Competing', custom: 'Custom' }[type] || 'Watching';
        await this.setPresence({ ...(this.config.presence || {}), type: t, text: rest() });
        return [`Arc's status: ${t} ${rest()}.`];
      }
      case 'audit': return (await this.auditLog({ limit: Number(w[0]) || 15 })).entries.map(e => `${new Date(e.at).toLocaleString()}  ${e.by}: ${e.action}${e.target ? ` → ${e.target}` : ''}${e.reason ? ` (${e.reason})` : ''}`);
      case 'bans': { const b = (await this.bans()).bans; return b.length ? b.map(x => `${x.name}  ${x.id}${x.reason ? `  (${x.reason})` : ''}`) : ['Nobody is banned.']; }
      case 'emojis': { const e = (await this.emojis()).emojis; return e.length ? [e.map(x => `:${x.name}:`).join(' ')] : ['No custom emoji yet.']; }
      case 'events': { const e = (await this.events()).events; return e.length ? e.map(x => `${new Date(x.start).toLocaleString()}  ${x.name}${x.where ? ` (${x.where})` : ''}`) : ['No events planned.']; }
      case 'invites': { const i = (await this.invites()).invites; return i.length ? i.map(x => `${x.url}  ${x.channel}  ${x.uses}${x.maxUses ? '/' + x.maxUses : ''} uses${x.expires ? `  ends ${new Date(x.expires).toLocaleString()}` : ''}`) : ['No invites.']; }
      case 'backup': { const r = await this.backupNow(); return [`Saved to ${r.file}`]; }
      case 'setup': { await this.setup(this.config.guildId); return ['The server is built.']; }
      default: throw new Error(`Unknown command "${cmd}". Type help for the list.`);
    }
  },
};

module.exports = { consoleCommands, HELP, words };
