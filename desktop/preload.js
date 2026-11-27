'use strict';
// The one door between a Xenon page and the app. It runs inside the page's sandbox and hands the page a short list
// of things it may ask for, nothing more: no Node, and no files except the ones its owner hands it. main.js checks
// every message again on its side.
const { contextBridge, ipcRenderer, webUtils } = require('electron');

const info = ipcRenderer.sendSync('xenon:info');
if (info) {
  const listeners = new Set();
  // The last word on an update is kept: it can arrive before the page has started listening.
  let lastUpdate = null;
  // Files opened from outside (the app was started with one) wait for the page to be ready for them.
  const waitingFiles = [];
  ipcRenderer.on('xenon:event', (event, name, data) => {
    if (name === 'update') lastUpdate = data;
    if (name === 'files' && !listeners.size) { waitingFiles.push(data); return; }
    for (const fn of listeners) { try { fn(String(name), data); } catch { /* the page's business */ } }
  });
  const ACTIONS = ['find', 'pdf', 'print', 'new-window', 'always-on-top', 'downloads', 'update', 'check-update', 'quick-key', 'open-file', 'reveal-file'];
  contextBridge.exposeInMainWorld('cairnDesktop', {
    version: String(info.version),
    platform: String(info.platform),
    frame: String(info.frame),               // 'overlay' (Windows), 'inset' (macOS) or 'native' (Linux)
    state: { alwaysOnTop: !!(info.state && info.state.alwaysOnTop), updater: String((info.state && info.state.updater) || ''), quickKey: String((info.state && info.state.quickKey) || 'off'), quickKeyOk: !!(info.state && info.state.quickKeyOk) },
    /** How tall the page's header is, in CSS pixels, and whether the page is light or dark. */
    chrome: (height, theme, back, ink) => ipcRenderer.send('xenon:chrome', { height: Number(height) || 0, theme: theme === 'light' ? 'light' : 'dark', back: String(back || ''), ink: String(ink || '') }),
    /** Opens the app's menu at a point on the page. */
    menu: (x, y) => ipcRenderer.send('xenon:menu', { x: Number(x) || 0, y: Number(y) || 0 }),
    do: (name, value) => { if (ACTIONS.includes(name)) ipcRenderer.send('xenon:do', name, typeof value === 'string' || typeof value === 'boolean' ? value : null); },
    on: fn => {
      if (typeof fn !== 'function') return;
      listeners.add(fn);
      if (lastUpdate) { try { fn('update', lastUpdate); } catch { /* the page's business */ } }
      for (const data of waitingFiles.splice(0)) { try { fn('files', data); } catch { /* the page's business */ } }
    },
    /** This computer's own compilers: what is installed and whether they are in use. { on: true } asks the app's owner first. */
    local: ask => ipcRenderer.invoke('xenon:local', ask && typeof ask === 'object' ? { on: typeof ask.on === 'boolean' ? ask.on : undefined, rescan: !!ask.rescan } : null),
    /** Builds and runs one program on this computer. Refused unless the switch above is on. */
    run: job => ipcRenderer.invoke('xenon:run', job),
    /** Arc, the Discord bot this app can run (the site's Bot panel, for the owner). Each call answers { ok, result } or { error }. */
    arc: (name, args) => ipcRenderer.invoke('xenon:arc', String(name), args && typeof args === 'object' ? JSON.parse(JSON.stringify(args)) : null),
    files: {
      /** Files dropped on the page. The app reads them itself; the page gets each one's name, text and an id to save back with. */
      dropped: list => {
        const paths = [];
        for (const file of Array.from(list || []).slice(0, 20)) { try { const p = webUtils.getPathForFile(file); if (p) paths.push(p); } catch { /* not a file from the computer */ } }
        return ipcRenderer.invoke('xenon:files-open', paths);
      },
      read: id => ipcRenderer.invoke('xenon:file-read', String(id)),
      write: (id, text, force) => ipcRenderer.invoke('xenon:file-write', { id: String(id), text: String(text), force: !!force }),
      saveAs: (name, text) => ipcRenderer.invoke('xenon:file-save-as', { name: String(name), text: String(text) }),
    },
  });
}
