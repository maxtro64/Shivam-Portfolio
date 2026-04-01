import React, { useState, useEffect } from 'react';
import heroImg from "/assets/IMG-20250507-WA0022.jpg";
import CV_AI from "/assets/Shivam Yadav Resume.pdf";
import CV_MERN from "/assets/Shivam_Yadav_Ai.pdf";
import { useTheme } from '../common/ThemeContext';

/* ── SVG Icons ── */
const SunIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ROLES = [
  'Full Stack Developer',
  'AI / ML Engineer',
  'Computer Vision Specialist',
  'MERN Stack Developer',
];

const SOCIALS = [
  { href: 'https://github.com/maxtro64',                         Icon: GithubIcon,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/shivam-yadav-b87300294', Icon: LinkedInIcon, label: 'LinkedIn' },
  { href: 'https://x.com/shivam21102005',                       Icon: TwitterIcon,  label: 'Twitter'  },
];

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade]       = useState(true);
  const [loaded, setLoaded]   = useState(false);
  const [imgReady, setImgReady] = useState(false);

  /* entrance */
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  /* role ticker */
  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setFade(true); }, 350);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const scrollToContact = () =>
    document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="Hero"
      className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-500
        ${isDark ? 'bg-[#0a0a0f] text-[#e8e4dc]' : 'bg-[#f5f3ef] text-[#1a1a2e]'}`}
    >
      {/* ── Ambient orbs ── */}
      <div className={`pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20
        ${isDark ? 'bg-amber-500' : 'bg-amber-300'}`} />
      <div className={`pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10
        ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`} />

      {/* ── Subtle grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#c9a84c' : '#b8922a'} 1px, transparent 1px),
                            linear-gradient(90deg, ${isDark ? '#c9a84c' : '#b8922a'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ══════════════════════════════════════
          NAV
      ══════════════════════════════════════ */}
      <header className="relative z-20 flex items-center justify-between px-8 md:px-14 pt-8">
        {/* Logo */}
        <span className="font-serif text-2xl font-semibold tracking-tight">
          S<span className="text-amber-500">.</span>Y
        </span>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Projects', 'Skills', 'Contact'].map(s => (
            <a
              key={s}
              href={`#${s === 'Contact' ? 'Contact' : s.toLowerCase()}`}
              onClick={s === 'Contact' ? e => { e.preventDefault(); scrollToContact(); } : undefined}
              className={`text-xs tracking-[0.14em] uppercase transition-colors duration-300 relative group
                ${isDark ? 'text-white/40 hover:text-amber-400' : 'text-black/40 hover:text-amber-600'}`}
            >
              {s}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2.5 rounded-full border transition-all duration-300
            ${isDark
              ? 'border-white/10 text-white/50 hover:border-amber-500/50 hover:text-amber-400'
              : 'border-black/10 text-black/40 hover:border-amber-500/50 hover:text-amber-600'}`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 py-16 flex flex-col-reverse md:flex-row items-center gap-16 md:gap-8">

          {/* ── LEFT: Text ── */}
          <div className={`flex-1 space-y-7 transition-all duration-700
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-amber-500" />
              <span className={`text-[11px] tracking-[0.22em] uppercase font-mono
                ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                Available for work
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-serif leading-[0.9] font-light">
                <span className={`block text-[clamp(52px,7vw,96px)] transition-colors
                  ${isDark ? 'text-[#e8e4dc]' : 'text-[#1a1a2e]'}`}>
                  Shivam
                </span>
                <span className="block text-[clamp(52px,7vw,96px)] text-amber-500 italic">
                  Yadav
                </span>
              </h1>
            </div>

            {/* Animated Role */}
            <div className="flex items-center gap-1 font-mono text-sm md:text-base">
              <span className={`${isDark ? 'text-amber-500/60' : 'text-amber-600/70'}`}>{'< '}</span>
              <span
                className={`transition-all duration-300 font-medium
                  ${isDark ? 'text-white/80' : 'text-black/70'}
                  ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
              >
                {ROLES[roleIdx]}
              </span>
              <span className={`${isDark ? 'text-amber-500/60' : 'text-amber-600/70'}`}>{' />'}</span>
              {/* blinking cursor */}
              <span className="ml-1 w-0.5 h-4 bg-amber-500 animate-[blink_1s_step-end_infinite]" />
            </div>

            {/* Bio */}
            <p className={`max-w-lg text-[15px] leading-relaxed font-mono font-light
              ${isDark ? 'text-white/45' : 'text-black/50'}`}>
              Passionate about building scalable systems at the intersection of{' '}
              <span className="text-amber-500">web</span>,{' '}
              <span className="text-amber-500">AI</span>, and{' '}
              <span className="text-amber-500">computer vision</span>.
              I turn complex problems into clean, performant products.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`group relative p-2.5 rounded-full border transition-all duration-300
                    ${isDark
                      ? 'border-white/10 text-white/40 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10'
                      : 'border-black/10 text-black/40 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-500/10'}`}
                >
                  <Icon />
                  {/* Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] tracking-wider
                    bg-amber-500 text-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {label}
                  </span>
                </a>
              ))}
              {/* Divider */}
              <span className={`w-px h-6 mx-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <span className={`text-[11px] font-mono tracking-widest ${isDark ? 'text-white/25' : 'text-black/30'}`}>
                maxtro64
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              {/* AI Resume */}
              <a
                href={CV_AI}
                download
                className="group relative flex items-center gap-2 px-5 py-3 bg-amber-500 text-black
                  text-xs font-mono font-medium tracking-[0.1em] uppercase overflow-hidden transition-all duration-300
                  hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(201,168,76,0.4)]"
              >
                <DownloadIcon />
                <span>AI Resume</span>
              </a>

              {/* MERN Resume */}
              <a
                href={CV_MERN}
                download
                className={`flex items-center gap-2 px-5 py-3 border text-xs font-mono font-medium
                  tracking-[0.1em] uppercase transition-all duration-300
                  ${isDark
                    ? 'border-amber-500/40 text-amber-400 hover:border-amber-500 hover:bg-amber-500/10'
                    : 'border-amber-600/40 text-amber-700 hover:border-amber-600 hover:bg-amber-500/10'}`}
              >
                <DownloadIcon />
                <span>MERN Resume</span>
              </a>

              {/* Let's Connect */}
              <button
                onClick={scrollToContact}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-medium
                  tracking-[0.1em] uppercase transition-all duration-300 group
                  ${isDark
                    ? 'text-white/40 hover:text-white/70'
                    : 'text-black/40 hover:text-black/70'}`}
              >
                <span>Let's Connect</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowIcon />
                </span>
              </button>
            </div>
          </div>

          {/* ── RIGHT: Photo ── */}
          <div className={`flex-shrink-0 transition-all duration-700 delay-200
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">

              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-2 h-2 rounded-full bg-amber-500" />
              </div>
              {/* Second ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-amber-500/10
                animate-[spin_30s_linear_infinite_reverse]" />

              {/* Photo container */}
              <div className={`absolute inset-6 rounded-full overflow-hidden border-2 transition-all duration-700
                ${imgReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                ${isDark ? 'border-amber-500/30' : 'border-amber-500/50'}`}>
                <img
                  src={heroImg}
                  alt="Shivam Yadav"
                  className="w-full h-full object-cover object-top"
                  onLoad={() => setImgReady(true)}
                />
                {/* Sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
              </div>

              {/* Glow */}
              <div className="absolute inset-6 rounded-full blur-2xl opacity-20 bg-amber-500" />

              {/* Badge – top left */}
              <div className={`absolute -left-4 top-8 flex items-center gap-2 px-3 py-1.5 rounded-full
                text-[11px] font-mono tracking-wider shadow-xl border transition-colors
                ${isDark
                  ? 'bg-[#0a0a0f] border-white/10 text-white/60'
                  : 'bg-white border-black/8 text-black/60 shadow-black/10'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Full Stack
              </div>

              {/* Badge – bottom right */}
              <div className={`absolute -right-4 bottom-8 flex items-center gap-2 px-3 py-1.5 rounded-full
                text-[11px] font-mono tracking-wider shadow-xl border transition-colors
                ${isDark
                  ? 'bg-[#0a0a0f] border-white/10 text-white/60'
                  : 'bg-white border-black/8 text-black/60 shadow-black/10'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                AI · CV · ML
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className={`relative z-10 flex flex-col items-center gap-2 pb-8 transition-all duration-700 delay-500
        ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
        <span className={`text-[10px] tracking-[0.2em] uppercase font-mono
          ${isDark ? 'text-white/25' : 'text-black/30'}`}>Scroll</span>
      </div>

      {/* Blink keyframe injected via style tag */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}