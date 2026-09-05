import { Spinner } from "../Loader";
import styles from "./Button.module.css";

export function Button({
  children,
  as: Component = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  const isOnDark = variant === "primary" || variant === "gold";
  const typeProp = Component === "button" ? { type } : {};

  return (
    <Component
      className={[styles.button, styles[variant], size === "sm" ? styles.sm : "", fullWidth ? styles.fullWidth : "", className]
        .filter(Boolean)
        .join(" ")}
      disabled={Component === "button" ? disabled || loading : undefined}
      aria-busy={loading}
      {...typeProp}
      {...rest}
    >
      {loading && <Spinner size="sm" onDark={isOnDark} />}
      {children}
    </Component>
  );
}
