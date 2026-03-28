import { useState, useEffect } from "react";
import style from "./SkillsStyle.module.css";
import checkMarkIcon from "/assets/checkmark-dark.svg";

const SkillList = ({ src, skill, delay = 0, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${style.skillItem} ${isVisible ? style.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.skillContent}>
        <div className={`${style.iconContainer} ${isHovered ? style.hovered : ''}`}>
          <img src={src} alt="checkmark" className={style.checkIcon} />
        </div>
        <span className={`${style.skillText} ${isHovered ? style.hovered : ''}`}>
          {skill}
        </span>
      </div>
      
      {isHovered && (
        <div className={style.particles}>
          <div className={`${style.particle} ${style.particle1}`}></div>
          <div className={`${style.particle} ${style.particle2}`}></div>
          <div className={`${style.particle} ${style.particle3}`}></div>
        </div>
      )}
    </div>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSection(1);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className={style.container}>
      {/* Background Animation Elements */}
      <div className={style.backgroundAnimation}>
        <div className={`${style.orb} ${style.orb1}`}></div>
        <div className={`${style.orb} ${style.orb2}`}></div>
        <div className={`${style.orb} ${style.orb3}`}></div>
      </div>

      {/* Title Section */}
      <h1 className={`${style.title} ${isVisible ? style.titleVisible : ''}`}>
        Skills & Expertise
      </h1>
      <div className={`${style.titleUnderline} ${isVisible ? style.underlineVisible : ''}`}></div>

      <div className={style.skillsWrapper}>
        {/* Frontend Skills */}
        <h2 className={`${style.sectionTitle} ${isVisible ? style.sectionVisible : ''}`}>
          Frontend Development
        </h2>
        <div className={style.skillList}>
          <SkillList src={checkMarkIcon} skill={"HTML"} delay={600} isVisible={isVisible} />
          <SkillList src={checkMarkIcon} skill={"CSS"} delay={700} isVisible={isVisible} />
          <SkillList src={checkMarkIcon} skill={"JAVASCRIPT"} delay={800} isVisible={isVisible} />
          <SkillList src={checkMarkIcon} skill={"REACTJS"} delay={900} isVisible={isVisible} />
          <SkillList src={checkMarkIcon} skill={"TAILWINDCSS"} delay={1000} isVisible={isVisible} />
        </div>

        {/* Divider */}
        <div className={`${style.divider} ${isVisible ? style.dividerVisible : ''}`}>
          <div className={style.dividerLine}></div>
          <div className={style.dividerDot}></div>
        </div>

        {/* Backend Skills */}
        <h2 className={`${style.sectionTitle} ${activeSection >= 1 ? style.sectionVisible : ''}`}>
          Backend & Architecture
        </h2>
        <div className={style.skillList}>
          <SkillList src={checkMarkIcon} skill={"NODE"} delay={1400} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"FASTAPI"} delay={1500} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"REDIS"} delay={1600} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"MONGODB"} delay={1700} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"PINECONE"} delay={1800} isVisible={activeSection >= 1} />
        </div>

        {/* Divider */}
        <div className={`${style.divider} ${activeSection >= 1 ? style.dividerVisible : ''}`}>
          <div className={style.dividerLine}></div>
          <div className={style.dividerDot}></div>
        </div>

        {/* AI & CV Skills */}
        <h2 className={`${style.sectionTitle} ${activeSection >= 1 ? style.sectionVisible : ''}`}>
          AI & Computer Vision
        </h2>
        <div className={style.skillList}>
          <SkillList src={checkMarkIcon} skill={"PYTHON"} delay={2000} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"YOLOv8"} delay={2100} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"OPENCV"} delay={2200} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"LANGCHAIN"} delay={2300} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"TENSORFLOW"} delay={2400} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"PySide6"} delay={2500} isVisible={activeSection >= 1} />
        </div>

        {/* Divider */}
        <div className={`${style.divider} ${activeSection >= 1 ? style.dividerVisible : ''}`}>
          <div className={style.dividerLine}></div>
          <div className={style.dividerDot}></div>
        </div>

        {/* AI & CV Skills */}
        <h2 className={`${style.sectionTitle} ${activeSection >= 1 ? style.sectionVisible : ''}`}>
          AI & Computer Vision
        </h2>
        <div className={style.skillList}>
          <SkillList src={checkMarkIcon} skill={"PYTHON"} delay={2000} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"YOLOv8"} delay={2100} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"OPENCV"} delay={2200} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"LANGCHAIN"} delay={2300} isVisible={activeSection >= 1} />
          <SkillList src={checkMarkIcon} skill={"TENSORFLOW"} delay={2400} isVisible={activeSection >= 1} />
        </div>
      </div>

      {/* Scroll Button */}
      <div className={`${style.floatingButton} ${isVisible ? style.buttonVisible : ''}`}>
        <button 
          className={style.scrollButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </div>
    </section>
  );
};

export default Skills;