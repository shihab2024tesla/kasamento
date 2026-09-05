import { forwardRef, useId } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef(function Input(
  { label, error, adornment, id, className = "", placeholder, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  // Native date inputs ignore the placeholder attribute, and mobile browsers
  // render them fully blank (unlike desktop, which shows a dd/mm/yyyy hint),
  // so render our own overlay placeholder for type="date" instead.
  const showDatePlaceholder = rest.type === "date" && placeholder && !rest.value;

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        <input
          id={inputId}
          ref={ref}
          className={[
            styles.input,
            adornment ? styles.hasAdornment : "",
            error ? styles.hasError : "",
            showDatePlaceholder ? styles.dateEmpty : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          placeholder={placeholder}
          {...rest}
        />
        {showDatePlaceholder && (
          <span className={styles.datePlaceholder} aria-hidden="true">
            {placeholder}
          </span>
        )}
        {adornment && <div className={styles.adornment}>{adornment}</div>}
      </div>
      {error && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
