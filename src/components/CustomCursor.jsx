import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [mode, setMode] = useState("idle");

  useEffect(() => {
    let currentMode = "idle";

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const nextMode = event.target.closest(
        "button,a,input,textarea,[data-cursor]",
      )
        ? "active"
        : "idle";

      if (nextMode !== currentMode) {
        currentMode = nextMode;
        setMode(nextMode);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className={`cursor ${mode}`}
      style={{ x, y, willChange: "transform" }}
    />
  );
}
