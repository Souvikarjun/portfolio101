import Link from "next/link";
import styles from "./page.module.css";
import { orbitron, inter } from "@/components/fonts/font";

const modes = [
  {
    title: "Developer",
    route: "/developer",
    tag: "Protocol 01",
    description:
      "Explore interface systems, machine intelligence projects, and observational architecture notes.",
  },
  {
    title: "Musician",
    route: "/musician",
    tag: "Protocol 02",
    description:
      "Step into cinematic sound design, live experiments, and narrative audio worldbuilding.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.orb} />
      <main className={styles.main}>
        <p className={`${styles.kicker} ${orbitron.className}`}>SYSTEM INITIALIZATION</p>
        <h1 className={`${styles.title} ${inter.className}`}>
          Build in <span>high fidelity</span>.
          <br />
          Perform in <span>deep emotion</span>.
        </h1>
        <p className={styles.subtitle}>
          Select a mode to enter the upgraded portfolio experience.
        </p>

        <section className={styles.grid}>
          {modes.map((mode) => (
            <Link key={mode.title} href={mode.route} className={styles.card}>
              <p className={`${styles.cardTag} ${orbitron.className}`}>{mode.tag}</p>
              <h2>{mode.title}</h2>
              <p>{mode.description}</p>
              <span className={styles.enter}>Enter Node</span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
