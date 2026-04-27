"use client";

import styles from "./contact.module.css";
import Contact from "@/components/Contact";
import { orbitron } from "@/components/fonts/font";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={`${styles.kicker} ${orbitron.className}`}>ESTABLISH CONNECTION</p>
            <h1 className={styles.title}>CONTACT.</h1>
          </div>
          <Contact />
        </div>
      </main>
    </div>
  );
}
