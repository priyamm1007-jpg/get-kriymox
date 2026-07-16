import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.grid}></div>

      <div className={styles.glowOne}></div>

      <div className={styles.glowTwo}></div>
    </div>
  );
}