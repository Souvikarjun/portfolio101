import styles from "./Contact.module.css";
import { orbitron } from "./fonts/font";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>
        GET IN <br /> TOUCH.
      </h2>

      <div className={styles.grid}>
        <div className={styles.left}>
          <h3 className={`${styles.kicker} ${orbitron.className}`}>CONTACT & BOOKING</h3>
          <p className={styles.bio}>
            Whether you're looking for technical collaboration or sonic exploration, I'm currently open
            to select projects that push digital and auditory boundaries.
          </p>

          <h3 className={`${styles.kicker} ${styles.kickerGray} ${orbitron.className}`}>DIRECT CHANNELS</h3>
          <ul className={styles.links}>
            <li><a href="#">INSTAGRAM</a></li>
            <li><a href="#">FACEBOOK</a></li>
            <li><a href="#">GITHUB</a></li>
            <li><a href="#">SPOTIFY</a></li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.specsBox}>
            <h4 className={styles.specsTitle}>Technical Specs</h4>
            <p>
              For code-related inquiries, please specify the stack. I prefer working with TypeScript,
              Rust, and modern UI architectures.
            </p>
          </div>

          <form className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend className={`${styles.legend} ${orbitron.className}`}>IDENTIFY YOURSELF</legend>
              <input type="text" placeholder="FULL NAME" className={styles.input} />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={`${styles.legend} ${orbitron.className}`}>DIGITAL ADDRESS</legend>
              <input type="email" placeholder="EMAIL ADDRESS" className={styles.input} />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={`${styles.legend} ${orbitron.className}`}>THE NARRATIVE</legend>
              <textarea placeholder="TELL ME ABOUT YOUR VISION" className={styles.textarea}></textarea>
            </fieldset>

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn}>
                SEND <br /> SIGNAL
              </button>
              <div className={styles.meta}>EST. RESPONSE 24H</div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
