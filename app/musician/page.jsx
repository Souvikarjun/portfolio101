import { orbitron } from "@/components/fonts/font";
import styles from "./musician.module.css";

const sets = [
  {
    tag: "Live System",
    title: "Neural Drift Session",
    copy: "A spatial performance weaving analog textures with reactive synthesis.",
    metric: "72 min runtime",
  },
  {
    tag: "Composition Lab",
    title: "Quantum Horizon Score",
    copy: "Cinematic motif suite for non-linear storytelling and scene transitions.",
    metric: "14 cue families",
  },
  {
    tag: "Audio Tools",
    title: "Pulse Mapper",
    copy: "Tempo-aware modulation framework for expressive motion in sound.",
    metric: "2.8ms latency",
  },
];

const cues = [
  "[22:10:03] harmonic lattice calibrated",
  "[22:12:17] transients locked to visual feed",
  "[22:16:58] low-end diffusion stabilized",
  "[22:20:44] atmospheric layer opened",
  "[22:24:10] sequence ready for launch",
];

export default function MusicianPage() {
  return (
    <section className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.waves} />

      <section id="home" className={styles.hero}>
        <div>
          <p className={`${styles.kicker} ${orbitron.className}`}>SONIC PROTOCOL / 02</p>
          <h1 className={styles.title}>
            The Quantum <br />
            Horizon
          </h1>
          <p className={styles.lead}>
            Building immersive music systems where each frequency behaves like a living interface.
            Every composition is a designed environment.
          </p>
          <a href="#projects" className={styles.cta}>
            Begin Exploration
          </a>
        </div>

        <aside className={styles.statusCard}>
          <p className={`${styles.cardLabel} ${orbitron.className}`}>SESSION METRICS</p>
          <h3>Waveform Analysis</h3>
          <div className={styles.bars}>
            <p>Stability</p>
            <div><span style={{ width: "96%" }} /></div>
            <p>Dynamic Range</p>
            <div><span style={{ width: "88%" }} /></div>
            <p>Resonance Depth</p>
            <div><span style={{ width: "91%" }} /></div>
          </div>
        </aside>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={`${styles.kicker} ${orbitron.className}`}>ACTIVE SETS</p>
          <h2>Performance Index</h2>
        </div>
        <div className={styles.cardGrid}>
          {sets.map((set) => (
            <article key={set.title} className={styles.projectCard}>
              <p className={`${styles.projectTag} ${orbitron.className}`}>{set.tag}</p>
              <h3>{set.title}</h3>
              <p>{set.copy}</p>
              <span>{set.metric}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="research" className={styles.research}>
        <article className={styles.logCard}>
          <p className={`${styles.kicker} ${orbitron.className}`}>LAB_LOG_SONIC_V2</p>
          <h3>Session Feed</h3>
          <ul>
            {cues.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
        </article>

        <article className={styles.spotlight}>
          <p className={`${styles.kicker} ${orbitron.className}`}>IMMERSIVE VISUAL NODE</p>
          <h3>Atmospheric Interface Score</h3>
          <p>
            Pairing cinematic synthesis with visual rhythm systems for installations, short films, and live
            interactive events.
          </p>
        </article>
      </section>

      <section id="about" className={styles.about}>
        <h2>Sound Direction</h2>
        <p>
          This mode translates your portfolio identity into a music-first language: structured telemetry,
          kinetic gradients, and expressive typography built for narrative audio.
        </p>
      </section>

      <section id="contact" className={styles.contact}>
        <h2>Book a sonic collaboration</h2>
        <a href="mailto:hello@souvik.dev">hello@souvik.dev</a>
      </section>
    </section>
  );
}
