import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/button/button";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h2>KNOW ME AS:</h2>
        </div>
        <div className={styles.buttons}>
          <Button text="musician" className={`${styles.button} ${styles.musician}`}/>
          <Button text="developer" className={`${styles.button}`}/>
        </div>
      </main>
    </div>
  );
}
