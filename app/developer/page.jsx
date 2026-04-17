"use client";

import { useEffect, useRef } from "react";
import { orbitron } from "@/components/fonts/font";
import styles from "./developer.module.css";
import Contact from "@/components/Contact";
import Link from "next/link";
import {animate,stagger} from "animejs";

const projects = [
  {
    tag: "PYTHON  TENSORFLOW  CUSTOM CUDA KERNELS",
    title: "CHESS CNN",
    copy: "Deep learning model for move prediction and board state evaluation. Optimized using custom CUDA kernels for real-time inference during grandmaster-level play.",
    link: "VIEW PROJECT",
  },
  {
    tag: "RUST  WASM  TAURI",
    title: "NOTIQUE",
    copy: "A minimalist, local-first markdown editor with end-to-end encrypted cloud sync and custom plugin architectures.",
    link: "VIEW PROJECT",
  },
  {
    tag: "GO  WEBSOCKETS",
    title: "WEBRTC CORE",
    copy: "P2P signaling infrastructure for high-concurrency video streaming.",
    link: "VIEW PROJECT",
  },
  {
    tag: "C++  RUST",
    title: "SHAREBITE",
    copy: "Ephemeral file sharing protocol utilizing temporary keys and auto-destructing server nodes. Built for extreme privacy.",
    link: "VIEW PROJECT",
  },
];

export default function DeveloperPage() {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animate Hero Section
    if (heroRef.current) {
      animate(
        heroRef.current.children,
        {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: stagger(150, { start: 200 }),
          ease: "outExpo",
        }
      );
    }

    // Animate Projects Grid on scroll
    const projectsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target.children,
              {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: stagger(200),
                ease: "outExpo",
              }
            );
            projectsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      projectsObserver.observe(projectsRef.current);
    }

    // Animate CTA on scroll
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target.children,
              {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: stagger(150),
                ease: "outExpo",
              }
            );
            ctaObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      projectsObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroSection} ref={heroRef}>
          <p className={`${styles.kicker} ${orbitron.className}`} style={{ opacity: 0 }}>ENGINEERING SYSTEMS</p>
          <h1 className={styles.title} style={{ opacity: 0 }}>
            ARCHITECTING <br />
            DIGITAL <br />
            <span className={styles.highlight}>STRUCTURES</span>
          </h1>
          <p className={styles.lead} style={{ opacity: 0 }}>
            I build high-performance distributed systems and cryptographic primitives. Focused on the intersection of low-level optimization and seamless user experience.
          </p>

          <div className={styles.tagsRow} style={{ opacity: 0 }}>
            <span className={styles.tag}>RUST</span>
            <span className={styles.tag}>REACT</span>
            <span className={styles.tag}>WEBGL</span>
            <span className={styles.tag}>KAFKA</span>
          </div>
        </div>

        <section className={styles.projectsGrid} ref={projectsRef}>
          {projects.map((project, idx) => (
            <article key={project.title} className={styles.projectCard} style={{ opacity: 0 }}>
              <div className={styles.cardImageHolder}></div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeaderRow}>
                  <h3>{project.title}</h3>
                  <div className={styles.iconHole}></div>
                </div>
                <p className={styles.projectCopy}>{project.copy}</p>
                <div className={styles.cardFooter}>
                  <p className={styles.projectTech}>{project.tag}</p>
                  <Link href="#" className={styles.projectLink}>{project.link} ↗</Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.ctaSection} ref={ctaRef}>
          <h2 className={styles.ctaTitle} style={{ opacity: 0 }}>
            READY TO <br /> INITIATE?
          </h2>
          <div className={styles.ctaButtons} style={{ opacity: 0 }}>
            <Link href="#contact" className={styles.btnPrimary}>START PROJECT</Link>
            <Link href="#" className={styles.btnSecondary}>VIEW GITHUB</Link>
          </div>
        </section>

      </main>
      <Contact />
    </div>
  );
}
