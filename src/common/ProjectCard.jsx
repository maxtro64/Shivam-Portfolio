import React, { useState } from 'react'
import style from './ProjectCard.module.css'

const ProjectCard = ({ 
  src, 
  link, 
  liveLink,
  title, 
  description, 
  longDescription,
  technologies = [],
  status = 'completed',
  featured = false,
  index = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`${style.card} ${featured ? style.featured : ''} ${imageLoaded ? style.loaded : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Badge */}
      {status === 'in-progress' && (
        <div className={style.statusBadge}>
          <div className={style.statusDot}></div>
          In Progress
        </div>
      )}

      {/* Featured Badge */}
      {featured && (
        <div className={style.featuredBadge}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
          </svg>
          Featured
        </div>
      )}

      {/* Image Container */}
      <div className={style.imageContainer}>
        <div className={style.imageWrapper}>
          <img 
            src={src} 
            alt={`${title} preview`}
            className={style.projectImage}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className={style.imageOverlay}>
            <div className={style.overlayContent}>
              <div className={style.actionButtons}>
                {liveLink && (
                  <a 
                    href={liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${style.actionBtn} ${style.liveBtn}`}
                    title="View Live Demo"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                    </svg>
                    Live Demo
                  </a>
                )}
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${style.actionBtn} ${style.codeBtn}`}
                  title="View Source Code"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                  Code
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={style.imageSkeleton}></div>
      </div>

      {/* Content */}
      <div className={style.content}>
        <div className={style.header}>
          <h3 className={style.title}>{title}</h3>
          <div className={style.titleUnderline}></div>
        </div>
        
        <p className={style.description}>
          {isHovered && longDescription ? longDescription : description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className={style.technologies}>
            {technologies.slice(0, 4).map((tech, techIndex) => (
              <span key={techIndex} className={style.techTag}>
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className={style.techCount}>+{technologies.length - 4}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className={style.footer}>
          <div className={style.projectLinks}>
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={style.linkBtn}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                </svg>
                Demo
              </a>
            )}
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={style.linkBtn}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard