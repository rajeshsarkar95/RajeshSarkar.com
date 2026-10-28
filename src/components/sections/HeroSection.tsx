import { section } from 'framer-motion/client';
import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  number: string;
  label: string;
}
interface FloatingTag {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: string;
}

const STATS: Stat[] = [
  { number: "2+", label: "Years Exp." },
  { number: "5+", label: "Projects" },
  { number: "15+", label: "Technologies" },
];

const FLOATING_TAGS: FloatingTag[] = [
  { label: "React.js", top: "12%", right: "-12%", delay: "-2s" },
  { label: "Node.js", bottom: "15%", left: "-12%", delay: "-1s" },
  { label: "MongoDB", top: "60%", right: "-16%", delay: "-3s" },
];
const useCountUp = (target: string, durationMs = 1400) => {
  const [display, setDisplay] = useState("0");
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const numeric = parseInt(target.replace(/\D/g, ""), 10) || 0;
    const suffix = target.replace(/[\d]/g, "");
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); 
      const value = Math.round(eased * numeric);
      setDisplay(`${value}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, durationMs]);

  return display;
};

const CodeWindow = () => (
  <div className="relative w-full max-w-[420px] aspect-square rounded-[28px] bg-[var(--surface)] border border-[var(--border2)] backdrop-blur-xl overflow-hidden flex items-center justify-center shadow-2xl">
    <div className="absolute inset-[-1px] rounded-[28px] -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent2)]/10 animate-gradient-shift bg-[length:200%_200%] motion-reduce:animate-none" />
    <div className="p-7 w-full font-mono text-[13px] leading-[1.85] select-none">
      <div className="text-[var(--text3)] italic mb-2">{"// Rajesh Sarkar"}</div>
      <div className="text-[var(--text3)]">
        <span className="text-[#a78bfa]">const</span> <span className="text-[#38bdf8]">developer</span> = {"{"}
      </div>
      <div className="pl-4">
        <div className="text-[var(--text3)]">name: <span className="text-[#34d399]">Rajesh Sarkar</span>,</div>
        <div className="text-[var(--text3)]">role: <span className="text-[#34d399]">Full Stack Dev</span>,</div>
        <div className="text-[var(--text3)]">exp: <span className="text-[var(--orange)]">2</span><span className="text-[#4a4a65] italic">{"// years"}</span></div>
        <div className="text-[var(--text3)]">stack: [<span className="text-[#34d399]">&quot;React&quot;, &quot;Next.js&quot;, &quot;Node.js&quot;</span>],</div>
        <div className="text-[var(--text3)]">available: <span className="text-[#a78bfa]">true</span></div>
      </div>
      <div className="text-[var(--text3)]">{"};"}</div>
      <div className="text-[var(--text3)] mt-4">
        <span className="text-[#38bdf8]">console</span>.<span className="text-[#38bdf8]">log</span>(<span className="text-[#34d399]">&quot;Let&apos;s build!&quot;</span>);
        <span className="inline-block w-[7px] h-[14px] bg-[var(--accent)] ml-1 align-middle animate-cursor-blink motion-reduce:animate-none" />
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
            <div className="reveal-item" style={{ "--delay": "0.1s" } as any}>
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
              style={{ "--delay": "0.2s" } as any}
            >
              Hi, I&apos;m <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent3)] to-[var(--accent2)] bg-[length:200%_auto] bg-clip-text text-transparent italic animate-gradient-shift motion-reduce:animate-none">
                Rajesh
              </span>
            </h1>

            <p
              className="reveal-item font-mono text-[var(--accent2)] text-sm mb-6 tracking-widest flex items-center gap-2"
              style={{ "--delay": "0.3s" } as any}
            >
              <span className="text-[var(--text3)] opacity-50" aria-hidden="true">&gt;</span>
              Full Stack Software Engineer — MERN Stack
            </p>

            <p
              className="reveal-item text-[var(--text2)] text-lg leading-relaxed max-w-xl mb-10 opacity-90"
              style={{ "--delay": "0.4s" } as any}
            >
              I craft scalable, high-performance web applications from Mohali, Chandigarh, India.
              <span className="text-[var(--text)] font-medium"> 2+ years </span>
              of turning complex problems into elegant solutions.
            </p>

            <div className="reveal-item flex flex-wrap gap-5" style={{ "--delay": "0.5s" } as any}>
              <button
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
              style={{ "--delay": "0.6s" } as any}
            >
              {STATS.map((item) => (
                <StatItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center [perspective:1000px]">
            <div className="animate-float-slow motion-reduce:animate-none transition-transform duration-700 hover:[transform:rotateX(2deg)_rotateY(2deg)]">
              <CodeWindow />
            </div>
            {FLOATING_TAGS.map((tag, i) => (
              <span
                key={tag.label}
                className="absolute hidden lg:block px-4 py-2 rounded-xl bg-[var(--bg2)]/80 border border-[var(--border2)] font-mono text-xs text-[var(--text2)] backdrop-blur-xl shadow-2xl hover:scale-110 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 cursor-default motion-reduce:!animate-none"
                style={{
                  top: tag.top,
                  bottom: tag.bottom,
                  left: tag.left,
                  right: tag.right,
                  animation: `tagEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) both ${0.7 + i * 0.15}s, floatTag 6s cubic-bezier(0.45, 0, 0.55, 1) infinite ${1.3 + i * 0.15}s ${tag.delay}`,
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}