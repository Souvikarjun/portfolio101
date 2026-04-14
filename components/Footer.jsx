import Link from "next/link";
import styles from "./Footer.module.css";
import { orbitron } from "./fonts/font";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={`${styles.logo} ${orbitron.className}`}>THE NOCTURNE</h2>
        <nav className={styles.nav}>
          <Link href="/">HOME</Link>
          <Link href="/developer">DEVELOPER</Link>
          <Link href="/musician">MUSIC</Link>
          <Link href="#contact">CONTACT</Link>
        </nav>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} NOCTURNE MONOLITH. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
