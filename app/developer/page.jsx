import { ContactButton } from "@/components/contactbutton/contactbutton";
import styles from "./developer.module.css"
import { Card } from "@/components/card/card";

const DeveloperPage = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.maintitle}>
                <h1 className={`${styles.title} ${styles.anime}`}>Hello</h1>
                <h1 className={`${styles.subtitle} ${styles.anime}`}>This is Souvikarjun</h1>
            </div>
            <p>Disclaimer: The project is under development. Please have patience</p>
            {/* <ContactButton /> */}

        </div>
        {/* <Card Header="Header" body="this is body"/> */}

    </div>
  )
}

export default DeveloperPage;