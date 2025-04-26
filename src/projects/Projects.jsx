import React from 'react'
import style from "./ProjectsStyles.module.css"
import viberr from "/assets/viberr.png"
import ProjectCard from '../common/ProjectCard'
import ChatApp from "/assets/Chatapp.png"
import Hospital_Management from "/assets/hospitalmanagement.png"
import elevateyou from "/assets/elevateyou.webp"

const Projects = () => {
  return (
  <section id='projects' className={style.container}>
<h1 className='sectionTitle'>Projects</h1>
<div className={style.projectsContainer}>
   <ProjectCard src={viberr} link={"https://github.com/maxtro64/spotify-clone.git"} h3="Spotify" p="Streaming App"/>
   <ProjectCard src={ChatApp} link={"https://github.com/maxtro64/chat-app.git"} h3="Hangout" p="Chat app"/>
   <ProjectCard src={Hospital_Management} link={"https://github.com/maxtro64/HospitalManagement.git"} h3="" p="Hospital Management App"/>
   <ProjectCard src={elevateyou} link={"https://github.com/maxtro64/spotify-clone.git"} h3="Elevate You" p="Mental Wellness App"/>
</div>



  </section>
  )
}

export default Projects
