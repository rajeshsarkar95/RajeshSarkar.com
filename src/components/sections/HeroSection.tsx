import React, { useEffect, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiRedux,
  SiGit,
  SiGithub,
  SiVercel,
  SiMysql,
  SiSocketdotio,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri"

interface Stat {
  number: string;
  label: string;
}

interface OrbitBadge {
  label: string;
  icon: IconType;
  color: string;
  angle: number;
}

interface OrbitRing {
  size: number; 
  duration: number; 
  reverse?: boolean;
  badges: OrbitBadge[];
}

const STATS: Stat[] = [
  { number: "2+", label: "Years Exp." },
  { number: "5+", label: "Projects" },
  { number: "15+", label: "Technologies" },
];

const ORBIT_RINGS: OrbitRing[] = [
  {
    size: 100,
    duration: 90,
    badges: [
      { label: "React", icon: SiReact, color: "#61dafb", angle: -90 },
      { label: "Next.js", icon: SiNextdotjs, color: "#a1a1aa", angle: -50 },
      { label: "JavaScript", icon: SiJavascript, color: "#f7df1e", angle: -10 },
      { label: "Node.js", icon: SiNodedotjs, color: "#339933", angle: 30 },
      { label: "Express", icon: SiExpress, color: "#a1a1aa", angle: 70 },
      { label: "MongoDB", icon: SiMongodb, color: "#47a248", angle: 110 },
      { label: "TypeScript", icon: SiTypescript, color: "#3178c6", angle: 150 },
      { label: "Redux", icon: SiRedux, color: "#764abc", angle: 190 },
      { label: "AWS", icon: FaAws, color: "#ff9900", angle: 230 },
    ],
  },
  {
    size: 74,
    duration: 60,
    reverse: false,
    badges: [
      { label: "Git", icon: SiGit, color: "#f05032", angle: -60 },
      { label: "GitHub", icon: SiGithub, color: "#a1a1aa", angle: 0 },
      { label: "Vercel", icon: SiVercel, color: "#a1a1aa", angle: 60 },
      { label: "MySQL", icon: SiMysql, color: "#00758f", angle: 120 },
      { label: "Socket.IO", icon: SiSocketdotio, color: "#a1a1aa", angle: 180 },
      { label: "OpenAI", icon: RiOpenaiFill, color: "#10a37f", angle: 240 },
    ],
  },
];

const reveal = (delay: string) => ({ "--delay": delay }) as CSSProperties;
const useCountUp = (target: string, durationMs = 1400) => {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const numeric = parseInt(target.replace(/\D/g, ""), 10) || 0;
    const suffix = target.replace(/\d/g, "");
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(eased * numeric)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return display;
};
const CodeWindow = () => (
  <div
    className="cw-root relative w-full max-w-[420px] aspect-square"
    style={{ containerType: "inline-size" }}
  >
    <style>{`
      @keyframes cw-spin { to { transform: rotate(360deg); } }
      @keyframes cw-spin-rev { to { transform: rotate(-360deg); } }
      @keyframes cw-ring-in { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes cw-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: scale(1); } }
      @keyframes cw-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      .cw-root:hover .cw-ring,
      .cw-root:hover .cw-counter { animation-play-state: paused; }
      @media (prefers-reduced-motion: reduce) {
        .cw-ring, .cw-counter, .cw-bob, .cw-pop, .cw-ring-in { animation: none !important; }
      }
    `}</style>
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {ORBIT_RINGS.map((ring, ri) => (
        <div key={ri} className="absolute inset-0 flex items-center justify-center">
          <div
            className="cw-ring-in relative"
            style={{
              width: `${ring.size}%`,
              height: `${ring.size}%`,
              animation: `cw-ring-in .9s cubic-bezier(.16,1,.3,1) both ${ri * 0.15}s`,
            }}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--border2)]" />

            <div
              className="cw-ring absolute inset-0"
              style={{ animation: `${ring.reverse ? "cw-spin-rev" : "cw-spin"} ${ring.duration}s linear infinite` }}
            >
              {ring.badges.map((b, bi) => {
                const rad = (b.angle * Math.PI) / 180;
                return (
                  <div
                    key={b.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
                  >
                    <div
                      className="cw-counter"
                      style={{ animation: `${ring.reverse ? "cw-spin" : "cw-spin-rev"} ${ring.duration}s linear infinite` }}
                    >
                      <div
                        className="cw-pop"
                        style={{ animation: `cw-pop .6s cubic-bezier(.16,1,.3,1) both ${0.6 + ri * 0.2 + bi * 0.08}s` }}
                      >
                        <div
                          className="cw-bob"
                          style={{ animation: `cw-bob ${4 + (bi % 3)}s ease-in-out infinite ${-bi}s` }}
                        >
                          <span
                            className="flex items-center whitespace-nowrap rounded-[0.9em] border border-[var(--border2)] bg-[var(--bg2)]/80 font-mono text-[var(--text2)] backdrop-blur-xl shadow-2xl"
                            style={{ fontSize: "2.6cqw", padding: "0.45em 0.8em", gap: "0.6em" }}
                          >
                            <b.icon
                              aria-hidden="true"
                              className="shrink-0"
                              style={{ width: "1.25em", height: "1.25em", color: b.color }}
                            />
                            {b.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div
      role="img"
      aria-label="Code editor showing Rajesh Sarkar's developer profile"
      className="absolute left-1/2 top-1/2 z-10 flex h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[18px] border border-[var(--border2)] bg-[var(--surface)] shadow-2xl backdrop-blur-xl"
      style={{ fontSize: "2.4cqw" }}
    >
      <div className="absolute inset-[-1px] -z-10 rounded-[18px] bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent2)]/10 animate-gradient-shift bg-[length:200%_200%] motion-reduce:animate-none" />
      <div
        className="relative flex shrink-0 items-center border-b border-[var(--border2)] bg-white/[0.03]"
        style={{ padding: "0.7em 1em" }}
      >
        <div className="flex" style={{ gap: "0.55em" }} aria-hidden="true">
          <span className="rounded-full bg-[#ff5f57]/80" style={{ width: "0.8em", height: "0.8em" }} />
          <span className="rounded-full bg-[#febc2e]/80" style={{ width: "0.8em", height: "0.8em" }} />
          <span className="rounded-full bg-[#28c840]/80" style={{ width: "0.8em", height: "0.8em" }} />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono tracking-wide text-[var(--text3)]">
          developer.ts
        </span>
      </div>

  
      <div
        className="flex-1 select-none overflow-hidden font-mono text-[var(--text3)]"
        style={{ padding: "1em 1.2em", lineHeight: 1.7 }}
      >
        <div>
          <span className="text-[#a78bfa]">const</span> <span className="text-[#38bdf8]">dev</span> = {"{"}
        </div>
        <div style={{ paddingLeft: "1.4em" }}>
          <div>name: <span className="text-[#34d399]">&quot;Rajesh Sarkar&quot;</span>,</div>
          <div>role: <span className="text-[#34d399]">&quot;Full Stack&quot;</span>,</div>
          <div>exp: <span className="text-[var(--orange)]">2</span>, <span className="italic text-[#4a4a65]">{"// years"}</span></div>
          <div>stack: [<span className="text-[#38bdf8]">React</span>, <span className="text-[#38bdf8]">Next</span>, <span className="text-[#38bdf8]">Node</span>],</div>
          <div>available: <span className="text-[#a78bfa]">true</span>,</div>
        </div>
        <div>{"};"}</div>
        <div style={{ marginTop: "0.9em" }}>
          <span className="text-[#38bdf8]">console</span>.<span className="text-[#38bdf8]">log</span>(<span className="text-[#34d399]">&quot;Let&apos;s build!&quot;</span>)
          <span
            className="ml-1 inline-block align-middle bg-[var(--accent)] animate-cursor-blink motion-reduce:animate-none"
            style={{ width: "0.55em", height: "1.1em" }}
          />
        </div>
      </div>
    </div>
  </div>
);

const StatItem = ({ item }: { item: Stat }) => {
  const count = useCountUp(item.number);
  return (
    <div className="flex flex-col gap-1 group cursor-default transition-transform duration-300 hover:-translate-y-1">
      <span className="font-syne text-3xl font-black bg-gradient-to-r from-[var(--text)] to-[var(--text3)] bg-clip-text text-transparent group-hover:from-[var(--accent)] group-hover:to-[var(--accent2)] transition-all duration-500 tabular-nums">
        {count}
      </span>
      <span className="text-[10px] uppercase font-bold text-[var(--text3)] tracking-widest opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        {item.label}
      </span>
    </div>
  );
};

/* -------------------------------- Section ------------------------------- */

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-[72px] overflow-hidden z-10 bg-[var(--bg)]">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/10 blur-[140px] rounded-full -z-10 animate-[pulse_8s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-[var(--accent2)]/10 blur-[140px] rounded-full -z-10 animate-[pulse_10s_ease-in-out_infinite_1s] motion-reduce:animate-none" />

      <div className="c-container w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-20">
            <div className="reveal-item" style={reveal("0.1s")}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border2)] bg-[var(--surface)]/50 text-[var(--text2)] text-sm mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]" />
                </span>
                <span className="font-medium">Available for opportunities</span>
              </div>
            </div>

            <h1
              className="reveal-item font-syne font-black leading-[1.05] tracking-tight mb-4 text-[clamp(42px,5.5vw,72px)]"
              style={reveal("0.2s")}
            >
              Hi, I&apos;m <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent3)] to-[var(--accent2)] bg-[length:200%_auto] bg-clip-text text-transparent italic animate-gradient-shift motion-reduce:animate-none">
                Rajesh
              </span>
            </h1>

            <p
              className="reveal-item font-mono text-[var(--accent2)] text-sm mb-6 tracking-widest flex items-center gap-2"
              style={reveal("0.3s")}
            >
              <span className="text-[var(--text3)] opacity-50" aria-hidden="true">&gt;</span>
              Full Stack Software Engineer — MERN Stack
            </p>

            <p
              className="reveal-item text-[var(--text2)] text-lg leading-relaxed max-w-xl mb-10 opacity-90"
              style={reveal("0.4s")}
            >
              I craft scalable, high-performance web applications from Mohali, Chandigarh, India.
              <span className="text-[var(--text)] font-medium"> 2+ years </span>
              of turning complex problems into elegant solutions.
            </p>

            <div className="reveal-item flex flex-wrap gap-5" style={reveal("0.5s")}>
              <button
                type="button"
                onClick={() => scrollTo("#projects")}
                className="c-btn-primary group overflow-hidden relative"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg
                    className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              <a
                href="/cv/Rajesh_Sarkar_CV.pdf"
                download
                className="c-btn-secondary group inline-flex items-center gap-2 transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Download CV
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
                </svg>
              </a>
            </div>

            <div
              className="reveal-item flex gap-12 mt-16 pt-10 border-t border-[var(--border)]/50"
              style={reveal("0.6s")}
            >
              {STATS.map((item) => (
                <StatItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center [perspective:1000px]">
            <div className="w-full max-w-[420px] animate-float-slow motion-reduce:animate-none transition-transform duration-700 hover:[transform:rotateX(2deg)_rotateY(2deg)]">
              <CodeWindow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}