import{n as e}from"./rolldown-runtime-XKyaHtl9.js";var t=e({LANGS:()=>i,NEEDS_INPUT:()=>n,REMOTE:()=>p,asmHarness:()=>A,canStepInput:()=>f,codeOnly:()=>u,describeEnd:()=>L,diagnostics:()=>F,entryOf:()=>l,langOfFence:()=>c,langOfFile:()=>o,langOfFiles:()=>s,prepare:()=>j,pythonVerdict:()=>I,readsInput:()=>d,tidyText:()=>N}),n=`<<xenon:needs-input>>`,r=`<<xenon:syntax>>`,i={cpp:{id:`cpp`,name:`C++`,monaco:`cpp`,fences:[`cpp`,`c++`],exts:[`cpp`,`cc`,`cxx`,`h`,`hpp`,`hh`,`hxx`,`ixx`,`cppm`,`inl`],source:/\.(cpp|cc|cxx)$/i,entry:`main.cpp`,unitEntry:`solution.cpp`,comment:`//`,hasMain:e=>/\bint\s+main\s*\(/.test(e)},c:{id:`c`,name:`C`,monaco:`c`,fences:[`c`,`c17`,`c11`],exts:[`c`,`h`],source:/\.c$/i,entry:`main.c`,unitEntry:`solution.c`,comment:`//`,hasMain:e=>/\bint\s+main\s*\(/.test(e),reads:/\b(scanf|fgets|getchar|getline|fgetc|getc|fread|fscanf)\s*\(/},asm:{id:`asm`,name:`Assembly`,monaco:`nasm`,fences:[`nasm`,`asm`,`x86asm`,`assembly`],exts:[`asm`,`inc`],source:/\.asm$/i,entry:`main.asm`,unitEntry:`solution.asm`,comment:`;`,hasMain:e=>/^\s*_start\s*:/m.test(e),reads:/\b(read_int|read_char|read_line)\b/},python:{id:`python`,name:`Python`,monaco:`python`,fences:[`python`,`py`,`python3`],exts:[`py`],source:/\.py$/i,entry:`main.py`,unitEntry:`solution.py`,comment:`#`,hasMain:()=>!0,reads:/\binput\s*\(|\bsys\.stdin\b|\bfileinput\b/},lua:{id:`lua`,name:`Lua`,monaco:`lua`,fences:[`lua`],exts:[`lua`],source:/\.lua$/i,entry:`main.lua`,unitEntry:`solution.lua`,comment:`--`,hasMain:()=>!0,reads:/\bio\s*\.\s*(read|lines\s*\(\s*\)|stdin)\b|\bio\s*\.\s*lines\s*\(\s*\)/},javascript:{id:`javascript`,name:`JavaScript`,monaco:`javascript`,fences:[`javascript`,`js`,`node`,`mjs`],exts:[`js`,`mjs`,`cjs`],source:/\.(js|mjs|cjs)$/i,entry:`main.js`,unitEntry:`solution.js`,comment:`//`,local:!0,hasMain:()=>!0,reads:/\bprompt\s*\(|\breadline\b|process\.stdin|readFileSync\s*\(\s*(0|['"]\/dev\/stdin['"])/},typescript:{id:`typescript`,name:`TypeScript`,monaco:`typescript`,fences:[`typescript`,`ts`],exts:[`ts`,`mts`,`cts`],source:/\.(ts|mts|cts)$/i,entry:`main.ts`,unitEntry:`solution.ts`,comment:`//`,local:!0,hasMain:()=>!0,reads:/\bprompt\s*\(|\breadline\b|process\.stdin|readFileSync\s*\(\s*(0|['"]\/dev\/stdin['"])/},csharp:{id:`csharp`,name:`C#`,monaco:`csharp`,fences:[`csharp`,`cs`,`c#`],exts:[`cs`],source:/\.cs$/i,entry:`Program.cs`,unitEntry:`Solution.cs`,comment:`//`,hasMain:e=>/\bstatic\s+(async\s+)?(void|int|Task|Task<int>)\s+Main\s*\(/.test(e)||!/^\s*(namespace|(public\s+|internal\s+)?(static\s+|sealed\s+|abstract\s+|partial\s+)*(class|struct|record|interface|enum))\b/m.test(e.replace(/^\s*(using|\/\/|#).*$/gm,``))||/^[^\s/{}][^\n]*;\s*$/m.test(e.replace(/^\s*using .*$/gm,``)),reads:/\bConsole\s*\.\s*(ReadLine|Read|ReadKey|In)\b/},java:{id:`java`,name:`Java`,monaco:`java`,fences:[`java`],exts:[`java`],source:/\.java$/i,entry:`Main.java`,unitEntry:`Solution.java`,comment:`//`,hasMain:e=>/\bstatic\s+void\s+main\s*\(/.test(e)||/^\s*void\s+main\s*\(\s*\)/m.test(e),reads:/\bSystem\s*\.\s*in\b|\bScanner\b|\bConsole\b|\bBufferedReader\b/},rust:{id:`rust`,name:`Rust`,monaco:`rust`,fences:[`rust`,`rs`],exts:[`rs`],source:/\.rs$/i,entry:`main.rs`,unitEntry:`solution.rs`,comment:`//`,hasMain:e=>/\bfn\s+main\s*\(/.test(e),reads:/\bstdin\s*\(|\bio::stdin\b|read_line\s*\(/}},a=new Map;for(let e of Object.values(i))for(let t of e.exts)a.has(t)||a.set(t,e.id);function o(e){let t=/\.([A-Za-z0-9]+)$/.exec(String(e||``));return t&&a.get(t[1].toLowerCase())||null}function s(e,t){let n=Object.keys(e||{});if(t&&i[o(t)]&&i[o(t)].source.test(t))return o(t);let r={};for(let e of n){let t=o(e);t&&i[t].source.test(e)&&(r[t]=(r[t]||0)+1)}if(r.typescript)return`typescript`;let a=Object.entries(r).sort((e,t)=>t[1]-e[1])[0];return a?a[0]:`cpp`}function c(e){let t=String(e||``).toLowerCase();for(let e of Object.values(i))if(e.fences.includes(t))return e.id;return null}function l(e,t){let n=i[e],r=Object.keys(t).filter(e=>n.source.test(e));return r.includes(n.entry)?n.entry:r.find(e=>n.hasMain(t[e]))||r[0]||n.entry}function u(e){return String(e).replace(/\/\*[\s\S]*?\*\//g,` `).replace(/(^|[^:])\/\/[^\n]*/g,`$1`).replace(/^\s*#(?!include|!).*$/gm,``).replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g,`""`)}function d(e,t){let n=i[e];return!n||!n.reads?!1:Object.entries(t).some(([e,t])=>n.source.test(e)&&n.reads.test(u(t)))}function f(e,t){return e===`rust`||e===`asm`?!1:e!==`java`||!!_(t[l(`java`,t)]||``)}var p={python:{id:`python`,lang:`python`,ce:`python313`,ceLang:`python`,name:`Python 3.13`,detail:`Runs on Compiler Explorer`,standard:`Python 3.13`},csharp:{id:`csharp`,lang:`csharp`,ce:`dotnet90csharpcoreclr`,ceLang:`csharp`,name:`.NET 9 (C# 13)`,detail:`Runs on Compiler Explorer`,standard:`C# 13, .NET 9`},java:{id:`java`,lang:`java`,ce:`java2502`,ceLang:`java`,name:`Java 25`,detail:`Runs on Compiler Explorer`,standard:`Java 25 (LTS)`},rust:{id:`rust`,lang:`rust`,ce:`r1990`,ceLang:`rust`,name:`Rust 1.99`,detail:`Runs on Compiler Explorer`,standard:`Rust, 2024 edition`},c:{id:`c`,lang:`c`,ce:`cg152`,ceLang:`c`,name:`GCC 15.2 (C17)`,detail:`Runs on Compiler Explorer`,standard:`C17`,supportsAsan:!0},lua:{id:`lua`,lang:`lua`,ce:`lua547`,ceLang:`lua`,name:`Lua 5.4`,detail:`Runs on Compiler Explorer`,standard:`Lua 5.4`},asm:{id:`asm`,lang:`asm`,ce:`nasm301`,ceLang:`assembly`,name:`NASM 3.01, x86-64 Linux`,detail:`Runs on Compiler Explorer, on Linux`,standard:`x86-64, Intel syntax`},javascript:{id:`javascript`,lang:`javascript`,local:!0,name:`JavaScript`,detail:`Runs in your browser`,standard:`ECMAScript 2024`},typescript:{id:`typescript`,lang:`typescript`,local:!0,name:`TypeScript`,detail:`Runs in your browser`,standard:`TypeScript 5`}},m=(e,t)=>!i[e].source.test(t)&&!/^xenon/i.test(t),h=(e,t)=>Object.keys(t).filter(t=>m(e,t)&&o(t)!==e).map(e=>({filename:e,contents:t[e]})),g=e=>e.replace(/[^\n]/g,` `);function _(e){let t=/^([ \t]*)(?:(?:public|final|abstract|sealed|non-sealed|static)\s+)*(class|record|enum|interface)\s+(\w+)[^{]*\{/gm,n;for(;n=t.exec(e);){let r=1,i=t.lastIndex;for(;i<e.length&&r;i++)e[i]===`{`?r++:e[i]===`}`&&r--;let a=e.slice(t.lastIndex,i);if(/\bstatic\s+void\s+main\s*\(/.test(a))return{name:n[3],open:t.lastIndex}}return null}var v=e=>e.replace(/^public(\s+(?:(?:final|abstract|sealed|non-sealed)\s+)*(?:class|interface|enum|record)\b)/gm,`      $1`),y=[`System`,`System.Collections.Generic`,`System.IO`,`System.Linq`,`System.Text`,`System.Threading`,`System.Threading.Tasks`];function b(e,t,n){let r=[t,...Object.keys(e).filter(e=>e!==t&&i.csharp.source.test(e)).sort()],a=y.map(e=>`global using ${e};`),o=[];for(let n of r){let r=e[n].replace(/\r\n/g,`
`);n!==t&&(r=r.split(`
`).map(e=>{let t=/^\s*(global\s+)?using\s+(static\s+)?([\w.]+\s*=\s*)?[\w.<>, ]+\s*;\s*$/.exec(e);return!t||/\busing\s*\(/.test(e)?e:(a.push(t[1]?e.trim():`global `+e.trim()),g(e))}).join(`
`)),o.push(`#line 1 "${n}"\n${r}${r.endsWith(`
`)?``:`
`}`)}for(let e of n.usings||[])a.push(e);return[...new Set(a)].join(` `)+`
`+o.join(``)+(n.tail||``)}function x(e){return Array.isArray(e)?`{${e.map(x).join(`, `)}}`:e&&typeof e==`object`?`{${Object.entries(e).map(([e,t])=>`${e} = ${x(t)}`).join(`, `)}}`:typeof e==`string`?`"${[...new TextEncoder().encode(e)].map(e=>e>=32&&e<127&&e!==34&&e!==92?String.fromCharCode(e):`\\${String(e).padStart(3,`0`)}`).join(``)}"`:String(e)}function S(e){let t=[],n=String(e||``).split(/^;; @([A-Za-z_]\w*):(.*)$/m);for(let e=1;e<n.length;e+=3)t.push({name:n[e],needs:n[e+1].trim().split(/\s+/).filter(Boolean),text:n[e+2]});return t}var C=(e,t)=>RegExp(`^\\s*${t}\\s*:`,`m`).test(e);function w(e,t){let n=S(t),r=new Set,i=t=>{let a=n.find(e=>e.name===t);!a||r.has(t)||C(e,t)||(r.add(t),a.needs.forEach(i))};for(let t of n)!t.name.startsWith(`xenon_`)&&RegExp(`\\b${t.name}\\b`).test(e.replace(/;[^\n]*/g,``))&&i(t.name);let a=n.filter(e=>r.has(e.name)).map(e=>e.text).join(``);return a?`\n%line 1+1 xenon_io.asm\n        section .text${a}`:``}var T=e=>{let t=[...new TextEncoder().encode(e)];return t.length?t.join(`, `)+`, 0`:`0`};function E(e){return JSON.parse(e.replace(/\\0/g,`\\u0000`))}function D(e){let t=[],n=0,r=!1,i=``;for(let a=0;a<e.length;a++){let o=e[a];r?(i+=o,o===`\\`?i+=e[++a]||``:o===`"`&&(r=!1)):o===`"`?(r=!0,i+=o):((o===`[`||o===`(`)&&n++,(o===`]`||o===`)`)&&n--,o===`,`&&n===0?(t.push(i.trim()),i=``):i+=o)}return i.trim()&&t.push(i.trim()),t}function O(e){let t=e.trim();if(/^'(\\?.)'$/.test(t))return String(JSON.parse(`"${t.slice(1,-1)}"`).charCodeAt(0));if(/^-?(0x[0-9a-f_]+|0b[01_]+|\d[\d_]*)$/i.test(t))return t.replace(/_/g,``);throw Error(`not a number: ${t}`)}function k(e,t){let n=e.trim(),r=!1;if(n.startsWith(`@`)&&(r=!0,n=n.slice(1).trim()),n.startsWith(`"`))return{lea:t,data:`${t}: db ${T(E(n))}`,kind:`str`,writable:r};let i=/^buf\((\d+)\)$/.exec(n);if(i)return{lea:t,data:`${t}: times ${Math.max(1,Math.min(4096,+i[1]))} db 0`,kind:`str`,writable:!0};if(i=/^(b|q)?\[(.*)\]$/s.exec(n),i){let e=i[2].trim()?D(i[2]).map(O):[],n=i[1]===`b`?1:8;return{lea:t,data:`${t}: ${n===1?`db`:`dq`} ${e.length?e.join(`, `):`0`}`,kind:`array`,width:n,count:e.length,writable:r}}return{imm:O(n)}}function A(e){let t=[`rdi`,`rsi`,`rdx`,`rcx`,`r8`,`r9`],n={rbx:`0x5b5b5b5b00000b0b`,rbp:`0x5b5b5b5b00000b9b`,r12:`0x5b5b5b5b00000c12`,r13:`0x5b5b5b5b00000c13`,r14:`0x5b5b5b5b00000c14`,r15:`0x5b5b5b5b00000c15`},r=[],i=[],a=-1,o=0,s=String(e||``).split(`
`),c=()=>{a>=0&&i.push(`        lea     rdi, [rel xt_n${a}]`,`        call    xt_end`)};return s.forEach((e,s)=>{let l=e.replace(/;.*$/,``).trim();if(!l)return;let u=s+1,d=/^test\s+(".*")\s*$/.exec(l);if(d){c(),a++,r.push(`xt_n${a}: db ${T(E(d[1]))}`),i.push(`%line ${u}+0 the-tests`,`        lea     rdi, [rel xt_n${a}]`,`        call    xt_begin`);return}if(d=/^([A-Za-z_.][\w.]*)\s*\((.*)\)\s*(==|=>)\s*(.+)$/.exec(l),!d){i.push(`%line ${u}+0 the-tests`,`        %error "a test line must look like  name(arguments) == number  or  name(arguments) => \\"text\\""`);return}a<0&&(a++,r.push(`xt_n${a}: db ${T(`the tests`)}`),i.push(`        lea     rdi, [rel xt_n0]`,`        call    xt_begin`));let f=o++,[,p,m,h,g]=d;r.push(`xt_e${f}: db ${T(`${p}(${m.trim()})`)}`);let _=D(m).map((e,t)=>k(e,`xt_a${f}_${t}`));i.push(`%line ${u}+0 the-tests`,`        lea     rax, [rel xt_e${f}]`,`        mov     [rel xt_expr], rax`),_.forEach((e,n)=>{if(n>=t.length)return i.push(`        %error "at most six arguments"`);e.data?(r.push(e.data),i.push(`        lea     ${t[n]}, [rel ${e.lea}]`)):i.push(`        mov     ${t[n]}, ${e.imm}`)});for(let[e,t]of Object.entries(n))i.push(`        mov     ${e}, ${t}`);if(i.push(`        call    ${p}`,`        call    xt_saved`),h===`==`)i.push(`        mov     r10, ${O(g)}`,`        cmp     rax, r10`,`        je      xt_ok${f}`,`        mov     rsi, rax`,`        mov     rdx, r10`,`        call    xt_fail_int`,`xt_ok${f}:`);else{let e=_.findIndex(e=>e.writable);if(e<0){i.push(`        %error "=> compares the memory of an argument marked with @, and this line has none"`);return}let t=k(g,`xt_w${f}`);if(!t.data){i.push(`        %error "after => comes \\"text\\" or [numbers]"`);return}r.push(t.data);let n=_[e];t.kind===`str`?i.push(`        lea     rsi, [rel ${n.lea}]`,`        lea     rdx, [rel ${t.lea}]`,`        call    xt_check_str`):i.push(`        lea     rsi, [rel ${n.lea}]`,`        lea     rdx, [rel ${t.lea}]`,`        mov     ecx, ${t.count}`,`        mov     r8d, ${t.width===1?1:8}`,`        call    xt_check_array`)}}),c(),`
%line 1+0 the-tests
        global  _start
        section .data
xt_failed:      dq      0
xt_failures:    dq      0
xt_kind:        dq      0
xt_expr:        dq      0
xt_got:         dq      0
xt_want:        dq      0
xt_count:       dq      0
xt_width:       dq      0
xt_reg:         dq      0
${r.join(`
`)}
xt_sB:  db 'B', 9, 0
xt_sP:  db 'P', 9, 0
xt_sF:  db 'F', 9, 0
xt_sE:  db 'E', 9, 0
xt_sNL: db 10, 0
xt_sTab: db 9, 0
xt_sGave: db ' gave ', 0
xt_sExp: db ', expected ', 0
xt_sChanged: db ' changed ', 0
xt_sKeep: db ' (a function must leave rbx, rbp and r12 to r15 as it found them)', 0
xt_sLeft: db ' left ', 0
xt_sQ:  db '"', 0
xt_sOpen: db '[', 0
xt_sClose: db ']', 0
xt_sComma: db ', ', 0
${Object.keys(n).map(e=>`xt_r_${e}: db '${e}', 0`).join(`
`)}
        section .text
_start:
${i.join(`
`)}
%line 1+0 the-tests
        mov     dword [rel xenon_fd], 2
        lea     rdi, [rel xt_sE]
        call    print_str
        mov     rdi, [rel xt_failures]
        call    print_int
        call    print_newline
        mov     eax, 60
        xor     edi, edi
        syscall
xt_begin:                               ; rdi = the test's name
        push    rdi
        mov     dword [rel xenon_fd], 2
        lea     rdi, [rel xt_sB]
        call    print_str
        pop     rdi
        call    print_str
        call    print_newline
        mov     dword [rel xenon_fd], 1
        mov     qword [rel xt_failed], 0
        ret
xt_end:                                 ; rdi = the test's name
        push    rdi
        mov     dword [rel xenon_fd], 2
        cmp     qword [rel xt_failed], 0
        jne     .failed
        lea     rdi, [rel xt_sP]
        call    print_str
        pop     rdi
        call    print_str
        jmp     .line
.failed:
        inc     qword [rel xt_failures]
        lea     rdi, [rel xt_sF]
        call    print_str
        pop     rdi
        call    print_str
        lea     rdi, [rel xt_sTab]
        call    print_str
        call    xt_report
.line:  call    print_newline
        mov     dword [rel xenon_fd], 1
        ret
${Object.entries(n).map(([e,t])=>`        mov     r10, ${t}\n        cmp     ${e}, r10\n        jne     xt_saved_${e}`).join(`
`).replace(/^/,`xt_saved:                               ; keeps rax
`)}
        ret
${Object.keys(n).map(e=>`xt_saved_${e}:\n        lea     r10, [rel xt_r_${e}]\n        jmp     xt_saved_fail`).join(`
`)}
xt_saved_fail:
        cmp     qword [rel xt_failed], 0
        jne     .done
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 2
        mov     [rel xt_reg], r10
.done:  ret
xt_fail_int:                            ; rsi = what came back, rdx = what was expected
        cmp     qword [rel xt_failed], 0
        jne     .done
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 1
        mov     [rel xt_got], rsi
        mov     [rel xt_want], rdx
.done:  ret
xt_check_str:                           ; rsi = the buffer, rdx = the expected text
        xor     ecx, ecx
.next:  mov     al, [rsi + rcx]
        cmp     al, [rdx + rcx]
        jne     .differ
        test    al, al
        jz      .same
        inc     rcx
        jmp     .next
.differ:
        cmp     qword [rel xt_failed], 0
        jne     .same
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 3
        mov     [rel xt_got], rsi
        mov     [rel xt_want], rdx
.same:  ret
xt_check_array:                         ; rsi = the array, rdx = the expected one, ecx = how many, r8d = 1 or 8 bytes each
        xor     r9d, r9d
.next:  cmp     r9, rcx
        jae     .same
        cmp     r8d, 1
        jne     .q
        movzx   eax, byte [rsi + r9]
        movzx   r10d, byte [rdx + r9]
        jmp     .cmp
.q:     mov     rax, [rsi + r9 * 8]
        mov     r10, [rdx + r9 * 8]
.cmp:   cmp     rax, r10
        jne     .differ
        inc     r9
        jmp     .next
.differ:
        cmp     qword [rel xt_failed], 0
        jne     .same
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 4
        mov     [rel xt_got], rsi
        mov     [rel xt_want], rdx
        mov     [rel xt_count], rcx
        mov     [rel xt_width], r8
.same:  ret
xt_report:                              ; prints what went wrong in the current test
        push    rbx
        mov     rdi, [rel xt_expr]
        call    print_str
        mov     rax, [rel xt_kind]
        cmp     rax, 2
        je      .saved
        cmp     rax, 3
        je      .str
        cmp     rax, 4
        je      .arr
        lea     rdi, [rel xt_sGave]
        call    print_str
        mov     rdi, [rel xt_got]
        call    print_int
        lea     rdi, [rel xt_sExp]
        call    print_str
        mov     rdi, [rel xt_want]
        call    print_int
        jmp     .done
.saved: lea     rdi, [rel xt_sChanged]
        call    print_str
        mov     rdi, [rel xt_reg]
        call    print_str
        lea     rdi, [rel xt_sKeep]
        call    print_str
        jmp     .done
.str:   lea     rdi, [rel xt_sLeft]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        mov     rdi, [rel xt_got]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        lea     rdi, [rel xt_sExp]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        mov     rdi, [rel xt_want]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        jmp     .done
.arr:   lea     rdi, [rel xt_sLeft]
        call    print_str
        mov     rdi, [rel xt_got]
        call    xt_print_array
        lea     rdi, [rel xt_sExp]
        call    print_str
        mov     rdi, [rel xt_want]
        call    xt_print_array
.done:  pop     rbx
        ret
xt_print_array:                         ; rdi = an array of [xt_count] items of [xt_width] bytes
        push    rbx
        push    r12
        push    r13
        mov     r12, rdi
        xor     ebx, ebx
        lea     rdi, [rel xt_sOpen]
        call    print_str
.next:  cmp     rbx, [rel xt_count]
        jae     .close
        test    rbx, rbx
        jz      .item
        lea     rdi, [rel xt_sComma]
        call    print_str
.item:  cmp     qword [rel xt_width], 1
        jne     .q
        movzx   edi, byte [r12 + rbx]
        jmp     .print
.q:     mov     rdi, [r12 + rbx * 8]
.print: call    print_int
        inc     rbx
        jmp     .next
.close: lea     rdi, [rel xt_sClose]
        call    print_str
        pop     r13
        pop     r12
        pop     rbx
        ret
`}function j(e,t,n,r){let a=n.entry&&t[n.entry]!==void 0?n.entry:l(e,t),o=Object.keys(t).filter(t=>i[e].source.test(t)),s={entry:a,ceLang:p[e].ceLang,userArguments:``,files:[],source:``,testsLine:0,map:{}};if(e===`c`){let e=o.filter(e=>e!==a);return s.userArguments=[`-std=c17`,`-Wall`,`-Wextra`,`-Wpedantic`,`-Wshadow`,`-Wno-unused-parameter`,`-fdiagnostics-color=never`,...n.mode===`release`?[`-O2`]:[`-O0`,`-g`],...n.interactive?[`-include`,`xenon_input_c.h`]:[],...n.asan&&!n.syntaxOnly?[`-fsanitize=address,undefined`,`-fno-omit-frame-pointer`]:[],...n.syntaxOnly?[`-fsyntax-only`]:e,`-lm`].join(` `),n.unit?(s.source=`#include "xenon_test_c.h"\n#include "${a}"\nint main(void)\n{\n    xenon_start();\n#line 1 "the tests"\n${n.unit.tests}\n    return xenon_finish();\n}\n`,s.testsLine=1):s.source=`#include "${a}"\n`,s.files=[...Object.keys(t).map(e=>({filename:e,contents:t[e]})),{filename:`xenon_test_c.h`,contents:r.cTest||``},...n.interactive?[{filename:`xenon_input_c.h`,contents:r.cInput||``}]:[]],s}if(e===`asm`){let e=(t[a]||``).replace(/\r\n/g,`
`),i=n.unit?A(n.unit.tests):``,o=!n.unit&&/^\s*_start\s*:/m.test(e)&&!/^\s*global\s+_start\b/m.test(e);return s.source=`${e}${e.endsWith(`
`)?``:`
`}${o?`%line 1+0 xenon
        global  _start
`:``}${i}${w(e+i,r.asmKit)}`,s.files=[],s.testsLine=+!!n.unit,s}if(e===`python`){let e={mode:n.unit?`unit`:n.syntaxOnly||!n.execute?`check`:`run`,entry:a,files:o,interactive:!!n.interactive,args:n.args||[],tests:`xenon_tests.py`};return s.source=`${r.python}\nimport json as _xenon_json\nmain(_xenon_json.loads(${JSON.stringify(JSON.stringify(e))}))\n`,s.files=Object.keys(t).map(e=>({filename:e,contents:t[e]})),n.unit&&s.files.push({filename:`xenon_tests.py`,contents:n.unit.tests}),s.alwaysExecute=!0,s}if(e===`lua`){let e={mode:n.unit?`unit`:n.syntaxOnly||!n.execute?`check`:`run`,entry:a,files:o,interactive:!!n.interactive,args:n.args||[],tests:`xenon_tests.lua`};return s.source=`${r.lua}\nxenon_main(${x(e)})\n`,s.files=Object.keys(t).map(e=>({filename:e,contents:t[e]})),n.unit&&s.files.push({filename:`xenon_tests.lua`,contents:n.unit.tests}),s.alwaysExecute=!0,s}if(e===`csharp`){let i={usings:[],tail:``};if(n.unit){i.usings.push(`global using static XenonKit;`);for(let e of o)for(let n of t[e].matchAll(/^(?:(?:public|internal|static|sealed|abstract|partial|readonly)\s+)*(?:class|struct|record(?:\s+(?:class|struct))?)\s+(?!(?:class|struct)\b)(\w+)(?!\w|\s*<)/gm))i.usings.push(`global using static ${n[1]};`);i.tail+=`#line hidden\nstatic class XenonTests { public static void Main() {\n#line 1 "the tests"\n${n.unit.tests}\n#line hidden\nXenonKit.Finish(); } }\n#line hidden\n${r.csharpKit}\n`}return n.interactive&&(i.tail+=`#line hidden\n${r.csharpInput}\n`),s.source=b(t,a,i),s.files=h(e,t),s}if(e===`java`){let i=o.map(e=>({filename:e,contents:v(t[e])}));if(n.unit)return s.source=`import java.util.*; import java.util.function.*; import java.util.stream.*; import java.io.*; import java.nio.file.*; import java.time.*; import java.util.concurrent.*; class XenonTests extends XenonKit { public static void main(String[] xenonArgs) { XenonKit.firstLine = 2;\n${n.unit.tests}\nfinish(); } }\n`,s.files=[...i,{filename:`XenonKit.java`,contents:r.javaKit},...h(e,t)],s.testsLine=1,s;let c=v(t[a]||``);if(n.interactive){let e=_(c);e&&(c=c.slice(0,e.open)+` static { XenonIn.install(); }`+c.slice(e.open))}return s.source=c,s.files=[...i.filter(e=>e.filename!==a),...n.interactive?[{filename:`XenonIn.java`,contents:r.javaInput}]:[],...h(e,t)],s}if(e===`rust`)return s.userArguments=`--edition 2024`,n.unit?(s.source=`${[`#![allow(dead_code, unused_imports, unused_variables, unused_mut, unused_macros)]`,`include!("xenon_kit.rs");`,`include!("${a}");`,`const XENON_FIRST_LINE: u32 = 6;`,`fn main() { xenon_kit::begin();`].join(`
`)}\n${n.unit.tests}\nxenon_kit::finish(); }\n`,s.files=[...Object.keys(t).map(e=>({filename:e,contents:t[e]})),{filename:`xenon_kit.rs`,contents:r.rustKit}],s.testsLine=5,s):(s.source=t[a]||``,s.files=Object.keys(t).filter(e=>e!==a).map(e=>({filename:e,contents:t[e]})),s);throw Error(`The website cannot build ${e} yet.`)}var M=e=>String(e||``).replace(/\u001b\[[0-9;]*[A-Za-z]/g,``);function N(e,t,n){let r=M(t).replace(/\r\n/g,`
`).replace(/\/app\//g,``).replace(/[A-Za-z]:\\[^\s():]*?compiler-explorer-compiler[^\\\s]*\\/g,``),i=n.testsLine?`the tests`:n.entry;return r=r.replace(/\bexample\.(java|rs|cs|py|c|asm)\b/g,i).replace(/<source>/g,i).replace(/\boutput\.s\b/g,i).replace(/\bthe-tests\b/g,`the tests`),e===`asm`&&(r=r.replace(/^\/usr\/bin\/ld: warning: cannot find entry symbol _start.*$/m,`ld: the program has no _start label, so it starts at the first instruction`).replace(/^Compiler did not produce an executable\s*$/m,``)),e===`c`&&(r=r.replace(/^In file included from [^\n]*\n/gm,``).replace(/^\s*\|\s*$/gm,``)),e===`lua`&&(r=r.replace(/(^|[\s'"(<])\.\/([\w-]+(?:\/[\w-]+)*\.lua)/gm,`$1$2`)),e===`csharp`&&(r=r.replace(/^Program terminated with signal SIGABRT \(6\)\s*$/m,``).replace(/^.*warning CS(0105|8933|8019|7022).*$\n?/gm,``).replace(/^.*error CS8805.*$\n?/gm,``)),e===`rust`&&(r=r.replace(/^note: run with `RUST_BACKTRACE=1`.*$\n?/gm,``)),r.replace(/\n{3,}/g,`

`).trim()}function P(e,t){return e.testsLine&&t.file===`the tests`&&(t.line=Math.max(1,t.line-e.testsLine)),t}function F(e,t,n){let r=[],i=String(t||``).split(`
`),a=e=>/warn/.test(e)?`warning`:/note|help/.test(e)?`note`:`error`;for(let t=0;t<i.length;t++){let o=i[t],s;if(e===`python`||e===`lua`)s=/^(.+?):(\d+):(\d+): error: (.*)$/.exec(o),s&&r.push({file:s[1],line:+s[2],col:+s[3],severity:`error`,code:``,message:s[4]});else if(e===`csharp`)s=/^(.*?)\((\d+),(\d+)\):\s*(error|warning)\s+(CS\d+):\s*(.*?)(?:\s*\[.*\.csproj\])?$/.exec(o),s&&r.push({file:s[1].split(`/`).pop(),line:+s[2],col:+s[3],severity:a(s[4]),code:s[5],message:s[6]});else if(e===`java`){if(s=/^(.*?):(\d+):\s*(error|warning):\s*(.*)$/.exec(o),s){let e=1;i[t+2]!==void 0&&/^\s*\^\s*$/.test(i[t+2])&&(e=i[t+2].indexOf(`^`)+1),r.push(P(n,{file:s[1].split(`/`).pop(),line:+s[2],col:e,severity:a(s[3]),code:``,message:s[4]}))}}else if(e===`c`)s=/^(.*?):(\d+):(?:(\d+):)?\s*(fatal error|error|warning|note):\s*(.*)$/.exec(o),s?r.push({file:s[1].split(`/`).pop(),line:+s[2],col:s[3]?+s[3]:1,severity:a(s[4]),code:``,message:s[5]}):(s=/undefined reference to [`'](.+?)'/.exec(o))&&r.push({file:`linker`,line:0,col:0,severity:`error`,code:`LD`,message:`undefined reference to '${s[1]}': a function was declared but never written, or its name is misspelled`});else if(e===`asm`)s=/^(.*?):(\d+):\s*(fatal|error|warning):\s*(.*)$/.exec(o),s?r.push({file:s[1].split(`/`).pop(),line:+s[2],col:1,severity:a(s[3]),code:``,message:s[4].replace(/\s*\[-w\+[\w-]+\]$/,``)}):(s=/undefined reference to [`'](.+?)'/.exec(o))&&r.push({file:`linker`,line:0,col:0,severity:`error`,code:`LD`,message:`undefined reference to '${s[1]}': there is no label called ${s[1]}`});else if(e===`rust`&&(s=/^(error|warning)(?:\[(E\d+)\])?:\s*(.*)$/.exec(o),s&&!/^(aborting due to|could not compile|\d+ warnings? emitted|function `main` is never used)/.test(s[3]))){let e=/-->\s*(.*?):(\d+):(\d+)/.exec(i[t+1]||``);e?r.push(P(n,{file:e[1].split(`/`).pop(),line:+e[2],col:+e[3],severity:a(s[1]),code:s[2]||``,message:s[3]})):s[1]===`error`&&!/^(aborting|could not)/.test(s[3])&&r.push({file:n.entry,line:0,col:0,severity:`error`,code:s[2]||``,message:s[3]})}}return r}function I(e){let t=e.indexOf(r);return t<0?null:e.slice(t+16).trim()}function L(e,t,n){let r=String(n||``);if(e===`python`){let e=/(\w+(?:Error|Exception|Interrupt|Exit)):?\s*(.*)\s*$/.exec(r.trim().split(`
`).pop()||``);if(e)return z(e[1],e[2])}if(e===`csharp`){let e=/Unhandled exception\.\s*([\w.]+):\s*(.*)/.exec(r);if(e)return`The program stopped with an exception nothing caught: ${e[1].split(`.`).pop()} (${e[2].trim()}). The lines under it say where.`}if(e===`java`){let e=/Exception in thread "main" ([\w.$]+)(?::\s*(.*))?/.exec(r);if(e)return`The program stopped with an exception nothing caught: ${e[1].split(`.`).pop()}${e[2]?` (${e[2].trim()})`:``}. The "at" lines under it say where, newest call first.`}if(e===`rust`){let e=/panicked at (.*?):\s*\n?(.*)/.exec(r);if(e)return`The program panicked (stopped on purpose because something was wrong): ${e[2].trim()} at ${e[1]}.`;if(t===101)return`The program panicked. The message above says why and where.`}if(e===`lua`){let e=/^lua: (?:([\w./-]+\.lua|the tests):(\d+): )?(.*)$/m.exec(r);if(e)return R(e[3],e[1],e[2])}if(e===`c`||e===`asm`){if(t===139||/segmentation fault/i.test(r))return`The program crashed: it read or wrote memory it may not touch (a bad pointer or address, or past the end of an array).`;if(t===136)return`The program crashed: a whole number was divided by zero.`;if(t===134)return`The program stopped: abort() was called, often by a failed assert.`}return t===0?null:`The program ended with exit code ${t}.`}function R(e,t,n){let r=t?` at ${t} line ${n}`:``,i=[[/attempt to index a nil value(?: \((\w+) '([^']+)'\))?/,e=>`something was used as a table but is nil${e[2]?` (${e[1]} '${e[2]}')`:``}: a name that was never set, a misspelled field, or a function that returned nothing`],[/attempt to call a nil value(?: \((\w+) '([^']+)'\))?/,e=>`a function was called that does not exist${e[2]?` (${e[1]} '${e[2]}')`:``}: a typo, or it is defined further down than where it is used`],[/attempt to perform arithmetic on a (\w+) value/,e=>`maths was done with a ${e[1]} value, where a number was needed`],[/attempt to concatenate a (\w+) value/,e=>`.. joined a ${e[1]} value onto text; only strings and numbers can be joined (use tostring)`],[/attempt to compare/,()=>`two values that cannot be compared were compared with < or >, such as a number and a string`],[/stack overflow/,()=>`a function called itself too many times without stopping`],[/bad argument #(\d+) to '([^']+)'/,e=>`${e[2]} was given an unusable argument (number ${e[1]})`]];for(let[t,n]of i){let i=t.exec(e);if(i)return`The program stopped with an error${r}: ${n(i)}. The traceback under it shows the calls that led there, newest first.`}return`The program stopped with an error${r}: ${e.trim()}. The traceback under it shows the calls that led there, newest first.`}function z(e,t){let n={NameError:`a name was used that does not exist (a typo, or a variable used before it was made)`,TypeError:`a value of the wrong type was used, such as adding text to a number`,ValueError:`a value had the right type but an unusable content, such as int("abc")`,IndexError:`an index was past the end of a list or string`,KeyError:`a dictionary was asked for a key it does not have`,ZeroDivisionError:`a number was divided by zero`,AttributeError:`something was asked for an attribute or method it does not have`,EOFError:`the program asked for input and there was none left`,RecursionError:`a function called itself too many times without stopping`,FileNotFoundError:`a file was opened that does not exist`,ModuleNotFoundError:`an import named a module that is not installed here`,IndentationError:`the indentation of a line is wrong`}[e];return`The program stopped with ${e}${n?`: ${n}`:``}${t?` (${t.trim()})`:``}. The traceback above shows the line, last call at the bottom.`}export{L as a,c,t as d,j as f,N as h,f as i,o as l,d as m,n,F as o,I as p,p as r,l as s,i as t,s as u};