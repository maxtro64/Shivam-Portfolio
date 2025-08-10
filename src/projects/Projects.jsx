import React, { useState, useEffect, useRef } from 'react'
import style from "./ProjectsStyles.module.css"
import viberr from "/assets/viberr.png"
import ProjectCard from '../common/ProjectCard'
import ChatApp from "/assets/Chatapp.png"
import Hospital_Management from "/assets/hospitalmanagement.png"
import elevateyou from "/assets/elevateyou.webp"

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const projectsData = [
    {
      id: 1,
      src: viberr,
      link: "https://github.com/maxtro64/spotify-clone.git",
      liveLink: "https://spotify-clone-demo.netlify.app",
      title: "Spotify Clone",
      description: "A full-stack music streaming application built with React and Node.js",
      longDescription: "Complete music streaming platform with user authentication, playlist management, search functionality, and real-time music playback. Features include user profiles, favorite songs, and responsive design.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      category: "fullstack",
      featured: true,
      status: "completed"
    },
    {
      id: 2,
      src: ChatApp,
      link: "https://github.com/maxtro64/chat-app.git",
      liveLink: "https://hangout-chat-demo.netlify.app",
      title: "Hangout Chat",
      description: "Real-time chat application with modern UI and advanced features",
      longDescription: "Modern chat application with real-time messaging, file sharing, emoji support, typing indicators, and group chat functionality. Built with Socket.io for seamless communication.",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Tailwind"],
      category: "fullstack",
      featured: true,
      status: "completed"
    },
    {
      id: 3,
      src: Hospital_Management,
      link: "https://github.com/maxtro64/HospitalManagement.git",
      liveLink: "https://hospital-mgmt-demo.netlify.app",
      title: "Hospital Management System",
      description: "Comprehensive hospital management system with patient and staff management",
      longDescription: "Complete hospital management solution featuring patient registration, appointment scheduling, medical records, staff management, and billing system. Includes admin dashboard and role-based access.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js"],
      category: "fullstack",
      featured: false,
      status: "completed"
    },
    {
      id: 4,
      src: elevateyou,
      link: "https://github.com/maxtro64/elevate-you.git",
      liveLink: "https://elevate-you-demo.netlify.app",
      title: "Elevate You",
      description: "Mental wellness platform with mood tracking and meditation guides",
      longDescription: "Comprehensive mental wellness platform featuring mood tracking, guided meditation, progress analytics, community support, and personalized recommendations for mental health improvement.",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js", "PWA"],
      category: "frontend",
      featured: true,
      status: "in-progress"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects', count: projectsData.length },
    { key: 'fullstack', label: 'Full Stack', count: projectsData.filter(p => p.category === 'fullstack').length },
    { key: 'frontend', label: 'Frontend', count: projectsData.filter(p => p.category === 'frontend').length },
    { key: 'featured', label: 'Featured', count: projectsData.filter(p => p.featured).length }
  ];

  // Filter projects based on category
  useEffect(() => {
    let filtered = projectsData;
    if (filter === 'featured') {
      filtered = projectsData.filter(project => project.featured);
    } else if (filter !== 'all') {
      filtered = projectsData.filter(project => project.category === filter);
    }
    setVisibleProjects(filtered);
  }, [filter]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id='projects' 
      className={`${style.container} ${isVisible ? style.visible : ''}`}
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className={style.backgroundPattern}></div>
      
      {/* Header */}
      <div className={style.header}>
        <div className={style.titleContainer}>
          <h1 className={`sectionTitle ${style.mainTitle}`}>
            Featured Projects
          </h1>
          <div className={style.titleUnderline}></div>
          <p className={style.subtitle}>
            Showcasing my expertise in MERN stack development through real-world applications
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={style.filterTabs}>
          {categories.map((category) => (
            <button
              key={category.key}
              className={`${style.filterTab} ${filter === category.key ? style.active : ''}`}
              onClick={() => setFilter(category.key)}
            >
              <span className={style.tabLabel}>{category.label}</span>
              <span className={style.tabCount}>{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={style.projectsContainer}>
        {visibleProjects.map((project, index) => (
          <div 
            key={project.id}
            className={style.projectWrapper}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <ProjectCard 
              {...project}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className={style.statsSection}>
        <div className={style.stat}>
          <div className={style.statNumber}>15+</div>
          <div className={style.statLabel}>Projects Completed</div>
        </div>
        <div className={style.stat}>
          <div className={style.statNumber}>4+</div>
          <div className={style.statLabel}>Technologies Used</div>
        </div>
        <div className={style.stat}>
          <div className={style.statNumber}>2+</div>
          <div className={style.statLabel}>Years Experience</div>
        </div>
        <div className={style.stat}>
          <div className={style.statNumber}>100%</div>
          <div className={style.statLabel}>Client Satisfaction</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={style.ctaSection}>
        <h3 className={style.ctaTitle}>Interested in working together?</h3>
        <p className={style.ctaDescription}>
          I'm always excited to take on new challenges and create amazing digital experiences.
        </p>
        <div className={style.ctaButtons}>
          <a 
            href="#contact" 
            className={style.primaryCta}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('Contact').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Get In Touch</span>
            <svg className={style.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/maxtro64" 
            target="_blank" 
            rel="noopener noreferrer"
            className={style.secondaryCta}
          >
            <svg className={style.githubIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
            </svg>
            <span>View All Projects</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects