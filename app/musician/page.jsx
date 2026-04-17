"use client";

import { useEffect, useRef } from "react";
import { orbitron } from "@/components/fonts/font";
import styles from "./musician.module.css";
import Contact from "@/components/Contact";
import {animate,stagger} from "animejs";

const galleryImages = [
  "linear-gradient(45deg, #1a1a24, #0f1014, #2a2c3d)",
  "linear-gradient(-45deg, #14151a, #a1aeff, #0f1014)",
  "linear-gradient(135deg, #0f1014, #ffb176, #1a1a24)",
  "radial-gradient(circle at center, #2a2c3d 0%, #0f1014 100%)",
  "linear-gradient(to right, #0f1014, #1a1a24, #0f1014)",
];

export default function MusicianPage() {
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const releaseRef = useRef(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      animate(
        headerRef.current.children,
        {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(150, { start: 200 }),
          ease: "outExpo",
        }
      );
    }

    // Gallery staggered scroll animation
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target.children,
              {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 1000,
                delay: stagger(100),
                ease: "outElastic(1, .8)",
              }
            );
            galleryObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      galleryObserver.observe(galleryRef.current);
    }

    // Release scroll animation
    const releaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target.children,
              {
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1200,
                delay: stagger(200),
                ease: "outExpo",
              }
            );
            releaseObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (releaseRef.current) {
      releaseObserver.observe(releaseRef.current);
    }

    return () => {
      galleryObserver.disconnect();
      releaseObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header} ref={headerRef}>
          <p className={`${styles.kicker} ${orbitron.className}`} style={{ opacity: 0 }}>ATMOSPHERIC VISUALS</p>
          <h1 className={styles.title} style={{ opacity: 0 }}>
            THE <br /> GALLERY
          </h1>
          <div className={styles.socials} style={{ opacity: 0 }}>
            <span>INSTAGRAM <strong>@the.grief.vsn</strong></span>
            <span>FACEBOOK <strong>/thegrief</strong></span>
          </div>
          <p className={styles.lead} style={{ opacity: 0 }}>
            A curated stream of moments from the monolith. Electronic landscapes and technical intersections captured in high contrast.
          </p>
        </div>

        <section className={styles.galleryGrid} ref={galleryRef}>
          {galleryImages.map((bg, i) => (
            <div key={i} className={styles.galleryItem} style={{ background: bg, opacity: 0, backgroundSize: '400% 400%' }}></div>
          ))}
          <div className={styles.showcaseCell} style={{ opacity: 0 }}>
            <div className={styles.spinningStar}>✦</div>
            <p>MORE<br />INCOMING</p>
          </div>
          <div className={styles.galleryItemPromo} style={{ opacity: 0, background: 'linear-gradient(-45deg, #090a0f, #1a1a24, var(--accent-secondary), #090a0f)', backgroundSize: '400% 400%' }}>
            <h2>LIVE RITUALS</h2>
            <p>MONOLITH TOUR / AUG 2024</p>
          </div>
          {galleryImages.slice(0, 4).map((bg, i) => (
            <div key={i + "b"} className={styles.galleryItem} style={{ background: bg, filter: 'grayscale(100%)', opacity: 0, backgroundSize: '400% 400%' }}></div>
          ))}
        </section>

        <div className={styles.expandRow}>
          <button className={styles.expandBtn}>EXPAND ARCHIVE ⌄</button>
        </div>

        <section className={styles.releases}>
          <div className={styles.releaseHighlight} ref={releaseRef}>
            <div className={styles.releaseImage} style={{ opacity: 0, background: 'linear-gradient(135deg, var(--accent-primary), #111, var(--accent-secondary), #050505)', backgroundSize: '400% 400%' }}></div>
            <div className={styles.releaseInfo} style={{ opacity: 0 }}>
              <p className={`${styles.kicker} ${orbitron.className}`}>NEW RELEASE / 02-14</p>
              <h2>THE RHYTHMS OF <br /> DELIBERATE <br /> SILENCE</h2>
              <p className={styles.desc}>
                After long immersive campaigns, an emergent narrative. A structural weave. Synthesizers acting as characters within the landscape.
              </p>
              <div className={styles.metrics}>
                <div>
                  <label>PLAYTIME</label>
                  <span>45:20.10.ms</span>
                </div>
                <div>
                  <label>CUES / STEMS</label>
                  <span>8 / 44</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Contact />
    </div>
  );
}
