"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { orbitron, inter, jetbrainsMono } from "@/components/fonts/font";
import Contact from "@/components/Contact";
import { animate, stagger, onScroll } from "animejs";

export default function Home() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const imageTextRef = useRef(null);

  useEffect(() => {
    // Animate Hero Content
    if (heroRef.current) {
      animate(
        heroRef.current.children,
        {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(150, { start: 400 }),
          ease: "outExpo",
        }
      );
    }

    // Animate Info Cards
    if (cardsRef.current) {
      animate(
        cardsRef.current.children,
        {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(200, { start: 800 }),
          ease: "outExpo",
        }
      );
    }

    // Parallax scrolling for Hero Content behind the image section
    if (heroRef.current && imageTextRef.current) {
      animate(
        heroRef.current,
        {
          translateY: [0, 150],
          opacity: [1, 0.2],
          ease: 'linear',
          autoplay: onScroll({
            target: imageTextRef.current.parentElement, // .heroImageSection
            enter: 'top bottom',
            leave: 'top top',
          })
        }
      );
    }

    // Parallax for Hero Image Text and Cards
    if (imageTextRef.current && imageTextRef.current.parentElement) {
      animate(
        imageTextRef.current,
        {
          translateY: [150, -50],
          opacity: [0.6, 1],
          ease: 'linear',
          autoplay: onScroll({
            target: imageTextRef.current.parentElement,
            enter: 'top bottom',
            leave: 'top top',
          })
        }
      );
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent} ref={heroRef}>
            <p className={`${styles.kicker} ${orbitron.className}`} style={{ opacity: 1 }}>
              PORTFOLIO VOL. 01
            </p>
            <h1 className={styles.title} style={{ opacity: 1 }}>
              <span className={styles.this}>THIS IS</span>
              <div className={`${styles.nameHighlight} ${jetbrainsMono.className}`}>SOUVIKARJUN DEB</div>
              <span className={styles.subTitleText}>DEVELOPER <span className={styles.ampersand}>&</span> <span className={styles.musician}>MUSICIAN</span></span>
            </h1>

            <div className={styles.ctaGroup} style={{ opacity: 1 }}>
              <Link href="/developer" className={styles.ctaPrimary}>
                DEV WORK ↗
              </Link>
              <Link href="/musician" className={styles.ctaSecondary}>
                MUSIC ▶
              </Link>
            </div>
          </div>
        </div>

        <section className={styles.heroImageSection}>
          <div className={styles.heroImageText} ref={imageTextRef} style={{ opacity: 1 }}>
            <h2>
              SYNTHESIZING <br />
              LOGIC & <br />
              FREQUENCY.
            </h2>
            <div className={`${styles.infoCards} ${styles.onImage}`} ref={cardsRef}>
              <div className={styles.card}>
                <p className={`${styles.cardLabel} ${orbitron.className}`}>CURRENT STACK</p>
                <ul className={styles.stackList}>
                  <li>Rust / TypeScript</li>
                  <li>Distributed Systems</li>
                  <li>Low-latency Architecture</li>
                </ul>
              </div>

              <div className={styles.card}>
                <p className={`${styles.cardLabel} ${orbitron.className}`}>LATEST RELEASE</p>
                <div className={styles.release}>
                  <div className={styles.waveform}>||||||||||||||||||</div>
                  <div>
                    <h4>VOID_STRUCTURE</h4>
                    <p>AMBIENT / INDUSTRIAL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
