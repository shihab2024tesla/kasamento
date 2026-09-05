import { Button } from "../Button";
import styles from "./Card.module.css";

export function ProductCard({ category, name, price, rentalLabel = "rental", image, imageAlt, onAddToBag }) {
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
      {onAddToBag && (
        <div className={styles.actions}>
          <Button variant="secondary" size="sm" fullWidth onClick={onAddToBag}>
            Add to Bag
          </Button>
        </div>
      )}
    </article>
  );
}
