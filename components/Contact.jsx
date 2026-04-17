"use client";

import { useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import { orbitron } from "./fonts/font";
import {animate,stagger} from "animejs";

export default function Contact() {
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              Array.from(entry.target.querySelectorAll('.animate-me')),
              {
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1200,
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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className={styles.section} ref={contactRef}>
      <h2 className={`${styles.title} animate-me`} style={{ opacity: 0 }}>
        GET IN <br /> TOUCH.
      </h2>

      <div className={styles.grid}>
        <div className={styles.left}>
          <h3 className={`${styles.kicker} ${orbitron.className} animate-me`} style={{ opacity: 0 }}>CONTACT & BOOKING</h3>
          <p className={`${styles.bio} animate-me`} style={{ opacity: 0 }}>
            Whether you're looking for technical collaboration or sonic exploration, I'm currently open
            to select projects that push digital and auditory boundaries.
          </p>

          <h3 className={`${styles.kicker} ${styles.kickerGray} ${orbitron.className} animate-me`} style={{ opacity: 0 }}>DIRECT CHANNELS</h3>
          <ul className={`${styles.links} animate-me`} style={{ opacity: 0 }}>
            <li><a href="#">INSTAGRAM</a></li>
            <li><a href="#">FACEBOOK</a></li>
            <li><a href="#">GITHUB</a></li>
            <li><a href="#">SPOTIFY</a></li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={`${styles.specsBox} animate-me`} style={{ opacity: 0 }}>
            <h4 className={styles.specsTitle}>Technical Specs</h4>
            <p>
              For code-related inquiries, please specify the stack. I prefer working with TypeScript,
              Rust, and modern UI architectures.
            </p>
          </div>

          <form className={styles.form}>
            <fieldset className={`${styles.fieldset} animate-me`} style={{ opacity: 0 }}>
              <legend className={`${styles.legend} ${orbitron.className}`}>IDENTIFY YOURSELF</legend>
              <input type="text" placeholder="FULL NAME" className={styles.input} />
            </fieldset>

            <fieldset className={`${styles.fieldset} animate-me`} style={{ opacity: 0 }}>
              <legend className={`${styles.legend} ${orbitron.className}`}>DIGITAL ADDRESS</legend>
              <input type="email" placeholder="EMAIL ADDRESS" className={styles.input} />
            </fieldset>

            <fieldset className={`${styles.fieldset} animate-me`} style={{ opacity: 0 }}>
              <legend className={`${styles.legend} ${orbitron.className}`}>THE NARRATIVE</legend>
              <textarea placeholder="TELL ME ABOUT YOUR VISION" className={styles.textarea}></textarea>
            </fieldset>

            <div className={`${styles.submitRow} animate-me`} style={{ opacity: 0 }}>
              <button type="submit" className={styles.submitBtn}>
                SEND <br /> SIGNAL
              </button>
              <div className={styles.meta}>EST. RESPONSE 24H</div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
