import { forwardRef, useId } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef(function Input(
  { label, error, adornment, id, className = "", ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

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
          className={[styles.input, adornment ? styles.hasAdornment : "", error ? styles.hasError : ""]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...rest}
        />
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
