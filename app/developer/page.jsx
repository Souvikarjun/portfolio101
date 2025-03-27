import { ContactButton } from "@/components/contactbutton/contactbutton";
import styles from "./developer.module.css"

const DeveloperPage = () => {
  return (
    <div className={styles.wrapper}>
        <div>
            <div>
                <h1 className={styles.title}>title</h1>
                <p className={styles.subtitle}>subtitle</p>
            </div>
            <ContactButton />

        </div>


    </div>
  )
}

export default DeveloperPage;