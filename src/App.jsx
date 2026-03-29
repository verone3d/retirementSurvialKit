import { useState, useCallback } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Sunrise,
  Cpu,
  Monitor,
  Dumbbell,
  Wind,
  Moon,
  Utensils,
  Printer,
  Star,
  BookOpen,
  Heart,
  Trophy,
  AlertCircle,
  Info,
  Lightbulb,
  Sparkles,
  Menu,
  X,
  ExternalLink as LinkOut,
  Quote,
  GitBranch,
  RefreshCw,
  Users,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER METADATA
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1,  title: 'Welcome to Day One',        icon: Sunrise,   steps: 3 },
  { id: 2,  title: 'GitHub — Store Everything', icon: GitBranch, steps: 5 },
  { id: 3,  title: 'Your Raspberry Pi 400',     icon: Cpu,       steps: 6 },
  { id: 4,  title: 'The Tiny Display',          icon: Monitor,   steps: 4 },
  { id: 5,  title: 'Move Every Day',            icon: Dumbbell,  steps: 5 },
  { id: 6,  title: 'Breathe',                   icon: Wind,      steps: 4 },
  { id: 7,  title: 'Sleep Well',                icon: Moon,      steps: 5 },
  { id: 8,  title: 'Eat Well',                  icon: Utensils,  steps: 5 },
  { id: 9,  title: 'Make Things',               icon: Printer,   steps: 5 },
  { id: 10, title: 'Words to Live By',          icon: Star,      steps: 1 },
  { id: 11, title: 'Give Back',                 icon: Heart,     steps: 4 },
  { id: 12, title: 'Never Stop Learning',       icon: BookOpen,  steps: 1 },
]

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
        </div>
        <span className="text-xs text-gray-500 font-mono">{lang || 'terminal'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-amber-400 transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="bg-gray-950 text-green-300 p-4 overflow-x-auto font-mono text-sm leading-7 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Callout({ type = 'info', title, children }) {
  const variants = {
    info:    { wrap: 'bg-blue-950/60 border-blue-500/60',    text: 'text-blue-200',   icon: <Info size={18} className="text-blue-400 shrink-0 mt-0.5" /> },
    warning: { wrap: 'bg-yellow-950/60 border-yellow-500/60',text: 'text-yellow-200', icon: <AlertCircle size={18} className="text-yellow-400 shrink-0 mt-0.5" /> },
    success: { wrap: 'bg-amber-950/60 border-amber-500/60',  text: 'text-amber-200',  icon: <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" /> },
    tip:     { wrap: 'bg-purple-950/60 border-purple-500/60',text: 'text-purple-200', icon: <Lightbulb size={18} className="text-purple-400 shrink-0 mt-0.5" /> },
  }
  const v = variants[type]
  return (
    <div className={`flex gap-3 p-4 rounded-lg border my-4 ${v.wrap} ${v.text}`}>
      {v.icon}
      <div className="min-w-0">
        {title && <p className="font-semibold mb-1 text-sm">{title}</p>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function StepNumber({ n }) {
  return (
    <div className="shrink-0 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold text-xs font-mono">
      {n}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-lg font-semibold text-white mt-8 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-amber-500 rounded-full inline-block" />
      {children}
    </h3>
  )
}

function ResourceLink({ title, description, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-700 bg-gray-900/60 hover:border-amber-500/60 hover:bg-gray-800/60 transition-all group mb-3"
    >
      <div>
        <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-amber-400 transition-colors">{title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
      </div>
      <LinkOut size={16} className="text-gray-500 group-hover:text-amber-400 shrink-0 transition-colors" />
    </a>
  )
}

function QuoteCard({ quote, author, context }) {
  return (
    <div className="relative p-6 rounded-xl border border-amber-900/40 bg-gradient-to-br from-amber-950/30 to-gray-900/60 mb-4">
      <Quote size={20} className="text-amber-500/40 absolute top-4 left-4" />
      <blockquote className="text-gray-100 text-base leading-relaxed font-medium pl-4 mb-3 italic">
        "{quote}"
      </blockquote>
      <div className="pl-4">
        <span className="text-amber-400 font-semibold text-sm">— {author}</span>
        {context && <p className="text-gray-500 text-xs mt-0.5">{context}</p>}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 1 — Welcome to Day One
// ─────────────────────────────────────────────────────────────────────────────
function Chapter1() {
  return (
    <div>
      <div className="p-5 rounded-xl border border-amber-900/50 bg-amber-950/20 mb-6">
        <p className="text-amber-200 text-base leading-relaxed font-medium italic">
          "Get up and learn one thing everyday."
        </p>
        <p className="text-amber-400 text-sm mt-2 font-semibold">— Ralph E. Mong Sr.</p>
        <p className="text-amber-600 text-xs mt-1">Verone VanWormer's Grandfather · Words passed down and still being lived</p>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        This is just my way of saying thank you — for everything you did for me over the years.
        It is my way of helping you open new paths of exploration. It may look like I am documenting
        my path for others. I am not. I am trying to show you how walking through another door of
        the unknown sparked my creativity and my <strong className="text-white">uncontrollable curiosity.</strong>
      </p>

      <Callout type="warning" title="BEWARE — the curiosity is contagious">
        Once it starts, you will need to create time for these things on a regular basis — if not daily.
        It doesn't have to be much. But it has to be consistent. My grandfather's advice has held up
        for fifty years: learn one thing every day, and after fifty years you will be amazed and
        astonished. It is like kindling on a fire — but in your mind.
      </Callout>

      <p className="text-gray-300 leading-relaxed mb-6">
        I have been using AI for years. What Claude Code has allowed me to create in the past four
        months is mind-boggling. This entire site was built with it. The tools in this kit are real —
        I use all of them. None of this is theory.
      </p>

      <SectionTitle>What's in the Kit</SectionTitle>

      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        {[
          { icon: <GitBranch size={18} className="text-amber-400" />, title: 'GitHub', desc: 'Not just for code. A permanent home for your notes, scripts, prompts, and everything worth keeping.' },
          { icon: <Cpu size={18} className="text-amber-400" />, title: 'Raspberry Pi 400', desc: 'A full Linux computer in a keyboard. Think of it as a sandbox — restart when you mess up, that is the whole point.' },
          { icon: <Monitor size={18} className="text-amber-400" />, title: 'ESP32 Display', desc: 'A tiny 2.8" touchscreen microcontroller. Your first taste of IoT — make it show anything you want.' },
          { icon: <Dumbbell size={18} className="text-amber-400" />, title: 'Resistance Bands', desc: 'The best gym equipment that fits in a drawer. Easier on joints than weights, just as effective.' },
          { icon: <Printer size={18} className="text-amber-400" />, title: 'Bambu A1 Mini', desc: 'A 3D printer. If you can imagine it, you can probably print it. You should borrow mine for a couple months.' },
          { icon: <Heart size={18} className="text-amber-400" />, title: 'Give Back', desc: 'The chapter that changed my life the most. There are people out there waiting for exactly what you have to offer.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="flex gap-3 p-4 rounded-xl border border-gray-700 bg-gray-900/60">
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div>
              <p className="text-white font-semibold text-sm mb-1">{title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>The Philosophy Behind This</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Mistakes and failures are how we learn</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              This is my firm belief. Every chapter in this kit was earned through trial, error, and
              persistence. The Pi is a sandbox precisely because you are supposed to break it. The 3D
              printer is supposed to fail a few prints. That is not a setback — that is the curriculum.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Your body is the most important machine you own</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every chapter on movement, breathing, sleep, and food comes from real experience —
              years of learning to listen, adjust, and pay attention to what actually works for
              <em className="text-gray-200"> your</em> body. Everyone is different. There is no
              universal answer. What I can give you is a starting point.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Never stop — just keep moving and learning</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The people who thrive are not the ones who finally rest — they are the ones who
              finally get to chase what they were always curious about. Do not let anyone persuade
              you differently. You will do fine.
            </p>
            <Callout type="tip" title="The one commitment worth making">
              Every morning: pick one thing to learn. It does not have to be big. A new word,
              a new recipe, a new command. One thing, every day. After fifty years, you will not
              believe what that kindling built.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 2 — GitHub — Store Everything
// ─────────────────────────────────────────────────────────────────────────────
function Chapter2() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Most people think of GitHub as a place programmers store code. That is like saying a library
        is just a place to store paper. <strong className="text-white">GitHub is version control
        meets cloud backup meets personal archive.</strong> It is where I store everything worth
        keeping — code, notes, config files, project logs, and every Claude Code prompt I have
        ever written.
      </p>
      <Callout type="tip" title="This site is hosted on GitHub Pages — for free">
        The kit you are reading right now lives at a GitHub repository and is served directly
        from it. No server, no hosting fees. That is the power of understanding the tool.
      </Callout>

      <SectionTitle>Get Started</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Create your account</p>
            <p className="text-gray-400 text-sm mb-2">
              Go to <span className="text-amber-400 font-mono">github.com</span> and sign up.
              Pick a username you will be proud of — it is your public handle and shows up in
              every URL you share. Once you are in, explore a few repos to get a feel for the interface.
            </p>
            <ResourceLink
              title="github.com"
              description="Your new home base. Free accounts have everything you need to get started."
              href="https://github.com"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Create your first repository</p>
            <p className="text-gray-400 text-sm mb-2">
              A repository (repo) is a folder that GitHub tracks every change to. Click the{' '}
              <strong className="text-white">+</strong> button → New repository. Give it a name
              like <span className="text-amber-400 font-mono">my-notes</span> or{' '}
              <span className="text-amber-400 font-mono">retirement-projects</span>. Make it
              Public or Private — your choice. Initialize with a README.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The basic workflow — three commands you will use every day</p>
            <p className="text-gray-400 text-sm mb-2">
              On your Pi or any Linux machine, navigate into your project folder and run:
            </p>
            <CodeBlock lang="bash" code={`git add .
git commit -m "describe what you changed"
git push`} />
            <p className="text-gray-400 text-sm">
              That is it. Those three commands save your work to GitHub. Do this whenever you
              finish something — even if it is just notes.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Clone your first setup to get started on the Pi</p>
            <p className="text-gray-400 text-sm mb-2">
              Install git (it is probably already on the Pi) and connect it to your account:
            </p>
            <CodeBlock lang="bash" code={`sudo apt install git -y
git config --global user.name "Your Name"
git config --global user.email "you@email.com"`} />
            <p className="text-gray-400 text-sm mt-2">
              Then clone any repo to your Pi:{' '}
              <code className="text-amber-300 bg-gray-900 border border-gray-700 px-1.5 py-0.5 rounded font-mono text-xs">
                git clone https://github.com/yourusername/yourrepo
              </code>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Saving your Claude Code prompts — a habit worth building</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Every prompt you write to Claude Code is a skill you developed. Save them. Create a
              repo called <span className="text-amber-400 font-mono">prompts</span> or{' '}
              <span className="text-amber-400 font-mono">ai-notes</span> and keep a running log
              of the prompts that got great results. In six months, that collection will be one
              of your most valuable resources.
            </p>
            <CodeBlock lang="bash" code={`# Example: save today's session notes
echo "## $(date)" >> ~/prompts/claude-sessions.md
echo "Prompt: build a web dashboard for Pi stats" >> ~/prompts/claude-sessions.md
echo "Result: worked on first try with these settings..." >> ~/prompts/claude-sessions.md
git add . && git commit -m "add session notes" && git push`} />
            <Callout type="success" title="GitHub is your second brain">
              Notes. Scripts. Config files. Project ideas. Prompts. If you put it in GitHub,
              you will never lose it, you can access it from any machine, and you can roll back
              to any previous version if something breaks. Start using it for everything.
            </Callout>
          </div>
        </div>
      </div>

      <SectionTitle>See It In Action — Try Cloning These</SectionTitle>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        These repos are <strong className="text-white">public</strong> — anyone can view and clone
        them with no login required. This is a great first exercise: clone one to your Pi and
        explore how a real project is structured.
      </p>
      <ResourceLink
        title="verone3d/esp32-tft-project"
        description="The ESP32 display project from Chapter 4. Real code, real documentation, built step by step."
        href="https://github.com/verone3d/esp32-tft-project"
      />
      <ResourceLink
        title="verone3d/stock-ticker"
        description="A stock ticker running on the ESP32 display. A complete project from idea to working hardware."
        href="https://github.com/verone3d/stock-ticker"
      />

      <CodeBlock lang="bash" code={`# Clone either repo to your Pi — no login needed
git clone https://github.com/verone3d/esp32-tft-project
git clone https://github.com/verone3d/stock-ticker

# Then browse the files
cd esp32-tft-project
ls`} />

      <SectionTitle>Public vs Private — Understanding Visibility</SectionTitle>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="bg-green-950/30 border border-green-800/50 rounded-lg p-4">
            <p className="text-green-300 font-semibold mb-1">Public repo</p>
            <p className="text-gray-400 text-xs leading-relaxed">Anyone can view and clone — no account needed. Great for sharing projects, portfolios, and learning resources.</p>
            <p className="text-green-400 text-xs mt-2 font-mono">Settings → General → Change visibility → Public</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-200 font-semibold mb-1">Private repo</p>
            <p className="text-gray-400 text-xs leading-relaxed">Only you can see it — unless you invite collaborators. Good for personal notes, work in progress, or anything sensitive.</p>
            <p className="text-gray-500 text-xs mt-2 font-mono">Settings → Collaborators → Add people → Read access</p>
          </div>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 text-sm">
          <p className="text-amber-400 font-semibold text-xs mb-2">If someone can see your repo but cannot clone it, it is usually one of these:</p>
          <ul className="space-y-1.5 text-gray-400 text-xs">
            {[
              "They haven't accepted the collaborator invite yet",
              'They are cloning with SSH but have not configured SSH keys',
              'They are using HTTPS but do not have a Personal Access Token set up',
              "The repo is in an org with SSO required and they didn't authorize",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight size={12} className="text-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Callout type="tip" title="HTTPS is easiest to start — no SSH keys needed">
          Clone with <code className="text-amber-300 font-mono text-xs bg-gray-900 px-1 rounded">https://</code> URLs
          until you are comfortable. SSH is faster once set up, but HTTPS works out of the box
          with just your GitHub username and a Personal Access Token (PAT) as your password.
          GitHub will prompt you the first time.
        </Callout>

        <div className="mt-4 p-4 rounded-xl border border-amber-900/50 bg-amber-950/20">
          <p className="text-amber-200 text-sm font-semibold mb-1">A note from me on this</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Sharing GitHub repos publicly is honestly a new part of this journey for me too.
            I am still learning the best ways to share work and make it easy for others to
            access. If you run into any trouble cloning, viewing, or accessing anything I have
            shared — <strong className="text-white">reach out to me directly.</strong> Do not
            spend time fighting it alone. This is one of those areas where a five-minute
            conversation will save you two hours of frustration, and I am happy to walk through
            it with you.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 3 — Your Raspberry Pi 400
// ─────────────────────────────────────────────────────────────────────────────
function Chapter3() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        The <strong className="text-white">Raspberry Pi 400</strong> is a full Linux computer built
        into a compact keyboard. Think of it as a{' '}
        <strong className="text-white">sandbox</strong> — an isolated environment where you can
        experiment freely. When you mess up (and you will, that is the point), GitHub and a fresh
        SD card let you start over in minutes. Nothing is permanent. Everything is recoverable.
        That is by design.
      </p>
      <Callout type="tip" title="Mistakes are the curriculum">
        My firm belief: we learn through failure. The Pi is the perfect teacher because the cost
        of failure is zero. Break it, reflash it, try again. Every failed experiment teaches you
        something a tutorial never could.
      </Callout>

      <SectionTitle>Get It Running</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Connect the hardware</p>
            <div className="grid gap-2 text-sm">
              {[
                ['Monitor', 'HDMI cable into either micro-HDMI port on the back'],
                ['Mouse', 'USB mouse into any USB port (keyboard is built in)'],
                ['SD Card', 'Already in the slot on the bottom-left — Raspberry Pi OS is on it'],
                ['Power', 'USB-C power supply — plug in last and it boots automatically'],
              ].map(([item, desc]) => (
                <div key={item} className="flex gap-3 bg-gray-900/60 px-3 py-2 rounded-lg border border-gray-800">
                  <span className="shrink-0 text-amber-400 font-mono text-xs w-20 mt-0.5">{item}</span>
                  <span className="text-gray-300">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Walk through the first-boot setup</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Raspberry Pi OS guides you through country, language, timezone, password, and WiFi.
              Takes about 2 minutes. The Pi reboots once when done — that is normal.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Open the Terminal — this is where the fun starts</p>
            <p className="text-gray-400 text-sm mb-2">
              Click the terminal icon in the taskbar. You will see a prompt like this:
            </p>
            <CodeBlock lang="bash" code={`pi@raspberrypi:~$ _`} />
            <p className="text-gray-400 text-sm">You are now talking directly to the computer.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Update everything first</p>
            <CodeBlock lang="bash" code={`sudo apt update && sudo apt upgrade -y`} />
            <p className="text-gray-400 text-sm">Takes 5–10 minutes, only needs doing once.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-2">A few commands worth knowing</p>
            <div className="space-y-2">
              {[
                ['ls', 'List files in the current folder'],
                ['pwd', 'Show where you are in the filesystem'],
                ['cd Desktop', 'Navigate to a folder'],
                ['python3 --version', 'Check your Python version'],
                ['hostname -I', "Show your Pi's IP address on the network"],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-3 text-sm">
                  <code className="shrink-0 text-amber-300 bg-gray-900 border border-gray-700 px-2 py-0.5 rounded font-mono text-xs">{cmd}</code>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={6} />
          <div>
            <p className="text-gray-200 font-medium mb-1">What to explore next — two tutorials worth your time</p>
            <p className="text-gray-400 text-sm mb-3">
              These are not boring documentation pages. They are step-by-step, hands-on, and
              actually satisfying to work through:
            </p>
            <ResourceLink
              title="Official Getting Started — Raspberry Pi"
              description="The best first stop. Clear, current, and covers everything from first boot to your first Python script."
              href="https://www.raspberrypi.com/documentation/computers/getting-started.html"
            />
            <ResourceLink
              title="Raspberry Pi Projects — raspberrypi.org"
              description="Guided projects with step-by-step instructions. Pick one that interests you and just build it."
              href="https://projects.raspberrypi.org/en"
            />
            <div className="grid gap-3 sm:grid-cols-2 mt-4 text-sm">
              {[
                ['Learn Python', "The Pi comes with Python. It's the most beginner-friendly language ever made."],
                ['Build a web server', 'Serve a webpage from your Pi to any device on your home network.'],
                ['Home dashboard', 'Display weather, calendar, or custom info on a screen.'],
                ['RetroPie', 'Turn it into a retro game console. Entirely optional. Entirely fun.'],
              ].map(([title, desc]) => (
                <div key={title} className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-3">
                  <p className="text-amber-400 font-semibold text-xs mb-1">{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionTitle>Getting Started with Claude Code on the Pi</SectionTitle>
      <p className="text-gray-300 leading-relaxed mb-4">
        Claude Code is a command-line AI assistant that can write code, debug problems, build
        entire projects, and explain anything — all from your terminal. What I have built in
        four months using it is hard to describe. You need to experience it.
      </p>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n="A" />
          <div>
            <p className="text-gray-200 font-medium mb-1">Install Node.js (required)</p>
            <CodeBlock lang="bash" code={`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
node --version  # should show v20 or higher`} />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n="B" />
          <div>
            <p className="text-gray-200 font-medium mb-1">Install Claude Code</p>
            <CodeBlock lang="bash" code={`npm install -g @anthropic-ai/claude-code`} />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n="C" />
          <div>
            <p className="text-gray-200 font-medium mb-1">Get your API key</p>
            <p className="text-gray-400 text-sm mb-2">
              Go to <span className="text-amber-400 font-mono">console.anthropic.com</span>,
              create an account, and generate an API key. Copy it. Then set it on your Pi:
            </p>
            <CodeBlock lang="bash" code={`export ANTHROPIC_API_KEY="your-key-here"
# To make it permanent, add that line to ~/.bashrc`} />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n="D" />
          <div>
            <p className="text-gray-200 font-medium mb-1">Run it</p>
            <CodeBlock lang="bash" code={`claude`} />
            <p className="text-gray-400 text-sm">You are now talking to Claude Code from your Pi terminal.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n="E" />
          <div>
            <p className="text-gray-200 font-medium mb-2">Pro tip: Use another AI to write your prompt first</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              This is a technique that will save you money and get dramatically better results out
              of the gate. Before you type a prompt into Claude Code, open{' '}
              <span className="text-amber-400 font-mono">claude.ai</span> or another AI in your
              browser and say:
            </p>
            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 mb-3 text-sm">
              <p className="text-gray-500 text-xs mb-2 font-mono">Prompt to write your prompt:</p>
              <p className="text-gray-200 italic leading-relaxed">
                "Help me write a detailed, well-structured prompt for Claude Code. I want it to
                [describe your goal]. Make the prompt specific, include context about my setup,
                and format it so Claude Code can understand exactly what I need in one pass."
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The resulting prompt will be far more efficient than what you would write from
              scratch. Better prompts = fewer back-and-forth rounds = lower token cost = faster
              results. This is not a shortcut — it is the professional approach.
            </p>
            <Callout type="success" title="Save those prompts to GitHub">
              Every great prompt you craft is a reusable asset. Log it to your prompts repo
              (from Chapter 2). In six months, that collection will be worth more than any book.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 4 — The Tiny Display
// ─────────────────────────────────────────────────────────────────────────────
function Chapter4() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        That little yellow board with the touchscreen is an{' '}
        <strong className="text-white">ESP32</strong> — a tiny microcontroller with built-in WiFi
        and Bluetooth, paired with a 2.8" color touchscreen. The maker community calls it the
        "Cheap Yellow Display" (CYD). Do not let the name fool you — it is remarkably capable, and
        it is your introduction to{' '}
        <strong className="text-white">IoT (Internet of Things)</strong>: small devices connected
        to the world, doing useful things automatically.
      </p>
      <Callout type="info" title="This is a microcontroller, not a computer">
        Unlike the Pi, the ESP32 does not run an OS. You write a program, upload it, and it runs
        that one program continuously. It is simpler — and in some ways more satisfying. Power
        it up and it just works.
      </Callout>

      <SectionTitle>What It Can Do</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        {[
          ['Quote Display', 'Show your favorite quotes on rotation. Leave it on your desk.'],
          ['Weather Station', 'Pull weather data from an API and display it in real time.'],
          ['Always-On Clock', 'A custom clock face with date, time, and whatever else you want.'],
          ['Pi Dashboard', 'Display live stats from your Raspberry Pi (temp, CPU, IP address).'],
          ['Stock Ticker', 'Live stock prices scrolling across the screen — yes, that is a real project.'],
          ['IoT Sensor Hub', 'Read temperature, humidity, motion — connect it to your home network.'],
        ].map(([title, desc]) => (
          <div key={title} className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-amber-400 font-semibold text-xs mb-1">{title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Real Projects — Built and Documented</SectionTitle>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        The best way to learn is to follow a path someone already walked. These GitHub repos
        document exactly that journey — from setup to working project, with all the mistakes
        included:
      </p>
      <ResourceLink
        title="verone3d/esp32-tft-project"
        description="Complete ESP32 TFT display setup — wiring, libraries, first programs. A real path through the learning curve."
        href="https://github.com/verone3d/esp32-tft-project"
      />
      <ResourceLink
        title="verone3d/stock-ticker"
        description="A live stock ticker on the ESP32 display. Fetches real data from an API, displays it in real time."
        href="https://github.com/verone3d/stock-ticker"
      />

      <SectionTitle>Get Started: Arduino IDE</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Install Arduino IDE on your Pi</p>
            <p className="text-gray-400 text-sm mb-2">
              Arduino IDE is the tool you use to write programs and upload them to the ESP32.
            </p>
            <CodeBlock lang="bash" code={`sudo apt install arduino -y`} />
            <p className="text-gray-400 text-sm">
              Or download the latest from{' '}
              <span className="text-amber-400 font-mono">arduino.cc/en/software</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Add ESP32 board support</p>
            <ol className="space-y-1.5 text-sm text-gray-400 ml-2">
              <li>Open Arduino IDE → <strong className="text-white">File → Preferences</strong></li>
              <li>In "Additional boards manager URLs" paste:</li>
            </ol>
            <CodeBlock lang="URL" code={`https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`} />
            <ol className="space-y-1.5 text-sm text-gray-400 ml-2" start={3}>
              <li>Go to <strong className="text-white">Tools → Board → Boards Manager</strong></li>
              <li>Search "esp32" and install by Espressif Systems</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Connect and configure</p>
            <ol className="space-y-1 text-sm text-gray-400 ml-2">
              <li>Plug the ESP32 into your Pi with a USB-C cable</li>
              <li><strong className="text-white">Tools → Board → ESP32 Arduino → ESP32 Dev Module</strong></li>
              <li><strong className="text-white">Tools → Port → /dev/ttyUSB0</strong></li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Best community tutorials</p>
            <ResourceLink
              title="CYD Tutorials — RandomNerdTutorials"
              description="Step-by-step guides for the ESP32 Cheap Yellow Display. The best free resource for this exact board."
              href="https://randomnerdtutorials.com/?s=Cheap+Yellow+Display"
            />
            <Callout type="tip" title="First project idea">
              Build a quote display. Upload your favorites, have it cycle through one every few
              minutes. Set it on your desk. Small thing — but genuinely nice to have around
              every single day.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 5 — Move Every Day
// ─────────────────────────────────────────────────────────────────────────────
function Chapter5() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Retirement is when most people slow down physically — and also when the cost of that
        slowdown starts compounding. I have been battling{' '}
        <strong className="text-white">insulin resistance</strong> for nearly a decade. Movement —
        consistent, daily movement — is one of the most powerful tools I found. Not the only one,
        but nothing works without it.
      </p>
      <Callout type="info" title="Why bands, not weights?">
        Bands match your strength curve — resistance increases as you extend, which is actually
        more effective than a fixed weight. Gentle on joints, no gym needed, fit in a pocket.
        Not a compromise. The tool.
      </Callout>

      <SectionTitle>Where I Started — and Still Start Every Day</SectionTitle>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        This is the video that got me going and that I still use as part of my daily routine.
        The reason I chose these specific movements: they target insulin resistance directly
        through muscle engagement and blood sugar regulation.
      </p>
      <ResourceLink
        title="Resistance Band Workout — Insulin Resistance Focus"
        description="The routine that started it all. Still part of my daily practice. Watch it, try it once, and see how you feel."
        href="https://www.youtube.com/watch?v=i6r4N24GoPQ&t=583s"
      />

      <SectionTitle>How to Start</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Start easier than you think you need to</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Use the lightest band. Your goal on day one is not to feel a burn — it is to learn
              the movement patterns. Form before load, always. You can add resistance next week.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Three anchoring options</p>
            <div className="grid gap-2 text-sm">
              {[
                ['Door anchor', 'Most bands include one — close it in a door hinge. Solid for rows and presses.'],
                ['Under foot', 'Stand on the band, grab both ends. Works for curls, rows, presses.'],
                ['Around a post', 'Loop around a sturdy post, railing, or structural column.'],
              ].map(([method, desc]) => (
                <div key={method} className="flex gap-3 bg-gray-900/60 px-3 py-2 rounded-lg border border-gray-800">
                  <span className="shrink-0 text-amber-400 text-xs font-semibold w-28 mt-0.5">{method}</span>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Five movements to start with</p>
            <p className="text-gray-400 text-sm mb-3">
              3 sets of 10–15 reps each, 3 times a week. That is enough to start.
            </p>
            <div className="space-y-2">
              {[
                ['Banded Row', 'Anchor at chest height. Pull elbows back. Builds your back and posture.'],
                ['Chest Press', 'Anchor behind you at chest height. Push forward. Chest and shoulders.'],
                ['Bicep Curl', 'Stand on band. Curl up slowly. Control the way down.'],
                ['Lateral Raise', 'Stand on band. Raise arms to shoulder height. Shoulder health.'],
                ['Squat', 'Band around thighs just above knees. Squat down, push knees out against the band.'],
              ].map(([move, desc], i) => (
                <div key={move} className="flex gap-3 text-sm">
                  <span className="shrink-0 text-amber-400 font-mono font-bold w-5 mt-0.5">{i + 1}.</span>
                  <div>
                    <span className="text-white font-medium">{move} — </span>
                    <span className="text-gray-400">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Listen to your body — this is the most important skill</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              There is a difference between the <em className="text-gray-200">burn of working a muscle</em> and
              the <em className="text-gray-200">signal of something wrong.</em> Learn to tell them apart.
              Sharp joint pain: stop. Muscle fatigue and burn: that is the work.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Progress slowly and deliberately</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              When 15 reps feels easy for two sessions in a row, move to the next band.
              Slow progression over months is what builds lasting strength. No trophy for going
              heavy too fast — just injuries.
            </p>
            <Callout type="success" title="The real goal">
              You are not training for aesthetics. You are training to be strong, mobile, and
              independent at 70, 80, and beyond. Every rep is an investment in your future self.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 6 — Breathe
// ─────────────────────────────────────────────────────────────────────────────
function Chapter6() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Breathing is the one automatic process you can take manual control of — and when you do,
        you can directly influence your heart rate, stress response, and nervous system state.
        It sounds too simple to matter. It is not.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        These are not relaxation techniques from a wellness app. They are tools. Each one does
        something specific.
      </p>

      <SectionTitle>Tool 1: Box Breathing — Control & Focus</SectionTitle>
      <p className="text-gray-400 text-sm mb-4">
        Used by Navy SEALs for stress regulation. Works for any situation where you need to calm
        down without shutting down.
      </p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Inhale', count: '4', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/50' },
          { label: 'Hold', count: '4', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/50' },
          { label: 'Exhale', count: '4', color: 'text-green-400', bg: 'bg-green-950/40 border-green-800/50' },
          { label: 'Hold', count: '4', color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/50' },
        ].map(({ label, count, color, bg }) => (
          <div key={label + count} className={`flex flex-col items-center justify-center p-4 rounded-xl border ${bg}`}>
            <span className={`text-3xl font-bold font-mono ${color}`}>{count}</span>
            <span className="text-gray-400 text-xs mt-1">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Repeat 4–6 cycles. Before a difficult conversation, after stressful news, or anytime
        your mind is racing.
      </p>

      <SectionTitle>Tool 2: 4-7-8 Breathing — Sleep & Anxiety</SectionTitle>
      <div className="flex gap-4">
        <StepNumber n={1} />
        <div>
          <p className="text-gray-200 font-medium mb-2">The pattern</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Inhale through nose', count: '4', color: 'text-blue-400' },
              { label: 'Hold', count: '7', color: 'text-amber-400' },
              { label: 'Exhale through mouth', count: '8', color: 'text-green-400' },
            ].map(({ label, count, color }) => (
              <div key={label} className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-700 bg-gray-900/60 text-center">
                <span className={`text-2xl font-bold font-mono ${color}`}>{count}</span>
                <span className="text-gray-500 text-xs mt-1 leading-tight">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            The long exhale activates your parasympathetic nervous system. 4 cycles before bed
            can meaningfully shorten time to sleep.
          </p>
        </div>
      </div>

      <SectionTitle>Tool 3: Physiological Sigh — Fastest Reset</SectionTitle>
      <div className="flex gap-4">
        <StepNumber n={2} />
        <div>
          <p className="text-gray-200 font-medium mb-2">Double inhale, long exhale</p>
          <ol className="space-y-2 text-sm text-gray-400 ml-2">
            <li>1. Take a full inhale through your nose</li>
            <li>2. Without exhaling, sniff in a little more air to fully expand your lungs</li>
            <li>3. Long, slow exhale through your mouth — fully empty your lungs</li>
          </ol>
          <p className="text-gray-400 text-sm mt-3">
            The fastest known way to reduce acute stress. One or two sighs, and your heart rate
            drops noticeably. Your body does this automatically when you cry — now you can do it
            on purpose.
          </p>
        </div>
      </div>

      <SectionTitle>Daily Practice</SectionTitle>
      <div className="flex gap-4 mb-4">
        <StepNumber n={3} />
        <div>
          <p className="text-gray-200 font-medium mb-1">5 minutes, twice a day</p>
          <p className="text-gray-400 text-sm">
            Morning: box breathing after waking. Evening: 4-7-8 before sleep. Effects compound
            over weeks.
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <StepNumber n={4} />
        <div>
          <p className="text-gray-200 font-medium mb-1">Nose breathing vs. mouth breathing</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Try to breathe through your nose during the day. Nasal breathing filters and
            humidifies air, produces nitric oxide, and activates your parasympathetic system.
            Small habit, outsized effect.
          </p>
          <Callout type="tip" title="Worth reading">
            "Breath" by James Nestor. Not self-help — it is a science-backed deep dive into what
            modern humans have gotten wrong about breathing. Genuinely surprising.
          </Callout>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 7 — Sleep Well
// ─────────────────────────────────────────────────────────────────────────────
function Chapter7() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Sleep is not recovery time. It is when your brain flushes metabolic waste, consolidates
        memory, repairs tissue, and regulates the hormones that control hunger, stress, and mood.
        Bad sleep makes everything else harder. Good sleep makes everything else easier.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Most sleep problems are not about how long you sleep — they are about the habits and
        environment around sleep.
      </p>

      <SectionTitle>The Non-Negotiables</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Consistent wake time — the anchor of everything</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pick a wake time and hit it every day, including weekends. Your circadian rhythm is
              a biological clock, and inconsistency creates that "tired but can't sleep" feeling.
              The wake time, not the sleep time, is what you control first.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Morning light within 30 minutes of waking</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Go outside — even a few minutes on the porch. Morning light sets your cortisol
              timing and signals your melatonin system for later that evening. This is the single
              highest-leverage sleep habit.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Cool, dark room</p>
            <p className="text-gray-400 text-sm mb-2">
              Your core body temperature drops to initiate sleep. A cool room helps it do that.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-center">
                <p className="text-amber-400 font-bold text-lg">65–68°F</p>
                <p className="text-gray-500 text-xs">18–20°C</p>
              </div>
              <p className="text-gray-400">Optimal range. Most people sleep too warm.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">No screens 60 minutes before bed</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Blue-spectrum light suppresses melatonin. The real fix is putting the phone in
              another room. The news will still be there tomorrow.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Build a wind-down signal</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              A consistent 30-minute routine before bed — dim lights, a book (paper), chamomile
              tea — trains your nervous system to recognize sleep is coming. After a few weeks,
              the routine itself triggers drowsiness.
            </p>
            <Callout type="tip" title="Worth reading">
              "Why We Sleep" by Matthew Walker. Alarming in the best way. Will permanently change
              how you think about the hours of sleep you traded for extra work.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 8 — Eat Well
// ─────────────────────────────────────────────────────────────────────────────
function Chapter8() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        These last four chapters — Move, Breathe, Sleep, Eat — are the foundation I have been
        building for two years. The things that have finally started to make a real difference.
        I have done all of them for years. But most of the time it comes down to{' '}
        <strong className="text-white">timing</strong> more than amount, and{' '}
        <strong className="text-white">quality</strong> more than volume.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        That is when I started truly learning to listen to my body. I cannot tell you how to do
        that — other than to try things methodically, one at a time, and give it enough time to
        see if anything changes: stiffness, pain, anxiety, stomach, energy. Everyone is different.
        Every article and book I read came and went until I learned to listen to what my own
        body was telling me.
      </p>

      <Callout type="info" title="Not a diet">
        Diets have start and end dates. This is just how you eat. The goal is sustainable, not
        perfect.
      </Callout>

      <SectionTitle>The Principles</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Protein at every meal</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Protein is the most important macronutrient as you age. It preserves muscle mass,
              keeps you full longer, and has the highest thermic effect. Aim for a palm-sized
              portion at every meal: eggs, chicken, fish, Greek yogurt, cottage cheese, beans.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Eat real food</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              If it has more than five ingredients, or ingredients you cannot pronounce, eat it
              less often. Ultra-processed food is engineered to make you eat more than you need.
              That is not an opinion — it is by design.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Timing matters more than you think</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              When you eat can matter as much as what you eat — especially for insulin resistance
              and energy levels. Eating earlier in the day, not eating too close to bed, and
              allowing real gaps between meals: these small timing shifts made more difference
              for me than any diet change. Try them methodically.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Hydration before hunger</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dehydration frequently signals as hunger. Before you snack, drink a glass of water
              and wait 10 minutes. Coffee and tea count — the diuretic effect is weaker than the
              water content.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The 80/20 rule</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Eat well 80% of the time and stop thinking about the other 20%. The person who
              eats well all week and then enjoys a real meal with people they love on Saturday
              is far better off than the person who is perfect for three weeks and then gives
              up entirely. Consistency over perfection, always.
            </p>
            <Callout type="success" title="The simplest possible summary">
              Mostly real food. Protein every meal. Earlier timing when possible. Drink enough
              water. Listen to your body. Do not stress the rest.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 9 — Make Things
// ─────────────────────────────────────────────────────────────────────────────
function Chapter9() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is the chapter I truly enjoy — and I cannot understand why more people do not. Even
        after a decade in this, my family is just now starting to warm up and ask me to make things
        for them. The Bambu A1 Mini is available for you to experiment with.
      </p>

      <Callout type="success" title="You should borrow my printer for a couple months">
        It will cost you nothing — except all the filament you will burn through once you catch
        the bug. And you will. There is nothing on it I cannot fix for under $50 that I have not
        already done — unless it rolls down two flights of stairs or out a window. If you get
        bitten, you will know exactly what to buy when you are ready. The printer is the easy
        part. It is all the tools and the knowledge around design and print orientation that take
        time to learn. Give yourself the time.
      </Callout>

      <p className="text-gray-300 leading-relaxed mb-6">
        I have had hundreds of ideas in my head since I was a kid. This machine has allowed them
        to escape into my hands. That is the true reward. You will have your own experience — or
        you will not — but you will never know until you try. And if nothing else, in the future
        you will know whether it is something I can make for you.
      </p>

      <SectionTitle>How It Works</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The basics</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              You download or design a 3D model (.STL or .3MF file), open it in slicing software
              that converts it into printer instructions, and send it to the printer. It melts
              plastic filament and builds your object layer by layer. The whole process — download
              to object in hand — takes minutes to learn.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The Bambu ecosystem</p>
            <div className="space-y-2">
              {[
                ['Bambu Studio', 'Desktop slicer. Import a model, set settings, send to printer. Your main tool.'],
                ['Bambu Handy', 'Phone app. Monitor prints, start jobs, see the camera feed remotely.'],
                ['MakerWorld', "Bambu's community. Millions of free print-ready models. Start here."],
              ].map(([tool, desc]) => (
                <div key={tool} className="flex gap-3 bg-gray-900/60 px-3 py-2 rounded-lg border border-gray-800 text-sm">
                  <span className="shrink-0 text-amber-400 font-semibold text-xs w-32 mt-0.5">{tool}</span>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Where to find models</p>
            <ResourceLink title="MakerWorld" description="Bambu's library. Optimized profiles, community ratings, direct send-to-printer." href="https://makerworld.com" />
            <ResourceLink title="Printables" description="Prusa's platform. Huge library, well organized by category." href="https://www.printables.com" />
            <ResourceLink title="Thingiverse" description="The original. Millions of models. Older interface, massive selection." href="https://www.thingiverse.com" />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Design your own — start with OpenSCAD</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Since you started as a coder, <strong className="text-white">OpenSCAD</strong> is
              the easiest 3D design tool to master first. You describe objects in code —
              cylinders, cubes, spheres — and combine them with logic. If you can write a
              function, you can design a 3D object. No mouse-dragging required.
            </p>
            <div className="space-y-2 text-sm mb-3">
              {[
                ['OpenSCAD', 'Code-based 3D design. Write objects like you write functions. Free.', 'https://openscad.org'],
                ['Tinkercad', 'Browser-based drag-and-drop. Great for quick, simple parts.', 'https://www.tinkercad.com'],
                ['Fusion 360', 'Professional CAD. Steep learning curve — save this for when you are hooked.', 'https://www.autodesk.com/products/fusion-360'],
              ].map(([tool, desc, href]) => (
                <a key={tool} href={href} target="_blank" rel="noopener noreferrer"
                   className="flex gap-3 bg-gray-900/60 px-3 py-2 rounded-lg border border-gray-800 hover:border-amber-500/40 transition-colors group">
                  <span className="shrink-0 text-amber-400 font-semibold text-xs w-28 mt-0.5 group-hover:text-amber-300">{tool}</span>
                  <span className="text-gray-400 text-xs">{desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-2">Print orientation — the thing nobody talks about enough</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              How you orient a part on the print bed determines its strength, surface quality, and
              whether it warps or fails. This is one of the most important things to understand —
              and it only comes from experimenting. The rule of thumb: layer lines are weak
              perpendicular to load. Orient your parts so the load runs parallel to the layers.
            </p>
            <Callout type="tip" title="Start with someone else's model">
              Do not design from scratch on day one. Download something that already exists,
              print it, hold it in your hand. That moment — a digital file becoming a physical
              object — is worth experiencing before you start designing.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 10 — Words to Live By
// ─────────────────────────────────────────────────────────────────────────────
const QUOTES = [
  { quote: 'Get up and learn one thing everyday.', author: 'Ralph E. Mong Sr.', context: "Verone VanWormer's Grandfather — words that started all of this" },
  // Jim Rohn
  { quote: 'Take care of your body. It\'s the only place you have to live.', author: 'Jim Rohn' },
  { quote: 'Don\'t wish it were easier, wish you were better.', author: 'Jim Rohn' },
  { quote: 'Formal education will make you a living; self-education will make you a fortune.', author: 'Jim Rohn' },
  { quote: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
  { quote: 'You are the average of the five people you spend the most time with.', author: 'Jim Rohn' },
  { quote: 'Either you run the day, or the day runs you.', author: 'Jim Rohn' },
  { quote: 'Success is nothing more than a few simple disciplines, practiced every day.', author: 'Jim Rohn' },
  { quote: 'Happiness is not something you postpone for the future; it is something you design for the present.', author: 'Jim Rohn' },
  { quote: 'Work harder on yourself than you do on your job.', author: 'Jim Rohn' },
  { quote: 'The greatest gift you can give somebody is your own personal development.', author: 'Jim Rohn' },
  { quote: 'Don\'t just read the easy stuff. You may be entertained by it, but you will never grow from it.', author: 'Jim Rohn' },
  // Winston Churchill
  { quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
  { quote: 'We make a living by what we get; we make a life by what we give.', author: 'Winston Churchill' },
  { quote: 'If you\'re going through hell, keep going.', author: 'Winston Churchill' },
  { quote: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.', author: 'Winston Churchill' },
  { quote: 'Continuous effort — not strength or intelligence — is the key to unlocking our potential.', author: 'Winston Churchill' },
  { quote: 'To improve is to change; to be perfect is to change often.', author: 'Winston Churchill' },
  // Andrew Carnegie
  { quote: 'Anything in life worth having is worth working for.', author: 'Andrew Carnegie' },
  { quote: 'As I grow older, I pay less attention to what men say. I just watch what they do.', author: 'Andrew Carnegie' },
  { quote: 'People who are unable to motivate themselves must be content with mediocrity, no matter how impressive their other talents.', author: 'Andrew Carnegie' },
  { quote: 'No man can become rich without himself enriching others.', author: 'Andrew Carnegie' },
  // Albert Einstein
  { quote: 'Imagination is more important than knowledge.', author: 'Albert Einstein' },
  { quote: 'Life is like riding a bicycle. To keep your balance, you must keep moving.', author: 'Albert Einstein' },
  { quote: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.', author: 'Albert Einstein' },
  { quote: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
  { quote: 'Once you stop learning, you start dying.', author: 'Albert Einstein' },
  { quote: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
  { quote: 'Try not to become a man of success, but rather try to become a man of value.', author: 'Albert Einstein' },
  // Thomas Edison
  { quote: 'Genius is one percent inspiration and ninety-nine percent perspiration.', author: 'Thomas Edison' },
  { quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.', author: 'Thomas Edison' },
  { quote: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.', author: 'Thomas Edison' },
  { quote: 'Opportunity is missed by most people because it is dressed in overalls and looks like work.', author: 'Thomas Edison' },
  { quote: 'The three great essentials to achieve anything worthwhile are: hard work, stick-to-itiveness, and common sense.', author: 'Thomas Edison' },
  // Classics
  { quote: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
  { quote: 'Life is either a daring adventure or nothing at all.', author: 'Helen Keller' },
  { quote: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { quote: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
  { quote: 'We do not stop playing because we grow old. We grow old because we stop playing.', author: 'George Bernard Shaw' },
  { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { quote: 'Do not go gentle into that good night. Rage, rage against the dying of the light.', author: 'Dylan Thomas' },
  { quote: 'Retirement is not the end of the road. It is the beginning of the open highway.', author: 'Unknown' },
  { quote: 'Tell me and I forget. Teach me and I remember. Involve me and I learn.', author: 'Benjamin Franklin' },
  { quote: 'The man who does not read good books has no advantage over the man who cannot read.', author: 'Mark Twain' },
  { quote: 'Go to the edge of the cliff and jump off. Build your wings on the way down.', author: 'Ray Bradbury' },
]

function Chapter10() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [showAll, setShowAll] = useState(false)

  const nextQuote = useCallback(() => {
    setIdx(prev => {
      let next
      do { next = Math.floor(Math.random() * QUOTES.length) } while (next === prev && QUOTES.length > 1)
      return next
    })
  }, [])

  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        Words have a way of arriving at exactly the right time — when you are deciding whether
        to start something, when you are doubting yourself, when you need a reminder of what
        actually matters. I love the classics. The ones from a century ago that somehow still
        understand today perfectly.
      </p>

      {/* Random quote display */}
      <div className="mb-6">
        <QuoteCard quote={QUOTES[idx].quote} author={QUOTES[idx].author} context={QUOTES[idx].context} />
        <div className="flex justify-center mt-2">
          <button
            onClick={nextQuote}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/40 hover:border-amber-500/60 text-amber-300 font-semibold text-sm transition-all"
          >
            <RefreshCw size={15} />
            Show Another
          </button>
        </div>
      </div>

      <button
        onClick={() => setShowAll(v => !v)}
        className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition-colors mb-4 underline underline-offset-2"
      >
        {showAll ? 'Hide full collection' : `View all ${QUOTES.length} quotes`}
      </button>

      {showAll && (
        <div className="mt-2">
          {QUOTES.map((q, i) => (
            <QuoteCard key={i} quote={q.quote} author={q.author} context={q.context} />
          ))}
        </div>
      )}

      <Callout type="tip" title="Put these on the display">
        The ESP32 display from Chapter 4 is perfect for cycling through quotes. Load them on it
        and leave it on your desk. A small thing — but it adds up over time.
      </Callout>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 11 — Give Back
// ─────────────────────────────────────────────────────────────────────────────
function Chapter11() {
  return (
    <div>
      <div className="p-5 rounded-xl border border-amber-900/50 bg-amber-950/20 mb-6">
        <p className="text-amber-200 text-base leading-relaxed italic">
          "This last topic has changed my life the most — and has been the most rewarding of
          everything in this kit."
        </p>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        You now have something many people never accumulate: time, knowledge, and hard-won
        experience. There are people out there who need exactly what you have. They are everywhere.
        You just have to keep your eyes open to see and find them.
      </p>

      <SectionTitle>How It Started for Me</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Join something — a club, a cause, a community</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              For me it was joining an amateur radio club. Suddenly I was surrounded by people
              of all ages and backgrounds who shared a curiosity. It opened doors I did not
              even know existed. Whatever your interest — there is a community built around it,
              and they are waiting for someone with your experience.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">See3D — 3D printing for the blind</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              I started making donations and prints for See3D — an organization that provides
              tactile 3D printed models for visually impaired individuals. If you get the printer
              bug, this is one of the most direct ways to turn it into something meaningful.
            </p>
            <ResourceLink
              title="See3D.org"
              description="Connecting 3D printing volunteers with visually impaired individuals who benefit from tactile models."
              href="https://see3d.org"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The calls that changed everything</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Over the past year I started weekly hourly calls to two people:{' '}
              <strong className="text-white">a blind individual with a passion for 3D printing</strong>{' '}
              and <strong className="text-white">a 99-year-old Nun who is an active ham radio operator.</strong>{' '}
              They are not exceptions. People like them are everywhere — full of life, full of
              knowledge, waiting for someone to show up and pay attention. One hour a week.
              It does not sound like much. It changes both of you.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The gift that cannot be monetized</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The gifts sent my way through this work cannot be measured in money. Having you in
              my life is one of them. That is what makes it all worth getting up for every
              morning and learning one more thing.
            </p>
            <Callout type="success" title="Just keep moving and learning">
              Do not let anyone persuade you differently. Find your cause. Show up consistently.
              You will do fine — more than fine. And if there is ever anything I can do to help
              you in any way, please do not hesitate to ask.
            </Callout>
          </div>
        </div>
      </div>

      <SectionTitle>Where to Start Looking</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 text-sm">
        {[
          ['Amateur Radio Club', 'ARRL.org — find a local club. Ham radio spans every age and background.'],
          ['See3D', 'If you have a printer, put it to work for someone who can feel but not see your prints.'],
          ['Local Makerspace', 'Share what you know about the Pi, the printer, the display. Someone there needs a mentor.'],
          ['Volunteer Match', 'VolunteerMatch.org — search by skill and location. Your skills are in demand.'],
        ].map(([title, desc]) => (
          <div key={title} className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-amber-400 font-semibold text-xs mb-1">{title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 12 — Never Stop Learning
// ─────────────────────────────────────────────────────────────────────────────
function Chapter12() {
  return (
    <div>
      <div className="p-6 rounded-xl border border-amber-900/50 bg-amber-950/20 mb-8 text-center">
        <Heart size={28} className="text-amber-400 mx-auto mb-3" />
        <p className="text-amber-100 text-lg leading-relaxed font-medium italic">
          "Get up and learn one thing everyday."
        </p>
        <p className="text-amber-500 text-sm mt-2">— Ralph E. Mong Sr. · The only rule that matters.</p>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        The people who age well are not necessarily the healthiest or wealthiest. They are the
        ones who stayed <strong className="text-white">curious.</strong> They kept asking questions.
        They kept starting things. They understood that the mind, like the body, either grows or
        atrophies — and the choice is made every single morning.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        These resources are a starting point — not a syllabus. Follow what pulls at you.
      </p>

      <SectionTitle>Raspberry Pi & Linux</SectionTitle>
      <ResourceLink title="raspberrypi.com/documentation" description="The official Pi docs. Exhaustive, clear, always up to date. Bookmark this." href="https://www.raspberrypi.com/documentation/" />
      <ResourceLink title="The Linux Command Line (free online book)" description="The best introduction to Linux ever written. Free to read in your browser." href="https://linuxcommand.org/tlcl.php" />

      <SectionTitle>GitHub & Version Control</SectionTitle>
      <ResourceLink title="GitHub Skills" description="Free, interactive courses built by GitHub. Learn git and version control hands-on, in your browser." href="https://skills.github.com" />

      <SectionTitle>Electronics & The Display</SectionTitle>
      <ResourceLink title="RandomNerdTutorials" description="Practical ESP32, Arduino, and Pi tutorials. Real projects, real code." href="https://randomnerdtutorials.com" />

      <SectionTitle>3D Printing & Design</SectionTitle>
      <ResourceLink title="MakerWorld — Bambu Community" description="Bambu's model library. Best place for print-ready files and community inspiration." href="https://makerworld.com" />
      <ResourceLink title="OpenSCAD Documentation" description="Code-based 3D design. Start here if you came from a programming background." href="https://openscad.org/documentation.html" />

      <SectionTitle>Health & Longevity</SectionTitle>
      <div className="space-y-2 mb-6">
        {[
          ['Outlive — Peter Attia', 'The most rigorous, practical book on longevity available. Evidence-based, no fluff.'],
          ['Why We Sleep — Matthew Walker', 'Will permanently change how you prioritize sleep.'],
          ['Breath — James Nestor', 'The science of breathing. More interesting than it sounds.'],
          ['Huberman Lab Podcast', 'Free, long-form science on health, sleep, exercise, stress. Zero hype.'],
        ].map(([title, desc]) => (
          <div key={title} className="flex gap-3 bg-gray-900/60 px-4 py-3 rounded-lg border border-gray-800 text-sm">
            <Star size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">{title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Learning Anything</SectionTitle>
      <ResourceLink title="Coursera" description="University courses on everything. Many are free to audit. Python, history, music theory — anything." href="https://www.coursera.org" />
      <ResourceLink title="YouTube" description="The world's largest free university. Every subject, every skill level, every interest." href="https://www.youtube.com" />

      <div className="mt-10 p-6 rounded-xl border border-amber-900/40 bg-gradient-to-br from-amber-950/20 to-gray-900/60 text-center">
        <Sparkles size={20} className="text-amber-400 mx-auto mb-3" />
        <p className="text-gray-200 font-medium mb-3 text-lg">If there is ever anything I can do to help you — in any way — please do not hesitate to ask.</p>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
          One thing, every day. It does not have to be big. A new word. A terminal command.
          A page of a book. One rep more than yesterday. The commitment to stay curious
          compounds — slowly at first, and then in ways that will surprise and astonish you.
        </p>
        <p className="text-amber-500 font-semibold mt-4 text-sm">Just keep moving and learning.</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER CONTENT MAP
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTER_COMPONENTS = {
  1:  Chapter1,
  2:  Chapter2,
  3:  Chapter3,
  4:  Chapter4,
  5:  Chapter5,
  6:  Chapter6,
  7:  Chapter7,
  8:  Chapter8,
  9:  Chapter9,
  10: Chapter10,
  11: Chapter11,
  12: Chapter12,
}

const CHAPTER_SUBTITLES = {
  1:  'Your time, your rules, your next chapter',
  2:  'Version control, cloud backup, and a home for everything worth keeping',
  3:  'A full Linux computer in a keyboard — your sandbox',
  4:  'The ESP32 display, your first IoT project, and real repos to follow',
  5:  'Resistance training, insulin resistance, and listening to your body',
  6:  'Three breathing tools and when to use them',
  7:  'The habits that make sleep actually work',
  8:  'Timing, quality, and learning to listen to your body',
  9:  'The Bambu A1 Mini, OpenSCAD, and the joy of making things',
  10: 'A century of words worth keeping close',
  11: 'The chapter that changed everything',
  12: 'The only commitment that matters',
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETION SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function CompletionScreen({ onRestart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex items-center justify-center animate-pulse">
          <Trophy size={44} className="text-amber-400" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles size={20} className="text-yellow-400" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-white mb-3">You made it through.</h2>
      <p className="text-amber-400 font-mono text-lg mb-8">But this is a beginning, not an end.</p>

      <div className="max-w-lg text-gray-300 leading-relaxed mb-8 space-y-3">
        <p>
          You have got the tools, the knowledge, and the disposition — the one about waking up
          every day to learn something new.
        </p>
        <p>
          Everything in this kit is meant to be opened, broken, modified, and built on.
          That is the whole point.
        </p>
        <p className="text-amber-300 font-medium">
          Just keep moving and learning. And if you ever need anything — ask.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 w-full max-w-md mb-10 text-sm">
        {[
          ['GitHub account is set up', 'Chapter 2'],
          ['The Pi is running', 'Chapter 3'],
          ['The display has a project', 'Chapter 4'],
          ['Movement is a daily habit', 'Chapter 5'],
          ['Breathing is in the toolkit', 'Chapter 6'],
          ['Sleep habits are locked in', 'Chapter 7'],
          ['Eating with intention', 'Chapter 8'],
          ['First print is in progress', 'Chapter 9'],
          ['Good words are close by', 'Chapter 10'],
          ['A cause has been found', 'Chapter 11'],
        ].map(([task, chapter]) => (
          <div
            key={task}
            className="flex items-center gap-2 bg-gray-900/60 border border-amber-900/60 rounded-lg px-3 py-2 text-left"
          >
            <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
            <div>
              <p className="text-gray-200">{task}</p>
              <p className="text-gray-600 text-xs">{chapter}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
      >
        Back to the beginning
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ current, completed, onSelect, onClose, isMobile }) {
  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Sunrise size={18} className="text-amber-400" />
          <span className="text-amber-400 font-mono font-bold text-sm tracking-wider">
            SURVIVAL KIT
          </span>
        </div>
        {isMobile && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center gap-2 px-2 mb-1">
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${(completed.size / CHAPTERS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-mono shrink-0">
            {completed.size}/{CHAPTERS.length}
          </span>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {CHAPTERS.map((ch) => {
          const isActive = current === ch.id
          const isDone = completed.has(ch.id)
          const Icon = ch.icon
          return (
            <li key={ch.id}>
              <button
                onClick={() => { onSelect(ch.id); if (isMobile) onClose?.() }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-500/30 text-white'
                    : 'hover:bg-gray-800/60 text-gray-400 border border-transparent hover:text-gray-200'
                }`}
              >
                <div className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${
                  isDone
                    ? 'bg-amber-500/20 text-amber-400'
                    : isActive
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {isDone ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-gray-600">{String(ch.id).padStart(2, '0')}</span>
                    <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {ch.title}
                    </span>
                  </div>
                </div>
                {isDone && <span className="shrink-0 text-amber-500"><Check size={13} /></span>}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="px-4 py-3 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">
          Retirement Survival Kit · 12 Chapters
        </p>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState(1)
  const [completed, setCompleted] = useState(new Set())
  const [showCompletion, setShowCompletion] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const markComplete = useCallback(() => {
    const next = new Set(completed)
    next.add(current)
    setCompleted(next)
    if (next.size === CHAPTERS.length) {
      setShowCompletion(true)
    } else if (current < CHAPTERS.length) {
      setCurrent(current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [current, completed])

  const goTo = useCallback((id) => {
    setCurrent(id)
    setShowCompletion(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleRestart = useCallback(() => {
    setCompleted(new Set())
    setCurrent(1)
    setShowCompletion(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const isComplete = completed.has(current)
  const ChapterContent = CHAPTER_COMPONENTS[current]
  const chapterMeta = CHAPTERS[current - 1]
  const ChapterIcon = chapterMeta.icon

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans flex">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-gray-900 border-r border-gray-800 fixed left-0 top-0 bottom-0 z-30">
        <Sidebar current={current} completed={completed} onSelect={goTo} />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 bg-gray-900 border-r border-gray-800 flex flex-col z-10">
            <Sidebar
              current={current}
              completed={completed}
              onSelect={goTo}
              onClose={() => setSidebarOpen(false)}
              isMobile
            />
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <Sunrise size={16} className="text-amber-400" />
            <span className="text-amber-400 font-mono font-bold text-xs tracking-wider">
              SURVIVAL KIT
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span className="font-mono text-amber-500">{String(current).padStart(2, '0')}</span>
            <ChevronRight size={14} />
            <span>{chapterMeta.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => goTo(ch.id)}
                  title={ch.title}
                  className={`w-2 h-2 rounded-full transition-all ${
                    completed.has(ch.id)
                      ? 'bg-amber-500'
                      : ch.id === current
                      ? 'bg-amber-500/50 ring-1 ring-amber-500'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-mono ml-1">
              {completed.size}/{CHAPTERS.length}
            </span>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-3xl w-full mx-auto">
          {showCompletion ? (
            <CompletionScreen onRestart={handleRestart} />
          ) : (
            <>
              {/* Chapter header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    Chapter {current} of {CHAPTERS.length}
                  </span>
                  {isComplete && (
                    <span className="flex items-center gap-1 text-xs text-amber-500 bg-amber-950/50 border border-amber-800/50 px-2 py-0.5 rounded-full">
                      <Check size={10} /> Complete
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-3 mb-2">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mt-1">
                    <ChapterIcon size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {chapterMeta.title}
                    </h1>
                    <p className="text-gray-400 mt-0.5">{CHAPTER_SUBTITLES[current]}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isComplete ? 'bg-amber-500 w-full' : 'bg-amber-500/40 w-1/2'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-mono shrink-0">
                    {isComplete ? 'Done' : `${chapterMeta.steps} steps`}
                  </span>
                </div>
              </div>

              {/* Chapter content */}
              <div className="prose-content">
                <ChapterContent />
              </div>

              {/* Bottom actions */}
              <div className="mt-12 pt-6 border-t border-gray-800 flex items-center gap-3 flex-wrap">
                {current > 1 && (
                  <button
                    onClick={() => goTo(current - 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all text-sm"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                )}
                <div className="flex-1" />
                {!isComplete ? (
                  <button
                    onClick={markComplete}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50"
                  >
                    <CheckCircle2 size={16} />
                    Mark Complete
                  </button>
                ) : (
                  current < CHAPTERS.length ? (
                    <button
                      onClick={() => goTo(current + 1)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-900/30"
                    >
                      Next Chapter
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCompletion(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all"
                    >
                      <Trophy size={16} />
                      View Completion
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-gray-800/60 py-4 px-6 text-center">
          <p className="text-xs text-gray-700 font-mono">
            Retirement Survival Kit · Get up and learn one thing everyday. — Ralph E. Mong Sr.
          </p>
        </footer>
      </div>
    </div>
  )
}
