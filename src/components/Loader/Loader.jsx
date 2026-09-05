import styles from "./Loader.module.css";

export function Spinner({ size = "md", onDark = false, className = "" }) {
  return (
    <span
      className={[styles.spinner, styles[size], onDark ? styles.onDark : "", className].filter(Boolean).join(" ")}
      role="status"
      aria-label="Loading"
    />
  );
}

export function FullPageLoader({ label = "Loading…" }) {
  return (
    <div className={styles.fullPage}>
      <Spinner size="lg" aria-label={label} />
    </div>
  );
}
