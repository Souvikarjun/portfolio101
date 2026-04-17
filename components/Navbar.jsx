"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { orbitron } from "./fonts/font";
import {animate,stagger} from "animejs";

export default function Navbar() {
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    animate(
      [logoRef.current, ...linksRef.current.children],
      {
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: stagger(150, { start: 200 }),
        ease: "outExpo",
      }
    );
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link ref={logoRef} href="/" className={`${styles.logo} ${orbitron.className}`} style={{ opacity: 0 }}>
        <span className={styles.logomark}>[G]</span> THE GHOST / THE GRIEF
      </Link>
      <div className={styles.navLinks} ref={linksRef}>
        <Link href="/" className={styles.navLink} style={{ opacity: 0 }}>HOME</Link>
        <Link href="/developer" className={styles.navLink} style={{ opacity: 0 }}>DEVELOPER</Link>
        <Link href="/musician" className={styles.navLink} style={{ opacity: 0 }}>MUSIC</Link>
        <button className={styles.contactBtn} style={{ opacity: 0 }}>CONTACT</button>
      </div>
    </nav>
  );
}
