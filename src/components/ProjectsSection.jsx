import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function ProjectsSection({
  projects,
  activeProject,
  setActiveProject,
}) {
  const activeProjectData = projects[activeProject];

  return (
    <section id="projects" className="section universe">
      <div className="section-kicker">Project Universe</div>
      <h2>Each build is treated like a product world.</h2>
      <div className="project-shell">
        <div className="project-list" role="tablist" aria-label="Projects">
          {projects.map((project, index) => (
            <button
              key={project.title}
              className={activeProject === index ? "selected" : ""}
              onClick={() => setActiveProject(index)}
            >
              {project.title}
            </button>
          ))}
        </div>
        <motion.div
          className="project-world"
          key={activeProject}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ "--accent": activeProjectData.accent }}
        >
          <div className="world-core">
            <Zap />
          </div>
          <h3>{activeProjectData.title}</h3>
          <p>{activeProjectData.tag}</p>
          <span>{activeProjectData.stack}</span>
        </motion.div>
      </div>
    </section>
  );
}
