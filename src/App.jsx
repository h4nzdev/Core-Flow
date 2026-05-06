import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Signal, User, TrendingDown,
  Layers, GitBranch, Repeat,
  ArrowRight, Check, ChevronRight, Zap,
} from 'lucide-react';
import MatrixGrid from './components/MatrixGrid';
import CursorAura from './components/CursorAura';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Reusable atoms ─────────────────────────────────────────────────────── */

function Rule() {
  return <div className="w-full h-px bg-[rgba(56,189,248,0.12)]" />;
}

function Label({ children, center }) {
  return (
    <p className={`text-[10px] font-mono tracking-[0.22em] text-[#8094A6] uppercase mb-3 ${center ? 'text-center' : ''}`}>
      {children}
    </p>
  );
}

function StatusDot() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          style={{ animation: 'status-ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
      </span>
      <span className="text-[10px] font-mono tracking-[0.18em] text-[#8094A6] uppercase hidden sm:block">
        SYSTEM OPERATIONAL
      </span>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="w-8 h-8 rounded border border-[rgba(56,189,248,0.35)] bg-[rgba(56,189,248,0.07)] flex items-center justify-center">
      <span className="font-mono font-bold text-[11px] text-[#38BDF8] tracking-tight">CF</span>
    </div>
  );
}

/* ── Geometric Core (hero visual) ───────────────────────────────────────── */

function GeoCore() {
  return (
    <div className="flex flex-col items-center gap-5 select-none">
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Outer dashed ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[rgba(56,189,248,0.14)]"
          style={{ animation: 'geo-spin 22s linear infinite' }} />
        {/* Mid ring */}
        <div className="absolute w-52 h-52 rounded-full border border-[rgba(56,189,248,0.22)]"
          style={{ animation: 'geo-spin 15s linear infinite reverse' }} />
        {/* Inner dashed ring */}
        <div className="absolute w-32 h-32 rounded-full border border-dashed border-[rgba(56,189,248,0.35)]"
          style={{ animation: 'geo-spin 9s linear infinite' }} />
        {/* Axis lines */}
        <div className="absolute w-full h-px bg-[rgba(56,189,248,0.07)]" />
        <div className="absolute w-px h-full bg-[rgba(56,189,248,0.07)]" />
        <div className="absolute w-full h-px bg-[rgba(56,189,248,0.07)]" style={{ transform: 'rotate(45deg)' }} />
        <div className="absolute w-full h-px bg-[rgba(56,189,248,0.07)]" style={{ transform: 'rotate(-45deg)' }} />
        {/* Centre orb */}
        <div className="relative z-10 w-14 h-14 rounded-full border border-[rgba(56,189,248,0.5)] bg-[rgba(56,189,248,0.05)] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#38BDF8]"
            style={{
              animation: 'geo-pulse 2s ease-in-out infinite',
              boxShadow: '0 0 16px #38BDF8, 0 0 40px rgba(56,189,248,0.45)',
            }} />
        </div>
      </div>
      <span className="text-[10px] font-mono tracking-[0.22em] text-[#8094A6] uppercase">
        CORE ENGINE · ACTIVE
      </span>
    </div>
  );
}

/* ── Nav ────────────────────────────────────────────────────────────────── */

function Nav() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    gsap.set(nav, { yPercent: -130, opacity: 0 });
    ScrollTrigger.create({
      start: '100px top',
      onEnter:     () => gsap.to(nav, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to(nav, { yPercent: -130, opacity: 0, duration: 0.35, ease: 'power2.in' }),
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-5xl backdrop-blur-[24px] bg-[rgba(10,13,20,0.88)] border border-[rgba(56,189,248,0.12)] rounded-xl px-5 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-mono font-bold text-sm text-[#F0F4F8] tracking-wide">CoreFlow</span>
          </div>
          <StatusDot />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Services',     href: '#services' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Pricing',      href: '#pricing' },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              className="relative text-[11px] font-mono text-[#8094A6] hover:text-[#38BDF8] tracking-widest uppercase transition-colors group">
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#38BDF8] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="text-[11px] font-mono text-[#8094A6] border border-[rgba(56,189,248,0.22)] px-4 py-1.5 rounded-md hover:border-[rgba(56,189,248,0.55)] hover:text-[#38BDF8] transition-all tracking-widest uppercase">
            Contact
          </button>
          <button className="text-[11px] font-mono font-bold text-[#03050A] bg-[#38BDF8] px-4 py-1.5 rounded-md tracking-widest uppercase hover:shadow-[0_0_22px_rgba(56,189,248,0.55)] transition-all">
            Open Console
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.h-micro',  { opacity: 0, y: 18, duration: 0.7, delay: 0.25 })
        .from('.h-line1',  { opacity: 0, x: -36, duration: 0.75 }, '-=0.3')
        .from('.h-line2',  { opacity: 0, x: -36, duration: 0.75 }, '-=0.55')
        .from('.h-line3',  { opacity: 0, x: -36, duration: 0.75 }, '-=0.55')
        .from('.h-sub',    { opacity: 0, y: 18, duration: 0.65 }, '-=0.4')
        .from('.h-ctas',   { opacity: 0, y: 18, duration: 0.65 }, '-=0.45')
        .from('.h-visual', { opacity: 0, scale: 0.82, duration: 1.1, ease: 'power2.out' }, '-=0.9');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-obsidian flex items-center overflow-hidden" id="services">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(56,189,248,0.045) 0%, transparent 70%)' }} />
      <MatrixGrid />

      <div className="relative z-10 max-w-6xl mx-auto px-8 w-full flex flex-col lg:flex-row items-center gap-16 pt-36 pb-28 lg:py-0">
        {/* Left text */}
        <div className="flex-1">
          <p className="h-micro text-[11px] font-mono tracking-[0.22em] text-[#8094A6] uppercase mb-7">
            COREFLOW SOLUTIONS · INTELLIGENCE LAYER
          </p>
          <h1 className="font-serif leading-[1.05] mb-6">
            <span className="h-line1 block text-[clamp(3.5rem,7vw,5.5rem)] font-light italic text-[#F0F4F8]">Reliable.</span>
            <span className="h-line2 block text-[clamp(3.5rem,7vw,5.5rem)] font-light italic text-[#F0F4F8] opacity-35">Seamless.</span>
            <span className="h-line3 block text-[clamp(3.5rem,7vw,5.5rem)] font-semibold text-[#F0F4F8]">Scalable.</span>
          </h1>
          <p className="h-sub font-mono text-[13px] text-[#8094A6] max-w-[42ch] leading-loose mb-9">
            Dedicated teams for growing businesses. We build, train, and manage your
            customer support &amp; back office operations so you can focus on what's next.
          </p>
          <div className="h-ctas flex flex-wrap gap-4">
            <button className="group inline-flex items-center gap-2 bg-[#38BDF8] text-[#03050A] font-mono font-bold text-[12px] px-7 py-3.5 rounded-lg tracking-widest uppercase hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] transition-all">
              Book a Free Consultation
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#how-it-works"
              className="inline-flex items-center gap-1.5 border border-[rgba(56,189,248,0.25)] text-[#8094A6] font-mono text-[12px] px-7 py-3.5 rounded-lg tracking-widest uppercase hover:border-[rgba(56,189,248,0.55)] hover:text-[#38BDF8] transition-all">
              See How It Works <ChevronRight size={13} />
            </a>
          </div>
        </div>

        {/* Right visual */}
        <div className="h-visual flex-1 flex justify-center">
          <GeoCore />
        </div>
      </div>
    </section>
  );
}

/* ── Problem ────────────────────────────────────────────────────────────── */

function Problem() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pb-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.pb-header', start: 'top 82%' },
      });
      gsap.from('.pb-card', {
        opacity: 0, y: 50, duration: 0.7, ease: 'power2.out', stagger: 0.14,
        scrollTrigger: { trigger: '.pb-cards', start: 'top 82%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const cards = [
    { icon: <Signal size={20} />,      title: 'Missed Signals',   desc: 'Every unanswered inquiry is lost revenue. Fragmented tools and inboxes create blind spots that hurt your brand.' },
    { icon: <User size={20} />,        title: 'Overloaded Core',  desc: 'Founders and key operators are buried in administrative noise instead of high-value strategy. Growth grinds to a halt.' },
    { icon: <TrendingDown size={20} />, title: 'Unstable Output', desc: 'Inconsistent quality and unpredictable availability frustrate customers and prevent you from scaling confidently.' },
  ];

  return (
    <section ref={ref} className="bg-surface" id="how-it-works">
      <Rule />
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="pb-header mb-16">
          <Label>THE CHALLENGE</Label>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-light italic text-[#F0F4F8] mb-2 leading-tight">
            Why Growth Feels Heavy.
          </h2>
          <p className="font-mono text-[12px] text-[#8094A6] tracking-widest">(System Overload Detected)</p>
        </div>
        <div className="pb-cards grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div key={c.title}
              className="pb-card group border border-[rgba(56,189,248,0.1)] rounded-xl p-7 bg-[rgba(56,189,248,0.02)] hover:bg-[rgba(56,189,248,0.05)] hover:border-[rgba(56,189,248,0.28)] transition-all duration-300">
              <div className="w-10 h-10 rounded-lg border border-[rgba(56,189,248,0.2)] flex items-center justify-center text-[#38BDF8] mb-5 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.3)] transition-all">
                {c.icon}
              </div>
              <h3 className="font-mono font-bold text-[#F0F4F8] text-[14px] mb-3">{c.title}</h3>
              <p className="font-mono text-[12px] text-[#8094A6] leading-loose">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Rule />
    </section>
  );
}

/* ── Solution ───────────────────────────────────────────────────────────── */

function Solution() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sl-code', {
        opacity: 0, x: -50, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      gsap.from('.sl-text', {
        opacity: 0, x: 50, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
      gsap.from('.sl-point', {
        opacity: 0, y: 28, duration: 0.6, ease: 'power2.out', stagger: 0.11,
        scrollTrigger: { trigger: '.sl-points', start: 'top 82%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const points = [
    { num: '01', icon: <Layers size={15} />,    title: 'Dedicated Offshore Team', desc: 'A team that works exclusively for you, integrated into your culture and tools. Not a shared resource.' },
    { num: '02', icon: <GitBranch size={15} />, title: 'Trained + Fully Managed',  desc: 'We handle all recruitment, QA, and day-to-day oversight. You get a turnkey operations arm.' },
    { num: '03', icon: <Repeat size={15} />,    title: 'Scalable On Command',      desc: 'Start with what you need. Scale up or down as demands shift, without the HR nightmare.' },
  ];

  return (
    <section ref={ref} className="bg-obsidian py-28">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Code window */}
        <div className="sl-code">
          <div className="rounded-xl border border-[rgba(56,189,248,0.15)] bg-surface overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.06)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(56,189,248,0.1)]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-auto text-[10px] font-mono text-[#8094A6] tracking-widest">coreflow.config.ts</span>
            </div>
            {/* Code */}
            <pre className="p-6 text-[12px] font-mono leading-[1.9] overflow-x-auto">
              <span className="text-[#8094A6]">{'// CoreFlow Operations Layer\n'}</span>
              <span className="text-[#38BDF8]">{'import'}</span>
              <span className="text-[#F0F4F8]">{' { CoreFlow } '}</span>
              <span className="text-[#38BDF8]">{'from'}</span>
              <span className="text-emerald-400">{" '@coreflow/ops';\n\n"}</span>
              <span className="text-[#38BDF8]">{'const'}</span>
              <span className="text-[#F0F4F8]">{' support = CoreFlow.deploy.'}</span>
              <span className="text-yellow-300">{'team'}</span>
              <span className="text-[#F0F4F8]">{'({'}</span>
              {'\n  '}
              <span className="text-purple-400">{'roles'}</span>
              <span className="text-[#F0F4F8]">{': ['}</span>
              <span className="text-emerald-400">{"'support', 'admin'"}</span>
              <span className="text-[#F0F4F8]">{'],\n  '}</span>
              <span className="text-purple-400">{'scale'}</span>
              <span className="text-[#F0F4F8]">{': '}</span>
              <span className="text-emerald-400">{"'auto+'"}</span>
              <span className="text-[#F0F4F8]">{',\n  '}</span>
              <span className="text-purple-400">{'trainedOn'}</span>
              <span className="text-[#F0F4F8]">{': '}</span>
              <span className="text-emerald-400">{"'your-knowledge-base'"}</span>
              {'\n'}
              <span className="text-[#F0F4F8]">{'});\n\n'}</span>
              <span className="text-[#8094A6]">{'// → Team live in 14 days. 24/7 coverage.'}</span>
            </pre>
          </div>
        </div>

        {/* Text */}
        <div className="sl-text">
          <Label>THE SOLUTION</Label>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-tight mb-9">
            <span className="font-light italic text-[#F0F4F8]">Plug Into Your </span>
            <span className="font-semibold text-[#F0F4F8]">Dedicated Operations Layer.</span>
          </h2>
          <div className="sl-points flex flex-col gap-7">
            {points.map((p) => (
              <div key={p.num} className="sl-point flex gap-4 group">
                <div className="shrink-0 w-8 h-8 mt-0.5 rounded-lg border border-[rgba(56,189,248,0.22)] flex items-center justify-center text-[#38BDF8] text-[10px] font-mono font-bold group-hover:bg-[rgba(56,189,248,0.1)] transition-all">
                  {p.num}
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono font-bold text-[#F0F4F8] text-[13px] mb-1.5">
                    <span className="text-[#38BDF8]">{p.icon}</span>
                    {p.title}
                  </div>
                  <p className="font-mono text-[12px] text-[#8094A6] leading-loose">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────────────────────── */

function Pricing() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pc-card', {
        opacity: 0, y: 60, scale: 0.96, duration: 0.9, ease: 'power3.out',
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
  ];

  return (
    <section ref={ref} className="bg-surface py-24" id="pricing">
      <Rule />
      <div className="max-w-md mx-auto px-8 pt-16 pb-8">
        <div className="pc-card border border-[rgba(56,189,248,0.18)] rounded-2xl bg-[rgba(56,189,248,0.03)] p-10 shadow-[0_0_70px_rgba(56,189,248,0.09)]">
          <Label>GET STARTED</Label>
          <h3 className="font-serif text-[2.6rem] font-light italic text-[#F0F4F8] leading-tight mb-4">
            The CoreFlow Starter
          </h3>
          <p className="font-mono text-[12px] text-[#8094A6] leading-loose mb-8">
            For businesses ready to offload customer support & basic back-office tasks.
            A fully trained unit, operational in under 3&nbsp;weeks.
          </p>
          <div className="mb-8 pb-8 border-b border-[rgba(56,189,248,0.1)]">
            <span className="font-serif text-[3.8rem] font-light text-[#F0F4F8] leading-none">$1,990</span>
            <p className="font-mono text-[11px] text-[#8094A6] mt-2 tracking-widest">/mo per dedicated team member</p>
          </div>
          <ul className="flex flex-col gap-3.5 mb-9">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 font-mono text-[12px] text-[#F0F4F8]">
                <span className="shrink-0 w-5 h-5 rounded-full border border-[rgba(56,189,248,0.4)] flex items-center justify-center text-[#38BDF8]">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <button className="group w-full flex items-center justify-center gap-2 bg-[#38BDF8] text-[#03050A] font-mono font-bold text-[12px] px-6 py-3.5 rounded-lg tracking-widest uppercase hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] transition-all">
            Book a Free Consultation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      <Rule />
    </section>
  );
}

/* ── Final CTA ──────────────────────────────────────────────────────────── */

function FinalCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-inner > *', {
        opacity: 0, y: 38, duration: 0.8, ease: 'power2.out', stagger: 0.14,
        scrollTrigger: { trigger: ref.current, start: 'top 76%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-obsidian py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(56,189,248,0.065) 0%, transparent 70%)' }} />
      <div className="cta-inner relative z-10 max-w-2xl mx-auto px-8 text-center flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-xl border border-[rgba(56,189,248,0.3)] flex items-center justify-center text-[#38BDF8] bg-[rgba(56,189,248,0.06)]">
          <Zap size={22} strokeWidth={1.5} />
        </div>
        <h2 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-light italic text-[#F0F4F8] leading-tight">
          Ready for Zero-Friction Operations?
        </h2>
        <p className="font-mono text-[13px] text-[#8094A6] leading-loose max-w-[48ch]">
          Tell us about your biggest operational bottlenecks. We'll design a CoreFlow
          team blueprint, tailored to your business, at no obligation.
        </p>
        <button className="group mt-2 inline-flex items-center gap-2 bg-[#38BDF8] text-[#03050A] font-mono font-bold text-[13px] px-9 py-4 rounded-xl tracking-widest uppercase hover:shadow-[0_0_42px_rgba(56,189,248,0.55)] transition-all">
          Book a Free Consultation
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-surface border-t border-[rgba(56,189,248,0.1)] py-8">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-mono text-[12px] text-[#8094A6]">CoreFlow Solutions</span>
        </div>
        <p className="font-mono text-[11px] text-[#8094A6] tracking-widest">
          © 2026 CoreFlow Solutions. All rights reserved.
        </p>
        <StatusDot />
      </div>
    </footer>
  );
}

/* ── Root ───────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <>
      <CursorAura />
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
