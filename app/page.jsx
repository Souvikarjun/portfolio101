import Link from "next/link";
import styles from "./page.module.css";
import { orbitron, inter } from "@/components/fonts/font";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <p className={`${styles.kicker} ${orbitron.className}`}>
              PORTFOLIO VOL. 01
            </p>
            <h1 className={styles.title}>
              DEVELOPER <br />
              <span className={styles.ampersand}>&</span><br />
              <span className={styles.musician}>MUSICIAN</span>
            </h1>
            
            <p className={styles.subtitle}>
              Architecting digital ecosystems with technical precision while exploring
              the rhythmic boundaries of cinematic soundscapes. A dualistic approach to
              creative engineering.
            </p>

            <div className={styles.ctaGroup}>
              <Link href="/developer" className={styles.ctaPrimary}>
                VIEW DEVELOPER WORK ↗
              </Link>
              <Link href="/musician" className={styles.ctaSecondary}>
                EXPLORE MUSIC ▶
              </Link>
            </div>
          </div>

          <div className={styles.infoCards}>
            <div className={styles.card}>
              <p className={`${styles.cardLabel} ${orbitron.className}`}>CURRENT STACK</p>
              <ul className={styles.stackList}>
                <li>Rust / TypeScript</li>
                <li>Distributed Systems</li>
                <li>Low-latency Architecture</li>
              </ul>
            </div>

            <div className={styles.card}>
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
          <div className={styles.heroImageText}>
            <h2>
              SYNTHESIZING <br />
              LOGIC & <br />
              FREQUENCY.
            </h2>
          </div>
        </section>
      </main>
      
      <Contact />
    </div>
  );
}
