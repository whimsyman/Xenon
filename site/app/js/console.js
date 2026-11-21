import{keyText as b,api as k,h as a,icon as D,clear as m,runStream as B}from"./core.js?v=76261f86cd77";function A({mini:h=!1,placeholder:$="Type input for your program and press Enter"}={}){const n=a("pre.console-out"),l=a("input",{type:"text",placeholder:$,spellcheck:"false",autocomplete:"off"}),d=a("div.console-in.idle",a("span","\u203A"),l),g=a(`div.console${h?".mini":""}`,n,d);let r=null,u=null,x=!1,S=()=>{};const p=[];let f=0;function o(e,i=""){const c=n.scrollHeight-n.scrollTop-n.clientHeight<40;i?n.append(a(`span.${i}`,e)):n.append(document.createTextNode(e)),n.childNodes.length>4e3&&n.firstChild.remove(),c&&(n.scrollTop=n.scrollHeight)}function w(e){x=e,d.classList.toggle("idle",!e),S(e)}function y(){u&&(u.close(),u=null),r=null,w(!1)}async function R(e,i={}){C(),m(n),o(i.quiet?"":`Compiling\u2026
`,"sys"),w(!0);let c;try{c=await k("/api/run",{files:e,...i})}catch(t){return m(n),o(`${t.message}
`,"err"),y(),{ok:!1,error:t.message}}if(m(n),c.noCompiler)return o(`No C++ compiler was found on the server, so this cannot run right now.
`,"err"),y(),{ok:!1,noCompiler:!0};if(!c.ok){const t=c.compile.diagnostics.filter(s=>s.severity==="error");o(`The code did not compile (${t.length||"see"} ${t.length===1?"error":"errors"}).

`,"err");for(const s of t.slice(0,12))o(`${s.file}${s.line?`, line ${s.line}`:""}: ${s.message}
`,"err"),s.help&&o(`   ${s.help.title}. ${s.help.text}

`,"sys");return t.length||o(c.compile.raw+`
`,"err"),y(),{ok:!1,compile:c.compile}}r=c.runId;const T=r;return u=B(r,t=>{if(T===r){if(t.type==="out")o(t.data);else if(t.type==="err")o(t.data,"err");else if(t.type==="info")o(`
${t.data}
`,"sys");else if(t.type==="exit"){const s=(t.ms/1e3).toFixed(t.ms<1e4?2:1);n.textContent&&!n.textContent.endsWith(`
`)&&o(`
`),t.code===0?o(`
Program finished (exit code 0, ${s} s)
`,"ok"):(o(`
Program ended with exit code ${t.code} (${s} s)
`,"err"),t.note&&o(`${t.note}
`,"sys")),y()}}},()=>{T===r&&y()}),i.closeInput||l.focus({preventScroll:!0}),{ok:!0,compile:c.compile}}function C(){r&&k("/api/run/stop",{id:r}).catch(()=>{}),u&&(u.close(),u=null),x&&o(`
Stopped.
`,"sys"),r=null,w(!1)}return l.addEventListener("keydown",e=>{if(e.key==="Enter"){const i=l.value;if(!r)return;o(i+`
`,"in"),k("/api/run/input",{id:r,text:i+`
`}).catch(()=>{}),i&&(p.push(i),f=p.length),l.value=""}else e.key==="ArrowUp"&&p.length?(f=Math.max(0,f-1),l.value=p[f]||"",e.preventDefault()):e.key==="ArrowDown"&&p.length?(f=Math.min(p.length,f+1),l.value=p[f]||"",e.preventDefault()):e.key==="d"&&e.ctrlKey&&r?(k("/api/run/eof",{id:r}).catch(()=>{}),o(`(end of input)
`,"sys"),e.preventDefault()):e.key==="c"&&e.ctrlKey&&!l.value&&r&&(C(),e.preventDefault())}),{el:g,run:R,stop:C,write:o,clear:()=>m(n),isRunning:()=>x,onStateChange:e=>{S=e},showMessage:(e,i="sys")=>{m(n),o(e,i)}}}function H(h,$,n=()=>({})){const l=a("button.btn.small",{title:b("Run (Ctrl+Enter)")},D("play"),"Run"),d=a("button.btn.small.danger",{style:{display:"none"}},D("stop"),"Stop");return l.onclick=()=>h.run($(),n()),d.onclick=()=>h.stop(),h.onStateChange(g=>{l.style.display=g?"none":"",d.style.display=g?"":"none"}),[l,d]}export{A as createConsole,H as runButtons};
