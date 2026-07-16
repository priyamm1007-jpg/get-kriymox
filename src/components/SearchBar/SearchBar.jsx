import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  onAnalyze,
  loading,
}) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim() || loading) return;

    onAnalyze(url.trim());
  };

  return (
    <motion.form
      className={styles.searchBar}
      onSubmit={handleSubmit}
      initial={{
        opacity: 0,
        scaleY: 0,
      }}
      animate={{
        opacity: 1,
        scaleY: 1,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className={styles.left}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.4,
        }}
      >
        <span>🔗</span>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
        />
      </motion.div>

      <motion.button
        type="submit"
        className={styles.button}
        disabled={loading}
        initial={{
          x: 60,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.7,
          duration: 0.4,
        }}
      >
        {loading
          ? "INSPECTING..."
          : "START INSPECTION"}

        <span>→</span>
      </motion.button>
    </motion.form>
  );
}