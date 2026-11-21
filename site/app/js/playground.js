import{keyText as A,S as w,api as f,h as s,icon as S,clear as K,toast as b,modal as cn,ask as G,confirmBox as X,bus as dn,navigate as R}from"./core.js?v=76261f86cd77";import{createIDE as un,popupMenu as pn}from"./ide.js?v=76261f86cd77";import{LANGS as J,REMOTE as U,langOfFiles as mn,entryOf as fn}from"./local/langs.js?v=76261f86cd77";import{STARTERS as v}from"./langsense.js?v=76261f86cd77";import{restyleFiles as Y}from"./codestyle.js?v=76261f86cd77";import{prefs as I}from"./prefs.js?v=76261f86cd77";import{desktop as E}from"./desktop.js?v=76261f86cd77";import{toolchainFor as hn}from"./local/compiler.js?v=76261f86cd77";const D=`#include <iostream>

int main()
{
    std::cout << "Hello, world!\\n";
    return 0;
}
`,C=[{id:"hello",title:"Hello, world",about:"The smallest complete program.",files:{"main.cpp":D}},{id:"input",title:"Ask and answer",about:"Reads two numbers and prints their sum.",files:{"main.cpp":`#include <iostream>

int main()
{
    std::cout << "Enter two whole numbers: ";
    int a{};
    int b{};
    std::cin >> a >> b;

    std::cout << a << " + " << b << " = " << a + b << '\\n';
    return 0;
}
`}},{id:"vector",title:"Loop over a vector",about:"A list of scores and their average.",files:{"main.cpp":`#include <iostream>
#include <vector>

int main()
{
    std::vector<int> scores{ 90, 72, 85, 64 };

    int total{ 0 };
    for (int score : scores)
    {
        total += score;
    }

    std::cout << "Average: " << static_cast<double>(total) / scores.size() << '\\n';
    return 0;
}
`}},{id:"class",title:"A class in three files",about:"A header, its source file and a main: the shape of every real C++ project.",files:{"main.cpp":`#include "counter.h"

#include <iostream>

int main()
{
    Counter clicks{ "clicks" };
    clicks.add();
    clicks.add(4);

    std::cout << clicks.name() << ": " << clicks.count() << '\\n';
    return 0;
}
`,"counter.h":`#pragma once

#include <string>

// Counts things, and remembers what it is counting.
class Counter
{
public:
    explicit Counter(std::string name);

    void add(int amount = 1);
    int count() const;
    const std::string& name() const;

private:
    std::string m_name;
    int m_count{ 0 };
};
`,"counter.cpp":`#include "counter.h"

#include <utility>

Counter::Counter(std::string name)
    : m_name{ std::move(name) }
{
}

void Counter::add(int amount)
{
    m_count += amount;
}

int Counter::count() const
{
    return m_count;
}

const std::string& Counter::name() const
{
    return m_name;
}
`}},{id:"library",title:"A small library",about:"Free functions in a namespace, declared in a header and used from main.",files:{"main.cpp":`#include "mathx.h"

#include <iostream>

int main()
{
    std::cout << "5! = " << mathx::factorial(5) << '\\n';
    std::cout << "17 prime? " << std::boolalpha << mathx::isPrime(17) << '\\n';
    std::cout << "gcd(84, 36) = " << mathx::gcd(84, 36) << '\\n';
    return 0;
}
`,"mathx.h":`#pragma once

namespace mathx
{
    // n * (n-1) * ... * 1. Returns 1 for 0.
    long long factorial(int n);

    // True when n has no divisors other than 1 and itself.
    bool isPrime(int n);

    // The largest number that divides both a and b.
    int gcd(int a, int b);
}
`,"mathx.cpp":`#include "mathx.h"

namespace mathx
{
    long long factorial(int n)
    {
        long long result{ 1 };
        for (int i{ 2 }; i <= n; ++i)
        {
            result *= i;
        }
        return result;
    }

    bool isPrime(int n)
    {
        if (n < 2)
        {
            return false;
        }
        for (int d{ 2 }; d * d <= n; ++d)
        {
            if (n % d == 0)
            {
                return false;
            }
        }
        return true;
    }

    int gcd(int a, int b)
    {
        while (b != 0)
        {
            const int rest{ a % b };
            a = b;
            b = rest;
        }
        return a;
    }
}
`}},{id:"files",title:"Read and write a file",about:"Reads names from a text file next to the code and writes a report.",files:{"main.cpp":`#include <fstream>
#include <iostream>
#include <string>
#include <vector>

int main()
{
    std::ifstream in{ "names.txt" };
    if (!in)
    {
        std::cerr << "Could not open names.txt\\n";
        return 1;
    }

    std::vector<std::string> names;
    for (std::string line; std::getline(in, line);)
    {
        if (!line.empty())
        {
            names.push_back(line);
        }
    }

    std::ofstream out{ "report.txt" };
    out << names.size() << " names\\n";
    for (const auto& name : names)
    {
        out << name << " has " << name.size() << " letters\\n";
    }

    std::cout << "Wrote report.txt. It appears in the explorer on the left.\\n";
    return 0;
}
`,"names.txt":`Ada
Grace
Bjarne
Barbara
`}},{id:"tests",title:"Function with its own tests",about:"A tiny test helper, so you can check a function as you write it.",files:{"main.cpp":`#include "check.h"

#include <string>

// The function under test. Change it and run again.
std::string shout(const std::string& text)
{
    std::string result;
    for (char c : text)
    {
        result += static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
    }
    return result + "!";
}

int main()
{
    CHECK(shout("hi") == "HI!");
    CHECK(shout("") == "!");
    CHECK(shout("Mixed Case") == "MIXED CASE!");
    return report();
}
`,"check.h":`#pragma once

#include <cctype>
#include <iostream>

inline int g_passed{ 0 };
inline int g_failed{ 0 };

// Counts a passing check, or prints where a failing one is.
#define CHECK(condition) \\
    do { \\
        if (condition) { ++g_passed; } \\
        else { ++g_failed; std::cout << "FAILED line " << __LINE__ << ": " << #condition << '\\n'; } \\
    } while (false)

inline int report()
{
    std::cout << g_passed << " passed, " << g_failed << " failed\\n";
    return g_failed == 0 ? 0 : 1;
}
`}},{id:"guess",title:"Guess the number",about:"A small game: a random number, a loop, and input that is checked.",files:{"main.cpp":`#include <iostream>
#include <limits>
#include <random>

int main()
{
    std::mt19937 rng{ std::random_device{}() };
    std::uniform_int_distribution<int> pick{ 1, 100 };
    const int secret{ pick(rng) };

    std::cout << "I am thinking of a number from 1 to 100.\\n";

    for (int tries{ 1 };; ++tries)
    {
        std::cout << "Your guess: ";
        int guess{};
        if (!(std::cin >> guess))
        {
            if (std::cin.eof())
            {
                std::cout << "\\nIt was " << secret << ".\\n";
                return 0;
            }
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
            std::cout << "Whole numbers only.\\n";
            --tries;
            continue;
        }

        if (guess < secret)
        {
            std::cout << "Higher.\\n";
        }
        else if (guess > secret)
        {
            std::cout << "Lower.\\n";
        }
        else
        {
            std::cout << "Got it in " << tries << (tries == 1 ? " try!\\n" : " tries.\\n");
            return 0;
        }
    }
}
`}},{id:"scores",title:"Sort a leaderboard",about:"A struct, a vector of them, and sorting by a rule of your own.",files:{"main.cpp":`#include <algorithm>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

struct Player
{
    std::string name;
    int score{ 0 };
    int level{ 1 };
};

int main()
{
    std::vector<Player> players{
        { "Rook", 4200, 7 },
        { "Ada", 9150, 12 },
        { "Lin", 4200, 9 },
        { "Sol", 780, 2 },
    };

    // Highest score first; equal scores go by level, then by name.
    std::ranges::sort(players, [](const Player& a, const Player& b) {
        if (a.score != b.score) return a.score > b.score;
        if (a.level != b.level) return a.level > b.level;
        return a.name < b.name;
    });

    int place{ 1 };
    for (const Player& p : players)
    {
        std::cout << place++ << ". " << std::left << std::setw(8) << p.name
                  << std::right << std::setw(6) << p.score << "  (level " << p.level << ")\\n";
    }
    return 0;
}
`}},{id:"timing",title:"Measure speed",about:"Times a piece of code. Switch the build to Release (status bar) for honest numbers.",files:{"main.cpp":`#include <chrono>
#include <iostream>
#include <numeric>
#include <vector>

int main()
{
    std::vector<long long> values(5'000'000);
    std::iota(values.begin(), values.end(), 1);

    const auto start{ std::chrono::steady_clock::now() };

    long long total{ 0 };
    for (long long v : values)
    {
        total += v % 7;
    }

    const auto elapsed{ std::chrono::steady_clock::now() - start };
    std::cout << "total = " << total << '\\n';
    std::cout << std::chrono::duration_cast<std::chrono::microseconds>(elapsed).count() / 1000.0 << " ms\\n";
    return 0;
}
`}},...gn()];function gn(){const n=(i,t,p,o,c)=>({id:`${i}-${t}`,lang:i,title:p,about:o,files:c});return[n("c","hello","Hello, world","The smallest complete program.",{"main.c":v.c.text}),n("c","ask","Ask and answer","Read two numbers with scanf.",{"main.c":`#include <stdio.h>

int main(void)
{
    int a = 0, b = 0;
    printf("Two whole numbers: ");
    if (scanf("%d %d", &a, &b) != 2) {
        printf("Those were not two numbers.\\n");
        return 1;
    }
    printf("%d + %d = %d\\n", a, b, a + b);
    return 0;
}
`}),n("asm","hello","Hello, world","Print with a system call, then exit.",{"main.asm":v.asm.text}),n("asm","sum","Add two numbers","Read two numbers and print their sum, with Xenon's input and output routines.",{"main.asm":`        global  _start
        section .text
_start:
        call    read_int        ; the first number, in rax
        mov     rbx, rax
        call    read_int        ; the second
        add     rax, rbx
        mov     rdi, rax
        call    print_int
        call    print_newline

        mov     eax, 60         ; exit(0)
        xor     edi, edi
        syscall
`}),n("python","hello","Hello, world","The smallest complete program.",{"main.py":v.python.text}),n("python","ask","Ask and answer","Read two numbers and work with them.",{"main.py":`a = int(input("First number: "))
b = int(input("Second number: "))

print(f"{a} + {b} = {a + b}")
print(f"{a} * {b} = {a * b}")
`}),n("python","modules","Two files","A program split over two modules.",{"main.py":`from shapes import area_of_circle

for r in [1, 2, 3]:
    print(f"r = {r}: area = {area_of_circle(r):.2f}")
`,"shapes.py":`import math


def area_of_circle(radius):
    return math.pi * radius ** 2
`}),n("python","words","Word counter","Read a file and count its words.",{"main.py":`from collections import Counter

with open("poem.txt") as f:
    words = f.read().lower().split()

for word, n in Counter(words).most_common(5):
    print(f"{word:>8} {n}")
`,"poem.txt":`the stone on the stone
the trail goes up
and the stone stays
`}),n("lua","hello","Hello, world","The smallest complete program.",{"main.lua":v.lua.text}),n("lua","ask","Ask and answer","Read two numbers with io.read.",{"main.lua":`io.write("First number: ")
local a = io.read("n")
io.write("Second number: ")
local b = io.read("n")

if not a or not b then
    print("Those were not two numbers.")
else
    print(a .. " + " .. b .. " = " .. a + b)
end
`}),n("lua","modules","Two files","A module in its own file, loaded with require.",{"main.lua":`local shapes = require("shapes")

for r = 1, 3 do
    print(string.format("r = %d: area = %.2f", r, shapes.circle_area(r)))
end
`,"shapes.lua":`local shapes = {}

function shapes.circle_area(radius)
    return math.pi * radius ^ 2
end

return shapes
`}),n("javascript","hello","Hello, world","The smallest complete program.",{"main.js":v.javascript.text}),n("javascript","ask","Ask and answer","Read input with prompt().",{"main.js":'const name = prompt("What is your name?");\nconst year = Number(prompt("What year were you born?"));\n\nconsole.log(`Hello, ${name}! You turn ${new Date().getFullYear() - year} this year.`);\n'}),n("javascript","modules","Two modules","import and export between files.",{"main.js":`import { shout, whisper } from "./voice.js";

console.log(shout("hello"));
console.log(whisper("HELLO"));
`,"voice.js":`export function shout(text) {
  return text.toUpperCase() + "!";
}

export function whisper(text) {
  return text.toLowerCase() + "...";
}
`}),n("typescript","hello","Hello, world","TypeScript: JavaScript with types.",{"main.ts":v.typescript.text}),n("typescript","shapes","Typed shapes","Interfaces and a union type.",{"main.ts":`type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "rect": return s.width * s.height;
  }
}

const shapes: Shape[] = [{ kind: "circle", radius: 1 }, { kind: "rect", width: 2, height: 3 }];
for (const s of shapes) console.log(s.kind, area(s).toFixed(2));
`}),n("csharp","hello","Hello, world","The smallest complete program.",{"Program.cs":v.csharp.text}),n("csharp","ask","Ask and answer","Read two numbers and work with them.",{"Program.cs":`Console.Write("First number: ");
int a = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Second number: ");
int b = int.Parse(Console.ReadLine() ?? "0");

Console.WriteLine($"{a} + {b} = {a + b}");
`}),n("csharp","classes","Two files","A class in its own file.",{"Program.cs":`var account = new Account("Ada", 100m);
account.Deposit(25m);
Console.WriteLine(account);
`,"Account.cs":`public class Account
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    public Account(string owner, decimal balance)
    {
        Owner = owner;
        Balance = balance;
    }

    public void Deposit(decimal amount) => Balance += amount;

    public override string ToString() => $"{Owner}: {Balance:0.00}";
}
`}),n("java","hello","Hello, world","The smallest complete program.",{"Main.java":v.java.text}),n("java","ask","Ask and answer","Read input with a Scanner.",{"Main.java":`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("First number: ");
        int a = in.nextInt();
        System.out.print("Second number: ");
        int b = in.nextInt();
        System.out.println(a + " + " + b + " = " + (a + b));
    }
}
`}),n("java","classes","Two classes","A class in its own file.",{"Main.java":`public class Main {
    public static void main(String[] args) {
        Counter clicks = new Counter("clicks");
        clicks.add();
        clicks.add();
        System.out.println(clicks);
    }
}
`,"Counter.java":`public class Counter {
    private final String name;
    private int count = 0;

    public Counter(String name) {
        this.name = name;
    }

    public void add() {
        count++;
    }

    @Override
    public String toString() {
        return name + ": " + count;
    }
}
`}),n("rust","hello","Hello, world","The smallest complete program.",{"main.rs":v.rust.text}),n("rust","ask","Ask and answer","Read a line and parse a number.",{"main.rs":`use std::io;

fn main() {
    println!("How many stars?");
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("could not read input");
    let n: u32 = line.trim().parse().expect("not a number");
    for i in (1..=n).rev() {
        println!("{}", "o".repeat(i as usize));
    }
}
`}),n("rust","modules","Two modules","A module in its own file.",{"main.rs":`mod geometry;

use geometry::Rect;

fn main() {
    let r = Rect { w: 3.0, h: 4.0 };
    println!("{:?} has area {}", r, r.area());
}
`,"geometry.rs":`#[derive(Debug)]
pub struct Rect {
    pub w: f64,
    pub h: f64,
}

impl Rect {
    pub fn area(&self) -> f64 {
        self.w * self.h
    }
}
`})]}const Z=/^[A-Za-z0-9_][A-Za-z0-9_.-]{0,40}$/,q="xenon.pg.files",j=()=>{try{const n=JSON.parse(localStorage.getItem(q));return n&&typeof n=="object"?n:{}}catch{return{}}};function $(n,i){const t=j();i&&Object.keys(i).length?t[n]=i:delete t[n];try{localStorage.setItem(q,JSON.stringify(t))}catch{}}const L=()=>E&&E.bridge&&E.bridge.files||null,V=n=>String(n||"").replace(/[^A-Za-z0-9_.-]+/g,"_").replace(/^[._-]+/,"").slice(0,60)||"file.txt";async function Q(n){if(!n||!w.user)return;for(const o of(n.problems||[]).slice(0,3))b(String(o),"bad");const i=(n.files||[]).filter(o=>o&&typeof o.text=="string"&&o.text.length<=6e5).slice(0,20);if(!i.length)return;const t={},p={};for(const o of i){let c=V(o.name);for(;t[c]!==void 0;)c=c.replace(/(\.[^.]*)?$/,"_2$1");t[c]=o.text,o.id&&(p[c]=String(o.id))}try{const o=(await f("/api/workspaces")).workspaces.map(r=>r.name),c=j(),a=Object.values(p).sort().join();let m=a?o.find(r=>c[r]&&Object.values(c[r]).sort().join()===a):null;if(await window.cairnFlush(),m){const r=(await f(`/api/code?course=playground&key=${encodeURIComponent(m)}`)).files||{};Object.keys(t).some(y=>r[y]!==t[y])&&(await f("/api/history/save",{course:"playground",key:m,files:r,label:"before opening the file again"}).catch(()=>{}),await f("/api/code/save",{course:"playground",key:m,files:{...r,...t}}))}else{const r=V(i[0].name).replace(/\.[^.]*$/,"").slice(0,34)||"opened";m=r;for(let y=2;o.some(d=>d.toLowerCase()===m.toLowerCase());y++)m=`${r}-${y}`;await f("/api/workspace/create",{name:m,files:t})}$(m,p),b(i.length===1?`Opened ${i[0].name}`:`Opened ${i.length} files`,"good");const g=`/playground/${m}`;location.hash==="#"+g?window.dispatchEvent(new HashChangeEvent("hashchange")):R(g)}catch(o){b(o.message||"The file could not be opened.","bad")}}async function nn(n){const i={files:[],problems:[]};for(const t of[...n].slice(0,20)){if(t.size>6e5){i.problems.push(`${t.name} is too large to open here.`);continue}const p=await t.text().catch(()=>null);p===null||p.slice(0,8e3).includes("\0")?i.problems.push(`${t.name} is not a text file.`):i.files.push({name:t.name,text:p.replace(/^\uFEFF/,"").replace(/\r\n/g,`
`)})}return i}function en(){if(L()){E.bridge.do("open-file");return}const n=s("input",{type:"file",multiple:!0,style:{display:"none"}});n.onchange=async()=>{Q(await nn(n.files)),n.remove()},document.body.append(n),n.click()}function An(){const n=o=>!!o.dataTransfer&&[...o.dataTransfer.types].includes("Files"),i=document.documentElement;let t=null;const p=()=>{clearTimeout(t),i.classList.remove("dropping")};window.addEventListener("dragover",o=>{!n(o)||!w.user||(o.preventDefault(),o.dataTransfer.dropEffect="copy",i.classList.add("dropping"),clearTimeout(t),t=setTimeout(p,250))},!0),window.addEventListener("drop",async o=>{if(!n(o)||!w.user)return;o.preventDefault(),o.stopPropagation(),p();const c=[...o.dataTransfer.files];Q(L()?await L().dropped(c):await nn(c))},!0)}const M="cairn.pg.last",wn=()=>I.get(M,null),bn=n=>I.set(M,n);function N(n,i){return n?Z.test(n)?i.some(t=>t.toLowerCase()===n.toLowerCase())?"A project with that name already exists.":"":"Use letters, digits, _ . and - only, with no spaces (for example  text-adventure).":"Give the project a name."}function tn(){const n=w.catalog.find(t=>t.id===w.progress.lastCourse),i=n&&n.language;return i&&C.some(t=>(t.lang||"cpp")===i)?i:"cpp"}function yn(n){let i=tn(),t=C.find(d=>(d.lang||"cpp")===i)||C[0];const p=s("div.seg.lang-pick"),o=d=>d.lang||"cpp",c=s("input",{type:"text",placeholder:"project-name",spellcheck:"false",style:{width:"100%"}}),a=s("div",{style:{color:"var(--bad)",fontSize:"12.5px",minHeight:"18px",margin:"6px 0 4px"}}),m=s("div.tpl-grid"),g=()=>{K(m),K(p);for(const d of["cpp","c","asm","python","lua","javascript","typescript","csharp","java","rust"])p.append(s(`button${d===i?".on":""}`,{type:"button",onclick:()=>{i=d,t=C.find(h=>o(h)===d),g()}},J[d].name));for(const d of C.filter(h=>o(h)===i)){const h=Object.keys(d.files);m.append(s(`button.tpl${d===t?".on":""}`,{onclick:()=>{t=d,g(),c.value.trim()||c.focus()}},s("b",d.title),s("span",d.about),s("small",h.length===1?h[0]:`${h.length} files: ${h.join(", ")}`)))}};g();const r=s("div",s("div.cap-label","Name"),c,a,s("div.cap-label","Language"),p,s("div.cap-label","Start from"),m);return(async()=>{for(;;){const d=cn({title:"New project",body:r,actions:[{label:"Cancel",value:!1},{label:"Create",value:!0,kind:"primary"}],submit:c,wide:!0});if(setTimeout(()=>c.focus(),0),!await d)return null;const h=c.value.trim(),_=N(h,n);if(!_)return{name:h,template:t};a.textContent=_}})()}async function Rn(n){let{workspaces:i}=await f("/api/workspaces");const t=()=>i.map(e=>e.name),p=sessionStorage.getItem("cairn.playground.incoming");let o="main.cpp",c=p;try{const e=JSON.parse(p);e&&e.text&&(c=e.text,o=e.file||"main.cpp")}catch{}sessionStorage.removeItem("cairn.playground.incoming");let a=n&&Z.test(n)?n:null;if(c)if(a="lesson-example",t().includes(a)){const e=(await f(`/api/code?course=playground&key=${a}`)).files||{};await f("/api/history/save",{course:"playground",key:a,files:e,label:"before a new lesson example"}).catch(()=>{}),await f("/api/code/save",{course:"playground",key:a,files:{[o]:c},remove:Object.keys(e).filter(l=>l!==o)})}else({workspaces:i}=await f("/api/workspace/create",{name:a,files:{[o]:c}}));if(!a||!t().includes(a)){const e=wn();a=t().includes(e)?e:t()[0]||null}if(!a){a="scratch";const e=C.find(l=>(l.lang||"cpp")===tn());({workspaces:i}=await f("/api/workspace/create",{name:a,files:Y(e?{...e.files}:{"main.cpp":D},w.settings.braceStyle)}))}bn(a);const m=(await f(`/api/code?course=playground&key=${encodeURIComponent(a)}`)).files||{"main.cpp":D},g=mn(m),r=await un({id:`pg-${a}`,course:"playground",key:a,files:m,entry:fn(g,m),kind:"playground",explorer:"open",lessonCourse:"cpp"}),y=hn(g,w.settings.compiler);g!=="cpp"?r.console.showMessage(`Anything goes here. This is a ${J[g].name} project: ${U[g].local?"it runs right here in your browser":y.here?`${y.name} runs it on this computer`:`${U[g].name} runs it on Compiler Explorer`}.
Press Run (${A("Ctrl+Enter")}), and type below when your program asks for input.
`):w.toolchain&&w.toolchain.active&&r.console.showMessage(`Anything goes here. ${w.toolchain.activeName} builds every .cpp file in the project.
Press Run (${A("Ctrl+Enter")}), and type below when your program asks for input.
`);const d=async()=>{await r.saveNow()},h=async e=>{await d(),R(`/playground/${e}`)};async function _(){const e=await yn(t());if(e){try{await f("/api/workspace/create",{name:e.name,files:Y(e.template.files,w.settings.braceStyle)})}catch(l){return b(l.message,"bad")}await h(e.name)}}async function an(){const e=await G({title:"Rename project",value:a,ok:"Rename",check:l=>l===a?"":N(l,t())});if(!(!e||e===a)){await d();try{await f("/api/workspace/rename",{from:a,to:e})}catch(l){return b(l.message,"bad")}$(e,j()[a]),$(a,null),R(`/playground/${e}`)}}async function on(){if(await X(`Delete the project "${a}"?`,"Its files are moved to the trash folder inside Xenon's data folder, so a mistake can be undone by hand.","Delete")){await d();try{await f("/api/workspace/delete",{name:a})}catch(l){return b(l.message,"bad")}$(a,null),I.set(M,null),R("/playground"),location.hash==="#/playground"&&window.dispatchEvent(new HashChangeEvent("hashchange"))}}async function sn(){const e=await G({title:"Copy project",hint:"A copy of every file, under a new name.",value:`${a}-copy`.slice(0,40),ok:"Copy",check:l=>N(l,t())});if(e){try{await f("/api/workspace/create",{name:e,files:r.getFiles()})}catch(l){return b(l.message,"bad")}await h(e)}}const x=L(),T=()=>Object.entries(j()[a]||{}).filter(([e])=>r.getFiles()[e]!==void 0),O=s("span.pg-disk-note"),F=s("button.btn.small.pg-disk",{onclick:()=>W(!1)},S("save"),s("span","Save to disk")),B=()=>{const e=x?T():[];F.hidden=O.hidden=!e.length,F.title=e.length?`Write ${e.map(([l])=>l).join(", ")} back to the computer. ${A("Ctrl+S")} does this too.`:""};async function W(e){const l=r.getFiles();let u=0;for(const[P,z]of T()){let k=await x.write(z,l[P],!1).catch(()=>null);if(k&&k.changed){if(!await X(`${k.name} was changed outside Xenon`,"Another program saved a different version of this file since Xenon last read it. Saving now replaces that version with what is in the editor.","Save anyway"))continue;k=await x.write(z,l[P],!0).catch(()=>null)}k&&k.ok?u++:b(k&&k.error||`${P} could not be saved.`,"bad")}u&&(O.textContent=`on disk ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`,e||b(u===1?`Saved ${T()[0][0]} to this computer`:`Saved ${u} files to this computer`,"good"))}async function rn(){const e=r.active(),l=r.getFiles()[e];if(l===void 0)return;const u=await x.saveAs(e.split("/").pop(),l).catch(()=>null);if(u){if(u.error)return b(u.error,"bad");$(a,{...j()[a]||{},[e]:u.id}),B(),b(`Saved ${u.name}. Save to disk keeps it up to date from now on.`,"good")}}B(),x&&r.el.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&!e.altKey&&e.key.toLowerCase()==="s"&&T().length&&setTimeout(()=>W(!0),450)},!0);const H=s("button.btn.small.pg-switch",{title:"Switch project"},S("folder"),s("span",a),S("down"));H.onclick=()=>{const e=H.getBoundingClientRect(),l=u=>u.modified?new Date(u.modified).toLocaleDateString(void 0,{month:"short",day:"numeric"}):"";pn(e.left,e.bottom+4,[...i.map(u=>({label:u.name,checked:u.name===a,icon:"folder",keys:`${u.files} ${u.files===1?"file":"files"}  ${l(u)}`,run:()=>{u.name!==a&&h(u.name)}})),"-",{label:"New project\u2026",icon:"plus",run:_},{label:"Open a file from this computer\u2026",icon:"folderOpen",run:en},...x?[{label:`Save ${r.active().split("/").pop()} to this computer\u2026`,icon:"download",run:rn}]:[],{label:"Copy this project\u2026",icon:"copy",run:sn},{label:"Rename this project\u2026",icon:"edit",run:an},{label:"Delete this project",icon:"trash",danger:!0,run:on}])};const ln=s("div.wb-top",s("button.icon-btn.nav-toggle",{title:A("Show or hide the sidebar (Ctrl+B)"),onclick:()=>dn.emit("sidebar")},S("menu")),s("div.wb-name",{style:{minWidth:0}},s("div.title","Playground")),H,s("button.btn.small",{title:"Start a new project, empty or from an example",onclick:_},S("plus"),s("span","New project")),s("button.btn.small",{title:"Open a file from this computer. Dropping one on the window does the same.",onclick:en},S("folderOpen"),s("span","Open file")),F,O,s("div.spacer"));return{el:s("div.wb.pg",ln,s("div.wb-body.solo",r.el)),flush:!0,title:`${a} \xB7 Playground`,cleanup:()=>r.dispose()}}export{C as TEMPLATES,An as installFileDrop,Q as openFiles,en as pickFiles,Rn as playgroundView};
