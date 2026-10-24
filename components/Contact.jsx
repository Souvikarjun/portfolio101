"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";
import { orbitron } from "./fonts/font";
import {animate,stagger} from "animejs";

export default function Contact() {
  const contactRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: "error",
        message: "The contact form is not configured yet. Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: { name, email, reply_to: email, message },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "EmailJS could not send the message.");
      }

      setSubmitStatus({
        type: "success",
        message: "Your message has been sent. Thank you for reaching out!",
      });
      setName("");
      setEmail("");
      setMessage("");
      form.reset();
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Sorry, your message could not be sent. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <li><a href="https://www.instagram.com/souvikarjun_deb/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
            <li><a href="https://www.facebook.com/souvikarjundeb/" target="_blank" rel="noopener noreferrer">FACEBOOK</a></li>
            <li><a href="https://github.com/Souvikarjun" target="_blank" rel="noopener noreferrer">GITHUB</a></li>
            <li><a href="https://open.spotify.com/user/312begnezjkv3nge2hccnsguesom?si=e5bf09f7e5bb40b2" target="_blank" rel="noopener noreferrer">SPOTIFY</a></li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={`${styles.specsBox} animate-me`} style={{ opacity: 0 }}>
            <h4 className={styles.specsTitle}>Technical Specs</h4>
            <p>
              For Music-related inquiries, please specify the genre or style you're interested in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <fieldset className={`${styles.fieldset} animate-me`} style={{ opacity: 0 }}>
              <legend className={`${styles.legend} ${orbitron.className}`}>IDENTIFY YOURSELF</legend>
              <input name="name" type="text" placeholder="NAME" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
            </fieldset>

            <fieldset className={`${styles.fieldset} animate-me`} style={{ opacity: 0 }}>
              <legend className={`${styles.legend} ${orbitron.className}`}>DIGITAL ADDRESS</legend>
              <input name="email" type="email" placeholder="EMAIL ADDRESS" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </fieldset>

            <fieldset className={`${styles.fieldset} animate-me`} style={{ opacity: 0 }}>
              <legend className={`${styles.legend} ${orbitron.className}`}>THE NARRATIVE</legend>
              <textarea name="message" placeholder="TELL ME ABOUT YOUR VISION" className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </fieldset>

            <div className={`${styles.submitRow} animate-me`} style={{ opacity: 0 }}>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "SENDING..." : <>SEND <br /> SIGNAL</>}
              </button>
              <div className={styles.meta}>EST. RESPONSE 2 DAYS</div>
            </div>
            {submitStatus && (
              <p
                className={`${styles.status} ${submitStatus.type === "error" ? styles.statusError : ""}`}
                role={submitStatus.type === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {submitStatus.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
