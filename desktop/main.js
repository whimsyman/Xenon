'use strict';
// Xenon for the desktop: windows onto the Xenon website, with a few things a browser tab cannot do.
//
// The app holds no lessons, accounts or progress of its own. It opens the site, so it has the same users,
// the same progress and the same look as the site in a browser, and whatever is published to the site is
// what a window shows the next time it loads. Nothing needs installing again when the site changes.
//
// What the app adds:
//   - a title bar that is part of the page (the window buttons sit in the site's own header)
//   - more than one window: a lesson in one, the Playground in another
//   - find on the page, save a page as a PDF, keep a window on top of the others
//   - the site kept on this computer, so it opens without a connection (the site does this itself, see app/sw.js)
//   - code built and run with the compilers installed on this computer, when its owner switches that on (runner.js)
//   - a key combination that brings the Playground forward from any program
//   - real files: drop one on a window (or File, Open file) to work on it in the Playground, and save back to it
//
// The page talks to the app through window.cairnDesktop (preload.js; the name is from when the app was called Cairn,
// and the site looks for it under that name). Every message is checked here: it has to
// come from the top frame of a window this app made, showing the site or one of the app's own pages.
//
//   XENON_URL=http://localhost:4175 npm start      points the windows at another copy of the site (for testing)
const { app, BrowserWindow, WebContentsView, Menu, shell, nativeTheme, ipcMain, dialog, globalShortcut, safeStorage } = require('electron');
const updater = require('./updater');
const runner = require('./runner');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const SITE = (process.env.XENON_URL || 'https://xenon.justloofy.dev/').replace(/\/?$/, '/');
const ORIGIN = new URL(SITE).origin;
const APP_ID = 'dev.justloofy.cairn';
const ICON = path.join(__dirname, 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png');
const DOWNLOADS = 'https://github.com/whimsyman/Xenon/releases';
const PARTITION = 'persist:cairn';

// How the window is framed. Windows: no title bar, the three window buttons drawn over the page's header.
// macOS: the same, with the traffic lights. Linux: the desktop's own title bar, since they differ too much.
const FRAME = process.platform === 'win32' ? 'overlay' : process.platform === 'darwin' ? 'inset' : 'native';
const HEADER = 56;      // the site header's height, until a page reports its own

const LOCAL_PAGES = ['offline.html', 'find.html'].map(name => pathToFileURL(path.join(__dirname, name)).href);
const isLocal = url => LOCAL_PAGES.some(page => String(url).split(/[?#]/)[0] === page);
const inSite = url => { try { return new URL(url).origin === ORIGIN; } catch { return false; } };
const outside = url => { if (/^https?:/.test(url)) shell.openExternal(url); };
// Signing in with Discord or GitHub passes through these sites and comes back to Xenon, so they stay in the window
// (in the normal browser the sign-in would end up there, not in the app).
const SIGN_IN_HOSTS = [/^(.+.)?discord.com$/, /^github.com$/, /^(.+.)?supabase.co$/];
const signingIn = url => { try { const u = new URL(url); return u.protocol === 'https:' && SIGN_IN_HOSTS.some(re => re.test(u.hostname)); } catch { return false; } };

app.setName('Xenon');
// The app was called Cairn until version 2.2. Someone who had that one keeps their sign-in and saved copy of the
// site: this app goes on using the old data folder when there is one.
try {
  const before = path.join(app.getPath('appData'), 'Cairn');
  if (!app.commandLine.hasSwitch('user-data-dir') && fs.existsSync(before)) app.setPath('userData', before);
} catch { /* a fresh folder is fine */ }
if (process.platform === 'win32') app.setAppUserModelId(APP_ID);

/* ---------- what the app remembers on this computer ---------- */

const stateFile = () => path.join(app.getPath('userData'), 'desktop.json');
const boundsFile = () => path.join(app.getPath('userData'), 'window.json');
const readJson = (file, fallback) => { try { const v = JSON.parse(fs.readFileSync(file, 'utf8')); return v && typeof v === 'object' ? v : fallback; } catch { return fallback; } };
const writeJson = (file, value) => { try { fs.writeFileSync(file, JSON.stringify(value)); } catch { /* not important */ } };

let state = { alwaysOnTop: false, theme: 'dark', localRun: false, quickKey: 'CommandOrControl+Alt+X', files: {} };
const remember = patch => { state = { ...state, ...patch }; writeJson(stateFile(), state); };

/* ---------- windows ---------- */

const windows = new Map();      // BrowserWindow -> { find, header, closing }
let lastFocused = null;
const current = () => (lastFocused && !lastFocused.isDestroyed() ? lastFocused : [...windows.keys()].find(w => !w.isDestroyed()) || null);
const colours = theme => (theme === 'light' ? { back: '#f7f0e7', ink: '#2a1f18' } : { back: '#1d1815', ink: '#f2e8dc' });

function saveBounds(win) {
  if (!win || win.isDestroyed()) return;
  writeJson(boundsFile(), { ...win.getNormalBounds(), maximized: win.isMaximized() });
}

function applyTheme(theme, page = {}) {
  theme = theme === 'light' ? 'light' : 'dark';
  nativeTheme.themeSource = theme;
  const hex = v => (/^#[0-9a-f]{6}$/i.test(v || '') ? v : '');
  const back = hex(page.back) || colours(theme).back, ink = hex(page.ink) || colours(theme).ink;   // the palette the page shows
  for (const [win, record] of windows) {
    if (win.isDestroyed()) continue;
    win.setBackgroundColor(back);
    if (FRAME === 'overlay') { try { win.setTitleBarOverlay({ color: '#00000000', symbolColor: ink, height: record.header }); } catch { /* an older Windows */ } }
  }
  if (theme !== state.theme) remember({ theme });
}

function go(win, route) {
  if (!win || win.isDestroyed()) return;
  const web = win.webContents;
  if (inSite(web.getURL())) web.executeJavaScript(`location.hash = ${JSON.stringify('#' + route)}`).catch(() => {});
  else web.loadURL(SITE + '#' + route).catch(() => {});
}
/** Asks the page to do something it has a button for (open the search, list the shortcuts). */
const tell = (win, name, data) => { if (win && !win.isDestroyed()) win.webContents.send('xenon:event', name, data === undefined ? null : data); };

function showOffline(win) {
  if (!win || win.isDestroyed()) return;
  win.loadFile(path.join(__dirname, 'offline.html'), { query: { site: SITE, theme: state.theme, frame: FRAME } }).catch(() => {});
}

function routeFromArgs(argv) {
  const arg = (argv || []).find(a => a.startsWith('--route='));
  const route = arg ? arg.slice('--route='.length) : '';
  return /^\/[\w\-./:%]*$/.test(route) ? route : '';
}

function createWindow({ route = '', url = '' } = {}) {
  const saved = readJson(boundsFile(), { width: 1440, height: 920 });
  const beside = current();
  const place = beside ? (() => { const b = beside.getNormalBounds(); return { x: b.x + 32, y: b.y + 32, width: b.width, height: b.height }; })() : saved;
  const { back, ink } = colours(state.theme);
  const win = new BrowserWindow({
    width: place.width || 1440,
    height: place.height || 920,
    x: place.x,
    y: place.y,
    minWidth: 560,
    minHeight: 420,
    backgroundColor: back,
    title: 'Xenon',
    icon: ICON,
    autoHideMenuBar: true,
    show: false,
    alwaysOnTop: !!state.alwaysOnTop,
    ...(FRAME === 'overlay' ? { titleBarStyle: 'hidden', titleBarOverlay: { color: '#00000000', symbolColor: ink, height: HEADER } } : {}),
    ...(FRAME === 'inset' ? { titleBarStyle: 'hiddenInset', trafficLightPosition: { x: 18, y: 20 } } : {}),
    webPreferences: {
      contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false, partition: PARTITION,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  const record = { find: null, header: HEADER, closing: false };
  windows.set(win, record);
  lastFocused = win;
  if (!beside && saved.maximized) win.maximize();
  win.once('ready-to-show', () => win.show());
  win.on('focus', () => { lastFocused = win; });

  const web = win.webContents;
  web.setUserAgent(`${web.getUserAgent()} CairnDesktop/${app.getVersion()}`);

  // The site needs nothing from the computer except the clipboard (copy buttons, pasting into the editor).
  web.session.setPermissionRequestHandler((contents, permission, allow) => allow(['clipboard-read', 'clipboard-sanitized-write'].includes(permission)));

  // Closing waits (briefly) for the page to send its last unsaved edits, so nothing typed is lost.
  win.on('close', event => {
    saveBounds(win);
    if (record.closing) return;
    record.closing = true;
    event.preventDefault();
    const finish = () => { if (!win.isDestroyed()) win.destroy(); };
    Promise.race([
      web.executeJavaScript('window.cairnFlush ? window.cairnFlush() : true', true),
      new Promise(resolve => setTimeout(resolve, 1500)),
    ]).then(finish, finish);
  });
  win.on('closed', () => { windows.delete(win); if (lastFocused === win) lastFocused = null; });

  // Xenon's own pages stay in the app: a plain click in the same window, Ctrl-click or a middle click in a new one.
  // Everything else opens in the normal browser.
  web.setWindowOpenHandler(({ url: target, disposition }) => {
    if (!inSite(target)) outside(target);
    else if (disposition === 'new-window' || disposition === 'background-tab' || disposition === 'foreground-tab') createWindow({ url: target });
    else web.loadURL(target);
    return { action: 'deny' };
  });
  web.on('will-navigate', (event, target) => { if (!inSite(target) && !isLocal(target) && !signingIn(target)) { event.preventDefault(); outside(target); } });

  // No connection and nothing kept on this computer, or the site is down: say so, and offer to try again.
  web.on('did-fail-load', (event, code, description, target, isMainFrame) => { if (isMainFrame && code !== -3 && !String(target).startsWith('file:')) showOffline(win); });
  web.on('did-finish-load', () => { matchTheme(win); tell(win, 'update', updateNotice(updater.current())); });
  win.on('page-title-updated', () => matchTheme(win));
  web.on('render-process-gone', (event, details) => { if (details.reason !== 'clean-exit' && !win.isDestroyed()) setTimeout(() => { if (!win.isDestroyed()) web.reload(); }, 400); });

  win.on('enter-full-screen', () => tell(win, 'fullscreen', true));
  win.on('leave-full-screen', () => tell(win, 'fullscreen', false));
  win.on('resize', () => placeFind(win));

  web.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });

  web.on('context-menu', (event, params) => contextMenu(win, params));

  const first = url && inSite(url) ? url : SITE + (route ? '#' + route : '');
  web.loadURL(first).catch(() => {});
  return win;
}

/** The frame follows the page's light or dark theme. The page says so itself (xenon:chrome); this is for pages that do not. */
async function matchTheme(win) {
  if (!win || win.isDestroyed()) return;
  let theme = '';
  try { theme = await win.webContents.executeJavaScript('document.documentElement.dataset.theme || ""', true); } catch { /* the page is still loading */ }
  if (theme === 'light' || theme === 'dark') applyTheme(theme);
}

/* ---------- right-click ---------- */

async function contextMenu(win, params) {
  const web = win.webContents;
  let inEditor = false;
  try { inEditor = await web.executeJavaScript('!!(document.activeElement && document.activeElement.closest(".monaco-editor"))'); } catch { /* ignore */ }
  if (inEditor) return;          // the code editor has a menu of its own
  const items = [];
  const link = params.linkURL || '';
  if (link && inSite(link)) items.push({ label: 'Open in a new window', click: () => createWindow({ url: link }) });
  else if (/^https?:/.test(link)) items.push({ label: 'Open link in the browser', click: () => outside(link) });
  if (link) items.push({ type: 'separator' });
  if (params.isEditable) items.push({ role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { type: 'separator' }, { role: 'selectAll' });
  else if (params.selectionText && params.selectionText.trim()) items.push({ role: 'copy' });
  if (!params.isEditable && !link) {
    if (items.length) items.push({ type: 'separator' });
    items.push(
      { label: 'Back', enabled: web.navigationHistory.canGoBack(), click: () => web.navigationHistory.goBack() },
      { label: 'Forward', enabled: web.navigationHistory.canGoForward(), click: () => web.navigationHistory.goForward() },
      { label: 'Reload', click: () => web.reload() },
      { type: 'separator' },
      { label: 'Find on this page…', click: () => openFind(win) },
      { label: 'Save page as PDF…', click: () => savePdf(win) },
    );
  }
  while (items.length && items[items.length - 1].type === 'separator') items.pop();
  if (items.length) Menu.buildFromTemplate(items).popup({ window: win });
}

/* ---------- find on the page ---------- */
// The bar is a small view of its own laid over the corner of the window. Were it part of the page, the search
// would find the words typed into it and take the cursor out of the box at every letter.

function placeFind(win) {
  const record = windows.get(win);
  if (!record || !record.find || win.isDestroyed()) return;
  const [width] = win.getContentSize();
  const w = Math.min(380, Math.max(260, width - 36));
  record.find.setBounds({ x: Math.max(8, width - w - 18), y: record.header + 10, width: w, height: 48 });
}

function openFind(win) {
  const record = windows.get(win);
  if (!record || win.isDestroyed() || !inSite(win.webContents.getURL())) return;
  if (record.find) { record.find.webContents.focus(); record.find.webContents.send('find:focus'); return; }
  const view = new WebContentsView({ webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'find-preload.js') } });
  view.setBackgroundColor('#00000000');
  try { view.setBorderRadius(8); } catch { /* square is fine */ }
  record.find = view;
  win.contentView.addChildView(view);
  placeFind(win);
  view.webContents.loadFile(path.join(__dirname, 'find.html'), { query: { theme: state.theme } }).then(() => { if (record.find === view) view.webContents.focus(); }).catch(() => {});
  const onFound = (event, result) => { if (record.find === view && !view.webContents.isDestroyed()) view.webContents.send('find:result', { at: result.activeMatchOrdinal, of: result.matches }); };
  win.webContents.on('found-in-page', onFound);
  view.webContents.once('destroyed', () => { if (!win.isDestroyed()) win.webContents.removeListener('found-in-page', onFound); });
}

function closeFind(win) {
  const record = windows.get(win);
  if (!record || !record.find) return;
  const view = record.find;
  record.find = null;
  if (win.isDestroyed()) return;
  win.webContents.stopFindInPage('clearSelection');
  try { win.contentView.removeChildView(view); } catch { /* already gone */ }
  view.webContents.close();
  win.webContents.focus();
}

const windowOfFind = contents => { for (const [win, record] of windows) if (record.find && record.find.webContents === contents) return win; return null; };

ipcMain.on('find:query', (event, query) => {
  const win = windowOfFind(event.sender);
  if (!win || win.isDestroyed() || !query || typeof query.text !== 'string') return;
  const text = query.text.slice(0, 200);
  if (!text) { win.webContents.stopFindInPage('clearSelection'); event.sender.send('find:result', { at: 0, of: 0 }); return; }
  win.webContents.findInPage(text, { forward: query.forward !== false, findNext: !query.again });
});
ipcMain.on('find:close', event => { const win = windowOfFind(event.sender); if (win) closeFind(win); });

/* ---------- save a page as a PDF ---------- */

async function savePdf(win) {
  if (!win || win.isDestroyed()) return;
  const name = (win.getTitle() || 'Xenon').replace(/\s*·\s*(?:Xenon|Cairn)$/, '').replace(/[\\/:*?"<>|]+/g, ' ').trim() || 'Xenon';
  const { canceled, filePath } = await dialog.showSaveDialog(win, { title: 'Save page as PDF', defaultPath: path.join(app.getPath('documents'), `${name}.pdf`), filters: [{ name: 'PDF', extensions: ['pdf'] }] });
  if (canceled || !filePath || win.isDestroyed()) return;
  try {
    const data = await win.webContents.printToPDF({ pageSize: 'A4', printBackground: false, margins: { top: 0.6, bottom: 0.6, left: 0.6, right: 0.6 } });
    await fs.promises.writeFile(filePath, data);
    tell(win, 'saved', path.basename(filePath));
    shell.showItemInFolder(filePath);
  } catch (err) {
    dialog.showErrorBox('The page could not be saved', String((err && err.message) || err));
  }
}

function setOnTop(on) {
  remember({ alwaysOnTop: !!on });
  for (const win of windows.keys()) if (!win.isDestroyed()) { win.setAlwaysOnTop(!!on); tell(win, 'state', publicState()); }
  Menu.setApplicationMenu(appMenu());
}

const publicState = () => ({ alwaysOnTop: !!state.alwaysOnTop, updater: updater.route(), quickKey: state.quickKey || 'off', quickKeyOk });
/** What a page needs to show about an update of the app (no file lists). */
const updateNotice = s => ({ phase: s.phase, version: s.version || '', percent: s.percent || 0, error: s.phase === 'error' || s.error ? String(s.error || '').slice(0, 300) : '' });

/* ---------- menus ---------- */

function appMenu() {
  const on = fn => () => { const win = current(); if (win) fn(win); };
  const file = [
    { label: 'New window', accelerator: 'CmdOrCtrl+Shift+N', click: () => createWindow() },
    { label: 'Open file…', accelerator: 'CmdOrCtrl+O', click: on(pickFiles) },
    { type: 'separator' },
    { label: 'Save page as PDF…', accelerator: 'CmdOrCtrl+Shift+S', click: on(savePdf) },
    { label: 'Print…', accelerator: 'CmdOrCtrl+P', registerAccelerator: false, click: on(win => win.webContents.print({ printBackground: false })) },
    { type: 'separator' },
    { label: 'Close window', accelerator: 'CmdOrCtrl+W', click: on(win => win.close()) },
    ...(process.platform === 'darwin' ? [] : [{ role: 'quit', label: 'Quit Xenon' }]),
  ];
  const edit = [
    { role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' },
    { type: 'separator' },
    // The page gets the key itself, so that inside the code editor it opens the editor's own find.
    { label: 'Find on this page…', accelerator: 'CmdOrCtrl+F', registerAccelerator: false, click: on(openFind) },
    { label: 'Search Xenon…', accelerator: 'CmdOrCtrl+K', registerAccelerator: false, click: on(win => tell(win, 'command', 'search')) },
  ];
  const view = [
    { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: on(win => win.webContents.reload()) },
    { label: 'Reload and fetch the newest version', accelerator: 'CmdOrCtrl+Shift+R', click: on(win => win.webContents.reloadIgnoringCache()) },
    { type: 'separator' },
    { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
    { type: 'separator' },
    { label: 'Always on top', type: 'checkbox', checked: !!state.alwaysOnTop, ...(process.platform === 'linux' ? {} : { accelerator: 'CmdOrCtrl+Alt+T' }), click: item => setOnTop(item.checked) },
    { role: 'togglefullscreen' },
    { type: 'separator' },
    { label: 'Developer tools', accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'F12', click: on(win => win.webContents.toggleDevTools()) },
  ];
  const to = (label, route, accelerator) => ({ label, accelerator, click: on(win => go(win, route)) });
  const goMenu = [
    { label: 'Back', accelerator: process.platform === 'darwin' ? 'Cmd+[' : 'Alt+Left', click: on(win => win.webContents.navigationHistory.goBack()) },
    { label: 'Forward', accelerator: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right', click: on(win => win.webContents.navigationHistory.goForward()) },
    { type: 'separator' },
    to('Home', '/', 'CmdOrCtrl+1'), to('Courses', '/courses', 'CmdOrCtrl+2'), to('Playground', '/playground', 'CmdOrCtrl+3'),
    to('Review', '/review', 'CmdOrCtrl+4'), to('Achievements', '/achievements', 'CmdOrCtrl+5'),
    { type: 'separator' },
    { label: 'Continue where I left off', click: on(win => tell(win, 'command', 'continue')) },
    to('Settings', '/settings', 'CmdOrCtrl+,'),
  ];
  const help = [
    { label: 'Keyboard shortcuts', click: on(win => tell(win, 'command', 'shortcuts')) },
    { label: 'What is new on Xenon', click: on(win => tell(win, 'command', 'news')) },
    { type: 'separator' },
    { label: 'Open Xenon in the browser', click: () => shell.openExternal(SITE) },
    { label: 'Check for updates', click: () => updater.check() },
    { label: 'Get the newest app', click: () => shell.openExternal(DOWNLOADS) },
    { label: `Xenon desktop ${app.getVersion()}`, enabled: false },
  ];
  const template = [
    ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
    { label: 'File', submenu: file }, { label: 'Edit', submenu: edit }, { label: 'View', submenu: view }, { label: 'Go', submenu: goMenu },
    ...(process.platform === 'darwin' ? [{ role: 'windowMenu' }] : []),
    { role: 'help', label: 'Help', submenu: help },
  ];
  return Menu.buildFromTemplate(template);
}

/* ---------- what the page may ask for ---------- */

/** The window a message came from, if it came from the top frame of one of ours showing the site or an app page. */
function sender(event) {
  const frame = event.senderFrame;
  if (!frame || frame !== event.sender.mainFrame || !(inSite(frame.url) || isLocal(frame.url))) return null;
  const win = BrowserWindow.fromWebContents(event.sender);
  return win && windows.has(win) ? win : null;
}

ipcMain.on('xenon:info', event => {
  event.returnValue = sender(event) ? { version: app.getVersion(), platform: process.platform, frame: FRAME, state: publicState() } : null;
});

// The page says how tall its header is and which theme it shows, so the window buttons fit it.
ipcMain.on('xenon:chrome', (event, chrome) => {
  const win = sender(event);
  if (!win || !chrome || typeof chrome !== 'object') return;
  const record = windows.get(win);
  const height = Math.round(Number(chrome.height) * win.webContents.getZoomFactor());
  if (height >= 24 && height <= 120) record.header = height;
  applyTheme(chrome.theme === 'light' ? 'light' : 'dark', { back: chrome.back, ink: chrome.ink });
  placeFind(win);
});

ipcMain.on('xenon:menu', (event, at) => {
  const win = sender(event);
  if (!win) return;
  const zoom = win.webContents.getZoomFactor();
  const x = Math.round(Number(at && at.x) * zoom), y = Math.round(Number(at && at.y) * zoom);
  appMenu().popup({ window: win, ...(Number.isFinite(x) && Number.isFinite(y) ? { x, y } : {}) });
});

ipcMain.on('xenon:do', (event, name, value) => {
  const win = sender(event);
  if (!win) return;
  if (name === 'find') openFind(win);
  else if (name === 'pdf') savePdf(win);
  else if (name === 'print') win.webContents.print({ printBackground: false });
  else if (name === 'new-window') createWindow({ route: typeof value === 'string' && /^\/[\w\-./:%]*$/.test(value) ? value : '' });
  else if (name === 'always-on-top') setOnTop(!!value);
  else if (name === 'downloads') shell.openExternal(DOWNLOADS);
  else if (name === 'update') updater.update();
  else if (name === 'check-update') updater.check();
  else if (name === 'quick-key') setQuickKey(String(value));
  else if (name === 'open-file') pickFiles(win);
  else if (name === 'reveal-file') { const held = (state.files || {})[String(value)]; if (held && inSite(event.senderFrame.url)) shell.showItemInFolder(held.path); }
});

/* ---------- this computer's own compilers ---------- */
// Off until its owner switches it on, and switching it on is confirmed in a window of the app's own, which a page
// cannot press: with it on, a page may build and start programs on this computer (runner.js).

const fromSite = event => { const win = sender(event); return win && inSite(event.senderFrame.url) ? win : null; };
// Each compiler is tried once (it builds and runs a few lines) and the result is kept, so later starts only look.
const detectOptions = force => ({ force, checked: state.checked || {}, remember: checked => remember({ checked }) });
async function localInfo(force = false) {
  const found = await runner.detect(detectOptions(force));
  return { on: !!state.localRun, tools: found.tools, notes: found.notes, windows: found.windows };
}

ipcMain.handle('xenon:local', async (event, ask) => {
  const win = fromSite(event);
  if (!win) return null;
  const before = !!state.localRun;
  if (ask && ask.rescan) await localInfo(true);
  if (ask && ask.on === false) remember({ localRun: false });
  if (ask && ask.on === true && !state.localRun) {
    const { response } = await dialog.showMessageBox(win, {
      type: 'question', buttons: ['Use this computer', 'Cancel'], defaultId: 1, cancelId: 1, noLink: true,
      title: 'Xenon', message: 'Build and run code with this computer\'s own compilers?',
      detail: 'Code you run or check in Xenon will be built and started on this computer, like any program you start yourself: it can read and change your files. That is fine for code you write, and for the lessons. Keep it off if you paste in code you do not trust.\n\nIt is quicker than the online service and works with no connection. You can switch it off again in Settings, Desktop app.',
    });
    if (response === 0) remember({ localRun: true });
  }
  const info = await localInfo();
  if (before !== info.on || (ask && ask.rescan)) for (const other of windows.keys()) if (other !== win) tell(other, 'local', info);
  return info;
});

let running = 0;
ipcMain.handle('xenon:run', async (event, job) => {
  if (!fromSite(event)) return { error: 'Not allowed.' };
  if (!state.localRun) return { error: 'Running code on this computer is switched off. Turn it on in Settings, Desktop app.', unavailable: true };
  if (running >= 6) return { error: 'Too many programs are running at once. Wait a moment and try again.' };
  running++;
  try { return await runner.run(job); } finally { running--; }
});

/* ---------- the quick-open key ---------- */
// One key combination that works from any program while Xenon is open: it brings a window forward on the Playground.
// Pressed again there, it puts the window away.

const QUICK_KEYS = ['CommandOrControl+Alt+X', 'CommandOrControl+Shift+Space', 'Alt+Shift+X'];
let quickKeyOk = false;

function quickOpen() {
  const win = current();
  if (!win) { createWindow({ route: '/playground' }); return; }
  const there = /#\/playground/.test(win.webContents.getURL());
  if (there && win.isFocused() && !win.isMinimized()) { win.minimize(); return; }
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
  if (!there) go(win, '/playground');
  tell(win, 'quick');      // the page puts the cursor in the editor
}

function setQuickKey(key) {
  key = QUICK_KEYS.includes(key) ? key : 'off';
  globalShortcut.unregisterAll();
  quickKeyOk = false;
  if (key !== 'off') { try { quickKeyOk = globalShortcut.register(key, quickOpen); } catch { quickKeyOk = false; } }
  if (key !== state.quickKey) remember({ quickKey: key });
  for (const win of windows.keys()) tell(win, 'state', publicState());
}

/* ---------- real files ---------- */
// A file reaches a page in three ways, each one somebody's own doing: dropped on the window, picked in File, Open
// file, or handed to the app when it starts. The app reads it and remembers where it lives under a made-up id. A page
// only ever holds the id, the file's name and its text; with the id it may read that one file again or save back to it.

const TEXT_FILES = new Set(['cpp', 'cc', 'cxx', 'c', 'h', 'hpp', 'hh', 'hxx', 'ixx', 'cppm', 'inl', 'py', 'js', 'mjs', 'cjs', 'ts', 'mts', 'cts', 'cs', 'java', 'rs',
  'txt', 'md', 'csv', 'json', 'toml', 'yaml', 'yml', 'ini', 'cfg', 'xml', 'html', 'css']);
const MAX_FILE = 1024 * 1024, MAX_GRANTS = 60;
const extOf = file => path.extname(String(file)).slice(1).toLowerCase();
const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);

function grant(file) {
  const files = { ...(state.files || {}) };
  let id = Object.keys(files).find(k => samePath(files[k].path, file));
  if (!id) id = crypto.randomBytes(8).toString('hex');
  files[id] = { ...(files[id] || {}), path: file, at: Date.now() };
  for (const old of Object.keys(files).sort((a, b) => files[b].at - files[a].at).slice(MAX_GRANTS)) delete files[old];
  remember({ files });
  return id;
}

async function readGranted(id) {
  const held = (state.files || {})[id];
  if (!held) return { error: 'Xenon no longer remembers where that file is. Open it again.' };
  const name = path.basename(held.path);
  try {
    const stat = await fs.promises.stat(held.path);
    if (!stat.isFile()) return { error: `${name} is not a file.` };
    if (stat.size > MAX_FILE) return { error: `${name} is larger than 1 MB.` };
    const data = await fs.promises.readFile(held.path);
    if (data.subarray(0, 8192).includes(0)) return { error: `${name} is not a text file.` };
    let text = data.toString('utf8');
    const bom = text.charCodeAt(0) === 0xFEFF;
    if (bom) text = text.slice(1);
    remember({ files: { ...state.files, [id]: { ...held, at: Date.now(), mtime: stat.mtimeMs, crlf: text.includes('\r\n'), bom } } });
    return { id, name, text: text.replace(/\r\n/g, '\n') };
  } catch { return { error: `${name} could not be read. Was it moved or deleted?` }; }
}

/** Reads the files at these paths for a page: { files: [{ id, name, text }], problems: [text] }. */
async function openPaths(paths) {
  const out = { files: [], problems: [] };
  for (const file of [...new Set((Array.isArray(paths) ? paths : []).map(String))].slice(0, 20)) {
    if (!path.isAbsolute(file)) continue;
    if (!TEXT_FILES.has(extOf(file))) { out.problems.push(`${path.basename(file)} is not a kind of file Xenon opens (code and text files only).`); continue; }
    const got = await readGranted(grant(path.normalize(file)));
    if (got.error) out.problems.push(got.error); else out.files.push(got);
  }
  return out;
}

async function pickFiles(win) {
  if (!win || win.isDestroyed()) return;
  const code = [...TEXT_FILES];
  const { canceled, filePaths } = await dialog.showOpenDialog(win, { title: 'Open in the Playground', properties: ['openFile', 'multiSelections'], filters: [{ name: 'Code and text', extensions: code }] });
  if (canceled || !filePaths || !filePaths.length || win.isDestroyed()) return;
  tell(win, 'files', await openPaths(filePaths));
}

/** Files named when the app was started: dropped on its icon, or "Open with". */
function filesFromArgs(argv, skip) {
  return (argv || []).slice(skip).filter(a => !a.startsWith('-') && path.isAbsolute(a) && TEXT_FILES.has(extOf(a)) && fs.existsSync(a));
}
async function openFromOutside(win, paths) {
  if (!win || win.isDestroyed() || !paths.length) return;
  tell(win, 'files', await openPaths(paths));
}

/* ---------- Arc, the Xenon Discord bot (desktop/bot/arc.js) ----------
   It runs here, in the app, only while the app is open, and only does what the Bot panel on the site asks (the site
   shows that panel to the owner only). Its token is kept encrypted with the computer's own key store. */
let arc = null;
function arcBot() {
  if (!arc) {
    const { Arc } = require('./bot/arc');
    arc = new Arc({
      dir: app.getPath('userData'),
      secrets: {
        available: () => safeStorage.isEncryptionAvailable(),
        encrypt: text => safeStorage.encryptString(text).toString('base64'),
        decrypt: text => safeStorage.decryptString(Buffer.from(text, 'base64')),
      },
      emit: event => { for (const win of BrowserWindow.getAllWindows()) tell(win, 'arc', event); },
    });
  }
  return arc;
}
// What the panel may ask for: Arc's own list (desktop/bot/arc.js PANEL_CALLS), read when Arc is first needed.
let ARC_CALLS = null;
ipcMain.handle('xenon:arc', async (event, name, args) => {
  if (!fromSite(event)) return { error: 'Not allowed.' };
  try {
    const bot = arcBot();
    ARC_CALLS ||= require('./bot/arc').PANEL_CALLS;
    if (!ARC_CALLS.includes(name)) return { error: 'Unknown request.' };
    const a = args && typeof args === 'object' ? args : {};
    const result = name === 'connect' ? await bot.connect(typeof a.token === 'string' ? a.token : '')
      : name === 'select' ? bot.select(String(a.guildId || ''))
      : name === 'nuke' || name === 'rebuild' ? await bot[name](String(a.guildId || ''), String(a.confirm || ''))
      : name === 'setup' ? await bot.setup(String(a.guildId || ''))
      : await bot[name](a);
    return { ok: true, result: result === undefined ? null : result };
  } catch (err) {
    return { error: (err && err.message) || String(err) };
  }
});
app.on('before-quit', () => { if (arc) arc.disconnect(); });

ipcMain.handle('xenon:files-open', async (event, paths) => (fromSite(event) ? openPaths(paths) : { files: [], problems: [] }));
ipcMain.handle('xenon:file-read', async (event, id) => (fromSite(event) ? readGranted(String(id)) : { error: 'Not allowed.' }));

ipcMain.handle('xenon:file-write', async (event, req) => {
  if (!fromSite(event) || !req) return { error: 'Not allowed.' };
  const id = String(req.id), held = (state.files || {})[id];
  if (!held) return { error: 'Xenon no longer remembers where that file is. Use "Save a copy to this computer" to choose a place.' };
  const name = path.basename(held.path);
  let text = String(req.text === undefined || req.text === null ? '' : req.text);
  if (Buffer.byteLength(text) > 2 * MAX_FILE) return { error: `${name} is too large to save.` };
  try {
    const stat = await fs.promises.stat(held.path).catch(() => null);
    // Somebody (another editor, say) changed the file since Xenon last read or wrote it: ask before writing over that.
    if (stat && held.mtime && Math.abs(stat.mtimeMs - held.mtime) > 2 && !req.force) return { changed: true, name };
    if (held.crlf) text = text.replace(/\r?\n/g, '\r\n');
    await fs.promises.writeFile(held.path, (held.bom ? '\uFEFF' : '') + text);
    const now = await fs.promises.stat(held.path);
    remember({ files: { ...state.files, [id]: { ...held, at: Date.now(), mtime: now.mtimeMs } } });
    return { ok: true, name };
  } catch (err) { return { error: `${name} could not be saved (${(err && err.code) || 'unknown error'}).` }; }
});

ipcMain.handle('xenon:file-save-as', async (event, req) => {
  const win = fromSite(event);
  if (!win || !req) return { error: 'Not allowed.' };
  const text = String(req.text === undefined || req.text === null ? '' : req.text);
  if (Buffer.byteLength(text) > 2 * MAX_FILE) return { error: 'That file is too large to save.' };
  const name = path.basename(String(req.name || 'main.txt')).replace(/[\\/:*?"<>|]+/g, '_').slice(0, 80) || 'main.txt';
  const ext = extOf(name);
  const { canceled, filePath } = await dialog.showSaveDialog(win, { title: 'Save to this computer', defaultPath: path.join(app.getPath('documents'), name), filters: ext ? [{ name: `${ext} file`, extensions: [ext] }] : [] });
  if (canceled || !filePath) return null;
  if (!TEXT_FILES.has(extOf(filePath))) return { error: 'Xenon saves code and text files only. Keep the ending the file has.' };
  try {
    await fs.promises.writeFile(filePath, text);
    const id = grant(path.normalize(filePath));
    const stat = await fs.promises.stat(filePath);
    remember({ files: { ...state.files, [id]: { ...state.files[id], mtime: stat.mtimeMs, crlf: false, bom: false } } });
    return { id, name: path.basename(filePath) };
  } catch (err) { return { error: `The file could not be saved (${(err && err.code) || 'unknown error'}).` }; }
});

/* ---------- start-up ---------- */

let ready = false;
const openedEarly = [];
const single = app.requestSingleInstanceLock();
if (!single) app.quit();
else {
  app.on('second-instance', (event, argv) => {
    if (argv.includes('--new-window') || !current()) { createWindow({ route: routeFromArgs(argv) }); return; }
    const win = current();
    if (win.isMinimized()) win.restore();
    win.show(); win.focus();
    const route = routeFromArgs(argv);
    if (route) go(win, route);
    openFromOutside(win, filesFromArgs(argv, 1));
  });
  app.whenReady().then(() => {
    state = { ...state, ...readJson(stateFile(), {}) };
    nativeTheme.themeSource = state.theme === 'light' ? 'light' : 'dark';
    Menu.setApplicationMenu(appMenu());
    const first = createWindow({ route: routeFromArgs(process.argv) });
    const asked = [...filesFromArgs(process.argv, app.isPackaged ? 1 : 2), ...openedEarly.splice(0)];
    if (asked.length) first.webContents.once('did-finish-load', () => openFromOutside(first, asked));
    ready = true;
    setQuickKey(state.quickKey);
    // Looks for a newer app every time it opens (and every few hours), and tells every window.
    updater.start(s => { for (const win of windows.keys()) tell(win, 'update', updateNotice(s)); });
    if (process.platform === 'win32') {
      const task = (args, title, description) => ({ program: process.execPath, arguments: app.isPackaged ? args : `"${__dirname}" ${args}`, iconPath: ICON, iconIndex: 0, title, description });
      try {
        app.setUserTasks([
          task('--new-window', 'New window', 'Open another Xenon window'),
          task('--route=/playground', 'Open the Playground', 'Write and run any code'),
          task('--route=/review', 'Review cards', 'Quiz yourself on finished lessons'),
        ]);
      } catch { /* jump lists are optional */ }
    }
    if (process.platform === 'darwin') app.dock.setMenu(Menu.buildFromTemplate([{ label: 'New window', click: () => createWindow() }]));
    app.on('activate', () => { if (!current()) createWindow(); });
  }).catch(err => { console.error(err); app.quit(); });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
  app.on('will-quit', () => globalShortcut.unregisterAll());
  // macOS hands over files this way: dropped on the Dock icon, or "Open with".
  app.on('open-file', (event, file) => {
    event.preventDefault();
    if (!ready) { openedEarly.push(file); return; }
    const win = current() || createWindow();
    if (win.webContents.isLoading()) win.webContents.once('did-finish-load', () => openFromOutside(win, [file])); else openFromOutside(win, [file]);
  });
}
