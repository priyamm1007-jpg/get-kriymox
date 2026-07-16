import { motion } from "framer-motion";
import { useState } from "react";

import { inspectWebsite } from "../../services/inspection";

import SearchBar from "../SearchBar/SearchBar";
import InspectionPanel from "../InspectionPanel/InspectionPanel";
import Background from "../Background/Background";

import styles from "./Hero.module.css";

export default function Hero() {
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (url) => {
    try {
      setLoading(true);
      setStatus("loading");
      setError("");
      setReport(null);

      const normalizedUrl =
        url.startsWith("http://") ||
        url.startsWith("https://")
          ? url
          : `https://${url}`;

      const data = await inspectWebsite(normalizedUrl);

      setReport(data);
      setStatus("complete");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const expanded =
    status === "loading" ||
    status === "complete" ||
    status === "error";

  return (
    <section className={styles.hero}>
      <Background />

      <div className={styles.wrapper}>
        <motion.div
          className={styles.left}
          animate={{
            flex: expanded ? 0.25 : 0.6,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <span className={styles.badge}>
            WEBSITE INTELLIGENCE
          </span>

          {!expanded ? (
            <>
              <div className={styles.title}>
                <h1>INSPECT</h1>
                <h1>THE WEB</h1>
              </div>

              <p className={styles.description}>
                Analyze any website in seconds.
                <br />
                Discover technologies, SEO,
                metadata, fonts and security.
              </p>
            </>
          ) : (
            <motion.div
  className={styles.resultSummary}
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
>
  <h1>RESULT</h1>

  <div className={styles.resultCard}>

    <div>
  <span>Fonts</span>

  <div className={styles.fontList}>
    {report?.fonts?.length ? (
      report.fonts
        .slice(0, 2)
        .map((font) => (
          <strong key={font}>
            {font}
          </strong>
        ))
    ) : (
      <strong>
        Not Detected
      </strong>
    )}
  </div>
</div>
    <div>
  <span>Colors</span>

  <div className={styles.colorList}>
    <strong>Coming Soon</strong>
  </div>
</div>

  </div>
</motion.div>
          )}

          <SearchBar
            onAnalyze={handleAnalyze}
            loading={loading}
          />
        </motion.div>

        <motion.div
          className={styles.right}
          animate={{
            flex: expanded ? 0.75 : 0.4,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <InspectionPanel
            status={status}
            websiteUrl={report?.canonical}
            inspection={report}
            error={error}
          />
        </motion.div>
      </div>
    </section>
  );
}