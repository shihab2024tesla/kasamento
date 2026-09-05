import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { CloseIcon } from "../icons";
import styles from "./EventDetailsModal.module.css";

const STORAGE_KEY = "kasamento-event-details";

const FUNCTION_OPTIONS = [
  "Marriage",
  "Reception",
  "Engagement",
  "Sangeet",
  "Haldi",
  "Birthday",
  "Anniversary",
  "Baby Shower",
  "Housewarming",
  "Other",
];

export function EventDetailsModal() {
  const [isOpen, setIsOpen] = useState(() => !window.localStorage.getItem(STORAGE_KEY));
  const [functionType, setFunctionType] = useState(FUNCTION_OPTIONS[0]);
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const { documentElement, body } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
    if (!eventDate) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ functionType, eventDate }));
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Tell us about your function">
        <button type="button" className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.eyebrow}>Before you explore</div>
        <h2 className={styles.title}>Tell us about your function</h2>
        <p className={styles.subtitle}>This helps us tailor recommendations for your big day.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <div className={styles.pillGrid}>
              {FUNCTION_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={[styles.pill, functionType === option ? styles.pillActive : ""].filter(Boolean).join(" ")}
                  onClick={() => setFunctionType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Date"
            type="date"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
            required
          />

          <Button type="submit" variant="primary" size="sm" fullWidth>
            Continue
          </Button>
        </form>
      </div>
    </>
  );
}
