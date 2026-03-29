import { useState, useCallback } from 'react'
import {
  CheckCircle2,
  ChevronDown,
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
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER METADATA
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1,  title: 'Welcome to Day One',       icon: Sunrise,  steps: 3 },
  { id: 2,  title: 'Your Raspberry Pi 400',    icon: Cpu,      steps: 5 },
  { id: 3,  title: 'The Tiny Display',         icon: Monitor,  steps: 4 },
  { id: 4,  title: 'Move Every Day',           icon: Dumbbell, steps: 5 },
  { id: 5,  title: 'Breathe',                  icon: Wind,     steps: 4 },
  { id: 6,  title: 'Sleep Well',               icon: Moon,     steps: 5 },
  { id: 7,  title: 'Eat Well',                 icon: Utensils, steps: 5 },
  { id: 8,  title: 'Make Things',              icon: Printer,  steps: 4 },
  { id: 9,  title: 'Words to Live By',         icon: Star,     steps: 1 },
  { id: 10, title: 'Never Stop Learning',      icon: BookOpen, steps: 1 },
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
          "Wake up every day and learn something new."
        </p>
        <p className="text-amber-500 text-sm mt-2">— Words to live by</p>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        You didn't retire. You <strong className="text-white">graduated.</strong> After years of
        showing up, solving problems, and leading people through the hard stuff — you've earned
        something rare: <strong className="text-white">unstructured time.</strong> Time that belongs
        entirely to you.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        This kit isn't a to-do list. It's a collection of things worth exploring — a little tech,
        a little health, a lot of curiosity. You don't have to do any of it in order. You don't
        have to finish it. The only rule is: stay curious.
      </p>

      <SectionTitle>What's in the Kit</SectionTitle>

      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        {[
          { icon: <Cpu size={18} className="text-amber-400" />, title: 'Raspberry Pi 400', desc: 'A full Linux computer built into a keyboard. Yours to tinker with.' },
          { icon: <Monitor size={18} className="text-amber-400" />, title: 'ESP32 Display', desc: 'A tiny 2.8" touchscreen microcontroller. Make it show anything you want.' },
          { icon: <Dumbbell size={18} className="text-amber-400" />, title: 'Resistance Bands', desc: 'The best gym equipment that fits in a drawer.' },
          { icon: <Printer size={18} className="text-amber-400" />, title: 'Bambu A1 Mini Access', desc: '3D printer. If you can imagine it, you can probably print it.' },
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
            <p className="text-gray-200 font-medium mb-1">Your body is the most important machine you own</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every chapter on movement, breathing, sleep, and food in this kit comes from
              real experience — a year of learning to listen, adjust, and take care of the
              machine that carries you through everything else.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Technology is a creativity tool, not a job</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The Pi, the display, and the printer aren't tasks. They're invitations.
              When you're curious about something — how does WiFi work? can I print a better
              phone stand? — these give you the means to find out.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The goal is to never stop</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Not never stop working. Never stop <em className="text-gray-200">learning.</em> The
              people who thrive in retirement aren't the ones who finally rest —
              they're the ones who finally get to chase what they were always curious about.
            </p>
            <Callout type="tip" title="The one commitment worth making">
              Every morning: pick one thing to learn. It doesn't have to be big. A new word.
              A new recipe. A new command. One thing, every day. That's it.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 2 — Your Raspberry Pi 400
// ─────────────────────────────────────────────────────────────────────────────
function Chapter2() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        The <strong className="text-white">Raspberry Pi 400</strong> is a full Linux computer built
        into a compact keyboard. It runs on a chip the size of a thumbnail and costs less than a
        dinner out — but it can browse the web, run code, serve websites, and do almost anything
        a laptop can do. It's the perfect sandbox for learning without the fear of breaking anything.
      </p>

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
              Raspberry Pi OS will guide you through: country, language, timezone, password, and
              WiFi. Follow the prompts — it takes about 2 minutes. The Pi will reboot once when
              it's done. That's normal.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Open the Terminal — this is where the fun starts</p>
            <p className="text-gray-400 text-sm mb-2">
              Look for the terminal icon in the taskbar at the top. Click it. You'll see a prompt
              like this:
            </p>
            <CodeBlock lang="bash" code={`pi@raspberrypi:~$ _`} />
            <p className="text-gray-400 text-sm">
              You're now talking directly to the computer. Type commands, press Enter, things happen.
              This is where Linux lives.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Update everything first</p>
            <p className="text-gray-400 text-sm mb-2">
              First thing to do on any new Linux system: update the software. This takes 5–10
              minutes but only needs doing once.
            </p>
            <CodeBlock lang="bash" code={`sudo apt update && sudo apt upgrade -y`} />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Try these to get comfortable</p>
            <p className="text-gray-400 text-sm mb-3">A few commands worth knowing:</p>
            <div className="space-y-2">
              {[
                ['ls', 'List files in the current folder'],
                ['pwd', 'Show where you are in the filesystem'],
                ['cd Desktop', 'Navigate to a folder'],
                ['python3 --version', 'Check your Python version'],
                ['hostname -I', 'Show your Pi\'s IP address on the network'],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-3 text-sm">
                  <code className="shrink-0 text-amber-300 bg-gray-900 border border-gray-700 px-2 py-0.5 rounded font-mono text-xs">{cmd}</code>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
            <Callout type="tip" title="The Pi is yours to break">
              You can't permanently damage a Raspberry Pi through software. If something goes
              wrong, you flash a new SD card and start fresh. Experiment freely.
            </Callout>
          </div>
        </div>
      </div>

      <SectionTitle>What to Explore Next</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 text-sm">
        {[
          ['Learn Python', 'The Pi comes with Python. It\'s the most beginner-friendly programming language ever made.'],
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
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 3 — The Tiny Display
// ─────────────────────────────────────────────────────────────────────────────
function Chapter3() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        That little yellow board with the touchscreen? That's an{' '}
        <strong className="text-white">ESP32</strong> — a tiny microcontroller with built-in WiFi
        and Bluetooth, paired with a 2.8" color touchscreen. The maker community calls it the
        "Cheap Yellow Display" (CYD). Don't let the name fool you — it's remarkably capable.
      </p>
      <Callout type="info" title="This is a microcontroller, not a computer">
        Unlike the Pi, the ESP32 doesn't run an OS. You write a program, upload it, and it runs
        that one program continuously. It's simpler — and in some ways more satisfying.
      </Callout>

      <SectionTitle>What It Can Do</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        {[
          ['Quote Display', 'Show your favorite quotes on rotation. Leave it on your desk.'],
          ['Weather Station', 'Pull weather data from an API and display it in real time.'],
          ['Always-On Clock', 'A custom clock face with date, time, and whatever else you want.'],
          ['Pi Dashboard', 'Display live stats from your Raspberry Pi (temp, CPU, IP address).'],
        ].map(([title, desc]) => (
          <div key={title} className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-amber-400 font-semibold text-xs mb-1">{title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

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
              Or download the latest version from{' '}
              <span className="text-amber-400 font-mono">arduino.cc/en/software</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Add ESP32 board support</p>
            <p className="text-gray-400 text-sm mb-2">
              Arduino IDE doesn't know about ESP32 boards by default. Add it:
            </p>
            <ol className="space-y-1.5 text-sm text-gray-400 ml-2">
              <li>Open Arduino IDE → <strong className="text-white">File → Preferences</strong></li>
              <li>In "Additional boards manager URLs" paste this URL:</li>
            </ol>
            <CodeBlock lang="URL" code={`https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`} />
            <ol className="space-y-1.5 text-sm text-gray-400 ml-2" start={3}>
              <li>Go to <strong className="text-white">Tools → Board → Boards Manager</strong></li>
              <li>Search for "esp32" and install the one by Espressif Systems</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Connect the display via USB</p>
            <p className="text-gray-400 text-sm mb-2">
              Plug the ESP32 into your Pi with a USB-C cable. Then in Arduino IDE:
            </p>
            <ol className="space-y-1 text-sm text-gray-400 ml-2">
              <li><strong className="text-white">Tools → Board → ESP32 Arduino → ESP32 Dev Module</strong></li>
              <li><strong className="text-white">Tools → Port → /dev/ttyUSB0</strong> (or similar)</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Find tutorials and community projects</p>
            <p className="text-gray-400 text-sm mb-2">
              RandomNerdTutorials has the best free guides for this exact display board.
            </p>
            <ResourceLink
              title="CYD Tutorials — RandomNerdTutorials"
              description="Step-by-step guides for the ESP32 Cheap Yellow Display: wiring, programming, touch input, WiFi, and project walkthroughs."
              href="https://randomnerdtutorials.com/?s=Cheap+Yellow+Display"
            />
            <Callout type="tip" title="First project idea">
              Build a quote display. Upload a list of your favorite quotes, have it cycle through
              one every few minutes. Set it on your desk. It's a small thing that becomes
              genuinely nice to have around.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 4 — Move Every Day
// ─────────────────────────────────────────────────────────────────────────────
function Chapter4() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Retirement is when most people slow down physically — and also when the cost of that
        slowdown starts compounding. Muscle mass, balance, bone density — they all respond to
        one thing above everything else: <strong className="text-white">resistance training.</strong>{' '}
        And resistance bands are the most underrated, most convenient way to do it.
      </p>
      <Callout type="info" title="Why bands, not weights?">
        Bands match your strength curve — the resistance increases as you extend, which is actually
        more effective than a fixed weight. They're also gentle on joints, don't require a gym,
        and fit in a pocket. They're not a compromise. They're the tool.
      </Callout>

      <SectionTitle>How to Start</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Start easier than you think you need to</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Use the lightest band in the kit. Your goal on day one isn't to feel a burn —
              it's to learn the movement patterns. Form before load, always. You can add
              resistance next week.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Three anchoring options</p>
            <div className="grid gap-2 text-sm">
              {[
                ['Door anchor', 'Most bands include a door anchor — close it in a door hinge. Solid for rows and presses.'],
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
              These cover your whole body. 3 sets of 10–15 reps each, 3 times a week is plenty to start.
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
              There's a difference between the <em className="text-gray-200">burn of working a muscle</em> and
              the <em className="text-gray-200">signal of something wrong.</em> Learn to tell them apart.
              If a joint hurts (sharp, stabbing), stop. If a muscle is fatiguing (burning, pumped),
              that's the work. Never push through joint pain.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Progress slowly and deliberately</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              When 15 reps feels easy for two sessions in a row, move to the next band.
              Slow progression over months is what builds lasting strength. There's no trophy
              for going heavy too fast — just injuries.
            </p>
            <Callout type="success" title="The real goal">
              You're not training for aesthetics. You're training to be strong, mobile, and
              independent at 70, 80, and beyond. Every rep is an investment in your future self.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 5 — Breathe
// ─────────────────────────────────────────────────────────────────────────────
function Chapter5() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Breathing is the one automatic process you can take manual control of — and when you do,
        you can directly influence your heart rate, stress response, and nervous system state.
        It sounds too simple to matter. It isn't.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        These aren't relaxation techniques from a wellness app. They're tools. Each one does
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
        Repeat 4–6 cycles. Do it before a difficult conversation, after stressful news, or
        anytime your mind is racing.
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
            can meaningfully shorten the time it takes to fall asleep.
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
            This is the fastest known way to reduce acute stress. One or two sighs, and your
            heart rate drops noticeably. Your body does this automatically when you cry — now
            you can do it on purpose.
          </p>
        </div>
      </div>

      <SectionTitle>Daily Practice</SectionTitle>
      <div className="flex gap-4">
        <StepNumber n={3} />
        <div>
          <p className="text-gray-200 font-medium mb-1">5 minutes, twice a day</p>
          <p className="text-gray-400 text-sm mb-3">
            Morning: box breathing after waking up. Evening: 4-7-8 before sleep. That's it.
            The effects compound over weeks.
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <StepNumber n={4} />
        <div>
          <p className="text-gray-200 font-medium mb-1">Nose breathing vs. mouth breathing</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Try to breathe through your nose during the day, not your mouth. Nasal breathing
            filters and humidifies air, produces nitric oxide (which dilates blood vessels), and
            activates your parasympathetic system. It's a small habit with outsized effects.
          </p>
          <Callout type="tip" title="Worth reading">
            "Breath" by James Nestor. Not a self-help book — it's a science-backed deep dive into
            what modern humans have gotten wrong about breathing, and how to fix it. Genuinely
            surprising.
          </Callout>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 6 — Sleep Well
// ─────────────────────────────────────────────────────────────────────────────
function Chapter6() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Sleep isn't recovery time. It's when your brain flushes out metabolic waste, consolidates
        memory, repairs tissue, and regulates the hormones that control hunger, stress, and mood.
        Bad sleep makes everything else harder. Good sleep makes everything else easier.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Most sleep problems aren't about how long you sleep — they're about the habits and
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
              a biological clock, and inconsistency is what creates that "tired but can't sleep"
              feeling. The wake time, not the sleep time, is what you control first.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Morning light within 30 minutes of waking</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Go outside — even just a few minutes on the porch. Morning light sets your cortisol
              timing (giving you energy when you need it) and signals your melatonin system for
              later that evening. This is the single highest-leverage sleep habit.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Cool, dark room</p>
            <p className="text-gray-400 text-sm mb-2">
              Your core body temperature drops slightly to initiate sleep. A cool room helps it do that.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-center">
                <p className="text-amber-400 font-bold text-lg">65–68°F</p>
                <p className="text-gray-500 text-xs">18–20°C</p>
              </div>
              <p className="text-gray-400">Optimal room temperature range. Most people sleep too warm.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">No screens 60 minutes before bed</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Blue-spectrum light from screens suppresses melatonin. If you can't avoid screens,
              use blue light glasses or enable night mode. But the real fix is putting the phone
              in another room. The news will still be there tomorrow.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Build a wind-down signal</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your brain learns cues. A consistent 30-minute routine before bed — dim lights,
              a book (paper), maybe chamomile tea — trains your nervous system to recognize
              that sleep is coming. After a few weeks, the routine itself triggers drowsiness.
            </p>
            <Callout type="tip" title="Worth reading">
              "Why We Sleep" by Matthew Walker. Alarming in the best way. It will permanently
              change how you think about those extra work hours that came at the cost of sleep.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 7 — Eat Well
// ─────────────────────────────────────────────────────────────────────────────
function Chapter7() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Nutrition doesn't have to be complicated. After a year of paying attention to what actually
        worked — not what was trending — most of it comes down to a handful of principles. Not rules.
        Principles. There's a difference.
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
              Protein is the most important macronutrient, especially as you age. It preserves
              muscle mass, keeps you full longer, and has the highest thermic effect (your body
              burns calories just digesting it). Aim for a palm-sized portion of protein at
              every meal: eggs, chicken, fish, Greek yogurt, cottage cheese, beans.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Eat real food</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              If it has more than five ingredients, or ingredients you can't pronounce, eat it
              less often. This isn't about being strict — it's about the 80/20 reality that
              ultra-processed food is engineered to make you eat more than you need.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={3} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Hydration before hunger</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dehydration frequently signals as hunger. Before you snack, drink a glass of
              water and wait 10 minutes. Also: coffee and tea count toward hydration — the
              diuretic effect is weaker than the water content. You don't need to drink
              eight glasses of plain water if you're already eating water-dense foods and
              drinking other fluids.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-1">Don't drink your calories</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Liquid calories don't trigger satiety the same way solid food does. Juice,
              soda, fancy coffee drinks — they're easy to overconsume. Water, black coffee,
              and tea are the defaults. Save your calories for food you can chew.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={5} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The 80/20 rule</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Eat well 80% of the time and stop thinking about the other 20%. The person who
              eats impeccably all week and then enjoys a real meal with people they love on
              Saturday is far better off than the person who is perfect for three weeks and
              then gives up entirely. Consistency over perfection, always.
            </p>
            <Callout type="success" title="The simplest possible summary">
              Mostly real food. Protein every meal. Drink enough water. Don't stress the rest.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 8 — Make Things
// ─────────────────────────────────────────────────────────────────────────────
function Chapter8() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-4">
        The <strong className="text-white">Bambu Lab A1 Mini</strong> is available for you to
        experiment with. It's one of the most capable — and most user-friendly — desktop 3D
        printers available. If you've never used a 3D printer before, you're in for a good
        surprise.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        3D printing isn't just for engineers. It's for anyone who has ever thought: "I wish I
        had a thing that does X" — and then made it.
      </p>

      <SectionTitle>How It Works</SectionTitle>

      <div className="space-y-5">
        <div className="flex gap-4">
          <StepNumber n={1} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The basics</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              You download or design a 3D model (an .STL or .3MF file), open it in slicing
              software that converts it into printer instructions, and send it to the printer.
              The printer melts plastic filament and builds your object layer by layer.
              The whole process — download to object in hand — takes minutes to learn.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={2} />
          <div>
            <p className="text-gray-200 font-medium mb-1">The Bambu ecosystem</p>
            <p className="text-gray-400 text-sm mb-3">Three apps, three use cases:</p>
            <div className="space-y-2">
              {[
                ['Bambu Studio', 'Desktop slicer. Import a model, set settings, send to printer. This is your main tool.'],
                ['Bambu Handy', 'Phone app. Monitor prints, start jobs, see the camera feed remotely.'],
                ['MakerWorld', 'Bambu\'s community. Millions of free, print-ready models uploaded by other users.'],
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
            <ResourceLink
              title="MakerWorld"
              description="Bambu's model library. Optimized profiles, community ratings, direct send-to-printer."
              href="https://makerworld.com"
            />
            <ResourceLink
              title="Printables"
              description="Prusa's community platform. Huge library of free models, well organized by category."
              href="https://www.printables.com"
            />
            <ResourceLink
              title="Thingiverse"
              description="The original. Millions of models. Older interface but massive selection."
              href="https://www.thingiverse.com"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <StepNumber n={4} />
          <div>
            <p className="text-gray-200 font-medium mb-2">First print ideas</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                'A phone stand or charging dock for your desk',
                'A case or mount for the Raspberry Pi 400',
                'A holder for your resistance bands',
                'A small stand for the ESP32 display',
                'Cable organizers and clips — endlessly useful',
                'Something purely for fun: a nameplate, a small sculpture, anything',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Callout type="tip" title="Start with someone else's model">
              Don't design from scratch on day one. Download something that already exists,
              print it, hold it in your hand. That moment — seeing a digital file become a
              physical object — is worth experiencing before you start designing.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 9 — Words to Live By
// ─────────────────────────────────────────────────────────────────────────────
const QUOTES = [
  {
    quote: 'Wake up every day and learn something new.',
    author: 'A grandfather worth listening to',
    context: 'The motto that started all of this',
  },
  {
    quote: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin',
  },
  {
    quote: 'Life is either a daring adventure or nothing at all.',
    author: 'Helen Keller',
  },
  {
    quote: 'Take care of your body. It\'s the only place you have to live.',
    author: 'Jim Rohn',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius',
  },
  {
    quote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
  },
  {
    quote: 'Do not go gentle into that good night. Rage, rage against the dying of the light.',
    author: 'Dylan Thomas',
  },
  {
    quote: 'We do not stop playing because we grow old. We grow old because we stop playing.',
    author: 'George Bernard Shaw',
  },
  {
    quote: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
  },
  {
    quote: 'Retirement is not the end of the road. It is the beginning of the open highway.',
    author: 'Unknown',
  },
]

function Chapter9() {
  return (
    <div>
      <p className="text-gray-300 leading-relaxed mb-6">
        Words have a way of arriving at exactly the right time — when you're deciding whether to
        start something new, when you're doubting yourself, when you need a reminder of what
        actually matters. These are the ones worth keeping close.
      </p>
      {QUOTES.map((q, i) => (
        <QuoteCard key={i} quote={q.quote} author={q.author} context={q.context} />
      ))}
      <Callout type="tip" title="Make the display show these">
        The ESP32 display from Chapter 3 is perfect for cycling through quotes. Load these on it
        and leave it on your desk. A small thing, but it adds up.
      </Callout>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 10 — Never Stop Learning
// ─────────────────────────────────────────────────────────────────────────────
function Chapter10() {
  return (
    <div>
      <div className="p-6 rounded-xl border border-amber-900/50 bg-amber-950/20 mb-8 text-center">
        <Heart size={28} className="text-amber-400 mx-auto mb-3" />
        <p className="text-amber-100 text-lg leading-relaxed font-medium italic">
          "Wake up every day and learn something new."
        </p>
        <p className="text-amber-500 text-sm mt-2">The only rule that matters.</p>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        The people who age well aren't necessarily the healthiest or wealthiest. They're the ones
        who stayed <strong className="text-white">curious.</strong> They kept asking questions.
        They kept starting things. They understood that the mind, like the body, either grows or
        atrophies — and the choice is made every single morning.
      </p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Retirement is permission to finally follow what you were always curious about but never
        had time for. These resources are a starting point — not a syllabus.
      </p>

      <SectionTitle>Raspberry Pi & Linux</SectionTitle>
      <ResourceLink
        title="raspberrypi.com/documentation"
        description="The official Pi docs. Exhaustive, clear, and always up to date. Bookmark this."
        href="https://www.raspberrypi.com/documentation/"
      />
      <ResourceLink
        title="The Linux Command Line (free online book)"
        description="The best introduction to Linux and the terminal ever written. Free to read in your browser."
        href="https://linuxcommand.org/tlcl.php"
      />

      <SectionTitle>Electronics & The Display</SectionTitle>
      <ResourceLink
        title="RandomNerdTutorials"
        description="Practical ESP32, Arduino, and Raspberry Pi tutorials. Real projects, real code."
        href="https://randomnerdtutorials.com"
      />

      <SectionTitle>3D Printing</SectionTitle>
      <ResourceLink
        title="MakerWorld — Bambu Community"
        description="Bambu's model library and community. Best place for print-ready files."
        href="https://makerworld.com"
      />

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
      <ResourceLink
        title="Coursera"
        description="University courses on everything. Many are free to audit. Learn Python, history, music theory — anything."
        href="https://www.coursera.org"
      />
      <ResourceLink
        title="YouTube"
        description="The world's largest free university. Every subject, every skill level, every interest. Search anything."
        href="https://www.youtube.com"
      />

      <div className="mt-10 p-6 rounded-xl border border-gray-700 bg-gray-900/40 text-center">
        <Sparkles size={20} className="text-amber-400 mx-auto mb-3" />
        <p className="text-gray-200 font-medium mb-2">One thing, every day.</p>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
          It doesn't have to be big. A new word. A terminal command. A page of a book. One rep
          more than yesterday. The commitment to stay curious compounds — slowly at first, and
          then in ways that surprise you.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER CONTENT MAP
// ─────────────────────────────────────────────────────────────────────────────
const CHAPTER_COMPONENTS = {
  1: Chapter1,
  2: Chapter2,
  3: Chapter3,
  4: Chapter4,
  5: Chapter5,
  6: Chapter6,
  7: Chapter7,
  8: Chapter8,
  9: Chapter9,
  10: Chapter10,
}

const CHAPTER_SUBTITLES = {
  1:  'Your time, your rules, your next chapter',
  2:  'A full Linux computer in a keyboard — yours to explore',
  3:  'The ESP32 display and what you can do with it',
  4:  'Resistance band training and listening to your body',
  5:  'Three breathing tools and when to use them',
  6:  'The habits that make sleep actually work',
  7:  'The principles that cut through the noise',
  8:  'The Bambu A1 Mini and the joy of making things',
  9:  'Words worth keeping close',
  10: 'The only commitment that matters',
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
          You've got the tools, the knowledge, and — more importantly — the disposition.
          The one about waking up every day to learn something new.
        </p>
        <p>
          Everything in this kit is meant to be opened, broken, modified, and built on.
          That's the whole point.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 w-full max-w-md mb-10 text-sm">
        {[
          ['The Pi is set up and running', 'Chapter 2'],
          ['The display has a project idea', 'Chapter 3'],
          ['Movement is a daily habit', 'Chapter 4'],
          ['Breathing is in the toolkit', 'Chapter 5'],
          ['Sleep habits are locked in', 'Chapter 6'],
          ['Eating principles, not rules', 'Chapter 7'],
          ['First print is in progress', 'Chapter 8'],
          ['Good words are close by', 'Chapter 9'],
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
          Retirement Survival Kit · 10 Chapters
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
            Retirement Survival Kit · Wake up every day and learn something new.
          </p>
        </footer>
      </div>
    </div>
  )
}
