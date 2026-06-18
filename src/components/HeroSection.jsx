import { Suspense } from "react";
import { motion } from "framer-motion";
import { Rocket, Terminal, Volume2, VolumeX } from "lucide-react";
import HeroScene from "./HeroScene";

export default function HeroSection({
  heroTitle,
  soundOn,
  setSoundOn,
  setTerminalOpen,
}) {
  return (
    <section className="hero section" aria-labelledby="hero-title">
      <motion.div className="hero-bg" />
      <Suspense fallback={<div className="hero-canvas hero-fallback" />}>
        <HeroScene />
      </Suspense>

      <nav className="nav" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <button
          aria-label="Toggle optional sound architecture"
          onClick={() => setSoundOn((current) => !current)}
        >
          {soundOn ? <Volume2 /> : <VolumeX />}
        </button>
      </nav>

      <div className="hero-copy">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Building experiences that people remember.
        </motion.p>
        <h1 id="hero-title">
          {heroTitle.split("").map((character, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 70, rotateX: -80 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.9 + index * 0.045 }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          ))}
        </h1>
        <div className="hero-actions">
          <a className="primary" href="#projects" data-cursor>
            <Rocket /> Enter Project Universe
          </a>
          <button onClick={() => setTerminalOpen(true)} data-cursor>
            <Terminal /> Open Terminal
          </button>
        </div>
      </div>
    </section>
  );
}
