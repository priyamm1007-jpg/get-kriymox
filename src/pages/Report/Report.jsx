import { motion } from "framer-motion";
import { useLocation, Navigate } from "react-router-dom";

import styles from "./Report.module.css";

export default function Report() {

  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const {
    title,
    description,
    language,
    canonical,
    favicon,
  } = state;

  return (
    <main className={styles.report}>

      <div className="container">

        <motion.div
          className={styles.header}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >

          <div>

            <p className={styles.badge}>
              WEBSITE REPORT
            </p>

            <h1>{title}</h1>

            <span>
              Live Inspection Complete
            </span>

          </div>

          <img
            src={favicon}
            alt="favicon"
            width={48}
            height={48}
          />

        </motion.div>

        <section className={styles.grid}>

          <div className={styles.card}>
            <h3>Language</h3>
            <strong>{language}</strong>
          </div>

          <div className={styles.card}>
            <h3>Canonical</h3>
            <strong>
              {canonical !== "Not Found"
                ? "Found"
                : "Missing"}
            </strong>
          </div>

          <div className={styles.card}>
            <h3>Description</h3>
            <strong>
              {description !== "No description"
                ? "Found"
                : "Missing"}
            </strong>
          </div>

          <div className={styles.card}>
            <h3>Favicon</h3>
            <strong>
              {favicon ? "Found" : "Missing"}
            </strong>
          </div>

        </section>

        <section className={styles.largeCards}>

          <div className={styles.largeCard}>

            <h2>Meta Description</h2>

            <p>{description}</p>

          </div>

          <div className={styles.largeCard}>

            <h2>Canonical URL</h2>

            <p>{canonical}</p>

          </div>

        </section>

      </div>

    </main>
  );
}