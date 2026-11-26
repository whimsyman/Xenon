import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{n as t,t as n}from"./jsx-runtime-C3cWAN_r.js";import{t as r}from"./react-dom-BwXff0Px.js";import{t as i}from"./client-DpKdPNpi.js";import{i as a,l as o,n as s,t as c}from"./legacy-BcMt7MJS.js";import{t as l}from"./ide-f6q_5eWa.js";import{d as u}from"./langs-CDfqxk0q.js";import{n as d}from"./compiler-CCLtrnLb.js";import{n as f}from"./codestyle-ChPeKBTF.js";import{n as p}from"./prefs-BIoPDKUc.js";import{t as m}from"./files-Iz_Xn9ZL.js";import"./core-tR043Pwz.js";import{t as h}from"./langsense-BBYf32f2.js";var g=e(t()),_=e(r()),v=i(),y=[{id:`hello`,title:`Hello, world`,about:`The smallest complete program.`,files:{"main.cpp":`#include <iostream>

int main()
{
    std::cout << "Hello, world!\\n";
    return 0;
}
`}},{id:`input`,title:`Ask and answer`,about:`Reads two numbers and prints their sum.`,files:{"main.cpp":`#include <iostream>

int main()
{
    std::cout << "Enter two whole numbers: ";
    int a{};
    int b{};
    std::cin >> a >> b;

    std::cout << a << " + " << b << " = " << a + b << '\\n';
    return 0;
}
`}},{id:`vector`,title:`Loop over a vector`,about:`A list of scores and their average.`,files:{"main.cpp":`#include <iostream>
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
`}},{id:`class`,title:`A class in three files`,about:`A header, its source file and a main: the shape of every real C++ project.`,files:{"main.cpp":`#include "counter.h"

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
`}},{id:`library`,title:`A small library`,about:`Free functions in a namespace, declared in a header and used from main.`,files:{"main.cpp":`#include "mathx.h"

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
`}},{id:`files`,title:`Read and write a file`,about:`Reads names from a text file next to the code and writes a report.`,files:{"main.cpp":`#include <fstream>
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
`}},{id:`tests`,title:`Function with its own tests`,about:`A tiny test helper, so you can check a function as you write it.`,files:{"main.cpp":`#include "check.h"

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
`}},{id:`guess`,title:`Guess the number`,about:`A small game: a random number, a loop, and input that is checked.`,files:{"main.cpp":`#include <iostream>
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
`}},{id:`scores`,title:`Sort a leaderboard`,about:`A struct, a vector of them, and sorting by a rule of your own.`,files:{"main.cpp":`#include <algorithm>
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
`}},{id:`timing`,title:`Measure speed`,about:`Times a piece of code. Switch the build to Release (status bar) for honest numbers.`,files:{"main.cpp":`#include <chrono>
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
`}},...b()];function b(){let e=(e,t,n,r,i)=>({id:`${e}-${t}`,lang:e,title:n,about:r,files:i});return[e(`c`,`hello`,`Hello, world`,`The smallest complete program.`,{"main.c":h.c.text}),e(`c`,`ask`,`Ask and answer`,`Read two numbers with scanf.`,{"main.c":`#include <stdio.h>

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
`}),e(`asm`,`hello`,`Hello, world`,`Print with a system call, then exit.`,{"main.asm":h.asm.text}),e(`asm`,`sum`,`Add two numbers`,`Read two numbers and print their sum, with Xenon's input and output routines.`,{"main.asm":`        global  _start
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
`}),e(`python`,`hello`,`Hello, world`,`The smallest complete program.`,{"main.py":h.python.text}),e(`python`,`ask`,`Ask and answer`,`Read two numbers and work with them.`,{"main.py":`a = int(input("First number: "))
b = int(input("Second number: "))

print(f"{a} + {b} = {a + b}")
print(f"{a} * {b} = {a * b}")
`}),e(`python`,`modules`,`Two files`,`A program split over two modules.`,{"main.py":`from shapes import area_of_circle

for r in [1, 2, 3]:
    print(f"r = {r}: area = {area_of_circle(r):.2f}")
`,"shapes.py":`import math


def area_of_circle(radius):
    return math.pi * radius ** 2
`}),e(`python`,`words`,`Word counter`,`Read a file and count its words.`,{"main.py":`from collections import Counter

with open("poem.txt") as f:
    words = f.read().lower().split()

for word, n in Counter(words).most_common(5):
    print(f"{word:>8} {n}")
`,"poem.txt":`the stone on the stone
the trail goes up
and the stone stays
`}),e(`lua`,`hello`,`Hello, world`,`The smallest complete program.`,{"main.lua":h.lua.text}),e(`lua`,`ask`,`Ask and answer`,`Read two numbers with io.read.`,{"main.lua":`io.write("First number: ")
local a = io.read("n")
io.write("Second number: ")
local b = io.read("n")

if not a or not b then
    print("Those were not two numbers.")
else
    print(a .. " + " .. b .. " = " .. a + b)
end
`}),e(`lua`,`modules`,`Two files`,`A module in its own file, loaded with require.`,{"main.lua":`local shapes = require("shapes")

for r = 1, 3 do
    print(string.format("r = %d: area = %.2f", r, shapes.circle_area(r)))
end
`,"shapes.lua":`local shapes = {}

function shapes.circle_area(radius)
    return math.pi * radius ^ 2
end

return shapes
`}),e(`javascript`,`hello`,`Hello, world`,`The smallest complete program.`,{"main.js":h.javascript.text}),e(`javascript`,`ask`,`Ask and answer`,`Read input with prompt().`,{"main.js":`const name = prompt("What is your name?");
const year = Number(prompt("What year were you born?"));

console.log(\`Hello, \${name}! You turn \${new Date().getFullYear() - year} this year.\`);
`}),e(`javascript`,`modules`,`Two modules`,`import and export between files.`,{"main.js":`import { shout, whisper } from "./voice.js";

console.log(shout("hello"));
console.log(whisper("HELLO"));
`,"voice.js":`export function shout(text) {
  return text.toUpperCase() + "!";
}

export function whisper(text) {
  return text.toLowerCase() + "...";
}
`}),e(`typescript`,`hello`,`Hello, world`,`TypeScript: JavaScript with types.`,{"main.ts":h.typescript.text}),e(`typescript`,`shapes`,`Typed shapes`,`Interfaces and a union type.`,{"main.ts":`type Shape =
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
`}),e(`csharp`,`hello`,`Hello, world`,`The smallest complete program.`,{"Program.cs":h.csharp.text}),e(`csharp`,`ask`,`Ask and answer`,`Read two numbers and work with them.`,{"Program.cs":`Console.Write("First number: ");
int a = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Second number: ");
int b = int.Parse(Console.ReadLine() ?? "0");

Console.WriteLine($"{a} + {b} = {a + b}");
`}),e(`csharp`,`classes`,`Two files`,`A class in its own file.`,{"Program.cs":`var account = new Account("Ada", 100m);
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
`}),e(`java`,`hello`,`Hello, world`,`The smallest complete program.`,{"Main.java":h.java.text}),e(`java`,`ask`,`Ask and answer`,`Read input with a Scanner.`,{"Main.java":`import java.util.Scanner;

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
`}),e(`java`,`classes`,`Two classes`,`A class in its own file.`,{"Main.java":`public class Main {
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
`}),e(`rust`,`hello`,`Hello, world`,`The smallest complete program.`,{"main.rs":h.rust.text}),e(`rust`,`ask`,`Ask and answer`,`Read a line and parse a number.`,{"main.rs":`use std::io;

fn main() {
    println!("How many stars?");
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("could not read input");
    let n: u32 = line.trim().parse().expect("not a number");
    for i in (1..=n).rev() {
        println!("{}", "o".repeat(i as usize));
    }
}
`}),e(`rust`,`modules`,`Two modules`,`A module in its own file.`,{"main.rs":`mod geometry;

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
`})]}var x=n(),{createIDE:S,popupMenu:C}=l,{LANGS:w,REMOTE:T,langOfFiles:E,entryOf:D}=u,{toolchainFor:O}=d,{restyleFiles:k}=f,{prefs:A}=p,{allLinks:j,setLinks:M,diskFiles:N,pickFiles:P}=m,F=y,I=e=>e.lang||`cpp`,L=F.find(e=>e.id===`hello`).files[`main.cpp`],R=[`cpp`,`c`,`asm`,`python`,`lua`,`javascript`,`typescript`,`csharp`,`java`,`rust`],z=/^[A-Za-z0-9_][A-Za-z0-9_.-]{0,40}$/,B=`cairn.pg.last`,V=()=>A.get(B,null),H=e=>A.set(B,e);function U(e,t){return e?z.test(e)?t.some(t=>t.toLowerCase()===e.toLowerCase())?`A project with that name already exists.`:``:`Use letters, digits, _ . and - only, with no spaces (for example  text-adventure).`:`Give the project a name.`}function W(){let e=c.catalog.find(e=>e.id===c.progress.lastCourse),t=e&&e.language;return t&&F.some(e=>I(e)===t)?t:`cpp`}function G({firstLang:e,first:t,problem:n,field:r,onPick:i}){let[a,s]=(0,g.useState)(e),[c,l]=(0,g.useState)(t),u=e=>{l(e),i(e)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`div`,{className:`cap-label`,children:`Name`}),(0,x.jsx)(`input`,{ref:r,type:`text`,placeholder:`project-name`,spellCheck:!1,style:{width:`100%`}}),(0,x.jsx)(`div`,{style:{color:`var(--bad)`,fontSize:`12.5px`,minHeight:`18px`,margin:`6px 0 4px`},children:n}),(0,x.jsx)(`div`,{className:`cap-label`,children:`Language`}),(0,x.jsx)(`div`,{className:`seg lang-pick`,children:R.map(e=>(0,x.jsx)(`button`,{type:`button`,className:e===a?`on`:void 0,onClick:()=>{s(e),u(F.find(t=>I(t)===e))},children:w[e].name},e))}),(0,x.jsx)(`div`,{className:`cap-label`,children:`Start from`}),(0,x.jsx)(`div`,{className:`tpl-grid`,children:F.filter(e=>I(e)===a).map(e=>{let t=Object.keys(e.files);return(0,x.jsxs)(`button`,{className:o(`tpl`,e===c&&`on`),onClick:()=>{u(e);let t=r.current;t&&!t.value.trim()&&t.focus()},children:[(0,x.jsx)(`b`,{children:e.title}),(0,x.jsx)(`span`,{children:e.about}),(0,x.jsx)(`small`,{children:t.length===1?t[0]:`${t.length} files: ${t.join(`, `)}`})]},e.id)})})]})}async function K(e){let t=W(),n=F.find(e=>I(e)===t)||F[0],r=n,i=document.createElement(`div`),a=(0,v.createRoot)(i),o=(0,g.createRef)(),c=e=>(0,_.flushSync)(()=>a.render((0,x.jsx)(G,{firstLang:t,first:n,problem:e,field:o,onPick:e=>{r=e}})));c(``);let l=o.current;try{for(;;){let t=s.modal({title:`New project`,body:i,actions:[{label:`Cancel`,value:!1},{label:`Create`,value:!0,kind:`primary`}],submit:l,wide:!0});if(setTimeout(()=>l.focus(),0),!await t)return null;let n=l.value.trim(),a=U(n,e);if(!a)return{name:n,template:r};c(a)}}finally{a.unmount()}}async function q(e){let t=e.name,{workspaces:n}=await s.api(`/api/workspaces`),r=()=>n.map(e=>e.name),i=sessionStorage.getItem(`cairn.playground.incoming`),a=`main.cpp`,o=i;try{let e=JSON.parse(i);e&&e.text&&(o=e.text,a=e.file||`main.cpp`)}catch{}sessionStorage.removeItem(`cairn.playground.incoming`);let l=t&&z.test(t)?t:null;if(o){if(l=`lesson-example`,r().includes(l)){let e=(await s.api(`/api/code?course=playground&key=${l}`)).files||{};await s.api(`/api/history/save`,{course:`playground`,key:l,files:e,label:`before a new lesson example`}).catch(()=>{}),await s.api(`/api/code/save`,{course:`playground`,key:l,files:{[a]:o},remove:Object.keys(e).filter(e=>e!==a)})}else({workspaces:n}=await s.api(`/api/workspace/create`,{name:l,files:{[a]:o}}))}if(!l||!r().includes(l)){let e=V();l=r().includes(e)?e:r()[0]||null}if(!l){l=`scratch`;let e=F.find(e=>I(e)===W());({workspaces:n}=await s.api(`/api/workspace/create`,{name:l,files:k(e?{...e.files}:{"main.cpp":L},c.settings.braceStyle)}))}H(l);let u=(await s.api(`/api/code?course=playground&key=${encodeURIComponent(l)}`)).files||{"main.cpp":L},d=E(u),f=await S({id:`pg-${l}`,course:`playground`,key:l,files:u,entry:D(d,u),kind:`playground`,explorer:`open`,lessonCourse:`cpp`}),p=O(d,c.settings.compiler);return d===`cpp`?c.toolchain&&c.toolchain.active&&f.console.showMessage(`Anything goes here. ${c.toolchain.activeName} builds every .cpp file in the project.\nPress Run (${s.keyText(`Ctrl+Enter`)}), and type below when your program asks for input.\n`):f.console.showMessage(`Anything goes here. This is a ${w[d].name} project: ${T[d].local?`it runs right here in your browser`:p.here?`${p.name} runs it on this computer`:`${T[d].name} runs it on Compiler Explorer`}.\nPress Run (${s.keyText(`Ctrl+Enter`)}), and type below when your program asks for input.\n`),{className:`wb pg`,flush:!0,title:`${l} · Playground`,data:{name:l,workspaces:n,ide:f,disk:N()},cleanup:()=>f.dispose()}}function J({data:e}){let{name:t,workspaces:n,ide:r,disk:i}=e,o=()=>n.map(e=>e.name),l=(0,g.useRef)(null),u=()=>Object.entries(j()[t]||{}).filter(([e])=>r.getFiles()[e]!==void 0),d=()=>(i?u():[]).map(([e])=>e),[f,p]=(0,g.useState)(d),[m,h]=(0,g.useState)(``),_=async()=>{await r.saveNow()},v=async e=>{await _(),s.navigate(`/playground/${e}`)};async function y(){let e=await K(o());if(e){try{await s.api(`/api/workspace/create`,{name:e.name,files:k(e.template.files,c.settings.braceStyle)})}catch(e){s.toast(e.message,`bad`);return}await v(e.name)}}async function b(){let e=await s.ask({title:`Rename project`,value:t,ok:`Rename`,check:e=>e===t?``:U(e,o())});if(e&&e!==t){await _();try{await s.api(`/api/workspace/rename`,{from:t,to:e})}catch(e){s.toast(e.message,`bad`);return}M(e,j()[t]),M(t,null),s.navigate(`/playground/${e}`)}}async function S(){if(await s.confirmBox(`Delete the project "${t}"?`,`Its files are moved to the trash folder inside Xenon's data folder, so a mistake can be undone by hand.`,`Delete`)){await _();try{await s.api(`/api/workspace/delete`,{name:t})}catch(e){s.toast(e.message,`bad`);return}M(t,null),A.set(B,null),s.navigate(`/playground`),location.hash===`#/playground`&&window.dispatchEvent(new HashChangeEvent(`hashchange`))}}async function w(){let e=await s.ask({title:`Copy project`,hint:`A copy of every file, under a new name.`,value:`${t}-copy`.slice(0,40),ok:`Copy`,check:e=>U(e,o())});if(e){try{await s.api(`/api/workspace/create`,{name:e,files:r.getFiles()})}catch(e){s.toast(e.message,`bad`);return}await v(e)}}async function T(e){let t=r.getFiles(),n=0;for(let[e,r]of u()){let a=await i.write(r,t[e],!1).catch(()=>null);if(a&&a.changed){if(!await s.confirmBox(`${a.name} was changed outside Xenon`,`Another program saved a different version of this file since Xenon last read it. Saving now replaces that version with what is in the editor.`,`Save anyway`))continue;a=await i.write(r,t[e],!0).catch(()=>null)}a&&a.ok?n++:s.toast(a&&a.error||`${e} could not be saved.`,`bad`)}n&&(h(`on disk ${new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}`),e||s.toast(n===1?`Saved ${u()[0][0]} to this computer`:`Saved ${n} files to this computer`,`good`))}async function E(){let e=r.active(),n=r.getFiles()[e];if(n===void 0)return;let a=await i.saveAs(e.split(`/`).pop(),n).catch(()=>null);a&&(a.error?s.toast(a.error,`bad`):(M(t,{...j()[t]||{},[e]:a.id}),p(d()),s.toast(`Saved ${a.name}. Save to disk keeps it up to date from now on.`,`good`)))}(0,g.useLayoutEffect)(()=>{if(l.current.append(r.el),!i)return;let e=e=>{(e.ctrlKey||e.metaKey)&&!e.altKey&&e.key.toLowerCase()===`s`&&u().length&&setTimeout(()=>T(!0),450)};return r.el.addEventListener(`keydown`,e,!0),()=>r.el.removeEventListener(`keydown`,e,!0)},[e]);let D=e=>{let a=e.getBoundingClientRect(),o=e=>e.modified?new Date(e.modified).toLocaleDateString(void 0,{month:`short`,day:`numeric`}):``;C(a.left,a.bottom+4,[...n.map(e=>({label:e.name,checked:e.name===t,icon:`folder`,keys:`${e.files} ${e.files===1?`file`:`files`}  ${o(e)}`,run:()=>{e.name!==t&&v(e.name)}})),`-`,{label:`New project…`,icon:`plus`,run:y},{label:`Open a file from this computer…`,icon:`folderOpen`,run:P},...i?[{label:`Save ${r.active().split(`/`).pop()} to this computer…`,icon:`download`,run:E}]:[],{label:`Copy this project…`,icon:`copy`,run:w},{label:`Rename this project…`,icon:`edit`,run:b},{label:`Delete this project`,icon:`trash`,danger:!0,run:S}])};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`div`,{className:`wb-top`,children:[(0,x.jsx)(`button`,{className:`icon-btn nav-toggle`,title:s.keyText(`Show or hide the sidebar (Ctrl+B)`),onClick:()=>s.bus.emit(`sidebar`),children:(0,x.jsx)(a,{name:`menu`})}),(0,x.jsx)(`div`,{className:`wb-name`,style:{minWidth:0},children:(0,x.jsx)(`div`,{className:`title`,children:`Playground`})}),(0,x.jsxs)(`button`,{className:`btn small pg-switch`,title:`Switch project`,onClick:e=>D(e.currentTarget),children:[(0,x.jsx)(a,{name:`folder`}),(0,x.jsx)(`span`,{children:t}),(0,x.jsx)(a,{name:`down`})]}),(0,x.jsxs)(`button`,{className:`btn small`,title:`Start a new project, empty or from an example`,onClick:()=>{y()},children:[(0,x.jsx)(a,{name:`plus`}),(0,x.jsx)(`span`,{children:`New project`})]}),(0,x.jsxs)(`button`,{className:`btn small`,title:`Open a file from this computer. Dropping one on the window does the same.`,onClick:()=>{P()},children:[(0,x.jsx)(a,{name:`folderOpen`}),(0,x.jsx)(`span`,{children:`Open file`})]}),(0,x.jsxs)(`button`,{className:`btn small pg-disk`,hidden:!f.length,title:f.length?`Write ${f.join(`, `)} back to the computer. ${s.keyText(`Ctrl+S`)} does this too.`:``,onClick:()=>{T(!1)},children:[(0,x.jsx)(a,{name:`save`}),(0,x.jsx)(`span`,{children:`Save to disk`})]}),(0,x.jsx)(`span`,{className:`pg-disk-note`,hidden:!f.length,children:m}),(0,x.jsx)(`div`,{className:`spacer`})]}),(0,x.jsx)(`div`,{className:`wb-body solo`,ref:l})]})}export{J as Screen,q as load};