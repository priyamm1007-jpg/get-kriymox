import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <Sun size={18} className={styles.icon} />

      <div className={styles.track}>
        <motion.div
          className={styles.thumb}
          animate={{
            x: theme === "light" ? 0 : 38,
            backgroundColor:
              theme === "light"
                ? "#FFD43B"
                : "#A855F7",
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 28,
          }}
        />
      </div>

      <Moon size={18} className={styles.icon} />
    </button>
  );
}