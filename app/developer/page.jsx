import { orbitron } from "@/components/fonts/font";
import styles from "./developer.module.css";
import Contact from "@/components/Contact";
import Link from "next/link";

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
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <p className={`${styles.kicker} ${orbitron.className}`}>ENGINEERING SYSTEMS</p>
          <h1 className={styles.title}>
            ARCHITECTING <br />
            DIGITAL <br />
            <span className={styles.highlight}>STRUCTURES</span>
          </h1>
          <p className={styles.lead}>
            I build high-performance distributed systems and cryptographic primitives. Focused on the intersection of low-level optimization and seamless user experience.
          </p>

          <div className={styles.tagsRow}>
            <span className={styles.tag}>RUST</span>
            <span className={styles.tag}>REACT</span>
            <span className={styles.tag}>WEBGL</span>
            <span className={styles.tag}>KAFKA</span>
          </div>
        </div>

        <section className={styles.projectsGrid}>
          {projects.map((project, idx) => (
            <article key={project.title} className={styles.projectCard}>
              <div className={styles.cardImageHolder} style={{backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')`}}></div>
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

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            READY TO <br /> INITIATE?
          </h2>
          <div className={styles.ctaButtons}>
            <Link href="#contact" className={styles.btnPrimary}>START PROJECT</Link>
            <Link href="#" className={styles.btnSecondary}>VIEW GITHUB</Link>
          </div>
        </section>

      </main>
      <Contact />
    </div>
  );
}
