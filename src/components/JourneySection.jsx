import { motion } from "framer-motion";

export default function JourneySection({ milestones }) {
  return (
    <section className="section tunnel">
      <div className="section-kicker">Journey Tunnel</div>
      <h2>Scroll through the system log.</h2>
      {milestones.map(([year, text]) => (
        <motion.article
          className="milestone"
          key={year}
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -80 }}
          viewport={{ once: true }}
        >
          <strong>{year}</strong>
          <p>{text}</p>
        </motion.article>
      ))}
    </section>
  );
}
