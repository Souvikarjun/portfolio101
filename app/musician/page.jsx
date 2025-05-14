import Header from "@/components/header/header"
import styles from "./musician.module.css"

const Musician = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.maintitle}>
                <Header/>
            </div>
            {/* <ContactButton /> */}

        </div>
            <p>Disclaimer: The project is under development. Please have patience</p>
        {/* <Card Header="Header" body="this is body"/> */}

    </div>
  )
}

export default Musician