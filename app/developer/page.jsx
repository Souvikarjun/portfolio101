import { ContactButton } from "@/components/contactbutton/contactbutton";
import styles from "./developer.module.css"
import { Card } from "@/components/card/card";
import Header from "@/components/header/header";
// import { Button } from "@/components/button/button";

const DeveloperPage = () => {
  return (
    <section id="home">
      <div className={styles.wrapper}>
          <div className={styles.header}>
              <div className={styles.maintitle}>
                  <Header/>
                  <h3 className={`${styles.subtext}`}>Frntend Developer and <span>Machine Learning Researcher</span></h3>
                  <div className={`${styles.ctbtn}`}>
                    <ContactButton className={`${styles.btn}`} text="Contact Me"/>
                  </div>
              </div>
              <p>Disclaimer: The project is under development. Please have patience</p>
              {/* <ContactButton /> */}

          </div>
          {/* <Card Header="Header" body="this is body"/> */}

      </div>
    </section>
  )
}

export default DeveloperPage;


