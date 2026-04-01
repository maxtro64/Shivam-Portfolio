import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../common/ThemeContext';

/* ════════════════════════════════════════
   SKILL DATA
════════════════════════════════════════ */
const CATEGORIES = [
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    number: '01',
    accent: 'emerald',
    description: 'Building intelligent systems with LLMs, RAG pipelines, and deep learning.',
    skills: [
      { name: 'LLaMA 3',      icon: '🦙' },
      { name: 'Gemini API',   icon: '✨' },
      { name: 'RAG Systems',  icon: '🔍' },
      { name: 'LangChain',    icon: '🔗' },
      { name: 'Whisper',      icon: '🎙️' },
      { name: 'ChromaDB',     icon: '🗄️' },
      { name: 'TensorFlow',   icon: '🧠' },
      { name: 'PyTorch',      icon: '🔥' },
      { name: 'Scikit-learn', icon: '📊' },
      { name: 'Ollama',       icon: '🤖' },
    ],
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    number: '02',
    accent: 'coral',
    description: 'Detecting, classifying and understanding the visual world in real time.',
    skills: [
      { name: 'YOLOv5',   icon: '👁️' },
      { name: 'YOLOv8',   icon: '👁️' },
      { name: 'OpenCV',   icon: '📷' },
      { name: 'LabelImg', icon: '🏷️' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    number: '03',
    accent: 'amber',
    description: 'Crafting pixel-perfect, performant interfaces users love.',
    skills: [
      { name: 'React.js',    icon: '⚛️' },
      { name: 'HTML',        icon: '🌐' },
      { name: 'CSS',         icon: '🎨' },
      { name: 'JavaScript',  icon: '⚡' },
      { name: 'Tailwind CSS', icon: '💨' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Architecture',
    number: '04',
    accent: 'blue',
    description: 'Designing scalable systems, REST APIs, and real-time data pipelines.',
    skills: [
      { name: 'Node.js',    icon: '🟢' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'REST APIs',  icon: '🔌' },
      { name: 'Socket.io',  icon: '🔁' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    number: '05',
    accent: 'purple',
    description: 'Storing, querying and retrieving data — relational, document and vector.',
    skills: [
      { name: 'MongoDB',          icon: '🍃' },
      { name: 'MySQL',            icon: '🐬' },
      { name: 'ChromaDB (Vector)', icon: '🌲' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    number: '06',
    accent: 'emerald',
    description: 'Core programming languages across the full stack and ML workflows.',
    skills: [
      { name: 'Python',     icon: '🐍' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'C++',        icon: '⚙️' },
    ],
  },
  {
    id: 'auth-payments',
    label: 'Auth & Payments',
    number: '07',
    accent: 'amber',
    description: 'Secure authentication flows and seamless payment integrations.',
    skills: [
      { name: 'JWT',          icon: '🔐' },
      { name: 'Google OAuth', icon: '🔑' },
      { name: 'OTP',          icon: '📲' },
      { name: 'Razorpay',     icon: '💳' },
      { name: 'Bcrypt',       icon: '🛡️' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    number: '08',
    accent: 'blue',
    description: 'The ecosystem of tools powering development, deployment and collaboration.',
    skills: [
      { name: 'Git',        icon: '🌿' },
      { name: 'Postman',    icon: '📮' },
      { name: 'Streamlit',  icon: '🖥️' },
      { name: 'Vercel',     icon: '▲' },
      { name: 'Render',     icon: '☁️' },
      { name: 'Cloudinary', icon: '🖼️' },
      { name: 'EmailJS',    icon: '📧' },
      { name: 'NumPy',      icon: '🔢' },
      { name: 'Pandas',     icon: '🐼' },
      { name: 'Matplotlib', icon: '📈' },
    ],
  },
];

const ACCENT = {
  amber:   { dot: 'bg-amber-500',   border: 'border-amber-500/40',   text: 'text-amber-400',   hoverBorder: 'hover:border-amber-500/60',   bg: 'bg-amber-500/8'   },
  blue:    { dot: 'bg-blue-500',    border: 'border-blue-500/40',    text: 'text-blue-400',    hoverBorder: 'hover:border-blue-500/60',    bg: 'bg-blue-500/8'    },
  emerald: { dot: 'bg-emerald-500', border: 'border-emerald-500/40', text: 'text-emerald-400', hoverBorder: 'hover:border-emerald-500/60', bg: 'bg-emerald-500/8' },
  coral:   { dot: 'bg-orange-500',  border: 'border-orange-500/40',  text: 'text-orange-400',  hoverBorder: 'hover:border-orange-500/60',  bg: 'bg-orange-500/8'  },
  purple:  { dot: 'bg-purple-500',  border: 'border-purple-500/40',  text: 'text-purple-400',  hoverBorder: 'hover:border-purple-500/60',  bg: 'bg-purple-500/8'  },
};

/* ════════════════════════════════════════
   SKILL TAG
════════════════════════════════════════ */
function SkillTag({ skill, accent, isDark, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const a = ACCENT[accent];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border cursor-default
        transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
        ${isDark
          ? `border-white/10 bg-white/[0.03] hover:${a.border} hover:${a.bg}`
          : `border-black/10 bg-black/[0.02] hover:${a.border} hover:${a.bg}`}
        group`}
    >
      <span className="text-sm leading-none">{skill.icon}</span>
      <span className={`font-mono text-sm font-medium tracking-wide
        ${isDark ? 'text-white/70 group-hover:text-white/90' : 'text-black/65 group-hover:text-black/85'}
        transition-colors duration-200`}>
        {skill.name}
      </span>
    </span>
  );
}

/* ════════════════════════════════════════
   CATEGORY BLOCK
════════════════════════════════════════ */
function CategoryBlock({ cat, isDark, blockVisible }) {
  const a = ACCENT[cat.accent];

  return (
    <div className={`transition-all duration-700
      ${blockVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

      {/* Category header */}
      <div className="flex items-start gap-6 mb-8">
        {/* Number */}
        <span className={`font-serif text-[80px] leading-none font-light select-none
          ${isDark ? 'text-white/5' : 'text-black/5'}`}>
          {cat.number}
        </span>

        <div className="pt-3 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-2 h-2 rounded-full ${a.dot}`} />
            <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${a.text}`}>
              {cat.id}
            </span>
          </div>
          <h3 className={`font-serif text-2xl md:text-3xl font-light
            ${isDark ? 'text-[#e8e4dc]' : 'text-[#1a1a2e]'}`}>
            {cat.label}
          </h3>
          <p className={`mt-2 text-[13px] font-mono leading-relaxed
            ${isDark ? 'text-white/35' : 'text-black/40'}`}>
            {cat.description}
          </p>
        </div>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-3">
        {cat.skills.map((skill, i) => (
          <SkillTag
            key={skill.name}
            skill={skill}
            accent={cat.accent}
            isDark={isDark}
            delay={i * 70}
          />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════ */
export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [blocksVisible, setBlocksVisible] = useState(Array(CATEGORIES.length).fill(false));

  /* Header */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Staggered category blocks */
  useEffect(() => {
    if (!headerVisible) return;
    CATEGORIES.forEach((_, i) => {
      setTimeout(() => {
        setBlocksVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 250);
    });
  }, [headerVisible]);

  const totalSkills = CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative overflow-hidden py-28 px-8 md:px-14 transition-colors duration-500
        ${isDark ? 'bg-[#0c0c12] text-[#e8e4dc]' : 'bg-white text-[#1a1a2e]'}`}
    >
      {/* Ambient orbs */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.06]
        ${isDark ? 'bg-amber-500' : 'bg-amber-400'}`} />
      <div className={`pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px]
        rounded-full blur-[120px] opacity-[0.07]
        ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`} />
      <div className={`pointer-events-none absolute -top-20 -right-20 w-[300px] h-[300px]
        rounded-full blur-[100px] opacity-[0.06]
        ${isDark ? 'bg-emerald-600' : 'bg-emerald-400'}`} />

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#c9a84c' : '#b8922a'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className={`mb-20 transition-all duration-700
          ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="flex items-center gap-3 mb-5">
            <span className={`text-[10px] font-mono tracking-[0.25em] uppercase ${isDark ? 'text-white/30' : 'text-black/35'}`}>03</span>
            <span className="w-8 h-px bg-amber-500" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-500">Technical Skills</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-light leading-none">
                Skills &amp; <em className="italic text-amber-500">Expertise</em>
              </h2>
              <p className={`mt-4 text-sm font-mono max-w-lg leading-relaxed
                ${isDark ? 'text-white/40' : 'text-black/50'}`}>
                A toolkit refined across {totalSkills}+ technologies — spanning the entire stack from
                browser pixels to ML model inference.
              </p>
            </div>
          </div>
        </div>

        {/* ── Category blocks ── */}
        <div className="flex flex-col gap-20">
          {CATEGORIES.map((cat, i) => (
            <React.Fragment key={cat.id}>
              <CategoryBlock cat={cat} isDark={isDark} blockVisible={blocksVisible[i]} />

              {/* Divider between categories */}
              {i < CATEGORIES.length - 1 && (
                <div className={`flex items-center gap-4 transition-all duration-700 delay-100
                  ${blocksVisible[i] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`flex-1 h-px ${isDark ? 'bg-white/6' : 'bg-black/6'}`} />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                  <div className={`flex-1 h-px ${isDark ? 'bg-white/6' : 'bg-black/6'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Bottom tagline ── */}
        <div className={`mt-24 flex flex-col items-center text-center gap-3 transition-all duration-700 delay-500
          ${blocksVisible[CATEGORIES.length - 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />
            <span className={`text-[11px] font-mono tracking-[0.18em] uppercase
              ${isDark ? 'text-white/25' : 'text-black/30'}`}>
              always learning
            </span>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />
          </div>
          <p className={`text-[13px] font-mono max-w-md leading-relaxed
            ${isDark ? 'text-white/30' : 'text-black/35'}`}>
            The stack keeps growing. Currently exploring <span className="text-amber-500">Ai Agents</span>,{' '}
            <span className="text-blue-400">WebAssembly</span>, and{' '}
            <span className="text-emerald-400">multimodal LLMs</span>.
          </p>
        </div>

      </div>
    </section>
  );
}