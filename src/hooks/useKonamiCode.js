import { useEffect } from "react";

const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onUnlock) {
  useEffect(() => {
    let currentIndex = 0;

    const keyHandler = (event) => {
      currentIndex =
        event.key === konamiSequence[currentIndex] ? currentIndex + 1 : 0;
      if (currentIndex === konamiSequence.length) {
        onUnlock();
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [onUnlock]);
}
