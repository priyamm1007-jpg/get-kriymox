import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  Search,
  ShieldCheck,
  Gauge,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";;

import styles from "./InspectionPanel.module.css";

export default function InspectionPanel({
  status,
  websiteUrl,
  inspection,
  error,
}) {

  const rows = [
    {
      icon: Globe,
      label: "Website",
      value: inspection?.title || "—",
    },

    {
      icon: Cpu,
      label: "Framework",
      value: inspection?.framework || "Unknown",
    },

    {
      icon: Search,
      label: "SEO",
      value:
        inspection?.seo?.openGraph
          ? "Open Graph"
          : "Basic",
    },

    

    {
      icon: ShieldCheck,
      label: "Security",
      value:
        inspection?.security?.https
          ? "HTTPS Enabled"
          : "Not Secure",
    },

    {
      icon: Gauge,
      label: "Language",
      value:
        inspection?.language || "Unknown",
    },
  ];

  return (
    <motion.aside
      className={styles.panel}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <span className={styles.liveDot}></span>
        <span>INSPECTION PANEL</span>
      </div>

      <div className={styles.statusBox}>
        <span className={styles.label}>
          STATUS
        </span>

        <AnimatePresence mode="wait">

          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <h3>Ready</h3>

              <p>
                Waiting for inspection...
              </p>
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <div className={styles.loadingTitle}>
                <LoaderCircle
                  size={18}
                  className={styles.spin}
                />

                Inspecting...
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                ></div>
              </div>

              <p>
                Reading website structure...
              </p>
            </motion.div>
          )}

          {status === "complete" && (
            <motion.div
              key="complete"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <div className={styles.complete}>
                <CheckCircle2 size={20} />

                Inspection Complete
              </div>

              <p>
                {websiteUrl ||
                  inspection?.canonical ||
                  "Website analyzed"}
              </p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <h3>Error</h3>

              <p>
                {error ||
                  "Inspection failed"}
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className={styles.rows}>
        {rows.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={styles.row}
            >
              <div className={styles.left}>
                <Icon size={18} />
                <span>{item.label}</span>
              </div>

              <strong>
                {item.value}
              </strong>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}