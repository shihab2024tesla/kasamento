import styles from "./ComingSoonNotice.module.css";

export function ComingSoonNotice({ show, message = "This feature will be available soon." }) {
  if (!show) return null;

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.card}>{message}</div>
    </div>
  );
}
