"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./mode-shell.module.css";

const modeConfig = {
  developer: {
    title: "Developer Mode",
    subtitle: "Structured and technical",
    switchHref: "/musician",
    switchLabel: "Switch to Musician",
    sections: [
      { id: "home", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
    ],
  },
  musician: {
    title: "Musician Mode",
    subtitle: "Expressive and visual",
    switchHref: "/developer",
    switchLabel: "Switch to Developer",
    sections: [
      { id: "home", label: "Home" },
      { id: "bands", label: "Bands & Work" },
      { id: "media", label: "Media" },
      { id: "streaming", label: "Streaming" },
    ],
  },
};

export default function ModeShell({ mode, children }) {
  const pathname = usePathname();
  const config = modeConfig[mode];
  const modeClass = mode === "developer" ? styles.devMode : styles.musicMode;

  return (
    <div className={`${styles.shell} ${modeClass}`}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          SOUVIKARJUN
        </Link>

        <div className={styles.modeBlock}>
          <p className={styles.modeTitle}>{config.title}</p>
          <p className={styles.modeSubtitle}>{config.subtitle}</p>
        </div>

        <nav className={styles.sectionNav}>
          {config.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className={styles.navLink}>
              {section.label}
            </a>
          ))}
        </nav>

        <div className={styles.modeSwitches}>
          <Link href="/developer" className={`${styles.modePill} ${pathname.startsWith("/developer") ? styles.activePill : ""}`}>
            Developer
          </Link>
          <Link href="/musician" className={`${styles.modePill} ${pathname.startsWith("/musician") ? styles.activePill : ""}`}>
            Musician
          </Link>
        </div>

        <Link href={config.switchHref} className={styles.primarySwitch}>
          {config.switchLabel}
        </Link>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
