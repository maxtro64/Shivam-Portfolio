import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useTheme } from '../common/ThemeContext';

/* ── Icons ── */
const SendIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ErrorIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const LocationIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const SOCIALS = [
  { href: 'https://github.com/maxtro64',                          Icon: GithubIcon,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/shivam-yadav-b87300294',  Icon: LinkedInIcon, label: 'LinkedIn' },
  { href: 'https://x.com/shivam21102005',                        Icon: TwitterIcon,  label: 'Twitter'  },
];

const INFO_ITEMS = [
  { Icon: MailIcon,     label: 'Email',    value: 'shivam2110207@gmail.com',  href: 'mailto:shivam2110207@gmail.com' },
  { Icon: LocationIcon, label: 'Location', value: 'New Delhi, India',    href: null },
];

/* ════════════════════════════════════════
   FLOATING LABEL INPUT
════════════════════════════════════════ */
function Field({ label, type = 'text', name, textarea = false, isDark, required = true }) {
  const [focused, setFocused]   = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const lifted = focused || hasValue;

  const base = `w-full bg-transparent font-mono text-sm outline-none transition-colors duration-300 resize-none
    ${isDark ? 'text-white/80 placeholder-transparent' : 'text-black/80 placeholder-transparent'}`;

  const wrapCls = `relative border-b transition-colors duration-300
    ${focused
      ? 'border-amber-500'
      : isDark ? 'border-white/15 hover:border-white/30' : 'border-black/15 hover:border-black/30'}`;

  const labelCls = `absolute left-0 font-mono text-[11px] tracking-[0.12em] uppercase pointer-events-none
    transition-all duration-300 origin-left
    ${lifted
      ? `-top-5 text-[10px] ${focused ? 'text-amber-500' : isDark ? 'text-white/30' : 'text-black/35'}`
      : `top-3 text-sm ${isDark ? 'text-white/30' : 'text-black/35'}`}`;

  return (
    <div className={wrapCls}>
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          className={`${base} pt-4 pb-3`}
          onFocus={() => setFocused(true)}
          onBlur={e  => { setFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={e => setHasValue(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={`${base} pt-4 pb-3`}
          onFocus={() => setFocused(true)}
          onBlur={e  => { setFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={e => setHasValue(e.target.value.length > 0)}
        />
      )}
      {/* Animated underline */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-500
        ${focused ? 'w-full' : 'w-0'}`} />
    </div>
  );
}

/* ════════════════════════════════════════
   CONTACT SECTION
════════════════════════════════════════ */
export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const form    = useRef();
  const sectionRef = useRef();

  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');

    console.log(form.current)
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_USER_ID
      )
      .then(() => {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };


  return (
    <>
      <section
        id="Contact"
        ref={sectionRef}
        className={`relative overflow-hidden py-28 px-8 md:px-14 transition-colors duration-500
          ${isDark ? 'bg-[#0a0a0f] text-[#e8e4dc]' : 'bg-[#f5f3ef] text-[#1a1a2e]'}`}
      >
        {/* Ambient radial glow */}
        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center`}>
          <div className={`w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.07]
            ${isDark ? 'bg-amber-500' : 'bg-amber-400'}`} />
        </div>

        {/* Top border line */}
        <div className={`absolute top-0 left-8 md:left-14 right-8 md:right-14 h-px
          ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className={`text-center mb-20 transition-all duration-700
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-amber-500" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-500">Get In Touch</span>
              <span className="w-10 h-px bg-amber-500" />
            </div>

            <h2 className="font-serif text-[clamp(40px,6vw,80px)] font-light leading-[0.95]">
              Let's build something<br />
              <em className="italic text-amber-500">great together</em>
            </h2>

            <p className={`mt-6 text-sm font-mono max-w-md mx-auto leading-relaxed
              ${isDark ? 'text-white/40' : 'text-black/50'}`}>
              Whether you have a project in mind, want to collaborate, or just want to say hello —
              my inbox is always open.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid md:grid-cols-5 gap-16 items-start">

            {/* LEFT — Info cards */}
            <div className={`md:col-span-2 flex flex-col gap-8 transition-all duration-700 delay-150
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>

              {/* Info items */}
              <div className="flex flex-col gap-4">
                {INFO_ITEMS.map(({ Icon, label, value, href }) => (
                  <div key={label}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-300
                      ${isDark ? 'border-white/8 hover:border-amber-500/30 bg-white/[0.02]'
                               : 'border-black/8 hover:border-amber-500/30 bg-black/[0.02]'}`}>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border shrink-0
                      ${isDark ? 'border-amber-500/20 text-amber-400' : 'border-amber-500/30 text-amber-600'}`}>
                      <Icon />
                    </div>
                    <div>
                      <p className={`text-[10px] font-mono tracking-[0.15em] uppercase mb-0.5
                        ${isDark ? 'text-white/30' : 'text-black/35'}`}>{label}</p>
                      {href
                        ? <a href={href} className={`text-sm font-mono transition-colors hover:text-amber-500
                            ${isDark ? 'text-white/70' : 'text-black/70'}`}>{value}</a>
                        : <p className={`text-sm font-mono ${isDark ? 'text-white/70' : 'text-black/70'}`}>{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className={`h-px ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />

              {/* Socials */}
              <div>
                <p className={`text-[10px] font-mono tracking-[0.2em] uppercase mb-4
                  ${isDark ? 'text-white/30' : 'text-black/35'}`}>Find me on</p>
                <div className="flex gap-3">
                  {SOCIALS.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`group relative flex items-center justify-center w-11 h-11 rounded-full border
                        transition-all duration-300
                        ${isDark
                          ? 'border-white/10 text-white/40 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10'
                          : 'border-black/10 text-black/40 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-500/10'}`}
                    >
                      <Icon />
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded
                        bg-amber-500 text-black text-[10px] font-mono tracking-wider
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border w-fit
                ${isDark ? 'border-green-500/20 bg-green-500/5' : 'border-green-500/25 bg-green-500/5'}`}>
                <span className="relative flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className={`text-[11px] font-mono tracking-[0.12em]
                  ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                  Available for freelance work
                </span>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className={`md:col-span-3 transition-all duration-700 delay-200
              ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>

              <form
                ref={form}
                onSubmit={sendEmail}
                className={`relative flex flex-col gap-10 p-8 md:p-10 rounded-2xl border
                  ${isDark ? 'border-white/8 bg-white/[0.025]' : 'border-black/8 bg-white/60 backdrop-blur-sm'}`}
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 rounded-br-2xl" />

                <div className="grid sm:grid-cols-2 gap-10">
                  <Field label="Your Name"  name="from_name"  isDark={isDark} />
                  <Field label="Your Email" name="email_id"   isDark={isDark} type="email" />
                </div>

                <Field label="Your Message" name="message" isDark={isDark} textarea />

                {/* Submit */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <p className={`text-[11px] font-mono ${isDark ? 'text-white/20' : 'text-black/25'}`}>
                    I typically respond within 24 hours.
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`relative flex items-center gap-2.5 px-7 py-3.5 font-mono text-xs
                      font-semibold tracking-[0.12em] uppercase transition-all duration-300 overflow-hidden
                      ${status === 'success'
                        ? 'bg-green-500 text-white cursor-default'
                        : status === 'loading'
                          ? 'bg-amber-500/60 text-black cursor-wait'
                          : 'bg-amber-500 text-black hover:bg-amber-400 hover:shadow-[0_0_28px_rgba(201,168,76,0.45)]'}`}
                  >
                    {status === 'loading' && (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                    )}
                    {status === 'success' && <CheckIcon />}
                    {(status === 'idle' || status === 'error') && <SendIcon />}

                    <span>
                      {status === 'loading' ? 'Sending…'
                        : status === 'success' ? 'Message Sent!'
                        : 'Send Message'}
                    </span>
                  </button>
                </div>

                {/* Status banner */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20
                    animate-[fadeUp_0.4s_ease-out]">
                    <CheckIcon />
                    <span className="text-green-400 text-xs font-mono tracking-wider">
                      Message delivered! I'll get back to you soon.
                    </span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20
                    animate-[fadeUp_0.4s_ease-out]">
                    <ErrorIcon />
                    <span className="text-red-400 text-xs font-mono tracking-wider">
                      Something went wrong. Please try again or email me directly.
                    </span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>

        <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`}</style>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className={`relative z-10 border-t px-8 md:px-14 py-6 flex flex-col sm:flex-row items-center
        justify-between gap-3 transition-colors duration-500
        ${isDark ? 'bg-[#0a0a0f] border-white/8' : 'bg-[#f5f3ef] border-black/8'}`}>

        <span className={`font-mono text-[11px] tracking-wider ${isDark ? 'text-white/25' : 'text-black/30'}`}>
          © 2025 <span className={isDark ? 'text-white/50' : 'text-black/50'}>Shivam Yadav</span>. All rights reserved.
        </span>

        <div className="flex items-center gap-2">
          <span className={`font-mono text-[11px] tracking-wider ${isDark ? 'text-white/25' : 'text-black/30'}`}>
            Designed &amp; built by
          </span>
          <span className="font-serif text-sm text-amber-500">Shivam Yadav</span>
          <span className={`font-mono text-[11px] ${isDark ? 'text-white/15' : 'text-black/20'}`}>◆</span>
        </div>
      </footer>
    </>
  );
}