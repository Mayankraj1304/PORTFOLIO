import { useState } from "react";

import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import JourneySection from "./components/JourneySection";
import DashboardSection from "./components/DashboardSection";
import ContactSection from "./components/ContactSection";
import TerminalDialog from "./components/TerminalDialog";

import { useReducedMotionPreference } from "./hooks/useReducedMotionPreference";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useKonamiCode } from "./hooks/useKonamiCode";
import { skills, projects, milestones } from "./data/heroContent";
import {
  heroTitle,
  navigationItems,
  aboutSections,
  dashboardMetrics,
} from "./data/pageContent";

function App() {
  const reducedMotion = useReducedMotionPreference();
  const [activeSkill, setActiveSkill] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useSmoothScroll(reducedMotion);
  useKonamiCode(() => setTerminalOpen(true));

  return (
    <>
      <Loader />
      <CustomCursor />
      <main>
        <HeroSection
          heroTitle={heroTitle}
          navigationItems={navigationItems}
          soundOn={soundOn}
          setSoundOn={setSoundOn}
          setTerminalOpen={setTerminalOpen}
        />

        <AboutSection sections={aboutSections} />

        <SkillsSection
          skills={skills}
          activeSkill={activeSkill}
          setActiveSkill={setActiveSkill}
        />

        <ProjectsSection
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />

        <JourneySection milestones={milestones} />

        <DashboardSection metrics={dashboardMetrics} />

        <ContactSection />
      </main>

      {terminalOpen && (
        <TerminalDialog onClose={() => setTerminalOpen(false)} />
      )}
    </>
  );
}

export default App;
