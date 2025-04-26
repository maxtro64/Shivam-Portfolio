import style from "./SkillsStyle.module.css"
import checkMarkIcon  from "/assets/checkmark-dark.svg"
import SkillList from "../common/SkillList"

const Skills = () => {
  return (
<section id="skills " className={style.container}>
    <h1 className="sectionTitle">Skills</h1>
    <div className={style.skillList}>
       <SkillList src={checkMarkIcon} skill={"HTML"}/>
       <SkillList src={checkMarkIcon} skill={"CSS"}/>
       <SkillList src={checkMarkIcon} skill={"JAVASCRIPT"}/>
       <SkillList src={checkMarkIcon} skill={"REACTJS"}/>
       <SkillList src={checkMarkIcon} skill={"NODE"}/>
    </div>
    <hr />
    <div className={style.skillList}>
       <SkillList src={checkMarkIcon} skill={"TAILWINDCSS"}/>
       <SkillList src={checkMarkIcon} skill={"MONGODB"}/>
       <SkillList src={checkMarkIcon} skill={"EXPRESSJS"}/>
       <SkillList src={checkMarkIcon} skill={"GIT"}/>
       
    </div>

</section>
  )
}

export default Skills
