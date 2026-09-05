import styles from "./Navbar.module.css";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rentals", label: "Bridal" },
  { href: "#groom", label: "Groom" },
  { href: "#how", label: "How it works" },
  { href: "#about", label: "About" },
];

export function Navbar({ activeHref = "#home", rightSlot }) {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#home">
        Kasamento
      </a>
      <nav className={styles.nav}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className={link.href === activeHref ? styles.active : undefined}>
            {link.label.toUpperCase()}
          </a>
        ))}
      </nav>
      <div className={styles.right}>{rightSlot}</div>
    </header>
  );
}
