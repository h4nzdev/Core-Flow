import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Signal, User, TrendingDown,
  Layers, GitBranch, Repeat,
  ArrowRight, Check, ChevronRight, Cpu,
} from 'lucide-react';
import CursorAura from './components/CursorAura';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Utilities
───────────────────────────────────────────────────────────────────────── */

/** Thin accent rule */
function Rule() {
  return <div className="w-full h-px bg-[rgba(56,189,248,0.12)]" />;
}

/** Section micro-label */
function Label({ children, error }) {
  return (
    <p className={`text-[11px] font-mono tracking-[0.22em] uppercase mb-3
      ${error ? 'text-red-400' : 'text-[#8094A6]'}`}>
      {children}
    </p>
  );
}

/** Animated green status pill */
function StatusDot() {
  return (
    <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          style={{ animation: 'status-ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
      </span>
      <span className="text-[10px] font-mono text-green-400 tracking-widest hidden sm:block">SYSTEM OPERATIONAL</span>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="w-8 h-8 rounded border border-[rgba(56,189,248,0.35)] bg-[rgba(56,189,248,0.07)] flex items-center justify-center">
      <span className="font-mono font-bold text-[11px] text-[#38BDF8]">CF</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Magnetic Button — cursor proximity pulls the element
───────────────────────────────────────────────────────────────────────── */
function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const xQ  = useRef(null);
  const yQ  = useRef(null);

  useEffect(() => {
    xQ.current = gsap.quickTo(ref.current, 'x', { duration: 0.45, ease: 'power3' });
    yQ.current = gsap.quickTo(ref.current, 'y', { duration: 0.45, ease: 'power3' });
  }, []);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    xQ.current((e.clientX - (r.left + r.width  / 2)) * 0.28);
    yQ.current((e.clientY - (r.top  + r.height / 2)) * 0.28);
  };
  const onLeave = () => { xQ.current(0); yQ.current(0); };

  return (
    <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   3-D Tilt Card — mouse track rotates on X/Y axes
───────────────────────────────────────────────────────────────────────── */
function TiltCard({ children, className }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(ref.current, {
      rotationY: x * 14,
      rotationX: -y * 14,
      transformPerspective: 700,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      rotationX: 0, rotationY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.55)',
    });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Scroll progress bar
───────────────────────────────────────────────────────────────────────── */
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.set(ref.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(ref.current, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 'top top', end: 'max', scrub: 0 },
    });
  }, []);
  return <div ref={ref} className="fixed top-0 left-0 w-full h-px bg-[#38BDF8] z-[100]" />;
}

/* ─────────────────────────────────────────────────────────────────────────
   CSS grid background — zero JS/canvas overhead
───────────────────────────────────────────────────────────────────────── */
function GridBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right,  rgba(56,189,248,0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(56,189,248,0.055) 1px, transparent 1px)`,
        backgroundSize: '44px 44px',
      }} />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Hero visual — two spinning rings + pulsing icon
───────────────────────────────────────────────────────────────────────── */
function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center w-80 h-80 select-none">
      {/* Outer dashed ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[rgba(56,189,248,0.18)]"
        style={{ animation: 'geo-spin 22s linear infinite' }} />
      {/* Inner solid ring */}
      <div className="absolute w-56 h-56 rounded-full border border-[rgba(56,189,248,0.25)]"
        style={{ animation: 'geo-spin 14s linear infinite reverse' }} />
      {/* Ambient glow — CSS only, no filter animation */}
      <div className="absolute w-40 h-40 rounded-full bg-[rgba(56,189,248,0.05)]" />
      {/* Icon container */}
      <div className="relative z-10 w-20 h-20 rounded-2xl border border-[rgba(56,189,248,0.3)]
        bg-[rgba(10,13,20,0.9)] flex items-center justify-center"
        style={{
          animation: 'geo-pulse 3.5s ease-in-out infinite',
          boxShadow: '0 0 28px rgba(56,189,248,0.18), inset 0 0 20px rgba(56,189,248,0.04)',
        }}>
        <Cpu size={34} strokeWidth={1} className="text-[#38BDF8]" />
      </div>
      {/* Orbit dots */}
      {[0, 90, 180, 270].map((deg) => (
        <div key={deg} className="absolute w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
          style={{
            transform: `rotate(${deg}deg) translateX(138px)`,
            boxShadow: '0 0 5px #38BDF8',
            opacity: 0.65,
          }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Nav
───────────────────────────────────────────────────────────────────────── */
function Nav() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.set(navRef.current, { yPercent: -130, opacity: 0 });
    ScrollTrigger.create({
      start: '80px top',
      onEnter:     () => gsap.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to(navRef.current, { yPercent: -130, opacity: 0, duration: 0.35, ease: 'power2.in' }),
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-5xl backdrop-blur-[24px] bg-[rgba(10,13,20,0.9)] border border-[rgba(56,189,248,0.12)] rounded-xl px-5 py-3 flex items-center justify-between gap-4 shadow-[0_0_24px_rgba(56,189,248,0.06)]">
        {/* Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-mono font-bold text-sm text-[#F0F4F8] tracking-[0.15em]">COREFLOW</span>
          </div>
          <StatusDot />
        </div>
        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {[['Services', '#services'], ['How It Works', '#how-it-works'], ['Pricing', '#pricing']].map(([label, href]) => (
            <a key={label} href={href}
              className="relative text-[11px] font-mono text-[#8094A6] hover:text-[#38BDF8] tracking-widest uppercase transition-colors group">
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#38BDF8] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        {/* CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="hidden sm:block text-[11px] font-mono text-[#8094A6] px-4 py-1.5 rounded-lg hover:bg-[rgba(56,189,248,0.07)] transition-all tracking-widest uppercase">
            Contact
          </button>
          <button className="text-[11px] font-mono font-bold text-[#03050A] bg-[#38BDF8] px-5 py-1.5 rounded-lg tracking-widest uppercase hover:shadow-[0_0_22px_rgba(56,189,248,0.55)] transition-all">
            Open Console
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Hero  — 3-D word flip entrance + dual-speed parallax scrub
───────────────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Accent line scales in, then label slides right — parallel track
      tl.from('.h-accent-line', { scaleX: 0, duration: 0.55, transformOrigin: 'left center' }, 0.3)
        .from('.h-micro',       { opacity: 0, x: -18, duration: 0.55 }, 0.45)

        // 3-D word flip: each word rotates up from below the fold
        .from('.h-word', {
          rotationX: -90,
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.13,
          transformOrigin: '50% 0%',
        }, 0.55)

        // Sub-copy and CTAs stagger in while words are still animating
        .from('.h-sub',  { opacity: 0, y: 16, duration: 0.65 }, 1.05)
        .from('.h-cta',  { opacity: 0, y: 16, duration: 0.55, stagger: 0.1 }, 1.2)

        // Visual slides in from the right, slightly behind text
        .from('.h-visual', { opacity: 0, x: 55, duration: 0.95, ease: 'power2.out' }, 0.5);

      // Parallax — text moves up faster than the visual on scroll
      gsap.to('.h-text-wrap', {
        yPercent: -28, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to('.h-visual', {
        yPercent: -13, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.8 },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef}
      className="relative min-h-screen bg-[#03050A] flex items-center overflow-hidden"
      id="services">
      {/* Radial ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 62% 50%, rgba(56,189,248,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-8 w-full flex flex-col lg:flex-row items-center gap-16 pt-36 pb-28 lg:py-0">

        {/* Text column */}
        <div className="h-text-wrap flex-1">
          {/* Label row with accent line */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-accent-line h-px w-8 bg-[#38BDF8] shrink-0" />
            <p className="h-micro text-[11px] font-mono tracking-[0.2em] text-[#38BDF8] uppercase">
              COREFLOW SOLUTIONS · INTELLIGENCE LAYER
            </p>
          </div>

          {/* Headline — perspective set on wrapper for 3-D flip */}
          <div style={{ perspective: '900px' }} className="mb-8">
            <h1 className="font-serif leading-[0.9]">
              <span className="h-word block text-[clamp(3.5rem,8vw,6rem)] font-light italic text-[#F0F4F8]">Reliable.</span>
              <span className="h-word block text-[clamp(3.5rem,8vw,6rem)] font-light italic text-[#F0F4F8] opacity-35">Seamless.</span>
              <span className="h-word block text-[clamp(3.5rem,8vw,6rem)] font-semibold text-[#F0F4F8]">Scalable.</span>
            </h1>
          </div>

          <p className="h-sub font-mono text-[13px] text-[#8094A6] max-w-[42ch] leading-loose mb-9">
            Dedicated teams for growing businesses. We build, train, and manage your
            customer support &amp; back office operations so you can focus on what's next.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton className="h-cta group inline-flex items-center gap-2 bg-[#38BDF8] text-[#03050A] font-mono font-bold text-[12px] px-7 py-3.5 rounded-lg tracking-widest uppercase hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] transition-shadow">
              Book a Free Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <a href="#how-it-works"
              className="h-cta inline-flex items-center gap-1.5 border border-[rgba(56,189,248,0.25)] text-[#8094A6] font-mono text-[12px] px-7 py-3.5 rounded-lg tracking-widest uppercase hover:border-[rgba(56,189,248,0.5)] hover:text-[#38BDF8] transition-all">
              See How It Works <ChevronRight size={13} />
            </a>
          </div>
        </div>

        {/* Visual column */}
        <div className="h-visual flex-1 flex justify-center">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Problem  — error accent, left-bar cards, animated stat counters
───────────────────────────────────────────────────────────────────────── */
function Problem() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.pb-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.pb-header', start: 'top 82%' },
      });

      // Stat counters — each number counts up from 0
      const stats = [
        { sel: '.sv-0', to: 68,  fmt: v => `${Math.round(v)}%` },
        { sel: '.sv-1', to: 47,  fmt: v => `$${Math.round(v)}K` },
        { sel: '.sv-2', to: 3.2, fmt: v => `${v.toFixed(1)}×` },
      ];
      stats.forEach(({ sel, to, fmt }) => {
        const el = ref.current.querySelector(sel);
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: to, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = fmt(obj.val); },
          scrollTrigger: { trigger: '.pb-stats', start: 'top 82%' },
        });
      });

      // Stats row fade up in parallel with counter
      gsap.from('.pb-stat', {
        opacity: 0, y: 28, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.pb-stats', start: 'top 84%' },
      });

      // Cards stagger
      gsap.from('.pb-card', {
        opacity: 0, y: 48, duration: 0.65, stagger: 0.13, ease: 'power2.out',
        scrollTrigger: { trigger: '.pb-cards', start: 'top 83%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const cards = [
    { icon: <Signal size={20} />,       title: 'Missed Signals',  desc: 'Every unanswered inquiry is lost revenue. Fragmented tools and inboxes create blind spots that hurt your brand.' },
    { icon: <User size={20} />,         title: 'Overloaded Core', desc: 'Founders and key operators are buried in administrative noise instead of high-value strategy. Growth grinds to a halt.' },
    { icon: <TrendingDown size={20} />, title: 'Unstable Output', desc: 'Inconsistent quality and unpredictable availability frustrate customers and prevent you from scaling confidently.' },
  ];

  return (
    <section ref={ref} className="bg-[#0A0D14]" id="how-it-works">
      <Rule />
      <div className="max-w-6xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="pb-header mb-14">
          <Label error>THE CHALLENGE</Label>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-light italic text-[#F0F4F8] leading-tight mb-2">
            Why Growth Feels Heavy.
          </h2>
          <p className="font-mono text-[12px] text-[#8094A6] opacity-50 italic">(System Overload Detected)</p>
        </div>

        {/* Stats row */}
        <div className="pb-stats grid grid-cols-1 sm:grid-cols-3 mb-14 border border-[rgba(56,189,248,0.12)] rounded-xl overflow-hidden">
          {[
            { sel: 'sv-0', init: '0%',   label: 'of SMB support tickets miss response SLA' },
            { sel: 'sv-1', init: '$0K',  label: 'average annual cost of a poor operational hire' },
            { sel: 'sv-2', init: '0.0×', label: 'revenue loss multiplier from slow response times' },
          ].map((s, i) => (
            <div key={s.sel}
              className={`pb-stat flex flex-col items-center text-center px-8 py-10 bg-[rgba(56,189,248,0.02)]
                ${i < 2 ? 'sm:border-r border-b sm:border-b-0 border-[rgba(56,189,248,0.12)]' : ''}`}>
              <span className={`${s.sel} font-serif text-[3rem] font-light text-[#38BDF8] leading-none mb-3`}>
                {s.init}
              </span>
              <span className="font-mono text-[11px] text-[#8094A6] leading-relaxed max-w-[24ch]">{s.label}</span>
            </div>
          ))}
        </div>

        {/* 3-D tilt cards */}
        <div className="pb-cards grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <TiltCard key={c.title}
              className="pb-card border border-[rgba(56,189,248,0.1)] bg-[rgba(56,189,248,0.015)] rounded-xl p-7 hover:border-[rgba(56,189,248,0.25)] hover:bg-[rgba(56,189,248,0.04)] transition-colors duration-300">
              {/* Left-bar accent before icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-0.5 h-5 bg-red-400/65 rounded-full shrink-0" />
                <span className="text-[#8094A6]">{c.icon}</span>
              </div>
              <h3 className="font-mono font-bold text-[#F0F4F8] text-[14px] mb-3">{c.title}</h3>
              <p className="font-mono text-[12px] text-[#8094A6] leading-loose">{c.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
      <Rule />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Solution  — YAML config + 3-D tilt code window
───────────────────────────────────────────────────────────────────────── */
function Solution() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Code window and text slide in from opposite sides simultaneously
      gsap.from('.sl-code', {
        opacity: 0, x: -55, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      gsap.from('.sl-text', {
        opacity: 0, x: 55, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      // Points stagger up
      gsap.from('.sl-point', {
        opacity: 0, y: 26, duration: 0.6, stagger: 0.11, ease: 'power2.out',
        scrollTrigger: { trigger: '.sl-points', start: 'top 82%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const yamlLines = [
    { n: '01', txt: 'operations:' },
    { n: '02', txt: '  layer: "dedicated"',   accent: true },
    { n: '03', txt: '  status: "managed"',    accent: true },
    { n: '04', txt: '  latency: 0ms',         accent: true },
    { n: '05', txt: 'teams:' },
    { n: '06', txt: '  - offshore_extension', accent: true },
    { n: '07', txt: '  - expert_oversight',   accent: true },
    { n: '08', txt: 'scale: auto_expand',     accent: true },
    { n: '09', txt: '# → Live in 14 days. 24/7 coverage.', muted: true },
  ];

  const points = [
    { num: '01', icon: <Layers size={15} />,    title: 'Dedicated Offshore Team', desc: 'A team that works exclusively for you, integrated into your culture and tools. Not a shared resource.' },
    { num: '02', icon: <GitBranch size={15} />, title: 'Trained + Fully Managed',  desc: 'We handle all recruitment, QA, and day-to-day oversight. You get a turnkey operations arm.' },
    { num: '03', icon: <Repeat size={15} />,    title: 'Scalable On Command',      desc: 'Start with what you need. Scale up or down as your business demands shift, without the HR nightmare.' },
  ];

  return (
    <section ref={ref} className="bg-[#03050A] py-28">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* YAML code window with 3-D tilt */}
        <TiltCard className="sl-code">
          <div className="rounded-xl border border-[rgba(56,189,248,0.15)] bg-[#0A0D14] overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.05)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(56,189,248,0.1)] bg-[rgba(56,189,248,0.02)]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-auto text-[10px] font-mono text-[#8094A6] tracking-widest">coreflow_config.yaml</span>
            </div>
            {/* Lines */}
            <div className="p-6 font-mono text-[13px] leading-[2] space-y-0">
              {yamlLines.map(({ n, txt, accent, muted }) => (
                <div key={n} className="flex gap-5">
                  <span className="text-[#8094A6]/30 select-none w-4 shrink-0">{n}</span>
                  <span className={
                    muted  ? 'text-[#8094A6]/50 italic' :
                    accent ? 'text-[#38BDF8]/80' :
                    'text-[#F0F4F8]/70'
                  }>{txt}</span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Text */}
        <div className="sl-text">
          <Label>THE SOLUTION</Label>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-tight mb-9">
            <span className="font-light text-[#F0F4F8]">Plug Into Your </span>
            <span className="font-light italic text-[#F0F4F8]">Dedicated Operations Layer.</span>
          </h2>
          <ul className="sl-points space-y-7">
            {points.map((p) => (
              <li key={p.num} className="sl-point flex gap-4">
                <span className="font-mono font-bold text-[#38BDF8] shrink-0 text-[13px] pt-0.5">{p.num}.</span>
                <div>
                  <div className="flex items-center gap-2 font-mono font-bold text-[#F0F4F8] text-[13px] uppercase tracking-wider mb-1.5">
                    <span className="text-[#38BDF8]">{p.icon}</span>
                    {p.title}
                  </div>
                  <p className="font-mono text-[12px] text-[#8094A6] leading-loose">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Pricing  — single card with RECOMMENDED badge
───────────────────────────────────────────────────────────────────────── */
function Pricing() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pc-card', {
        opacity: 0, y: 55, scale: 0.96, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const features = [
    '1 Full-Time Dedicated Agent',
    'Customer Support & Admin Desk',
    'Full Training + QA Management',
    'Bi-Weekly Performance Flash Reports',
    '14-Day Integration & Onboarding',
    'Cancel Anytime Policy',
  ];

  return (
    <section ref={ref} className="bg-[#0A0D14] py-24" id="pricing">
      <Rule />
      <div className="max-w-lg mx-auto px-8 pt-16 pb-8">
        <div className="pc-card relative border border-[rgba(56,189,248,0.15)] rounded-2xl bg-[rgba(56,189,248,0.02)] p-10 shadow-[0_0_60px_rgba(56,189,248,0.07)] hover:border-[rgba(56,189,248,0.3)] transition-colors duration-500">
          {/* RECOMMENDED badge */}
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#38BDF8] border border-[rgba(56,189,248,0.3)] bg-[rgba(56,189,248,0.08)] px-3 py-1 rounded-full">
              RECOMMENDED
            </span>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#8094A6] mb-4">
              COREFLOW STARTER
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-serif text-[4rem] font-light text-[#F0F4F8] leading-none">$1,990</span>
              <span className="font-mono text-[#8094A6] text-sm">/mo</span>
            </div>
            <p className="font-mono text-[11px] text-[#8094A6] mt-2 tracking-widest">per dedicated team member</p>
          </div>

          {/* Features */}
          <div className="space-y-3.5 mb-10 pb-10 border-b border-[rgba(56,189,248,0.1)]">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full border border-[rgba(56,189,248,0.35)] flex items-center justify-center text-[#38BDF8]">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                <span className="font-mono text-[12px] text-[#8094A6]">{f}</span>
              </div>
            ))}
          </div>

          <MagneticButton className="group w-full flex items-center justify-center gap-2 bg-[#38BDF8] text-[#03050A] font-mono font-bold text-[12px] px-6 py-3.5 rounded-lg tracking-widest uppercase hover:shadow-[0_0_32px_rgba(56,189,248,0.5)] transition-all">
            Book a Free Consultation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <p className="text-center font-mono text-[10px] text-[#8094A6]/40 uppercase tracking-widest mt-5">
            SECURE TRANSACTION PORTAL
          </p>
        </div>
      </div>
      <Rule />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Final CTA  — parallax glow + magnetic outline button
───────────────────────────────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elements stagger in
      gsap.from('.cta-el', {
        opacity: 0, y: 36, duration: 0.8, stagger: 0.14, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      // Glow orb parallax
      gsap.to('.cta-glow', {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#03050A] py-40 overflow-hidden">
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center flex flex-col items-center gap-6">
        <h2 className="cta-el font-serif text-[clamp(2.6rem,6vw,4.2rem)] leading-tight text-[#F0F4F8]">
          Ready for<br />
          <span className="font-light italic">Zero-Friction Operations?</span>
        </h2>
        <p className="cta-el font-mono text-[13px] text-[#8094A6] leading-loose max-w-[48ch]">
          Join the waitlist or book your initialization call today. Our deployment
          lead time is currently 14 days from contract signature.
        </p>
        <MagneticButton className="cta-el mt-2 px-14 py-5 border border-[#38BDF8] text-[#38BDF8] font-mono font-bold text-[13px] tracking-widest uppercase rounded-xl hover:bg-[rgba(56,189,248,0.06)] transition-colors"
          style={{ boxShadow: '0 0 24px rgba(56,189,248,0.15)' }}>
          START DEPLOYMENT
        </MagneticButton>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0A0D14] border-t border-[rgba(56,189,248,0.1)] py-8">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-mono font-bold text-[12px] text-[#8094A6] tracking-[0.15em]">COREFLOW SOLUTIONS</span>
          </div>
          <span className="font-mono text-[10px] text-[#8094A6]/40 tracking-widest pl-10">
            © 2026 COREFLOW SOLUTIONS. ALL SYSTEMS OPERATIONAL.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {['Privacy Policy', 'Terms of Service', 'Documentation'].map((l) => (
            <a key={l} href="#"
              className="font-mono text-[11px] text-[#8094A6]/50 hover:text-[#38BDF8] transition-colors tracking-wide">
              {l}
            </a>
          ))}
          <a href="#" className="font-mono text-[11px] text-[#8094A6]/50 hover:text-[#38BDF8] transition-colors tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Network Status
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Root
───────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <CursorAura />
      <ScrollProgress />
      <GridBg />
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
