import { useInView } from "../../hooks/useInView";
import styles from "./Reveal.module.css";

/**
 * Wraps children in a one-time scroll-triggered entrance animation.
 * variant: "up" (fade + rise), "zoom" (fade + scale in), "zoomOut" (fade + scale down), "fade".
 */
export function Reveal({ children, variant = "up", delay = 0, as: Component = "div", className = "" }) {
  const [ref, isInView] = useInView();

  return (
    <Component
      ref={ref}
      className={[styles.reveal, styles[variant], isInView ? styles.visible : "", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
