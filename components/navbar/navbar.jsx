"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { orbitron } from "../fonts/font";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ mainComp }) => {
  const pathname = usePathname();

  return (
    <aside className={styles.rail}>
      <p className={`${styles.brand} ${orbitron.className}`}>OBSERVATIONAL_OS</p>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.footer}>
        <p className={styles.signal}>SYNC STATUS: ACTIVE</p>
        <Link
          href={pathname === "/developer" ? "/musician" : "/developer"}
          className={`${styles.switch} ${orbitron.className}`}
        >
          {mainComp}
        </Link>
      </div>
    </aside>
  );
};

export default Navbar;
