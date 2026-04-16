import Link from "next/link";
import styles from "./Navbar.module.css";
import { orbitron } from "./fonts/font";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={`${styles.logo} ${orbitron.className}`}>
        <span className={styles.logomark}>[G]</span> THE GHOST / THE GRIEF
      </Link>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>HOME</Link>
        <Link href="/developer" className={styles.navLink}>DEVELOPER</Link>
        <Link href="/musician" className={styles.navLink}>MUSIC</Link>
        <button className={styles.contactBtn}>CONTACT</button>
      </div>
    </nav>
  );
}
