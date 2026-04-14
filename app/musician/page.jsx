import { orbitron } from "@/components/fonts/font";
import styles from "./musician.module.css";
import Contact from "@/components/Contact";
import Link from "next/link";

const galleryImages = [
  "https://images.unsplash.com/photo-1598368195835-91e67f80c9d7?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614064088924-11ec26d52670?q=80&w=2065&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493225457224-eda0e6fdadcb?q=80&w=2070&auto=format&fit=crop",
];

export default function MusicianPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <p className={`${styles.kicker} ${orbitron.className}`}>ATMOSPHERIC VISUALS</p>
          <h1 className={styles.title}>
            THE <br /> GALLERY
          </h1>
          <div className={styles.socials}>
            <span>INSTAGRAM <strong>@nocturne.vsn</strong></span>
            <span>FACEBOOK <strong>/nocturne</strong></span>
          </div>
          <p className={styles.lead}>
            A curated stream of moments from the monolith. Electronic landscapes and technical intersections captured in high contrast.
          </p>
        </div>

        <section className={styles.galleryGrid}>
          {galleryImages.map((src, i) => (
            <div key={i} className={styles.galleryItem} style={{ backgroundImage: `url(${src})` }}></div>
          ))}
          <div className={styles.galleryItemPromo}>
            <h2>LIVE RITUALS</h2>
            <p>MONOLITH TOUR / AUG 2024</p>
          </div>
          {galleryImages.slice(0, 4).map((src, i) => (
             <div key={i+"b"} className={styles.galleryItem} style={{ backgroundImage: `url(${src})`, filter: 'grayscale(100%)' }}></div>
          ))}
        </section>

        <div className={styles.expandRow}>
          <button className={styles.expandBtn}>EXPAND ARCHIVE ⌄</button>
        </div>

        <section className={styles.releases}>
          <div className={styles.releaseHighlight}>
            <div className={styles.releaseImage} style={{backgroundImage: `url('https://images.unsplash.com/photo-1615826932727-463d1aeb7607?q=80&w=2070&auto=format&fit=crop')`}}></div>
            <div className={styles.releaseInfo}>
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
