import { orbitron } from "@/components/fonts/font";
import styles from "./developer.module.css";

const projects = [
  {
    tag: "Machine Learning",
    title: "Digit Recognizer",
    copy: "Real-time handwritten inference pipeline tuned for low-latency edge delivery.",
    metric: "98.2% accuracy",
  },
  {
    tag: "Systems Research",
    title: "Sharebite Logistics",
    copy: "Route orchestration engine for fast dispatch and live state correction.",
    metric: "1.3s sync cycle",
  },
  {
    tag: "Interface Ops",
    title: "Neural Control Deck",
    copy: "An interaction layer where dense data remains calm, readable, and human.",
    metric: "42 active modules",
  },
];

const notes = [
  "[14:02:11] initializing sync mode: ok",
  "[14:05:22] event collapse resolved in node_07",
  "[14:08:19] recording observation pre-locality stream",
  "[14:12:01] re-calibration complete",
  "[14:15:33] awaiting command",
];

export default function DeveloperPage() {
  return (
    <section className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.gridBackdrop} />

      <section id="home" className={styles.hero}>
        <div>
          <p className={`${styles.kicker} ${orbitron.className}`}>PROTOCOL 01: CORE ARCHITECTURE</p>
          <h1 className={styles.title}>
            Identity & <br />
            Protocol
          </h1>
          <p className={styles.lead}>
            Designing interfaces at the intersection of logical precision and atmospheric emotion.
            Systems should not only function, they should resonate.
          </p>
          <a href="#projects" className={styles.cta}>
            Initiate Node Review
          </a>
        </div>

        <aside className={styles.statusCard}>
          <p className={`${styles.cardLabel} ${orbitron.className}`}>Registry_ID</p>
          <h3>Curator_v3.0</h3>
          <div className={styles.stack}>
            <span>Next.js core</span>
            <span>UI systems</span>
            <span>ML tooling</span>
            <span>Research ops</span>
          </div>
          <div className={styles.metrics}>
            <p>
              Cognitive Load <strong>optimized</strong>
            </p>
            <p>
              Runtime Efficiency <strong>high</strong>
            </p>
            <p>
              Interface Elegance <strong>stable</strong>
            </p>
          </div>
        </aside>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={`${styles.kicker} ${orbitron.className}`}>ACTIVE MODULES</p>
          <h2>Project Index</h2>
        </div>

        <div className={styles.cardGrid}>
          {projects.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <p className={`${styles.projectTag} ${orbitron.className}`}>{project.tag}</p>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
              <span>{project.metric}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="research" className={styles.research}>
        <article className={styles.logCard}>
          <p className={`${styles.kicker} ${orbitron.className}`}>LAB_JOURNAL_V4</p>
          <h3>Observation Stream</h3>
          <ul>
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>

        <article className={styles.spotlight}>
          <p className={`${styles.kicker} ${orbitron.className}`}>SYSTEM_VISUAL_84</p>
          <h3>Deep Field Visualization</h3>
          <p>
            Mapping how interface decisions influence cognition across complex systems and research tools.
          </p>
        </article>
      </section>

      <section id="about" className={styles.about}>
        <h2>About this direction</h2>
        <p>
          This redesign shifts the portfolio into an OS-like narrative: command rail, protocol language,
          layered cards, and cinematic gradients with responsive motion.
        </p>
      </section>

      <section id="contact" className={styles.contact}>
        <h2>Ready for collaboration?</h2>
        <a href="mailto:hello@souvik.dev">hello@souvik.dev</a>
      </section>
    </section>
  );
}
