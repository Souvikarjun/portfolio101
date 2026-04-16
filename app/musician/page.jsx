"use client";

import { useState } from "react";
import styles from "./musician.module.css";

const bandInfo = {
  name: "The Crashratts",
  role: "Vocalist, Guitar, Creative Direction",
  experience: "Live sets, writing sessions, arrangement, and performance development.",
  summary:
    "The Crashratts blends emotive songwriting with energetic stage performance, balancing melodic hooks with raw live dynamics.",
};

const gallery = [
  {
    id: 1,
    title: "Live Performance",
    src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Studio Session",
    src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Backstage Moment",
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Soundcheck",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Crowd Energy",
    src: "https://images.unsplash.com/photo-1464375117522-1311dd6d3b31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Writing Room",
    src: "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=1200&q=80",
  },
];

const spotifyEmbed = "https://open.spotify.com/embed/artist/4gzpq5DPGxSnKTe4SA8HAU?utm_source=generator";

export default function MusicianPage() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className={styles.pageWrap}>
      <section id="home" className={styles.hero}>
        <p className={styles.kicker}>Musician Mode</p>
        <h1>Writing atmosphere-forward music for stages, stories, and cinematic spaces.</h1>
        <p>
          I approach sound as emotional architecture. The goal is depth with clarity, blending
          composition, performance, and visuals into one immersive experience.
        </p>
        <div className={styles.socialRow}>
          <a href="https://www.instagram.com/souvikarjun_deb" target="_blank" rel="noreferrer">
            Instagram: @souvikarjun_deb
          </a>
          <a href="https://www.facebook.com/souvikarjundeb" target="_blank" rel="noreferrer">
            Facebook: souvikarjundeb
          </a>
        </div>
      </section>

      <section id="bands" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Bands & Work</p>
          <h2>{bandInfo.name}</h2>
        </div>

        <article className={styles.bandCard}>
          <p>{bandInfo.summary}</p>
          <div className={styles.bandMeta}>
            <span>
              <strong>Role</strong>
              {bandInfo.role}
            </span>
            <span>
              <strong>Experience</strong>
              {bandInfo.experience}
            </span>
          </div>
        </article>
      </section>

      <section id="media" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Media / Gallery</p>
          <h2>Visual Moments</h2>
        </div>

        <div className={styles.mediaGrid}>
          {gallery.map((item) => (
            <button key={item.id} type="button" className={styles.mediaCard} onClick={() => setActiveImage(item)}>
              <img src={item.src} alt={item.title} loading="lazy" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="streaming" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Music / Streaming</p>
          <h2>Spotify</h2>
        </div>

        <div className={styles.spotifyCard}>
          <iframe
            title="Spotify Artist Profile"
            src={spotifyEmbed}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </section>

      {activeImage ? (
        <button type="button" className={styles.lightbox} onClick={() => setActiveImage(null)}>
          <div className={styles.lightboxInner}>
            <img src={activeImage.src} alt={activeImage.title} />
            <p>{activeImage.title}</p>
          </div>
        </button>
      ) : null}
    </div>
  );
}
