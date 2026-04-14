import Link from "next/link";
import styles from "./Navbar.module.css";
import { orbitron } from "./fonts/font";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={`${styles.logo} ${orbitron.className}`}>
        <span className={styles.logomark}>[N]</span> THE NOCTURNE
      </Link>
      <div className={styles.navLinks}>
        <button className={styles.contactBtn}>CONTACT</button>
      </div>
    </nav>
  );
}
