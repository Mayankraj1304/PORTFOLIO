import Lenis from 'lenis'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { Code2, Mail, Rocket, Sparkles, Terminal, Volume2, VolumeX, Zap } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'

const HeroScene = lazy(() => import('./components/HeroScene'))

const skills = [
  { name: 'Frontend', color: '#66e3ff', tech: ['React', 'TypeScript', 'R3F', 'Tailwind'], strength: 94 },
  { name: 'Backend', color: '#7cff9b', tech: ['Node', 'Express', 'REST', 'Auth'], strength: 90 },
  { name: 'Database', color: '#ffd36a', tech: ['MongoDB', 'SQL', 'Models', 'Indexes'], strength: 86 },
  { name: 'DevOps', color: '#ff7ad9', tech: ['Vercel', 'Docker', 'CI', 'Cloud'], strength: 78 },
  { name: 'Tools', color: '#b49cff', tech: ['Git', 'GSAP', 'Figma', 'Postman'], strength: 92 },
]

const projects = [
  { title: 'GitHub Profile Analyzer', tag: 'Developer intelligence', stack: 'React, Node, GitHub API', accent: '#66e3ff' },
  { title: 'Face Expression Detector', tag: 'Computer vision interface', stack: 'TensorFlow, JS, Canvas', accent: '#ff7ad9' },
  { title: 'Flood Mapping Platform', tag: 'Geospatial risk system', stack: 'MERN, Maps, Data Viz', accent: '#7cff9b' },
  { title: 'Authentication System', tag: 'Secure identity layer', stack: 'JWT, Express, MongoDB', accent: '#ffd36a' },
]

const milestones = [
  ['2022', 'Started building MERN applications and learning product-grade UI.'],
  ['2023', 'Moved from pages to systems: auth, APIs, dashboards, and deploys.'],
  ['2024', 'Added computer vision, mapping, and data-led product experiences.'],
  ['2026', 'Designing memorable digital products with motion and 3D depth.'],
]

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function Loader() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const state = { value: 0 }
    const tween = gsap.to(state, {
      value: 100,
      duration: 2.4,
      ease: 'power3.inOut',
      onUpdate() {
        setProgress(Math.round(state.value))
      },
    })
    return () => {
      tween.kill()
    }
  }, [])
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} animate={{ opacity: progress === 100 ? 0 : 1 }} transition={{ delay: .35 }} aria-hidden={progress === 100}>
      <div className="loader-grid" />
      <motion.div className="loader-mark" animate={{ rotate: 360, scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.8 }}>
        <span>MR</span>
      </motion.div>
      <p>Booting MayankOS</p>
      <strong>{progress}%</strong>
    </motion.div>
  )
}

function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 260, damping: 26 })
  const sy = useSpring(y, { stiffness: 260, damping: 26 })
  const [mode, setMode] = useState('idle')
  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target
      setMode(target.closest('button,a,input,textarea,[data-cursor]') ? 'active' : 'idle')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return <motion.div className={`cursor ${mode}`} style={{ x: sx, y: sy }} />
}

function SkillOrb({ skill, index, active, onClick }) {
  const angle = (Math.PI * 2 / skills.length) * index
  return (
    <button className={`skill-orb ${active ? 'active' : ''}`} style={{ '--orb': skill.color, '--x': `${Math.cos(angle) * 32}%`, '--y': `${Math.sin(angle) * 24}%` }} onClick={onClick} data-cursor>
      <span>{skill.name}</span>
    </button>
  )
}

function App() {
  const reducedMotion = useReducedMotionPreference()
  const [activeSkill, setActiveSkill] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [sound, setSound] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ duration: .9, smoothWheel: true, wheelMultiplier: .92 })
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenis.on('scroll', () => undefined)
    return () => lenis.destroy()
  }, [reducedMotion])

  useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let index = 0
    const key = (event) => {
      index = event.key === code[index] ? index + 1 : 0
      if (index === code.length) {
        setTerminalOpen(true)
        console.info('MayankOS developer mode unlocked.')
        index = 0
      }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [])

  return (
    <>
      <Loader />
      <CustomCursor />
      <main>
        <section className="hero section" aria-labelledby="hero-title">
          <motion.div className="hero-bg" />
          <Suspense fallback={<div className="hero-canvas hero-fallback" />}>
            <HeroScene />
          </Suspense>
          <nav className="nav" aria-label="Primary">
            <a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a>
            <button aria-label="Toggle optional sound architecture" onClick={() => setSound(!sound)}>{sound ? <Volume2 /> : <VolumeX />}</button>
          </nav>
          <div className="hero-copy">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Building experiences that people remember.</motion.p>
            <h1 id="hero-title">{'MAYANK RAJ'.split('').map((l, i) => <motion.span key={i} initial={{ opacity: 0, y: 70, rotateX: -80 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .9 + i * .045 }}>{l === ' ' ? '\u00A0' : l}</motion.span>)}</h1>
            <div className="hero-actions">
              <a className="primary" href="#projects" data-cursor><Rocket /> Enter Project Universe</a>
              <button onClick={() => setTerminalOpen(true)} data-cursor><Terminal /> Open Terminal</button>
            </div>
          </div>
        </section>

        <section id="about" className="section command">
          <div className="section-kicker">Command Center</div>
          <h2>Not an about section. A control room for how I think.</h2>
          <div className="command-grid">
            {['Story', 'Journey', 'Vision', 'Goals'].map((item, i) => (
              <motion.article className="holo-panel" key={item} whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}>
                <span>0{i + 1}</span>
                <h3>{item}</h3>
                <p>{['I build full-stack products with strong interaction design and clean engineering underneath.', 'From MERN foundations to data, maps, auth, and computer vision interfaces.', 'Make software feel less like forms and more like memorable product experiences.', 'Ship useful systems, keep learning deeply, and create work recruiters want to explore.'][i]}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="section ecosystem">
          <div className="section-kicker">Skill Ecosystem</div>
          <h2>Technologies orbit like living planets.</h2>
          <div className="orbit-system">
            {skills.map((skill, i) => <SkillOrb key={skill.name} skill={skill} index={i} active={activeSkill === i} onClick={() => setActiveSkill(i)} />)}
            <div className="skill-detail">
              <Sparkles />
              <h3>{skills[activeSkill].name}</h3>
              <p>{skills[activeSkill].strength}% operational confidence</p>
              <div>{skills[activeSkill].tech.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </section>

        <section id="projects" className="section universe">
          <div className="section-kicker">Project Universe</div>
          <h2>Each build is treated like a product world.</h2>
          <div className="project-shell">
            <div className="project-list" role="tablist" aria-label="Projects">
              {projects.map((project, i) => <button className={activeProject === i ? 'selected' : ''} onClick={() => setActiveProject(i)} key={project.title}>{project.title}</button>)}
            </div>
            <motion.div className="project-world" key={activeProject} initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} style={{ '--accent': projects[activeProject].accent }}>
              <div className="world-core"><Zap /></div>
              <h3>{projects[activeProject].title}</h3>
              <p>{projects[activeProject].tag}</p>
              <span>{projects[activeProject].stack}</span>
            </motion.div>
          </div>
        </section>

        <section className="section tunnel">
          <div className="section-kicker">Journey Tunnel</div>
          <h2>Scroll through the system log.</h2>
          {milestones.map(([year, text]) => <motion.article className="milestone" key={year} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -80 }} viewport={{ once: true }}><strong>{year}</strong><p>{text}</p></motion.article>)}
        </section>

        <section className="section github-center">
          <div className="section-kicker">GitHub Command Center</div>
          <h2>Activity, repositories, and engineering signal as a dashboard.</h2>
          <div className="dashboard">
            {['Repositories', 'Projects Built', 'Technologies', 'Coding Hours'].map((label, i) => <div className="metric" key={label}><strong>{[24, 12, 32, 1400][i]}+</strong><span>{label}</span></div>)}
            <div className="heatmap" aria-label="Contribution heatmap mock visualization">{Array.from({ length: 96 }, (_, i) => <span key={i} style={{ opacity: .2 + (i % 7) / 8 }} />)}</div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-kicker">Mission Control</div>
          <h2>Open a channel.</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <input aria-label="Name" placeholder="Name" required />
            <input aria-label="Email" type="email" placeholder="Email" required />
            <textarea aria-label="Message" placeholder="Mission brief" rows={4} required />
            <button type="submit" data-cursor><Mail /> Launch Message</button>
          </form>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><Code2 /> GitHub signal</a>
        </section>
      </main>
      {terminalOpen && <div className="terminal" role="dialog" aria-label="Developer terminal"><button onClick={() => setTerminalOpen(false)}>close</button><pre>{'> developer_mode --unlock\nAchievement: recruiter curiosity +1\nStatus: ready for collaboration'}</pre></div>}
    </>
  )
}

export default App
