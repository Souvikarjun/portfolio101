import Header from "@/components/header/header"
import { ContactButton } from "@/components/contactbutton/contactbutton"
import { boxes } from "@/components/boxes/boxes"
import styles from "./musician.module.css"

const Musician = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.maintitle}>
                <Header/>
            {/* <div className={styles.cbtn}>
                <ContactButton text="Contact Me" className={styles.btn}/>
            </div> */}
            </div>
        </div>
        
        {/* <div className={styles.body}>
            <boxes className={styles.box}>Hello</boxes>
        </div> */}

            <p>Disclaimer: The project is under development. Please have patience</p>
        {/* <Card Header="Header" body="this is body"/> */}

    </div>
  )
}

export default Musician