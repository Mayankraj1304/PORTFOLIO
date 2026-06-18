import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: 100,
      duration: 2.4,
      ease: "power3.inOut",
      onUpdate() {
        setProgress(Math.round(state.value));
      },
    });

    return () => tween.kill();
  }, []);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ delay: 0.35 }}
      aria-hidden={progress === 100}
    >
      <div className="loader-grid" />
      <motion.div
        className="loader-mark"
        animate={{ rotate: 360, scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.8 }}
      >
        <span>MR</span>
      </motion.div>
      <p>Booting MAYANK's Page</p>
      <strong>{progress}%</strong>
    </motion.div>
  );
}
