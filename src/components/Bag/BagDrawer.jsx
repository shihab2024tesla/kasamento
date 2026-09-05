import { useEffect } from "react";
import { Button } from "../Button";
import { CloseIcon } from "../icons";
import { useBag } from "../../hooks/useBag";
import { useToast } from "../../hooks/useToast";
import { formatINR } from "../../utils/currency";
import styles from "./BagDrawer.module.css";

export function BagDrawer() {
  const { items, isOpen, subtotal, closeBag, removeItem, setQty } = useBag();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") closeBag();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeBag]);

  if (!isOpen) return null;

  function handleCheckout() {
    showToast("Checkout isn't available in this preview yet.", "info");
  }

  return (
    <>
      <div className={styles.backdrop} onClick={closeBag} />
      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label="Your bag">
        <div className={styles.header}>
          <h2 className={styles.title}>Your Bag</h2>
          <button type="button" className={styles.closeButton} onClick={closeBag} aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.empty}>Your bag is empty. Explore the collection to add a piece for your day.</p>
          ) : (
            items.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.thumb}>
                  <img src={item.image} alt={item.imageAlt} className={styles.thumbPhoto} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemCategory}>{item.category}</div>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemRow}>
                    <div className={styles.qtyStepper}>
                      <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.qty}</span>
                      <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                    <div className={styles.itemPrice}>{formatINR(item.priceValue * item.qty)}</div>
                  </div>
                  <button type="button" className={styles.removeButton} onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <span className={styles.subtotalValue}>{formatINR(subtotal)}</span>
            </div>
            <Button variant="primary" fullWidth onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
