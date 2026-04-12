import Link from "next/link";
import styles from "./page.module.css";
import { orbitron, inter } from "@/components/fonts/font";

const modes = [
  {
    title: "Developer",
    route: "/developer",
    tag: "Build with me",
    description:
      "Dive into practical projects, code walkthroughs, and the systems I am building one step at a time.",
    cta: "Explore projects",
  },
  {
    title: "Musician",
    route: "/musician",
    tag: "Listen with me",
    description:
      "Step into cinematic sound design, live sessions, and the stories I tell through sound.",
    cta: "Hear the work",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.orb} />
      <main className={styles.main}>
        <p className={`${styles.kicker} ${orbitron.className}`}>SYSTEM INITIALIZATION</p>
        <h1 className={`${styles.pretitle} ${inter.className}`}>
           This is 
        </h1>
        <h1 className={`${styles.title} ${inter.className}`}>
           <span>Souvikarjun Deb</span>.
        </h1>
          <br />
        <p className={styles.subtitle}>
          Select a Portfolio to view
        </p>

        <section className={styles.grid}>
          {modes.map((mode) => (
            <Link key={mode.title} href={mode.route} className={styles.card}>
              <span className={styles.cardGlow} aria-hidden />
              <p className={`${styles.cardTag} ${orbitron.className}`}>{mode.tag}</p>
              <h2>{mode.title}</h2>
              <p>{mode.description}</p>
              <span className={styles.enter}>
                {mode.cta}
                <span aria-hidden> {"->"}</span>
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
