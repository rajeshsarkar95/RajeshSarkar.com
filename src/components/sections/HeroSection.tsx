import React, { useEffect, useState, type CSSProperties } from "react";

interface Stat {
  number: string;
  label: string;
}

interface OrbitBadge {
  label: string;
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
    duration: 70,
    badges: [
      { label: "React", color: "#61dafb", angle: -90 },
      { label: "Node.js", color: "#339933", angle: -30 },
      { label: "MongoDB", color: "#47a248", angle: 30 },
      { label: "Docker", color: "#2496ed", angle: 90 },
      { label: "AWS", color: "#ff9900", angle: 150 },
      { label: "Git", color: "#f05032", angle: 210 },
    ],
  },
  {
    size: 62,
    duration: 50,
    reverse: true,
    badges: [
      { label: "Next.js", color: "#a1a1aa", angle: -60 },
      { label: "Express", color: "#a1a1aa", angle: 120 },
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
        <div
          key={ri}
          className="cw-ring-in absolute left-3 top-3 -translate-x-1/2 -translate-y-1/2"
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
                          <span
                            className="rounded-full"
                            style={{ width: "0.7em", height: "0.7em", background: b.color }}
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
      ))}
    </div>

    <div className="absolute left-1/2 top-1/2 z-10 w-[50%] h-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[var(--surface)] border border-[var(--border2)] backdrop-blur-xl overflow-hidden flex items-center justify-center shadow-2xl">
      <div className="absolute inset-[-1px] rounded-[20px] -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent2)]/10 animate-gradient-shift bg-[length:200%_200%] motion-reduce:animate-none" />
      <div
        className="w-full font-mono leading-[1.85] select-none"
        style={{ fontSize: "2.3cqw", padding: "3.4cqw" }}
      >
        <div className="text-[var(--text3)] italic mb-[0.8em]">{"// Rajesh Sarkar"}</div>
        <div className="text-[var(--text3)]">
          <span className="text-[#a78bfa]">const</span> <span className="text-[#38bdf8]">developer</span> = {"{"}
        </div>
        <div style={{ paddingLeft: "1.6em" }}>
          <div className="text-[var(--text3)]">name: <span className="text-[#34d399]">Rajesh Sarkar</span>,</div>
          <div className="text-[var(--text3)]">role: <span className="text-[#34d399]">Full Stack Dev</span>,</div>
          <div className="text-[var(--text3)]">exp: <span className="text-[var(--orange)]">2</span><span className="text-[#4a4a65] italic">{"// years"}</span></div>
          <div className="text-[var(--text3)]">stack: [<span className="text-[#34d399]">&quot;React&quot;, &quot;Next.js&quot;, &quot;Node.js&quot;</span>],</div>
          <div className="text-[var(--text3)]">available: <span className="text-[#a78bfa]">true</span></div>
        </div>
        <div className="text-[var(--text3)]">{"};"}</div>
        <div className="text-[var(--text3)] mt-[1.4em]">
          <span className="text-[#38bdf8]">console</span>.<span className="text-[#38bdf8]">log</span>(<span className="text-[#34d399]">&quot;Let&apos;s build!&quot;</span>);
          <span
            className="inline-block bg-[var(--accent)] ml-1 align-middle animate-cursor-blink motion-reduce:animate-none"
            style={{width:"0.6em",height:"1.2em"}}
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