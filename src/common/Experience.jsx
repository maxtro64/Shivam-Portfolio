
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../common/ThemeContext';

/* ════════════════════════════════════════
   EXPERIENCE DATA  ← edit these entries
════════════════════════════════════════ */
const EXPERIENCES = [
//   {
//     id: 1,
//     role: 'Full Stack Developer Intern',
//     company: 'Your Company Name',          // ← replace
//     duration: 'Jun 2024 – Aug 2024',
//     type: 'Internship',
//     location: 'Remote / New Delhi',
//     accent: 'amber',
//     points: [
//       'Built and deployed production features using React.js and Node.js serving 10,000+ users.',
//       'Integrated REST APIs and optimised MongoDB queries, reducing average response time by 35%.',
//       'Collaborated with cross-functional teams in an Agile sprint cycle.',
//     ],
//     tech: ['React', 'Node.js', 'MongoDB', 'REST API'],
//   },
  {
    id: 2,
    role: 'AI/ML Research Intern',
    company: 'Your Organisation',           // ← replace
    duration: 'Jan 2024 – Apr 2024',
    type: 'Internship',
    location: 'New Delhi',
    accent: 'blue',
    points: [
      'Developed a real-time drowsiness detection system using YOLOv8 with sub-50 ms inference.',
      'Fine-tuned computer vision models on custom datasets achieving 92% accuracy.',
      'Implemented RAG pipelines with LangChain + Pinecone for an educational AI assistant.',
    ],
    tech: ['Python', 'YOLOv8', 'LangChain', 'OpenCV'],
  },
  {
    id: 3,
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    duration: '2023 – Present',
    type: 'Freelance',
    location: 'Remote',
    accent: 'emerald',
    points: [
      'Designed and shipped full-stack web applications for clients across healthcare and e-commerce.',
      'Delivered the Hospital Management System and Phygital commerce platform end-to-end.',
      'Maintained 100% client satisfaction across all engagements.',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'Tailwind'],
  },
];

/* ════════════════════════════════════════
   EDUCATION DATA  ← edit this
════════════════════════════════════════ */
const EDUCATION = [
  {
    degree: 'Diploma — Computer Science & Engineering',
    institution: 'Guru Nanak Dev DSEU ROHINI College',  // ← replace
    duration: '2023 – 2026',
    grade: 'CGPA: 8.8 / 10',                  // ← replace
    highlights: ['AI & Machine Learning', 'Data Structures & Algorithms', 'Computer Vision'],
  },
];

/* ── Accent map ── */
const A = {
  amber:   { dot: 'bg-amber-500',   border: 'border-amber-500/30',   text: 'text-amber-400',   bg: 'bg-amber-500/8',   tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20'   },
  blue:    { dot: 'bg-blue-500',    border: 'border-blue-500/30',    text: 'text-blue-400',    bg: 'bg-blue-500/8',    tag: 'bg-blue-500/10 text-blue-400 border-blue-500/20'       },
  emerald: { dot: 'bg-emerald-500', border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/8', tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
};

/* ── Icons ── */
const BriefcaseIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/>
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
const LeetCodeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);
const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const GraduationIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

/* ════════════════════════════════════════
   EXPERIENCE CARD
════════════════════════════════════════ */
function ExpCard({ exp, isDark, index, visible }) {
  const [open, setOpen] = useState(index === 0); // first card open by default
  const a = A[exp.accent];

  return (
    <div
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={`relative rounded-xl border overflow-hidden transition-all duration-300
        ${isDark ? 'border-white/8 bg-white/[0.02]' : 'border-black/8 bg-black/[0.01]'}
        ${open ? `${a.border} ${a.bg}` : ''}`}>

        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300
          ${open ? a.dot : isDark ? 'bg-white/8' : 'bg-black/8'}`} />

        {/* Header — always visible */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-start justify-between gap-4 px-7 py-5 text-left"
        >
          <div className="flex items-start gap-4">
            {/* Icon bubble */}
            <div className={`mt-0.5 flex items-center justify-center w-9 h-9 rounded-full border shrink-0
              transition-colors duration-300
              ${open
                ? `${a.border} ${a.text}`
                : isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30'}`}>
              <BriefcaseIcon />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className={`font-serif text-lg font-light transition-colors duration-300
                  ${open ? a.text : isDark ? 'text-white/80' : 'text-black/75'}`}>
                  {exp.role}
                </h3>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono tracking-wider
                  ${isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/35'}`}>
                  {exp.type}
                </span>
              </div>
              <p className={`font-mono text-sm ${isDark ? 'text-white/55' : 'text-black/55'}`}>
                {exp.company}
              </p>
              <div className={`flex items-center gap-3 mt-1 font-mono text-[11px]
                ${isDark ? 'text-white/30' : 'text-black/35'}`}>
                <span>{exp.duration}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                <span className="flex items-center gap-1"><MapPinIcon />{exp.location}</span>
              </div>
            </div>
          </div>

          <div className={`mt-1 shrink-0 transition-colors duration-300
            ${open ? a.text : isDark ? 'text-white/25' : 'text-black/30'}`}>
            <ChevronIcon open={open} />
          </div>
        </button>

        {/* Expandable body */}
        <div className={`overflow-hidden transition-all duration-400 ease-in-out
          ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-7 pb-6 pl-20 flex flex-col gap-4">
            {/* Bullet points */}
            <ul className="flex flex-col gap-2">
              {exp.points.map((pt, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`} />
                  <span className={`text-[13px] font-mono leading-relaxed
                    ${isDark ? 'text-white/50' : 'text-black/55'}`}>{pt}</span>
                </li>
              ))}
            </ul>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {exp.tech.map(t => (
                <span key={t} className={`px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wider ${a.tag}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   LEETCODE CARD  — live API fetch
════════════════════════════════════════ */
function LeetCodeCard({ isDark, visible }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Public unofficial LeetCode stats API
    fetch('https://leetcode-stats-api.herokuapp.com/shivam2110207')
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') setStats(data);
        else setError(true);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const difficulties = stats ? [
    { label: 'Easy',   solved: stats.easySolved,   total: stats.totalEasy,   color: 'bg-emerald-500', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    { label: 'Medium', solved: stats.mediumSolved,  total: stats.totalMedium, color: 'bg-amber-500',   text: 'text-amber-400',   glow: 'shadow-amber-500/20'   },
    { label: 'Hard',   solved: stats.hardSolved,    total: stats.totalHard,   color: 'bg-red-500',     text: 'text-red-400',     glow: 'shadow-red-500/20'     },
  ] : [];

  return (
    <div className={`transition-all duration-700 delay-300
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

      <div className={`relative rounded-xl border overflow-hidden
        ${isDark ? 'border-white/8 bg-white/[0.025]' : 'border-black/8 bg-white/60'}`}>

        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-500 rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-500/30 rounded-br-xl" />

        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b
          ${isDark ? 'border-white/8' : 'border-black/8'}`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <LeetCodeIcon />
            </div>
            <div>
              <p className={`font-mono text-sm font-medium ${isDark ? 'text-white/75' : 'text-black/70'}`}>
                LeetCode
              </p>
              <p className={`font-mono text-[11px] tracking-wider ${isDark ? 'text-white/30' : 'text-black/35'}`}>
                @shivam2110207
              </p>
            </div>
          </div>

          <a
            href="https://leetcode.com/u/shivam2110207/"
            target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono
              tracking-wider transition-all duration-300
              ${isDark
                ? 'border-amber-500/20 text-amber-400 hover:border-amber-500 hover:bg-amber-500/10'
                : 'border-amber-500/30 text-amber-600 hover:border-amber-500 hover:bg-amber-500/10'}`}>
            View Profile <ExternalIcon />
          </a>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center py-10 gap-3">
              <svg className="w-5 h-5 animate-spin text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              <span className={`font-mono text-sm ${isDark ? 'text-white/30' : 'text-black/35'}`}>
                Fetching live stats…
              </span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <LeetCodeIcon />
              <p className={`font-mono text-sm ${isDark ? 'text-white/40' : 'text-black/45'}`}>
                Couldn't load live stats right now.
              </p>
              <a href="https://leetcode.com/u/shivam2110207/" target="_blank" rel="noopener noreferrer"
                className="text-amber-500 text-xs font-mono hover:underline">
                Visit profile directly →
              </a>
            </div>
          )}

          {stats && (
            <div className="flex flex-col gap-6">
              {/* Big solved number */}
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-mono text-[11px] tracking-[0.15em] uppercase mb-1
                    ${isDark ? 'text-white/30' : 'text-black/35'}`}>Problems Solved</p>
                  <div className="flex items-end gap-2">
                    <span className="font-serif text-5xl font-light text-amber-500">
                      {stats.totalSolved}
                    </span>
                    <span className={`font-mono text-sm mb-1.5 ${isDark ? 'text-white/30' : 'text-black/35'}`}>
                      / {stats.totalEasy + stats.totalMedium + stats.totalHard}
                    </span>
                  </div>
                </div>

                {/* Acceptance rate */}
                <div className={`flex flex-col items-end gap-1`}>
                  <p className={`font-mono text-[11px] tracking-[0.15em] uppercase
                    ${isDark ? 'text-white/30' : 'text-black/35'}`}>Acceptance</p>
                  <span className={`font-serif text-3xl font-light text-amber-400`}>
                    {stats.acceptanceRate?.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Difficulty bars */}
              <div className="flex flex-col gap-3">
                {difficulties.map(({ label, solved, total, color, text }) => {
                  const pct = Math.round((solved / total) * 100);
                  return (
                    <div key={label} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${color}`} />
                          <span className={`font-mono text-[11px] tracking-wider ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                            {label}
                          </span>
                        </div>
                        <span className={`font-mono text-[11px] ${text}`}>
                          {solved} <span className={isDark ? 'text-white/25' : 'text-black/25'}>/ {total}</span>
                        </span>
                      </div>
                      <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/8' : 'bg-black/8'}`}>
                        <div
                          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ranking badge */}
              <div className={`flex items-center justify-between p-3 rounded-lg border
                ${isDark ? 'border-white/8 bg-white/[0.02]' : 'border-black/8 bg-black/[0.02]'}`}>
                <span className={`font-mono text-[11px] tracking-[0.12em] uppercase
                  ${isDark ? 'text-white/30' : 'text-black/35'}`}>Global Ranking</span>
                <span className="font-serif text-xl font-light text-amber-500">
                  #{stats.ranking?.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════ */
export default function Experience() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`relative overflow-hidden py-28 px-8 md:px-14 transition-colors duration-500
        ${isDark ? 'bg-[#0c0c12] text-[#e8e4dc]' : 'bg-white text-[#1a1a2e]'}`}
    >
      {/* Ambient orbs */}
      <div className={`pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
        blur-[140px] opacity-[0.07] ${isDark ? 'bg-amber-500' : 'bg-amber-400'}`} />
      <div className={`pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full
        blur-[120px] opacity-[0.06] ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className={`mb-16 transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-[10px] font-mono tracking-[0.25em] uppercase ${isDark ? 'text-white/30' : 'text-black/35'}`}>04</span>
            <span className="w-8 h-px bg-amber-500" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-500">Journey</span>
          </div>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-light leading-none">
            Experience &amp; <em className="italic text-amber-500">Coding</em>
          </h2>
          <p className={`mt-4 text-sm font-mono max-w-lg leading-relaxed
            ${isDark ? 'text-white/40' : 'text-black/50'}`}>
            Professional experience, education, and competitive programming journey — all in one place.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* LEFT — Timeline (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-4">

            {/* Experience label */}
            <div className={`flex items-center gap-3 mb-2 transition-all duration-700 delay-100
              ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <BriefcaseIcon />
              <span className={`font-mono text-[11px] tracking-[0.2em] uppercase
                ${isDark ? 'text-white/35' : 'text-black/40'}`}>Work Experience</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />
            </div>

            {EXPERIENCES.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} isDark={isDark} index={i} visible={visible} />
            ))}

            {/* Education card */}
            <div className={`flex items-center gap-3 mt-6 mb-2 transition-all duration-700 delay-200
              ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <GraduationIcon />
              <span className={`font-mono text-[11px] tracking-[0.2em] uppercase
                ${isDark ? 'text-white/35' : 'text-black/40'}`}>Education</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />
            </div>

            {EDUCATION.map((edu) => (
              <div key={edu.degree}
                className={`transition-all duration-500 delay-500
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`relative flex gap-4 rounded-xl border p-6
                  ${isDark ? 'border-white/8 bg-white/[0.02]' : 'border-black/8 bg-black/[0.01]'}`}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-amber-500/50" />
                  <div className="pl-2 flex-1">
                    <h3 className={`font-serif text-lg font-light mb-1
                      ${isDark ? 'text-white/80' : 'text-black/75'}`}>{edu.degree}</h3>
                    <p className={`font-mono text-sm mb-1 ${isDark ? 'text-white/55' : 'text-black/55'}`}>
                      {edu.institution}
                    </p>
                    <div className={`flex items-center gap-3 font-mono text-[11px] mb-3
                      ${isDark ? 'text-white/30' : 'text-black/35'}`}>
                      <span>{edu.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                      <span className="text-amber-500">{edu.grade}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map(h => (
                        <span key={h} className={`px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wider
                          ${isDark ? 'border-amber-500/20 text-amber-400/70 bg-amber-500/5'
                                   : 'border-amber-500/25 text-amber-700 bg-amber-500/5'}`}>{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — LeetCode card (2 cols) */}
          <div className="md:col-span-2">
            <div className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-200
              ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <LeetCodeIcon />
              <span className={`font-mono text-[11px] tracking-[0.2em] uppercase
                ${isDark ? 'text-white/35' : 'text-black/40'}`}>Competitive Coding</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />
            </div>
            <LeetCodeCard isDark={isDark} visible={visible} />
          </div>

        </div>
      </div>
    </section>
  );
}