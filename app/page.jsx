"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { orbitron, inter } from "@/components/fonts/font";
import Contact from "@/components/Contact";
import {animate, stagger, onScroll} from "animejs";

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

    // Parallax for Hero Image Text
    if (imageTextRef.current && imageTextRef.current.parentElement) {
      animate(
        imageTextRef.current,
        {
          translateY: [150, -50],
          opacity: [0.2, 1],
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
            <p className={`${styles.kicker} ${orbitron.className}`} style={{ opacity: 0 }}>
              PORTFOLIO VOL. 01
            </p>
            <h1 className={styles.title} style={{ opacity: 0 }}>
              DEVELOPER <br />
              <span className={styles.ampersand}>&</span><br />
              <span className={styles.musician}>MUSICIAN</span>
            </h1>

            <p className={styles.subtitle} style={{ opacity: 0 }}>
              Architecting digital ecosystems with technical precision while exploring
              the rhythmic boundaries of cinematic soundscapes. A dualistic approach to
              creative engineering.
            </p>

            <div className={styles.ctaGroup} style={{ opacity: 0 }}>
              <Link href="/developer" className={styles.ctaPrimary}>
                VIEW DEVELOPER WORK ↗
              </Link>
              <Link href="/musician" className={styles.ctaSecondary}>
                EXPLORE MUSIC ▶
              </Link>
            </div>
          </div>

          <div className={styles.infoCards} ref={cardsRef}>
            <div className={styles.card} style={{ opacity: 0 }}>
              <p className={`${styles.cardLabel} ${orbitron.className}`}>CURRENT STACK</p>
              <ul className={styles.stackList}>
                <li>Rust / TypeScript</li>
                <li>Distributed Systems</li>
                <li>Low-latency Architecture</li>
              </ul>
            </div>

            <div className={styles.card} style={{ opacity: 0 }}>
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

        <section className={styles.heroImageSection}>
          <div className={styles.heroImageText} ref={imageTextRef}>
            <h2>
              SYNTHESIZING <br />
              LOGIC & <br />
              FREQUENCY.
            </h2>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
