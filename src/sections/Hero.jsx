import React from 'react'
import style from "./HeroStyles.module.css"
import heroImg from "/assets/hero-img.png";
import sun from "/assets/sun.svg"
import moon from "/assets/moon.svg"
import LinkdInlight from "/assets/linkedin-light.svg"
import twitterlight from "/assets/twitter-light.svg"
import githublight from "/assets/github-light.svg"
import githubdark from "/assets/github-dark.svg"
import twitterdark from "/assets/twitter-dark.svg"
import LinkdIndark from "/assets/linkedin-dark.svg"

import CV from "/assets/shivamresumeintern.pdf"
import { useTheme } from '../common/ThemeContext';





const Hero = () => {
    const {theme,toggleTheme}=useTheme();
    const themeIcon=theme==="light"?sun: moon;
    const twitterIcon=theme==="light"?twitterlight: twitterdark;
    const githubIcon=theme==="light"?githublight:githubdark ;
    const LinkdInIcon=theme==="light"?LinkdInlight: LinkdIndark;
    
    
  return (
    <section id='Hero' className={style.container}>
<div className={style.colorModeContainer}>
<img
 className={style.hero}
 src={heroImg} alt="portfolio image" />

 <img className={style.colorMode} src={themeIcon}  onClick={toggleTheme} alt="Color mode icon" />



</div>


<div className={style.info}>
    <h1>Shivam <br />Yadav</h1>
    <h2>Frontend Developer</h2>
    <span>
        <a href="https://x.com/shivam21102005" target='_blank'>
            <img src={twitterIcon} alt="twitter icon" />
        </a>
        <a href="https://github.com/dashboard" target='_blank'>
            <img src={githubIcon} alt="github icon" />
        </a>
        <a href="https://www.linkedin.com/in/shivam-yadav-b87300294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank'>
            <img src={LinkdInIcon} alt="linkedin" />
        </a>

    </span>
    <p className={style.description}>With a passion for developing modern React web apps for commercial businesses.</p>

<a href={CV} download>
    <button className='hover' >
        Resume
    </button>
</a>
</div>

    </section>
  )
}

export default Hero
