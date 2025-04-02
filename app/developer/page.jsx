import { ContactButton } from "@/components/contactbutton/contactbutton";
import styles from "./developer.module.css"
import { Card } from "@/components/card/card";

const DeveloperPage = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.maintitle}>
                <h1 className={styles.title}>Hello</h1>
                <h2 className={styles.subtitle}>This is Souvikarjun</h2>
            </div>
            {/* <ContactButton /> */}

        </div>
        {/* <Card Header="Header" body="this is body"/> */}

    </div>
  )
}

export default DeveloperPage;