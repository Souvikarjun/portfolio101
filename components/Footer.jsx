"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { orbitron } from "./fonts/font";
import {animate,stagger} from "animejs";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              Array.from(entry.target.querySelectorAll('.animate-footer')),
              {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: stagger(100),
                ease: "outExpo",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.container}>
        <h2 className={`${styles.logo} ${orbitron.className} animate-footer`} style={{ opacity: 0 }}>THE GHOST / THE GRIEF</h2>
        <nav className={`${styles.nav} animate-footer`} style={{ opacity: 0 }}>
          <Link href="/">HOME</Link>
          <Link href="/developer">DEVELOPER</Link>
          <Link href="/musician">MUSIC</Link>
          <Link href="#contact">CONTACT</Link>
        </nav>
        <p className={`${styles.copyright} animate-footer`} style={{ opacity: 0 }}>
          © {new Date().getFullYear()} THE GHOST / THE GRIEF. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
