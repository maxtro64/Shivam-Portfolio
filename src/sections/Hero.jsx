import React, { useState, useEffect } from 'react';
import style from "./HeroStyles.module.css";
import heroImg from "/assets/hero-img.png";
import sun from "/assets/sun.svg";
import moon from "/assets/moon.svg";
import LinkdInlight from "/assets/linkedin-light.svg";
import twitterlight from "/assets/twitter-light.svg";
import githublight from "/assets/github-light.svg";
import githubdark from "/assets/github-dark.svg";
import twitterdark from "/assets/twitter-dark.svg";
import LinkdIndark from "/assets/linkedin-dark.svg";
import CV from "/assets/shivamresumeintern.pdf";
import { useTheme } from '../common/ThemeContext';

const Hero = () => {
    const { theme, toggleTheme } = useTheme();
    const [currentRole, setCurrentRole] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const roles = [
        'MERN Stack Developer',
        'Full Stack Developer', 
        'React Specialist',
        'Backend Developer'
    ];

    const themeIcon = theme === "light" ? sun : moon;
    const twitterIcon = theme === "light" ? twitterlight : twitterdark;
    const githubIcon = theme === "light" ? githublight : githubdark;
    const LinkdInIcon = theme === "light" ? LinkdInlight : LinkdIndark;

    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setCurrentRole(prev => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id='Hero' className={`${style.container} ${isLoaded ? style.loaded : ''}`}>
            {/* Background Elements */}
            <div className={style.backgroundElements}>
                <div className={style.floatingShape}></div>
                <div className={style.floatingShape}></div>
                <div className={style.floatingShape}></div>
            </div>

            <div className={style.heroContent}>
                <div className={style.colorModeContainer}>
                    <div className={style.imageWrapper}>
                        <div className={style.imageBorder}></div>
                        <img
                            className={style.hero}
                            src={heroImg} 
                            alt="Shivam Yadav - MERN Developer" 
                        />
                        <div className={style.imageGlow}></div>
                    </div>

                    <img 
                        className={style.colorMode} 
                        src={themeIcon}  
                        onClick={toggleTheme} 
                        alt="Toggle theme" 
                        title="Toggle Theme"
                    />
                </div>

                <div className={style.info}>
                    <div className={style.greeting}>
                        <span className={style.wave}>👋</span>
                        <span>Hello, I'm</span>
                    </div>
                    
                    <h1 className={style.name}>
                        <span className={style.firstName}>Shivam</span>
                        <span className={style.lastName}>Yadav</span>
                    </h1>
                    
                    <div className={style.roleContainer}>
                        <h2 className={style.role}>
                            {roles[currentRole]}
                        </h2>
                    </div>

                    <p className={style.description}>
                        Passionate about building scalable web applications with 
                        <span className={style.highlight}> React.js</span>,
                        <span className={style.highlight}> Node.js</span>, and
                        <span className={style.highlight}> MongoDB</span>
                    </p>

                    <div className={style.socialLinks}>
                        <a href="https://x.com/shivam21102005" target='_blank' rel="noopener noreferrer" className={style.socialLink}>
                            <img src={twitterIcon} alt="Twitter" />
                            <span className={style.tooltip}>Twitter</span>
                        </a>
                        <a href="https://github.com/dashboard" target='_blank' rel="noopener noreferrer" className={style.socialLink}>
                            <img src={githubIcon} alt="GitHub" />
                            <span className={style.tooltip}>GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/shivam-yadav-b87300294" target='_blank' rel="noopener noreferrer" className={style.socialLink}>
                            <img src={LinkdInIcon} alt="LinkedIn" />
                            <span className={style.tooltip}>LinkedIn</span>
                        </a>
                    </div>

                    <div className={style.ctaButtons}>
                        <a href={CV} download className={style.primaryBtn}>
                            <span>Download Resume</span>
                            <svg className={style.downloadIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                        </a>
                        
                        <button className={style.secondaryBtn} onClick={() => document.getElementById('Contact').scrollIntoView({ behavior: 'smooth' })}>
                            <span>Let's Connect</span>
                            <svg className={style.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={style.scrollIndicator}>
                <div className={style.scrollMouse}>
                    <div className={style.scrollWheel}></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;