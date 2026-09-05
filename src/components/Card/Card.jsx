import { Button } from "../Button";
import { SparkleIcon } from "../icons";
import styles from "./Card.module.css";

export function ProductCard({
  category,
  name,
  price,
  rentalLabel = "rental",
  image,
  imageAlt,
  onAddToBag,
  onPreview,
  hasPhoto = true,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={imageAlt} className={styles.photo} loading="lazy" />
      </div>
      <div className={styles.info}>
        <div>
          <div className={styles.category}>{category}</div>
          <div className={styles.name}>{name}</div>
        </div>
        <div className={styles.price}>
          {price}
          <div className={styles.rental}>{rentalLabel}</div>
        </div>
      </div>
      {(onAddToBag || onPreview) && (
        <div className={styles.actions}>
          {onPreview && (
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={onPreview}
              className={[
                styles.previewButton,
                hasPhoto ? styles.previewButtonActive : styles.previewButtonDull,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <SparkleIcon />
              Preview on Me
            </Button>
          )}
          {onAddToBag && (
            <Button variant="secondary" size="sm" fullWidth onClick={onAddToBag}>
              Add to Bag
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
