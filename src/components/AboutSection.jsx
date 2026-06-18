import { motion } from "framer-motion";

export default function AboutSection({ sections }) {
  return (
    <section id="about" className="section command">
      <div className="section-kicker">Command Center</div>
      <h2>Not an about section. A control room for how I think.</h2>
      <div className="command-grid">
        {sections.map(({ title, description }, index) => (
          <motion.article
            className="holo-panel"
            key={title}
            whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
          >
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
