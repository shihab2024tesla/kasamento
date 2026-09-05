import { Button } from "../Button";
import { CloseIcon, SparkleIcon } from "../icons";
import styles from "./TryOnModal.module.css";

export function TryOnModal({ item, photo, onClose, onGenerate }) {
  if (!item) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={`Preview ${item.name} on you`}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.eyebrow}>Preview On Me</div>
        <h2 className={styles.title}>{item.name}</h2>
        <p className={styles.subtitle}>See how this piece looks on you before you add it to your bag.</p>

        <div className={styles.pairRow}>
          <div className={styles.thumb}>
            <img src={photo} alt="You" className={styles.thumbPhoto} />
            <span className={styles.thumbLabel}>You</span>
          </div>
          <div className={styles.plus}>+</div>
          <div className={styles.thumb}>
            <img src={item.image} alt={item.imageAlt} className={styles.thumbPhoto} />
            <span className={styles.thumbLabel}>{item.name}</span>
          </div>
        </div>

        <Button variant="gold" fullWidth onClick={onGenerate}>
          <SparkleIcon />
          Generate My Look
        </Button>
      </div>
    </>
  );
}
