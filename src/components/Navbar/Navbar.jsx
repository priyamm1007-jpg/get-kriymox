import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  return (
    <motion.header
      className={styles.navbar}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>

        <a href="/" className={styles.logo}>

          <h2>KRIYMOX</h2>

          <span>Website Intelligence</span>

        </a>

        <nav className={styles.links}>

          <a href="#">About</a>

          <a href="#">Docs</a>

          <a href="#">GitHub</a>

        </nav>

        <div className={styles.actions}>

          <ThemeToggle />

        </div>

      </div>
    </motion.header>
  );
}