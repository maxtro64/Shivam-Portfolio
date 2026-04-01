import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../common/ThemeContext';

import medflow_banner    from "/assets/medflow_banner.png";
import lexisum_banner    from "/assets/lexisum_banner.png";
import blitzwing_banner  from "/assets/blitzwing_banner.png";
import phygital_banner   from "/assets/phygital_banner.png";
import drowsiness_banner from "/assets/drowsiness_banner.png";

/* ── Icons ── */
const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ── Data ── */
const PROJECTS = [
  {
    id: 1, src: medflow_banner,
    link: "https://github.com/maxtro64/HospitalManagement",
    liveLink: "https://hospitalmanagement-3f5z.onrender.com",
    title: "Hospital Management System",
    short: "Advanced ERP for patient lifecycles and real-time ward tracking.",
    long: "A comprehensive healthcare ERP featuring secure JWT authentication and real-time data visualization of hospital occupancy and workflows.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Chart.js"],
    category: "fullstack", featured: true,
  },
  {
    id: 2, src: lexisum_banner,
    link: "https://github.com/maxtro64/Ai-Notes-summarizer",
    liveLink: null,
    title: "AI Notes Summarizer",
    short: "Intelligent NLP engine that extracts core insights from academic notes.",
    long: "An automated document processing system utilizing OpenAI's NLP capabilities for semantic summarization and insight extraction.",
    tech: ["Python", "OpenAI API", "Flask", "NLTK", "React"],
    category: "ai", featured: true,
  },
  {
    id: 3, src: blitzwing_banner,
    link: "https://github.com/maxtro64/Blitzwing",
    liveLink: "https://blitzwing4k.vercel.app/",
    title: "Blitzwing",
    short: "Multi-modal AI chatbot for context-aware conversations and task automation.",
    long: "A high-concurrency chatbot platform leveraging Gemini Pro for intelligent multi-modal interactions and low-latency task execution.",
    tech: ["Next.js", "Gemini Pro", "Tailwind CSS", "Vercel"],
    category: "ai", featured: true,
  },
  {
    id: 4, src: phygital_banner,
    link: "https://github.com/maxtro64/Phygital",
    liveLink: null,
    title: "Phygital",
    short: "Hyperlocal commerce platform bridging physical retail with digital proximity.",
    long: "A revolutionary shopping experience connecting local store inventories with digital users through precise geographic discovery.",
    tech: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
    category: "fullstack", featured: true,
  },
  {
    id: 5, src: drowsiness_banner,
    link: "https://github.com/maxtro64/Drowsiness-detector-using-YOLO",
    liveLink: null,
    title: "Drowsiness Detector",
    short: "Real-time AI safety system using YOLOv8 for sub-50ms fatigue monitoring.",
    long: "Critical safety application for drivers, employing computer vision to detect early signs of fatigue with audio alert triggers.",
    tech: ["Python", "YOLOv8", "OpenCV", "PySide6"],
    category: "ai", featured: false,
  },
  {
    id: 6, src: null,
    link: "https://github.com/maxtro64/RAG_Teaching_Assistant_ML",
    liveLink: null,
    title: "RAG Teaching Assistant",
    short: "Educational AI using Retrieval-Augmented Generation for cited text retrieval.",
    long: "Academic assistant providing hyper-accurate answers from textbook datasets with minimized hallucinations using vector re-ranking.",
    tech: ["Python", "LangChain", "Pinecone DB", "Gemini API"],
    category: "ai", featured: true,
  },
  {
    id: 7, src: null,
    link: "https://github.com/maxtro64/Realtime-Chat-App",
    liveLink: "https://realtime-chat-app-frontend-v9ie.onrender.com",
    title: "Real-Time Chat App",
    short: "Scalable messaging platform with Redis Pub/Sub for low-latency sync.",
    long: "A high-performance communication engine designed for massive concurrent connections and real-time message broadcasting.",
    tech: ["React", "Socket.io", "Redis", "Node.js", "Tailwind"],
    category: "fullstack", featured: false,
  },
];

const FILTERS = [
  { key: 'all',      label: 'All Projects' },
  { key: 'ai',       label: 'AI & ML'      },
  { key: 'fullstack',label: 'Full Stack'   },
  { key: 'featured', label: 'Featured'     },
];

const STATS = [
  { num: '15+', label: 'Projects Completed' },
  { num: '8+',  label: 'Technologies Used'  },
  { num: '2+',  label: 'Years Experience'   },
  { num: '100%',label: 'Open Source'        },
];

/* ── Category pill colours ── */
const CATEGORY_STYLE = {
  ai:       'bg-blue-500/10 text-blue-400 border-blue-500/20',
  fullstack:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

/* ════════════════════════════════════════
   PROJECT CARD
════════════════════════════════════════ */
function ProjectCard({ project, isDark, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 80); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  const { src, link, liveLink, title, short, long, tech, category, featured } = project;

  /* placeholder gradient when no image */
  const GRAD = [
    'from-blue-900/60 to-indigo-900/60',
    'from-emerald-900/60 to-teal-900/60',
    'from-purple-900/60 to-fuchsia-900/60',
    'from-amber-900/60 to-orange-900/60',
  ];
  const grad = GRAD[project.id % GRAD.length];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-500
        ${isDark ? 'bg-[#111118] border-white/8' : 'bg-white border-black/8'}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        ${hovered
          ? isDark ? 'border-amber-500/40 shadow-[0_0_40px_rgba(201,168,76,0.12)]'
                   : 'border-amber-500/50 shadow-[0_8px_40px_rgba(0,0,0,0.12)]'
          : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Gold top border reveal */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-300
        transition-all duration-500 origin-left
        ${hovered ? 'scale-x-100' : 'scale-x-0'}`} />

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {featured && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-black text-[10px] font-mono font-semibold tracking-wider">
            <StarIcon /> Featured
          </span>
        )}
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono tracking-wider capitalize ${CATEGORY_STYLE[category]}`}>
          {category === 'ai' ? 'AI & ML' : 'Full Stack'}
        </span>
      </div>

      {/* Image / Placeholder */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {src ? (
          <img
            src={src}
            alt={title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700
              ${hovered ? 'scale-110' : 'scale-100'}`}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <span className={`font-serif text-7xl font-light opacity-20 ${isDark ? 'text-white' : 'text-white'}`}>
              {title[0]}
            </span>
          </div>
        )}
        {/* Dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Hover action buttons on image */}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300
          ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-black text-[11px] font-mono font-semibold
                tracking-wider rounded hover:bg-amber-400 transition-colors shadow-lg">
              <ExternalIcon /> Live
            </a>
          )}
          <a href={link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur text-white text-[11px] font-mono
              font-semibold tracking-wider rounded hover:bg-white/20 transition-colors border border-white/20 shadow-lg">
            <GithubIcon /> Code
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className={`font-serif text-xl font-light leading-tight transition-colors duration-300
          ${hovered ? 'text-amber-500' : isDark ? 'text-[#e8e4dc]' : 'text-[#1a1a2e]'}`}>
          {title}
        </h3>

        <p className={`text-[13px] font-mono leading-relaxed flex-1
          ${isDark ? 'text-white/40' : 'text-black/50'}`}>
          {hovered ? long : short}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tech.slice(0, 4).map(t => (
            <span key={t}
              className={`px-2 py-0.5 text-[10px] font-mono tracking-wider border rounded
                ${isDark ? 'border-white/8 text-white/35' : 'border-black/8 text-black/40'}`}>
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className={`px-2 py-0.5 text-[10px] font-mono tracking-wider
              ${isDark ? 'text-white/25' : 'text-black/30'}`}>
              +{tech.length - 4}
            </span>
          )}
        </div>

        {/* Footer links */}
        <div className={`flex items-center gap-4 pt-3 mt-auto border-t
          ${isDark ? 'border-white/8' : 'border-black/8'}`}>
          <a href={link} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-[11px] font-mono tracking-wider transition-colors
              ${isDark ? 'text-white/35 hover:text-amber-400' : 'text-black/40 hover:text-amber-600'}`}>
            <GithubIcon /> GitHub
          </a>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-amber-500 hover:text-amber-400 transition-colors">
              <ExternalIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════ */
export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filter, setFilter]     = useState('all');
  const [displayed, setDisplayed] = useState(PROJECTS);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSectionVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleFilter = (key) => {
    if (key === filter) return;
    setAnimating(true);
    setTimeout(() => {
      setFilter(key);
      if (key === 'all')      setDisplayed(PROJECTS);
      else if (key === 'featured') setDisplayed(PROJECTS.filter(p => p.featured));
      else                    setDisplayed(PROJECTS.filter(p => p.category === key));
      setAnimating(false);
    }, 220);
  };

  const scrollToContact = () =>
    document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative overflow-hidden py-28 px-8 md:px-14 transition-colors duration-500
        ${isDark ? 'bg-[#0a0a0f] text-[#e8e4dc]' : 'bg-[#f5f3ef] text-[#1a1a2e]'}`}
    >
      {/* Ambient orb */}
      <div className={`pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10
        ${isDark ? 'bg-amber-500' : 'bg-amber-300'}`} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 transition-all duration-700
          ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-mono tracking-[0.25em] uppercase ${isDark ? 'text-white/30' : 'text-black/35'}`}>02</span>
              <span className="w-8 h-px bg-amber-500" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-500">Selected Work</span>
            </div>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-light leading-none">
              Featured <em className="italic text-amber-500">Projects</em>
            </h2>
            <p className={`mt-4 text-sm font-mono max-w-md leading-relaxed
              ${isDark ? 'text-white/40' : 'text-black/50'}`}>
              Real-world applications spanning the full spectrum — from AI vision systems to production web apps.
            </p>
          </div>

          {/* GitHub CTA */}
          <a
            href="https://github.com/maxtro64"
            target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-2 self-start md:self-end px-4 py-2.5 border rounded-full text-[11px] font-mono
              tracking-wider transition-all duration-300 whitespace-nowrap
              ${isDark
                ? 'border-white/10 text-white/40 hover:border-amber-500/50 hover:text-amber-400'
                : 'border-black/10 text-black/40 hover:border-amber-500/50 hover:text-amber-600'}`}>
            <GithubIcon />
            <span>maxtro64</span>
          </a>
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100
          ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {FILTERS.map(f => {
            const count = f.key === 'all' ? PROJECTS.length
              : f.key === 'featured' ? PROJECTS.filter(p => p.featured).length
              : PROJECTS.filter(p => p.category === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => handleFilter(f.key)}
                className={`flex items-center gap-2 px-4 py-2 text-[11px] font-mono tracking-wider uppercase
                  border rounded-full transition-all duration-300
                  ${active
                    ? 'bg-amber-500 text-black border-amber-500'
                    : isDark
                      ? 'border-white/10 text-white/40 hover:border-amber-500/40 hover:text-amber-400'
                      : 'border-black/10 text-black/40 hover:border-amber-500/40 hover:text-amber-600'}`}
              >
                {f.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold
                  ${active
                    ? 'bg-black/20 text-black'
                    : isDark ? 'bg-white/8 text-white/40' : 'bg-black/8 text-black/40'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Project Grid ── */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-200
          ${animating ? 'opacity-0' : 'opacity-100'}`}>
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} isDark={isDark} index={i} />
          ))}
        </div>

        {/* ── Stats ── */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border transition-all duration-700 delay-200
          ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          ${isDark ? 'border-white/8 bg-white/8' : 'border-black/8 bg-black/8'}`}>
          {STATS.map(({ num, label }) => (
            <div key={label}
              className={`flex flex-col items-center justify-center py-10 gap-2 group
                transition-colors duration-300
                ${isDark ? 'bg-[#0a0a0f] hover:bg-amber-500/5' : 'bg-[#f5f3ef] hover:bg-amber-500/5'}`}>
              <span className={`font-serif text-4xl font-light text-amber-500 group-hover:scale-110 transition-transform duration-300`}>
                {num}
              </span>
              <span className={`text-[11px] font-mono tracking-wider text-center
                ${isDark ? 'text-white/35' : 'text-black/40'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className={`mt-20 flex flex-col items-center text-center gap-4 transition-all duration-700 delay-300
          ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-16 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${isDark ? 'text-white/30' : 'text-black/35'}`}>
              Let's work together
            </span>
            <span className={`w-16 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          </div>
          <h3 className={`font-serif text-3xl md:text-4xl font-light
            ${isDark ? 'text-[#e8e4dc]' : 'text-[#1a1a2e]'}`}>
            Interested in working <em className="italic text-amber-500">together?</em>
          </h3>
          <p className={`max-w-sm text-[13px] font-mono leading-relaxed
            ${isDark ? 'text-white/40' : 'text-black/50'}`}>
            I'm always excited to take on new challenges and build something remarkable.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black text-xs font-mono font-semibold
                tracking-[0.1em] uppercase hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(201,168,76,0.35)]
                transition-all duration-300"
            >
              Get In Touch <ArrowIcon />
            </button>
            <a
              href="https://github.com/maxtro64"
              target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 border text-xs font-mono font-medium
                tracking-[0.1em] uppercase transition-all duration-300
                ${isDark
                  ? 'border-white/10 text-white/40 hover:border-amber-500/50 hover:text-amber-400'
                  : 'border-black/10 text-black/40 hover:border-amber-500/50 hover:text-amber-600'}`}>
              <GithubIcon /> All Projects
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}