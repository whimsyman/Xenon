'use strict';
/*
  The Xenon Discord server, as Arc builds it (desktop/bot/arc.js runs this plan).

  Everything is written down here as plain data so it can be read, changed and checked without Discord: the roles
  (top to bottom) with their colours and permissions, the categories and their channels, who may see and post where,
  the messages that fill the read-only channels, the welcome screen and the onboarding questions.

  Permissions are named as discord.js names them (PermissionFlagsBits). Every channel lets everyone read, chat, post
  images and links, react, start threads and use voice, unless it says otherwise: "readOnly" channels are for reading
  (staff post), "staff" categories are hidden from everyone but the staff roles.
*/

const SITE = 'https://xenon.justloofy.dev';

/** What everyone (@everyone) may do anywhere, unless a channel says otherwise. */
const EVERYONE = [
  'ViewChannel', 'SendMessages', 'SendMessagesInThreads', 'CreatePublicThreads', 'EmbedLinks', 'AttachFiles', 'AddReactions',
  'UseExternalEmojis', 'UseExternalStickers', 'ReadMessageHistory', 'UseApplicationCommands', 'SendVoiceMessages', 'SendPolls',
  'Connect', 'Speak', 'Stream', 'UseVAD', 'UseSoundboard', 'UseEmbeddedActivities', 'RequestToSpeak', 'ChangeNickname', 'CreateInstantInvite',
];

const STAFF_ROLES = ['Owner', 'Admin', 'Moderator'];

/** The roles, highest first. `id` is how the rest of this file names them. */
const ROLES = [
  { id: 'Owner', name: '👑 Owner', color: '#f5c542', hoist: true, permissions: ['Administrator'] },
  { id: 'Admin', name: '🛡️ Admin', color: '#ff5c5c', hoist: true, permissions: ['Administrator'] },
  { id: 'Moderator', name: '⚔️ Moderator', color: '#5aa8ff', hoist: true, mentionable: true,
    permissions: ['ManageMessages', 'ModerateMembers', 'KickMembers', 'ManageThreads', 'MuteMembers', 'DeafenMembers', 'MoveMembers', 'ManageNicknames', 'ViewAuditLog', 'PinMessages'] },
  { id: 'Helper', name: '🤝 Helper', color: '#4bd47a', hoist: true, mentionable: true, permissions: ['ManageThreads'],
    about: 'Knows their stuff and helps others in #help.' },
  { id: 'Contributor', name: '✨ Contributor', color: '#b47cff', hoist: true, permissions: [], about: 'Helped build Xenon: courses, fixes, ideas.' },
  // Picked by members themselves during onboarding (and in Channels & Roles).
  { id: 'cpp', name: 'C++', color: '#659ad2', mentionable: true, course: true, emoji: '⚙️' },
  { id: 'c', name: 'C', color: '#a8b9cc', mentionable: true, course: true, emoji: '🔧' },
  { id: 'python', name: 'Python', color: '#ffd43b', mentionable: true, course: true, emoji: '🐍' },
  { id: 'rust', name: 'Rust', color: '#dea584', mentionable: true, course: true, emoji: '🦀' },
  { id: 'java', name: 'Java', color: '#f89820', mentionable: true, course: true, emoji: '☕' },
  { id: 'csharp', name: 'C#', color: '#9b4f96', mentionable: true, course: true, emoji: '🎯' },
  { id: 'javascript', name: 'JavaScript', color: '#f7df1e', mentionable: true, course: true, emoji: '🌐' },
  { id: 'lua', name: 'Lua', color: '#5b6ee1', mentionable: true, course: true, emoji: '🌙' },
  { id: 'assembly', name: 'Assembly', color: '#8892a6', mentionable: true, course: true, emoji: '🧠' },
  { id: 'gamedev', name: 'Game Dev', color: '#ff7a59', mentionable: true, course: true, emoji: '🎮' },
  { id: 'reveng', name: 'Reverse Engineering', color: '#e05d7a', mentionable: true, course: true, emoji: '🔍' },
  // Pings people choose to get.
  { id: 'Announcements', name: '📣 Announcements', color: '#8fd0ff', mentionable: false, ping: true, emoji: '📣', about: 'Pinged for big Xenon news.' },
  { id: 'Events', name: '🎉 Events', color: '#ff8fb1', mentionable: false, ping: true, emoji: '🎉', about: 'Pinged for study sessions, challenges and game nights.' },
  { id: 'Minecraft', name: '⛏️ Minecraft', color: '#6fbf4b', mentionable: true, ping: true, emoji: '⛏️', about: 'Pinged when the Minecraft crew gets together.' },
];

/** Forum tags for #help: one per course, and "Solved". */
const HELP_TAGS = [
  ...ROLES.filter(r => r.course).map(r => ({ name: r.name, emoji: r.emoji })),
  { name: 'Solved', emoji: '✅', moderated: false },
];

/** The categories and channels, top to bottom. `key` names a channel for the rest of the build. */
const CATEGORIES = [
  {
    name: '📌 START HERE', channels: [
      { key: 'welcome', name: '👋┃welcome', readOnly: true, topic: `Welcome to Xenon: learn to program by writing real code. ${SITE}` },
      { key: 'rules', name: '📜┃rules', readOnly: true, topic: 'Read these first. Being here means agreeing to them.' },
      { key: 'announcements', name: '📣┃announcements', type: 'announcement', readOnly: true, topic: 'News from Xenon. Follow it to get it in your own server.' },
      { key: 'faq', name: '❓┃faq', readOnly: true, topic: 'Quick answers about Xenon, accounts, courses and certificates.' },
    ],
  },
  {
    name: '💬 COMMUNITY', channels: [
      { key: 'general', name: '💬┃general', topic: 'Talk about anything. Be kind.' },
      { key: 'introductions', name: '🙋┃introductions', topic: 'Say hi: who you are, what you are learning, what you want to build.', slowmode: 30 },
      { key: 'memes', name: '😂┃memes', topic: 'Programming memes and funny stuff. Keep it friendly.' },
      { key: 'offtopic', name: '🎲┃off-topic', topic: 'Games, music, life. Anything that is not code.' },
      { key: 'lounge', name: '🛋️ Lounge', type: 'voice' },
      { key: 'study', name: '📚 Study Room', type: 'voice' },
    ],
  },
  {
    name: '⚡ XENON', channels: [
      { key: 'xenon', name: '⚡┃xenon-chat', topic: `Everything about Xenon and its courses. ${SITE}` },
      { key: 'help', name: '🆘┃help', type: 'forum', topic: 'Stuck? Make a post: what you tried, the code, and the error. Tag the course. Mark it Solved when it is.', tags: HELP_TAGS },
      { key: 'showcase', name: '🚀┃showcase', topic: 'Show what you built: projects, screenshots, links.' },
      { key: 'certificates', name: '🏆┃certificates', topic: 'Finished a course? Post your certificate and celebrate.' },
      { key: 'suggestions', name: '💡┃suggestions', type: 'forum', topic: 'Ideas for Xenon: new courses, features, fixes. One idea per post.',
        tags: [{ name: 'Course idea', emoji: '📘' }, { name: 'Feature', emoji: '✨' }, { name: 'Bug', emoji: '🐛' }, { name: 'Done', emoji: '✅' }] },
      { key: 'buddies', name: '🤝┃study-buddies', topic: 'Find someone to learn with: say which course and when you study.' },
      { key: 'pair', name: '👩‍💻 Pair Programming', type: 'voice' },
    ],
  },
  {
    name: '⛏️ MINECRAFT', channels: [
      { key: 'mc', name: '⛏️┃minecraft-chat', topic: 'Minecraft talk, servers, seeds and redstone.' },
      { key: 'builds', name: '🏰┃builds', topic: 'Show off your builds.' },
      { key: 'mcvoice', name: '⛏️ Minecraft VC', type: 'voice' },
    ],
  },
  {
    name: '🛡️ STAFF', staff: true, channels: [
      { key: 'staff', name: '🛡️┃staff-chat', topic: 'For the team.' },
      { key: 'modlog', name: '📋┃mod-log', topic: 'Joins, leaves and moderation, written by Arc.' },
      { key: 'arclog', name: '🤖┃arc-log', topic: 'What Arc did, and when.' },
    ],
  },
];

/** The messages Arc posts in the read-only channels, as embeds. */
const POSTS = {
  welcome: [{
    title: 'Welcome to Xenon ⚡',
    description: [
      '**Xenon** is where you learn to program by writing real code: short lessons, code that is really compiled and checked, and projects that grow with you.',
      '',
      `🌐 **Start learning:** ${SITE}`,
      '📜 **Read the rules:** <#rules>',
      '❓ **Questions?** <#faq>',
      '🆘 **Stuck on something?** Make a post in <#help>',
      '🚀 **Built something?** Show it in <#showcase>',
      '',
      'Pick your courses and pings in **Channels & Roles** at the top of the channel list. Have fun, and keep coding!',
    ].join('\n'),
    color: '#6b9ef7',
  }],
  rules: [{
    title: '📜 The rules',
    description: [
      '**1. Be kind.** No harassment, hate, slurs or personal attacks. Disagree with ideas, not people.',
      '**2. Keep it safe for everyone.** No NSFW, gore or shocking content anywhere.',
      '**3. No spam or self-promotion** outside <#showcase>. No unsolicited DMs or ads.',
      '**4. Ask good questions.** Use <#help>: say what you tried, paste the code and the exact error.',
      '**5. Help, do not hand out answers.** Explain, so others learn. Do not post full solutions to Xenon tasks.',
      '**6. No cheating or malware.** No cracked software, exploits against others, or harmful code.',
      '**7. Use the right channel** and keep chats readable. English is the main language.',
      '**8. Listen to the staff.** If you think a decision was wrong, ask a Moderator calmly in a DM.',
      '',
      'Discord\'s Terms and Community Guidelines apply too: https://discord.com/guidelines',
    ].join('\n'),
    color: '#f5c542',
  }],
  faq: [{
    title: '❓ Quick answers',
    description: [
      '**What is Xenon?** A site for learning to program by writing real code: lessons, checked practice, projects and certificates. ' + SITE,
      '',
      '**Is it free?** Yes, while Xenon is in beta.',
      '',
      '**Which languages?** C++, C, Python, Rust, Java, C#, JavaScript, Lua, Assembly and more, plus game dev and reverse engineering.',
      '',
      '**Can I sign in with Discord?** Yes: link Discord in Settings, Account on the site, then use "Continue with Discord".',
      '',
      '**Do I get a certificate?** When a course is 100% done (every lesson, task and project), you can make one with your name, and anyone can check its number online. Show it off in <#certificates>!',
      '',
      '**Found a bug or have an idea?** Post it in <#suggestions>.',
    ].join('\n'),
    color: '#4bd47a',
  }],
};

/** The welcome screen people see when they join (Community servers). Up to five channels. */
const WELCOME_SCREEN = {
  description: 'Learn to program by writing real code. Lessons, checked practice, projects and a friendly community.',
  channels: [
    { key: 'rules', description: 'Read the rules first', emoji: '📜' },
    { key: 'general', description: 'Say hi to everyone', emoji: '💬' },
    { key: 'help', description: 'Get help with your code', emoji: '🆘' },
    { key: 'showcase', description: 'Show what you built', emoji: '🚀' },
    { key: 'xenon', description: 'Talk about Xenon and its courses', emoji: '⚡' },
  ],
};

/** Onboarding: the questions new members answer, which give roles and show channels. */
const ONBOARDING = {
  defaultChannels: ['welcome', 'rules', 'announcements', 'faq', 'general', 'introductions', 'memes', 'offtopic', 'xenon', 'help', 'showcase', 'certificates', 'suggestions', 'buddies'],
  prompts: [
    { title: 'What are you learning?', singleSelect: false, required: false, options: ROLES.filter(r => r.course).map(r => ({ title: r.name, emoji: r.emoji, roles: [r.id], description: `Chat with others learning ${r.name}` })) },
    { title: 'What do you want to hear about?', singleSelect: false, required: false,
      options: [
        { title: 'Announcements', emoji: '📣', roles: ['Announcements'], description: 'Big Xenon news and new courses' },
        { title: 'Events', emoji: '🎉', roles: ['Events'], description: 'Study sessions, challenges and game nights' },
      ] },
    { title: 'Do you play Minecraft?', singleSelect: true, required: false,
      options: [
        { title: 'Yes, count me in', emoji: '⛏️', roles: ['Minecraft'], channels: ['mc', 'builds', 'mcvoice'], description: 'See the Minecraft channels and get pinged for games' },
        { title: 'Not really', emoji: '👋', description: 'You can change this any time' },
      ] },
  ],
};

/** The server's own settings. */
const SERVER = {
  description: 'Learn to program by writing real code. A friendly community for Xenon learners.',
  // Members must have a verified email: keeps throwaway spam accounts out without bothering real people.
  verificationLevel: 'Low',
  explicitContentFilter: 'AllMembers',
  defaultMessageNotifications: 'OnlyMentions',
  systemChannel: 'general',
};

module.exports = { SITE, EVERYONE, STAFF_ROLES, ROLES, CATEGORIES, POSTS, WELCOME_SCREEN, ONBOARDING, SERVER, TEMP_CHANNEL: '🛠️┃building-xenon' };
